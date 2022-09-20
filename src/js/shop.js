import CartCounter from "./lib/cartCounter";

(() => {
  if (window.customElements) {
    window.customElements.define("cart-counter", CartCounter);
  }
})();
