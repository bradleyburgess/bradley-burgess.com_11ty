const noProto = (url) => new URL(url).host;

module.exports = noProto;
