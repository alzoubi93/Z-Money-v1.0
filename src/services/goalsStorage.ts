import type {SavingsGoal,AlertSettings} from "../models/goals";
import {DEFAULT_ALERTS} from "../models/goals";
const GK="zmoney.goals.v1",AK="zmoney.alerts.v1";
const read=<T,>(k:string,d:T):T=>{const x=localStorage.getItem(k);return x?JSON.parse(x):d};
export async function loadGoals(){return read<SavingsGoal[]>(GK,[])}
export async function saveGoals(v:SavingsGoal[]){localStorage.setItem(GK,JSON.stringify(v))}
export async function loadAlerts(){return read<AlertSettings>(AK,DEFAULT_ALERTS)}
export async function saveAlerts(v:AlertSettings){localStorage.setItem(AK,JSON.stringify(v))}
