// TODO: Add `caseInsensitive`
const findFilter = (array, key, value) =>
  array.find((elem) => elem[key].toLowerCase() === value.toLowerCase());

module.exports = findFilter;
