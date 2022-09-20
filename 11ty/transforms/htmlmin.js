const debug = require("debug")("Eleventy-htmlmin");
const { minify } = require("html-minifier");

const htmlminOptions = {
  useShortDoctype: true,
  removeComment: true,
  collapseWhitespace: true,
  minifyCSS: true,
};

module.exports = function (content, outputPath) {
  outputPath = outputPath ?? this.outputPath;
  if (process.env.NODE_ENV !== "production") return content;
  if (!outputPath || !outputPath.endsWith(".html")) return content;
  debug("minifying html for ", outputPath);
  const minified = minify(content, htmlminOptions);
  debug("finished minifying; returning");
  return minified;
};
