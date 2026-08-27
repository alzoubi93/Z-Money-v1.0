import {useState} from "react";
import type {Currency,Transaction,TransactionType} from "../models/finance";
interface Props{type:"income"|"expense";members?:{id:string;name:string}[];onSave:(t:Transaction)=>void;onClose:()=>void}
export function TransactionForm({type,members=[],onSave,onClose}:Props){
 const [title,setTitle]=useState(""),[amount,setAmount]=useState(""),[currency,setCurrency]=useState<Currency>("SYP"),[memberId,setMemberId]=useState(members[0]?.id||"");
 const [date,setDate]=useState(new Date().toISOString().slice(0,10)),[category,setCategory]=useState(""),[notes,setNotes]=useState("");
 const isIncome=type==="income";
 function submit(e:React.FormEvent){
  e.preventDefault(); const n=Number(amount);
  if(!title.trim()||!Number.isFinite(n)||n<=0)return;
  const tx:Transaction={id:crypto.randomUUID(),type:type as TransactionType,title:title.trim(),amount:n,currency,date,category:category||undefined,notes:notes||undefined,createdAt:new Date().toISOString(),memberId:memberId||undefined};
  onSave(tx); onClose();
 }
 return <div className="modal-backdrop"><form className="modal" onSubmit={submit}>
  <div className="modal-header"><h2>{isIncome?"إضافة دخل":"إضافة مصروف"}</h2><button type="button" onClick={onClose}>×</button></div>
  <label>الاسم<input value={title} onChange={e=>setTitle(e.target.value)} placeholder={isIncome?"مثال: راتب محمد":"مثال: مشتريات منزل"} autoFocus/></label>
  <label>المبلغ<input value={amount} onChange={e=>setAmount(e.target.value.replace(/[^0-9.]/g,""))} inputMode="decimal" placeholder="0"/></label>
  <label>العملة<select value={currency} onChange={e=>setCurrency(e.target.value as Currency)}><option value="SYP">الليرة السورية (SYP)</option><option value="USD">الدولار (USD)</option><option value="EUR">اليورو (EUR)</option></select></label>
  {members.length>0&&<label>مدخل العملية<select value={memberId} onChange={e=>setMemberId(e.target.value)}><option value="">غير محدد</option>{members.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></label>}
  <label>التاريخ<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label>
  <label>التصنيف<input value={category} onChange={e=>setCategory(e.target.value)} placeholder={isIncome?"راتب":"طعام، منزل، مواصلات..."}/></label>
  <label>ملاحظات<textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}/></label>
  <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>إلغاء</button><button type="submit" className={isIncome?"primary income-btn":"primary expense-btn"}>حفظ العملية</button></div>
 </form></div>
}