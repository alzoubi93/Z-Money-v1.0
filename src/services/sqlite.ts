import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import type {Debt,DebtPayment,ExchangeRates,Transaction} from "../models/finance";

let connection:SQLiteConnection|undefined;
let db:SQLiteDBConnection|undefined;

const DB_NAME="zmoney";
const isNative=()=>Capacitor.isNativePlatform();

export async function initDatabase(){
 if(!isNative()) return false;
 connection ||= new SQLiteConnection(CapacitorSQLite);
 db ||= await connection.createConnection(DB_NAME,false,"no-encryption",1,false);
 await db.open();
 await db.execute(`CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY, type TEXT NOT NULL, title TEXT NOT NULL, amount REAL NOT NULL,
  currency TEXT NOT NULL, date TEXT NOT NULL, category TEXT, person TEXT, notes TEXT,
  createdAt TEXT NOT NULL, debtId TEXT
 );`);
 await db.execute(`CREATE TABLE IF NOT EXISTS debts (
  id TEXT PRIMARY KEY, direction TEXT NOT NULL, person TEXT NOT NULL, originalAmount REAL NOT NULL,
  currency TEXT NOT NULL, date TEXT NOT NULL, dueDate TEXT, notes TEXT, createdAt TEXT NOT NULL
 );`);
 await db.execute(`CREATE TABLE IF NOT EXISTS debt_payments (
  id TEXT PRIMARY KEY, debtId TEXT NOT NULL, amount REAL NOT NULL, date TEXT NOT NULL,
  notes TEXT, createdAt TEXT NOT NULL
 );`);
 await db.execute(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);`);
 return true;
}
async function ensure(){if(!db) await initDatabase(); return db}
export async function sqliteLoadTransactions():Promise<Transaction[]>{
 const d=await ensure(); if(!d)return [];
 const r=await d.query("SELECT * FROM transactions ORDER BY createdAt DESC"); return (r.values||[]) as Transaction[];
}
export async function sqliteSaveTransactions(v:Transaction[]){
 const d=await ensure(); if(!d)return;
 await d.execute("DELETE FROM transactions");
 for(const t of v) await d.run("INSERT INTO transactions VALUES (?,?,?,?,?,?,?,?,?,?,?)",[t.id,t.type,t.title,t.amount,t.currency,t.date,t.category??null,t.person??null,t.notes??null,t.createdAt,t.debtId??null]);
}
export async function sqliteLoadDebts():Promise<Debt[]>{const d=await ensure();if(!d)return [];const r=await d.query("SELECT * FROM debts");return(r.values||[]) as Debt[]}
export async function sqliteSaveDebts(v:Debt[]){const d=await ensure();if(!d)return;await d.execute("DELETE FROM debts");for(const x of v)await d.run("INSERT INTO debts VALUES (?,?,?,?,?,?,?,?,?)",[x.id,x.direction,x.person,x.originalAmount,x.currency,x.date,x.dueDate??null,x.notes??null,x.createdAt])}
export async function sqliteLoadPayments():Promise<DebtPayment[]>{const d=await ensure();if(!d)return [];const r=await d.query("SELECT * FROM debt_payments");return(r.values||[]) as DebtPayment[]}
export async function sqliteSavePayments(v:DebtPayment[]){const d=await ensure();if(!d)return;await d.execute("DELETE FROM debt_payments");for(const x of v)await d.run("INSERT INTO debt_payments VALUES (?,?,?,?,?,?)",[x.id,x.debtId,x.amount,x.date,x.notes??null,x.createdAt])}
export async function sqliteLoadRates():Promise<ExchangeRates|undefined>{const d=await ensure();if(!d)return;const r=await d.query("SELECT value FROM settings WHERE key='rates'");return r.values?.[0]?JSON.parse(r.values[0].value):undefined}
export async function sqliteSaveRates(v:ExchangeRates){const d=await ensure();if(!d)return;await d.run("INSERT OR REPLACE INTO settings(key,value) VALUES(?,?)",["rates",JSON.stringify(v)])}
