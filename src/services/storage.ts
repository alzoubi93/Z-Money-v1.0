import {Capacitor} from "@capacitor/core";
import type {Debt,DebtPayment,ExchangeRates,Transaction} from "../models/finance";
import {sqliteLoadTransactions,sqliteSaveTransactions,sqliteLoadDebts,sqliteSaveDebts,sqliteLoadPayments,sqliteSavePayments,sqliteLoadRates,sqliteSaveRates,initDatabase} from "./sqlite";
const TX_KEY="zmoney.transactions.v1",RATES_KEY="zmoney.rates.v1",DEBT_KEY="zmoney.debts.v1",PAY_KEY="zmoney.debtpayments.v1";
const native=()=>Capacitor.isNativePlatform();
const read=<T,>(k:string,d:T):T=>{const raw=localStorage.getItem(k);return raw?JSON.parse(raw):d};
export async function initializeStorage(){if(native())await initDatabase()}
export async function loadTransactions():Promise<Transaction[]>{if(native())return sqliteLoadTransactions();return read(TX_KEY,[])}
export async function saveTransactions(v:Transaction[]){if(native()){await sqliteSaveTransactions(v);return}localStorage.setItem(TX_KEY,JSON.stringify(v))}
export async function loadRates():Promise<ExchangeRates>{if(native())return(await sqliteLoadRates())||{USD_SYP:15000,EUR_SYP:17500};return read(RATES_KEY,{USD_SYP:15000,EUR_SYP:17500})}
export async function saveRates(v:ExchangeRates){if(native()){await sqliteSaveRates(v);return}localStorage.setItem(RATES_KEY,JSON.stringify(v))}
export async function loadDebts():Promise<Debt[]>{if(native())return sqliteLoadDebts();return read<Debt[]>(DEBT_KEY,[])}
export async function saveDebts(v:Debt[]){if(native()){await sqliteSaveDebts(v);return}localStorage.setItem(DEBT_KEY,JSON.stringify(v))}
export async function loadDebtPayments():Promise<DebtPayment[]>{if(native())return sqliteLoadPayments();return read<DebtPayment[]>(PAY_KEY,[])}
export async function saveDebtPayments(v:DebtPayment[]){if(native()){await sqliteSavePayments(v);return}localStorage.setItem(PAY_KEY,JSON.stringify(v))}
