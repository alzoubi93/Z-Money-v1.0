import type {Balance,Currency,ExchangeRates,Transaction} from "../models/finance";
export function toSyp(amount:number,currency:Currency,r:ExchangeRates){
 return currency==="SYP"?amount:currency==="USD"?amount*r.USD_SYP:amount*r.EUR_SYP;
}
export function fromSyp(amount:number,currency:Currency,r:ExchangeRates){
 return currency==="SYP"?amount:currency==="USD"?amount/r.USD_SYP:amount/r.EUR_SYP;
}
export function calculateBalances(tx:Transaction[]):Balance{
 const b:Balance={SYP:0,USD:0,EUR:0};
 for(const t of tx){
  if(t.type==="income"||t.type==="debt_receivable"||t.type==="debt_payment_receivable") b[t.currency]+=t.amount;
  if(t.type==="expense"||t.type==="debt_payable"||t.type==="debt_payment_payable") b[t.currency]-=t.amount;
 }
 return b;
}
export function totalInCurrency(b:Balance,target:Currency,r:ExchangeRates){
 return fromSyp(b.SYP,target,r)+fromSyp(b.USD*r.USD_SYP,target,r)+fromSyp(b.EUR*r.EUR_SYP,target,r);
}
export function formatMoney(n:number){return new Intl.NumberFormat("en-US",{maximumFractionDigits:2}).format(n);}
export function formatCurrency(amount:number,currency:Currency){
 const s:Record<Currency,string>={SYP:"ل.س",USD:"$",EUR:"€"};
 return `${formatMoney(amount)} ${s[currency]}`;
}
export function sumByCurrency(tx:Transaction[],types:Transaction["type"][]):Balance{
 const b:Balance={SYP:0,USD:0,EUR:0};
 for(const t of tx)if(types.includes(t.type))b[t.currency]+=t.amount;
 return b;
}