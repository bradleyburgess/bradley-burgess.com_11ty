module.exports = (url) => new URL(url).pathname.replace(/\/$/, "") + "/";
