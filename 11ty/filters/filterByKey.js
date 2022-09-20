module.exports = function filterByKey(array, key, values, nestedUnder) {
  values = Array.isArray(values) ? values : [values];
  if (nestedUnder) {
    if (!(typeof nestedUnder === "string")) {
      throw new Error("nestedUnder must be string");
    }
    return array.filter((item) => values.includes(item[key]));
  }
  return array.filter((item) => values.includes(item[key]));
};
