import {useState} from "react";
import type {FamilyMember} from "../models/family";
interface Props{members:FamilyMember[];currentId:string;onSelect:(id:string)=>void;onAdd:(m:FamilyMember)=>void;onDelete:(id:string)=>void;onClose:()=>void}
export function MemberManager({members,currentId,onSelect,onAdd,onDelete,onClose}:Props){
 const [name,setName]=useState("");
 function add(e:React.FormEvent){e.preventDefault();if(!name.trim())return;onAdd({id:crypto.randomUUID(),name:name.trim(),role:"member",createdAt:new Date().toISOString()});setName("")}
 return <div className="modal-backdrop"><div className="modal">
  <div className="modal-header"><h2>أفراد العائلة</h2><button onClick={onClose}>×</button></div>
  <p className="modal-help">أضف أفراد الأسرة واربط العمليات بالشخص الذي قام بها.</p>
  <div className="member-list">{members.map(m=><div className="member-row" key={m.id}><button className={`member-select ${m.id===currentId?"selected":""}`} onClick={()=>onSelect(m.id)}><span className="member-avatar">{m.name.slice(0,1)}</span><span><strong>{m.name}</strong><small>{m.role==="admin"?"مدير":"عضو"}</small></span></button>{m.role!=="admin"&&<button className="delete-member" onClick={()=>onDelete(m.id)}>حذف</button>}</div>)}</div>
  <form className="add-member" onSubmit={add}><input value={name} onChange={e=>setName(e.target.value)} placeholder="اسم فرد العائلة"/><button type="submit">＋ إضافة</button></form>
  <button className="secondary full-btn" onClick={onClose}>إغلاق</button>
 </div></div>
}