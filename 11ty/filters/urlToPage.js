const urlToPage = (url) => (url === "/" ? "home" : url.split("/")[1]);

module.exports = urlToPage;
