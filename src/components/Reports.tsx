import {useMemo,useState} from "react";
import type {Currency,Debt,DebtPayment,Transaction,ExchangeRates} from "../models/finance";
import {exportCsv,exportPdf} from "../utils/export";
import {formatCurrency,formatMoney,toSyp} from "../calculations/finance";
interface Props{tx:Transaction[];debts:Debt[];payments:DebtPayment[];rates:ExchangeRates;onClose:()=>void}
export function Reports({tx,debts,payments,rates,onClose}:Props){
 const [from,setFrom]=useState(""),[to,setTo]=useState(""),[kind,setKind]=useState("all"),[currency,setCurrency]=useState<"all"|Currency>("all");
 const filtered=useMemo(()=>tx.filter(t=>(!from||t.date>=from)&&(!to||t.date<=to)&&(kind==="all"||t.type===kind)&&(currency==="all"||t.currency===currency)),[tx,from,to,kind,currency]);
 const income=filtered.filter(t=>t.type==="income").reduce((s,t)=>s+toSyp(t.amount,t.currency,rates),0);
 const expense=filtered.filter(t=>t.type==="expense").reduce((s,t)=>s+toSyp(t.amount,t.currency,rates),0);
 return <div className="report-panel"><div className="report-header"><div><h2>التقارير المالية</h2><span>{filtered.length} عملية مطابقة</span></div><button onClick={onClose}>×</button></div>
 <div className="filters"><label>من<input type="date" value={from} onChange={e=>setFrom(e.target.value)}/></label><label>إلى<input type="date" value={to} onChange={e=>setTo(e.target.value)}/></label>
 <label>نوع العملية<select value={kind} onChange={e=>setKind(e.target.value)}><option value="all">الكل</option><option value="income">دخل</option><option value="expense">مصروف</option><option value="debt_receivable">دين لي</option><option value="debt_payable">دين عليّ</option><option value="debt_payment_receivable">دفعة دين لي</option><option value="debt_payment_payable">دفعة دين عليّ</option></select></label>
 <label>العملة<select value={currency} onChange={e=>setCurrency(e.target.value as "all"|Currency)}><option value="all">كل العملات</option><option value="SYP">SYP</option><option value="USD">USD</option><option value="EUR">EUR</option></select></label></div>
 <div className="report-stats"><div><span>الدخل</span><strong>{formatMoney(income)} ل.س</strong></div><div><span>المصروف</span><strong>{formatMoney(expense)} ل.س</strong></div><div><span>الصافي</span><strong>{formatMoney(income-expense)} ل.س</strong></div></div>
 <div className="report-actions"><button onClick={()=>exportCsv(filtered,debts,payments,rates)}>تصدير Excel / CSV</button><button onClick={()=>exportPdf(filtered,debts,payments,rates)}>تصدير PDF</button></div>
 <div className="report-table-wrap"><table><thead><tr><th>التاريخ</th><th>العملية</th><th>المبلغ</th></tr></thead><tbody>{filtered.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(t=><tr key={t.id}><td>{t.date}</td><td>{t.title}</td><td>{formatCurrency(t.amount,t.currency)}</td></tr>)}</tbody></table></div>
 </div>
}