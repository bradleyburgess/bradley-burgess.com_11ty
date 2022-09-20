import ShoppingCart from "./lib/shoppingCart";

(() => {
  if (window.customElements) {
    window.customElements.define("shopping-cart", ShoppingCart);
  }
})();
