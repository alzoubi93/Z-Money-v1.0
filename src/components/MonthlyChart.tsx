import type {Transaction} from "../models/finance";
import {toSyp,formatMoney} from "../calculations/finance";
import type {ExchangeRates} from "../models/finance";
interface Props{transactions:Transaction[];rates:ExchangeRates}
export function MonthlyChart({transactions,rates}:Props){
 const now=new Date(),months=Array.from({length:6},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-5+i,1);return {key:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,label:d.toLocaleDateString("ar",{month:"short"})}});
 const rows=months.map(m=>{let income=0,expense=0;transactions.forEach(t=>{if(t.date.startsWith(m.key)){const v=toSyp(t.amount,t.currency,rates);if(t.type==="income")income+=v;if(t.type==="expense")expense+=v;}});return {...m,income,expense,max:Math.max(income,expense,1)}});
 const max=Math.max(...rows.map(x=>x.max),1);
 return <div className="chart-card"><div className="chart-title"><h2>حركة آخر 6 أشهر</h2><div><span className="legend income-legend">الدخل</span><span className="legend expense-legend">المصروف</span></div></div>
 <div className="chart">{rows.map(r=><div className="chart-col" key={r.key}><div className="bars"><div className="bar income-bar" style={{height:`${Math.max(4,r.income/max*130)}px`}} title={`الدخل: ${formatMoney(r.income)} ل.س`}></div><div className="bar expense-bar" style={{height:`${Math.max(4,r.expense/max*130)}px`}} title={`المصروف: ${formatMoney(r.expense)} ل.س`}></div></div><span>{r.label}</span></div>)}</div></div>
}