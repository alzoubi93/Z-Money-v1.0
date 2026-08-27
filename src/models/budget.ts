import type {Currency} from "./finance";
export interface Category{ id:string; name:string; icon:string; createdAt:string }
export interface Budget{ id:string; categoryId:string; month:string; amount:number; currency:Currency; createdAt:string }
export const DEFAULT_CATEGORIES:Category[]=[
{id:"food",name:"طعام ومشتريات",icon:"🍎",createdAt:""},
{id:"home",name:"المنزل",icon:"🏠",createdAt:""},
{id:"bills",name:"فواتير",icon:"🧾",createdAt:""},
{id:"transport",name:"مواصلات",icon:"🚗",createdAt:""},
{id:"health",name:"صحة",icon:"❤️",createdAt:""},
{id:"education",name:"تعليم",icon:"📚",createdAt:""},
{id:"entertainment",name:"ترفيه",icon:"🎮",createdAt:""},
{id:"other",name:"أخرى",icon:"📦",createdAt:""}
];