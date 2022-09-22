const dir = require("./11ty/constants/dir");
const yaml = require("js-yaml");
const toml = require("toml");

const audioToJsonScript = require("./11ty/scripts/audioToJson");
const brokenLinks = require("eleventy-plugin-broken-links");
const createPlaylistShortcode = require("./11ty/shortcodes/createPlaylist");
const ctaLinkFilter = require("./11ty/filters/ctaLink");
const faviconPlugin = require("eleventy-plugin-gen-favicons");
const filterByKeyFilter = require("./11ty/filters/filterByKey");
const findFilter = require("./11ty/filters/find");
const getFirstFilter = require("./11ty/filters/getFirst");
const htmlminTransform = require("./11ty/transforms/htmlmin");
const imageShortcode = require("./11ty/shortcodes/image");
const jsminFilter = require("./11ty/filters/jsmin");
const makeArrayFilter = require("./11ty/filters/makeArray");
const markdownShortcode = require("./11ty/shortcodes/markdown");
const noProtoFilter = require("./11ty/filters/noProto");
const normalizeDescriptionFilter = require("./11ty/filters/normalizeDescription");
const objectHasFilter = require("./11ty/filters/object-has");
const ogImageShortcode = require("./11ty/shortcodes/ogimage");
const ogMetaShortcode = require("./11ty/shortcodes/ogmeta");
const productPriceFilter = require("./11ty/filters/productPrice");
const sanitizeHtmlAttr = require("./11ty/helpers/sanitizeHtmlAttr");
const toAbsoluteUrlFilter = require("./11ty/filters/toAbsoluteUrl");
const toRelativeUrlFilter = require("./11ty/filters/toRelativeUrl");
const toStarsFilter = require("./11ty/filters/toStars");
const urlToPageFilter = require("./11ty/filters/urlToPage");
const videoToJsonScript = require("./11ty/scripts/videoToJson");
const ytEmbedFilter = require("./11ty/filters/ytEmbed");
const ytUrlFilter = require("./11ty/filters/ytUrl");

module.exports = function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", videoToJsonScript);
  eleventyConfig.on("eleventy.before", audioToJsonScript);
  eleventyConfig.addWatchTarget("./11ty");
  eleventyConfig.addPassthroughCopy({ "static/css": "/assets/css" });
  eleventyConfig.addPassthroughCopy({ "static/fonts": "/assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "static/video": "/assets/video" });
  eleventyConfig.addPassthroughCopy({ "src/img/icons": "/assets/img/icons" });
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("toml", (contents) => toml.parse(contents));

  // filters
  eleventyConfig.addFilter("ctaLink", ctaLinkFilter);
  eleventyConfig.addFilter("find", findFilter);
  eleventyConfig.addFilter("getFirst", getFirstFilter);
  eleventyConfig.addFilter("has", objectHasFilter);
  eleventyConfig.addFilter("jsmin", jsminFilter);
  eleventyConfig.addFilter("makeArray", makeArrayFilter);
  eleventyConfig.addFilter("markdown", markdownShortcode);
  eleventyConfig.addFilter("noProto", noProtoFilter);
  eleventyConfig.addFilter("normalizeDescription", normalizeDescriptionFilter);
  eleventyConfig.addFilter("productPrice", productPriceFilter);
  eleventyConfig.addFilter("sanitizeHtmlAttr", sanitizeHtmlAttr);
  eleventyConfig.addFilter("toAbsoluteUrl", toAbsoluteUrlFilter);
  eleventyConfig.addFilter("toRelativeUrl", toRelativeUrlFilter);
  eleventyConfig.addFilter("urlToPage", urlToPageFilter);
  eleventyConfig.addFilter("ytEmbed", ytEmbedFilter);
  eleventyConfig.addFilter("ytUrl", ytUrlFilter);
  eleventyConfig.addFilter("toStars", toStarsFilter);
  eleventyConfig.addFilter("filterByKey", filterByKeyFilter);
  eleventyConfig.addFilter("otherServices", function (services, service) {
    return services.filter((s) => s.title != service.title);
  });
  eleventyConfig.addFilter("hymnSubtitle", (title) => title.split(": ")[1].trim());

  // shortcodes
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("ogimage", ogImageShortcode);
  eleventyConfig.addNunjucksShortcode("createPlaylist", createPlaylistShortcode);
  eleventyConfig.addNunjucksShortcode("ogmeta", ogMetaShortcode);
  eleventyConfig.addPairedNunjucksShortcode("markdown", markdownShortcode);

  // plugins
  process.NODE_ENV === "production" && eleventyConfig.addPlugin(brokenLinks);
  eleventyConfig.addPlugin(faviconPlugin, {
    outputDir: dir.output,
    generateManifest: false,
  });

  // transforms: prettifying and minifying
  // if (process.env.NODE_ENV === "development")
  //   eleventyConfig.addTransform("prettier", prettierTransform);
  if (process.env.NODE_ENV === "production")
    eleventyConfig.addTransform("htmlmin", htmlminTransform);

  return {
    dir,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
