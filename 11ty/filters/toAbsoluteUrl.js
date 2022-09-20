const sitemeta = require("../../src/_data/sitemeta");

module.exports = function (url) {
  const siteUrl = sitemeta.url.replace(/\/$/, "");
  const relUrl = url.replace(/^\//, "");
  return `${siteUrl}/${relUrl}`;
};
