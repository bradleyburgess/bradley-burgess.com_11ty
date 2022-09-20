class CartCounter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<a href="/shop/cart/">
                    <div class="flex-align-center gap-300 cart__container">
                        <span class="icon flat cart fs-900 cart__icon" aria-label="Cart:"></span>
                        <span class="fs-600 | cart__counter"></span>
                    </div>
                </a>`;
  }

  connectedCallback() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    this.count = cart.length;
    this.counter = this.querySelector(".cart__counter");
    this.counter.textContent = this.count;
  }
}

module.exports = CartCounter;
