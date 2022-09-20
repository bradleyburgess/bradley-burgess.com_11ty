const localeMap = {
  usd: "en-US",
  zar: "en-ZA",
};

module.exports = function (price) {
  const { currency, unit_amount } = price;
  return new Intl.NumberFormat(localeMap[currency], {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(unit_amount / 100);
};
