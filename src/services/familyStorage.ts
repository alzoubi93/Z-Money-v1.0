import type {FamilyMember} from "../models/family";
const KEY="zmoney.family.members.v1";
export async function loadMembers():Promise<FamilyMember[]>{
 const raw=localStorage.getItem(KEY); return raw?JSON.parse(raw):[];
}
export async function saveMembers(v:FamilyMember[]){localStorage.setItem(KEY,JSON.stringify(v))}
