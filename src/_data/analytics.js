require("dotenv").config();

const ANALYTICS_IMGSRC = process.env.ANALYTICS_IMGSRC ?? "";
const ANALYTICS_SCRIPTSRC = process.env.ANALYTICS_SCRIPTSRC ?? "";
const { ANALYTICS_DISABLED } = process.env;

if (!ANALYTICS_DISABLED && !(ANALYTICS_IMGSRC || ANALYTICS_SCRIPTSRC))
  throw new Error("Analytics vars not set!");

module.exports = () => ({
  enabled: !process.env.ANALYTICS_DISABLED === "true",
  imgSrc: ANALYTICS_IMGSRC,
  scriptSrc: ANALYTICS_SCRIPTSRC,
});
