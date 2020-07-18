import {CURRENCIES} from '../config';

export const convertCurrency = (value, currency) => {
    let result = value * CURRENCIES[currency];
    if(!value) return;
    return result.toFixed(2) + currency;
}