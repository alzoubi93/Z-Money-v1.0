import type {Debt,DebtPayment,Currency} from "../models/finance";
import {formatCurrency} from "../calculations/finance"; import {isSettled,paidForDebt,remainingForDebt} from "../calculations/debts";
interface Props{debts:Debt[];payments:DebtPayment[];onPayment:(d:Debt)=>void}
const sym:Record<Currency,string>={SYP:"ل.س",USD:"$",EUR:"€"};
export function DebtList({debts,payments,onPayment}:Props){
 if(!debts.length)return <div className="empty-state">لا توجد ديون مسجلة بعد</div>;
 return <div className="debt-list">{debts.slice().reverse().map(d=>{const paid=paidForDebt(d.id,payments),rem=remainingForDebt(d,payments),settled=isSettled(d,payments);
  return <div className="debt-card" key={d.id}><div className="debt-top"><div><strong>{d.person}</strong><span>{d.direction==="receivable"?"لي عنده":"عليه له"} · {d.date}</span></div><span className={`status ${settled?"settled":"open"}`}>{settled?"مسدد":"مفتوح"}</span></div>
  <div className="debt-amounts"><div><span>الأصل</span><strong>{formatCurrency(d.originalAmount,d.currency)}</strong></div><div><span>المدفوع</span><strong>{formatCurrency(paid,d.currency)}</strong></div><div><span>المتبقي</span><strong className={settled?"settled-text":"remaining-text"}>{formatCurrency(rem,d.currency)}</strong></div></div>
  {!settled&&<button className="pay-debt" onClick={()=>onPayment(d)}>＋ تسجيل دفعة</button>}
  </div>})}</div>
}