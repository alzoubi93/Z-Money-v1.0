import {useState} from "react";
import type {Currency,Debt} from "../models/finance";
interface Props{direction:"receivable"|"payable";onSave:(d:Debt)=>void;onClose:()=>void}
export function DebtForm({direction,onSave,onClose}:Props){
 const [person,setPerson]=useState(""),[amount,setAmount]=useState(""),[currency,setCurrency]=useState<Currency>("USD");
 const [date,setDate]=useState(new Date().toISOString().slice(0,10)),[dueDate,setDueDate]=useState(""),[notes,setNotes]=useState("");
 const receivable=direction==="receivable";
 function submit(e:React.FormEvent){e.preventDefault();const n=Number(amount);if(!person.trim()||!Number.isFinite(n)||n<=0)return;
  onSave({id:crypto.randomUUID(),direction,person:person.trim(),originalAmount:n,currency,date,dueDate:dueDate||undefined,notes:notes||undefined,createdAt:new Date().toISOString()});onClose();}
 return <div className="modal-backdrop"><form className="modal" onSubmit={submit}>
  <div className="modal-header"><h2>{receivable?"إضافة دين لي":"إضافة دين عليّ"}</h2><button type="button" onClick={onClose}>×</button></div>
  <label>اسم الشخص<input value={person} onChange={e=>setPerson(e.target.value)} placeholder="مثال: أحمد" autoFocus/></label>
  <label>قيمة الدين<input value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,""))} inputMode="decimal" placeholder="0"/></label>
  <label>العملة<select value={currency} onChange={e=>setCurrency(e.target.value as Currency)}><option value="SYP">الليرة السورية (SYP)</option><option value="USD">الدولار (USD)</option><option value="EUR">اليورو (EUR)</option></select></label>
  <label>تاريخ الدين<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
  <label>تاريخ الاستحقاق<input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}/></label>
  <label>ملاحظات<textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}/></label>
  <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>إلغاء</button><button type="submit" className={`primary ${receivable?"income-btn":"expense-btn"}`}>حفظ الدين</button></div>
 </form></div>
}