const ctaLink = (input) =>
  input
    .split(" ")
    .map((e, i) => (i === 0 ? `<span>${e}</span>` : e))
    .join(" ");

module.exports = ctaLink;
