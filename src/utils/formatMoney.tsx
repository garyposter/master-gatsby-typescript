import Dinero from "dinero.js";

export default function formatMoney(price: number): string | undefined {
  let formatted: string | undefined;
  if (price !== NaN) {
    formatted = Dinero({
      amount: price,
      currency: "USD",
    })
      .setLocale("en-US")
      .toFormat();
  }
  return formatted;
}
