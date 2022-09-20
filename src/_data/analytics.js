require("dotenv").config();

if (process.env.ANALYTICS_IMGSRC == undefined || process.env.ANALYTICS_SCRIPTSRC == undefined)
  console.log("Analytics variables not set; disabling.");

const ANALYTICS_IMGSRC = process.env.ANALYTICS_IMGSRC ?? "";
const ANALYTICS_SCRIPTSRC = process.env.ANALYTICS_SCRIPTSRC ?? "";

module.exports = () => ({
  enabled: process.env.ANALYTICS_IMGSRC && process.env.ANALYTICS_SCRIPTSRC ? true : false,
  imgSrc: ANALYTICS_IMGSRC,
  scriptSrc: ANALYTICS_SCRIPTSRC,
});
