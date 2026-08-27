import type {Debt,DebtPayment} from "../models/finance";
export function paidForDebt(debtId:string,payments:DebtPayment[]){return payments.filter(p=>p.debtId===debtId).reduce((s,p)=>s+p.amount,0)}
export function remainingForDebt(d:Debt,payments:DebtPayment[]){return Math.max(0,d.originalAmount-paidForDebt(d.id,payments))}
export function isSettled(d:Debt,payments:DebtPayment[]){return remainingForDebt(d,payments)<=0}
