require("dotenv").config();

module.exports = function () {
  const SERVER_URL_PROD = process.env.SERVER_URL_PROD;
  const SERVER_URL_DEV = process.env.SERVER_URL_DEV;
  const SERVER_URL =
    (process.env.NODE_ENV === "production" ? SERVER_URL_PROD : SERVER_URL_DEV) ??
    process.env.SERVER_URL ??
    "";

  const CHECKOUT_ENDPOINT = `${SERVER_URL.replace(/\/$/, "")}/api/checkout`;
  const CONTACT_ENDPOINT = `${SERVER_URL.replace(/\/$/, "")}/api/contact`;

  return {
    checkout: CHECKOUT_ENDPOINT,
    contact: CONTACT_ENDPOINT,
  };
};
