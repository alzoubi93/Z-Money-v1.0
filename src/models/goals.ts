import type {Currency} from "./finance";
export interface SavingsGoal{
 id:string; name:string; target:number; saved:number; currency:Currency; deadline?:string; createdAt:string;
}
export interface AlertSettings{budget80:boolean;budget100:boolean;debtDue:boolean;monthlySummary:boolean}
export const DEFAULT_ALERTS:AlertSettings={budget80:true,budget100:true,debtDue:true,monthlySummary:true};
