import {useMemo,useState} from "react";
import type {Budget,Category} from "../models/budget";
import type {Currency,Transaction} from "../models/finance";
import {formatCurrency,toSyp} from "../calculations/finance";
import type {ExchangeRates} from "../models/finance";
interface Props{categories:Category[];budgets:Budget[];transactions:Transaction[];rates:ExchangeRates;onBudget:(b:Budget)=>void;onCategory:(c:Category)=>void;onClose:()=>void}
export function BudgetPanel({categories,budgets,transactions,rates,onBudget,onCategory,onClose}:Props){
 const [month,setMonth]=useState(new Date().toISOString().slice(0,7)),[cat,setCat]=useState(categories[0]?.id||"food"),[amount,setAmount]=useState(""),[currency,setCurrency]=useState<Currency>("SYP"),[newCat,setNewCat]=useState("");
 const spent=(id:string)=>transactions.filter(t=>t.type==="expense"&&t.category===id&&t.date.startsWith(month)).reduce((s,t)=>s+toSyp(t.amount,t.currency,rates),0);
 const items=useMemo(()=>categories.map(c=>{const b=budgets.find(x=>x.categoryId===c.id&&x.month===month);const s=spent(c.id);return {...c,budget:b,spent:s,percent:b?Math.min(100,s/toSyp(b.amount,b.currency,rates)*100):0}}),[categories,budgets,transactions,month,rates]);
 function addBudget(e:React.FormEvent){e.preventDefault();if(!amount||!cat)return;onBudget({id:crypto.randomUUID(),categoryId:cat,month,amount:Number(amount),currency,createdAt:new Date().toISOString()});setAmount("")}
 function addCategory(e:React.FormEvent){e.preventDefault();if(!newCat.trim())return;onCategory({id:crypto.randomUUID(),name:newCat.trim(),icon:"📌",createdAt:new Date().toISOString()});setNewCat("")}
 return <div className="modal-backdrop"><div className="modal budget-modal"><div className="modal-header"><div><h2>الميزانية الشهرية</h2><span>{month}</span></div><button onClick={onClose}>×</button></div>
 <div className="month-control"><label>الشهر<input type="month" value={month} onChange={e=>setMonth(e.target.value)}/></label></div>
 <div className="budget-list">{items.map(x=><div className="budget-row" key={x.id}><div className="budget-name"><span>{x.icon}</span><div><strong>{x.name}</strong><small>{x.budget?`الحد: ${formatCurrency(x.budget.amount,x.budget.currency)}`:"لم تحدد ميزانية"}</small></div></div><div className="budget-numbers"><strong>{formatCurrency(x.spent,"SYP")}</strong>{x.budget&&<div className="progress"><i className={x.percent>=100?"over":x.percent>=80?"warn":""} style={{width:`${x.percent}%`}}/></div>}</div>{x.budget&&<small>{Math.round(x.percent)}%</small>}</div>)}</div>
 <h3 className="form-section-title">تحديد ميزانية</h3><form className="budget-form" onSubmit={addBudget}><select value={cat} onChange={e=>setCat(e.target.value)}>{categories.map(c=><option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}</select><input type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="المبلغ"/><select value={currency} onChange={e=>setCurrency(e.target.value as Currency)}><option>SYP</option><option>USD</option><option>EUR</option></select><button>حفظ</button></form>
 <h3 className="form-section-title">إضافة تصنيف</h3><form className="add-member" onSubmit={addCategory}><input value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="اسم التصنيف"/><button>＋ إضافة</button></form><button className="secondary full-btn" onClick={onClose}>إغلاق</button>
 </div></div>
}