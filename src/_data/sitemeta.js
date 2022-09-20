const eleventyPkgJson = require("@11ty/eleventy/package.json");

module.exports = {
  title: "Bradley Burgess | musician & developer",
  description:
    "Bradley Burgess is a South African-born musician and web developer. #bach #beethoven #ethicalweb",
  twitter: "bburgess_keys",
  url: "https://bradley-burgess.com",
  favicon: "./src/img/favicon.ico",
  generator: `Eleventy v${eleventyPkgJson.version}`,
  ogImg: "bradley/bradley-brick.jpg",
  ogAlt: "Close up of Bradley, half-smiling, sitting in front of an open brick wall",
};
