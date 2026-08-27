import type {Balance,Currency,ExchangeRates} from "../models/finance";
import {formatCurrency,formatMoney,fromSyp} from "../calculations/finance";
interface Props{balance:Balance;rates:ExchangeRates}
export function AssetCards({balance,rates}:Props){
 const items:[Currency,string][]=[["SYP","الليرة السورية"],["USD","الدولار الأمريكي"],["EUR","اليورو"]];
 return <div className="asset-grid">{items.map(([c,label])=><div className="asset-card" key={c}><span>{label}</span><strong>{formatCurrency(balance[c],c)}</strong><small>≈ {formatMoney(fromSyp(balance[c]*(c==="SYP"?1:c==="USD"?rates.USD_SYP:rates.EUR_SYP),"USD",rates))} $</small></div>)}</div>
}