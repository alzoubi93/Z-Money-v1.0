import type {Budget,Category} from "../models/budget";
const CK="zmoney.categories.v1",BK="zmoney.budgets.v1";
const read=<T,>(k:string,d:T):T=>{const x=localStorage.getItem(k);return x?JSON.parse(x):d};
export async function loadCategories(){return read<Category[]>(CK,[])}
export async function saveCategories(v:Category[]){localStorage.setItem(CK,JSON.stringify(v))}
export async function loadBudgets(){return read<Budget[]>(BK,[])}
export async function saveBudgets(v:Budget[]){localStorage.setItem(BK,JSON.stringify(v))}
