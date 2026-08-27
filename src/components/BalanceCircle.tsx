import type {Balance,Currency,ExchangeRates} from "../models/finance";
import {formatMoney,totalInCurrency} from "../calculations/finance";
interface Props{currency:Currency;balance:Balance;rates:ExchangeRates;onCurrencyChange:(c:Currency)=>void}
export function BalanceCircle({currency,balance,rates,onCurrencyChange}:Props){
 const cs:Currency[]=["USD","SYP","EUR"],i=cs.indexOf(currency);
 const symbols:Record<Currency,string>={SYP:"ل.س",USD:"$",EUR:"€"};
 return <button className="balance-circle" onClick={()=>onCurrencyChange(cs[(i+1)%3])}>
  <span className="balance-label">الرصيد الإجمالي</span>
  <strong className="balance-value">{symbols[currency]} {formatMoney(totalInCurrency(balance,currency,rates))}</strong>
  <span className="balance-currency">اضغط للتبديل · {currency}</span>
 </button>
}