import type {Debt,DebtPayment,Transaction,ExchangeRates} from "../models/finance";
import {formatCurrency,toSyp} from "../calculations/finance";
function esc(v:unknown){return `"${String(v??"").replaceAll('"','""')}"`}
export function exportCsv(tx:Transaction[],debts:Debt[],payments:DebtPayment[],rates:ExchangeRates){
 const rows=[["النوع","الاسم","الشخص","المبلغ","العملة","التاريخ","التصنيف","ملاحظات","المبلغ SYP"]];
 tx.forEach(t=>rows.push([t.type,t.title,t.person||"",String(t.amount),t.currency,t.date,t.category||"",t.notes||"",String(toSyp(t.amount,t.currency,rates))]));
 const csv="\uFEFF"+rows.map(r=>r.map(esc).join(",")).join("\n");
 downloadBlob(csv,"text/csv;charset=utf-8","Z-Money-report.csv");
}
export function exportPdf(tx:Transaction[],debts:Debt[],payments:DebtPayment[],rates:ExchangeRates){
 const win=window.open("","_blank"); if(!win)return;
 const rows=tx.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(t=>`<tr><td>${t.date}</td><td>${t.title}</td><td>${t.person||""}</td><td>${t.type}</td><td>${formatCurrency(t.amount,t.currency)}</td><td>${t.category||""}</td></tr>`).join("");
 const debtRows=debts.map(d=>`<tr><td>${d.date}</td><td>${d.person}</td><td>${d.direction==="receivable"?"لي":"عليّ"}</td><td>${formatCurrency(d.originalAmount,d.currency)}</td></tr>`).join("");
 win.document.write(`<html dir="rtl"><head><meta charset="utf-8"><title>Z.Money Report</title><style>body{font-family:Arial;padding:28px;color:#172033}h1{margin-bottom:4px}p{color:#667085}table{width:100%;border-collapse:collapse;margin:18px 0}th,td{border:1px solid #ddd;padding:7px;text-align:right;font-size:12px}th{background:#f2f4f7}.page{page-break-after:always}@media print{button{display:none}}</style></head><body><h1>Z.Money</h1><p>التقرير المالي الشامل — ${new Date().toLocaleDateString("ar")}</p><h2>العمليات</h2><table><thead><tr><th>التاريخ</th><th>الاسم</th><th>الشخص</th><th>النوع</th><th>المبلغ</th><th>التصنيف</th></tr></thead><tbody>${rows}</tbody></table><h2>الديون</h2><table><thead><tr><th>التاريخ</th><th>الشخص</th><th>النوع</th><th>المبلغ</th></tr></thead><tbody>${debtRows}</tbody></table><p>يمكن اختيار "حفظ كـ PDF" من نافذة الطباعة.</p><script>setTimeout(()=>window.print(),400)</script></body></html>`);
 win.document.close();
}
function downloadBlob(data:string,type:string,name:string){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
