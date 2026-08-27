export type Currency="SYP"|"USD"|"EUR";
export type TransactionType="income"|"expense"|"debt_receivable"|"debt_payable"|"debt_payment_receivable"|"debt_payment_payable"|"transfer";
export interface Transaction {
 id:string; type:TransactionType; title:string; amount:number; currency:Currency; date:string;
 category?:string; person?:string; notes?:string; createdAt:string; debtId?:string; memberId?:string;
}
export interface Debt {
 id:string; direction:"receivable"|"payable"; person:string; originalAmount:number; currency:Currency;
 date:string; dueDate?:string; notes?:string; createdAt:string;
}
export interface DebtPayment {
 id:string; debtId:string; amount:number; date:string; notes?:string; createdAt:string;
}
export interface Balance {SYP:number;USD:number;EUR:number;}
export interface ExchangeRates {USD_SYP:number;EUR_SYP:number;}
export const DEFAULT_RATES:ExchangeRates={USD_SYP:15000,EUR_SYP:17500};