require("dotenv").config();
const Stripe = require("stripe");
const fs = require("fs");
const path = require("path");

const { NODE_ENV, STRIPE_KEY, STRIPE_KEY_TEST } = process.env;

const apiKey = NODE_ENV === "production" ? STRIPE_KEY : STRIPE_KEY_TEST;

const stripe = Stripe(apiKey);

async function getStripeData() {
  const { data } = await stripe.products.list({ limit: 100 });

  // Filter out all Stripe-created products
  const _rawProducts =
    NODE_ENV === "production" ? data : data.filter((item) => item.name !== "myproduct");

  const rawProducts = await Promise.all(
    _rawProducts.map(async (product) => {
      const default_price = await stripe.prices.retrieve(product["default_price"]);
      product["default_price"] = default_price;
      if (product.metadata.meta) {
        const { meta } = product.metadata;
        const metaObj = JSON.parse(meta);
        product.metadata.meta = metaObj;
        product.metadata.metaList = Object.keys(metaObj).map((item) => ({
          key: item,
          value: metaObj[item],
        }));
      }
      return product;
    })
  );

  // Split the products into two categories
  const allScores = rawProducts.filter((product) => product.metadata.category === "score");
  const hymns = allScores.filter((score) => score.metadata.genre === "hymn setting");
  const otherScores = allScores.filter((score) => score.metadata.genre !== "hymn setting");
  const otherProducts = rawProducts.filter((product) => product.metadata.category !== "score");

  const products = {
    all: rawProducts,
    scores: { hymns, other: otherScores, all: allScores },
    other: otherProducts,
  };

  // Write to JSON for frontend
  const dataToSend = products.all.map((product) => ({
    id: product.id,
    name: product.name,
    default_price: {
      id: product.default_price.id,
      unit_amount: product.default_price.unit_amount,
      currency: product.default_price.currency,
    },
    url: product.url,
  }));
  const jsonData = JSON.stringify(dataToSend);
  fs.writeFileSync(
    path.join(__dirname, "..", "..", "dist", "assets", "js", "products.json"),
    jsonData,
    "utf-8"
  );

  return products;
}

module.exports = getStripeData;
