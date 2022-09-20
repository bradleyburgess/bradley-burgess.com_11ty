const path = require("path");
const Image = require("@11ty/eleventy-img");
const dir = require("../constants/dir");
const sanitizeAltText = require("../helpers/sanitizeHtmlAttr");
const checkRemoteSrc = require("../helpers/checkRemoteSrc");

const defaults = {
  formats: ["webp", "jpg"],
  loading: "lazy",
  sizes: ["100vw"],
  widths: [600, 900, 1200, 1800, 2400, 4200],
  galleryImg: false,
};

module.exports = async function (src, alt, options) {
  options = { ...defaults, ...(options ?? {}) };
  const { widths, formats, loading, sizes } = options;
  const outputPath = this.outputPath ?? this.page?.outputPath ?? options.outputPath ?? null;

  if (alt === undefined) {
    console.error(`\x1b[31mMissing alt for ${src}${outputPath && ` in ${outputPath}`}`);
    process.exit(1);
  }

  const isRemoteSrc = checkRemoteSrc(src);

  const imgDir = "/assets/img";
  const fullyQualifiedSrc = isRemoteSrc
    ? src
    : path.join(dir.input, "img", path.parse(src).dir, path.parse(src).base);
  const outputDir = path.join(dir.output, "assets", "img");

  console.log(`Transforming image: ${src}${outputPath && ` in ${outputPath}`}`);

  const metadata = await Image(fullyQualifiedSrc, {
    widths,
    formats,
    outputDir,
    urlPath: imgDir,
  });

  const imageAttributes = {
    alt: sanitizeAltText(alt),
    sizes,
    loading,
    decoding: "async",
  };
  if (options.title) imageAttributes.title = options.title;
  if (options.fetchpriority) imageAttributes.fetchpriority = options.fetchpriority;
  if (options.id) imageAttributes.id = options.id;
  if (options.class) imageAttributes.class = options.class;

  const generatedHTML = Image.generateHTML(metadata, imageAttributes);

  if (options.galleryImg) {
    const link = metadata.jpeg.reverse()[1].url;
    return `<a href="${link}" data-pswp-width="850" data-pswp-height="1100">${generatedHTML}</a>`;
  }

  return generatedHTML;
};
