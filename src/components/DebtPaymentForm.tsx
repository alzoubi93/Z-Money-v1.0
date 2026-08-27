import {useState} from "react";
import type {Debt,DebtPayment} from "../models/finance";
import {formatMoney} from "../calculations/finance";
interface Props{debt:Debt;remaining:number;onSave:(p:DebtPayment)=>void;onClose:()=>void}
export function DebtPaymentForm({debt,remaining,onSave,onClose}:Props){
 const [amount,setAmount]=useState(""),[date,setDate]=useState(new Date().toISOString().slice(0,10)),[notes,setNotes]=useState("");
 function submit(e:React.FormEvent){e.preventDefault();const n=Number(amount);if(!Number.isFinite(n)||n<=0||n>remaining)return;
  onSave({id:crypto.randomUUID(),debtId:debt.id,amount:n,date,notes:notes||undefined,createdAt:new Date().toISOString()});onClose();}
 return <div className="modal-backdrop"><form className="modal" onSubmit={submit}>
  <div className="modal-header"><h2>تسجيل دفعة</h2><button type="button" onClick={onClose}>×</button></div>
  <div className="debt-payment-info">المتبقي: <strong>{formatMoney(remaining)} {debt.currency}</strong></div>
  <label>قيمة الدفعة<input value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,""))} inputMode="decimal" max={remaining} placeholder="0" autoFocus/></label>
  <label>التاريخ<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
  <label>ملاحظات<textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}/></label>
  <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>إلغاء</button><button type="submit" className="primary income-btn">حفظ الدفعة</button></div>
 </form></div>
}