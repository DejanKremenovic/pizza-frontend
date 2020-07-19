import { CURRENCIES } from "../config";

/*
    Convert currency based on default currency and Exchange rate from config
*/
export const convertCurrency = (value, currency) => {
  let result = value * CURRENCIES[currency];
  if (!value) return;
  return result.toFixed(2) + currency;
};

/*
  Display first error as string from standard Laravel error bag
*/
export const getFirstError = (response) => {
  let errors = response.response.data.errors;
  return errors[Object.keys(errors)[0]];
};
