const SERVER_URL =
  process.env.NODE_ENV === "production" ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;
const CHECKOUT_ENDPOINT = `${SERVER_URL.replace(/\/$/, "")}/api/checkout`;

class ShoppingCart extends HTMLElement {
  constructor() {
    super();
  }

  async _init() {
    const response = await fetch("/assets/js/products.json");
    const json = await response.json();
    this.products = json;
    this.cart = JSON.parse(localStorage.getItem("cart"));
  }

  render(cart) {
    cart = cart || this.cart;
    if (!cart.length) {
      this.innerHTML = `<p class="fs-600">Wow, so much empty!</p>
      <p>It seems you don't have anything in your cart. Would you like to 
      <a href="/shop/">go to the shop </a> and rectify that?</p>`;
      return;
    }

    const products = this.products;
    const items = [];
    cart.forEach((cartItem) => {
      const foundProduct = products.find((item) => item.id === cartItem);
      const { name, url, id } = foundProduct;
      const { currency, unit_amount } = foundProduct.default_price;
      items.push(
        `<li>
           <div><a href="${new URL(url).pathname}" class="fs-500 ff-alternate">${name}</a></div>
          <div class="flex-align-center gap-500">
            <span>${new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency.toUpperCase(),
            }).format(unit_amount / 100)}</span>
            <button class="button secondary fs-200" data-id="${id}">remove</button>
          </div>
        </li>`
      );
    });

    const totalCentsPrice = products
      .filter((product) => cart.includes(product.id))
      .map((product) => product.default_price.unit_amount)
      .reduce((a, c) => a + c);

    const totalPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalCentsPrice / 100);

    const lineItems = cart.map(
      (item) => this.products.find((product) => product.id === item).default_price.id
    );

    this.innerHTML = `
      <div class="cart__wrapper">
      <ul role="list" class="flow" id="cart-list">${items.join("\n")}</ul>
      </div>
      <div class="button__container mt">
          <div class="cart__total fs-600">
          <span id="cart-number-items">${cart.length}</span> ${
      cart.length === 1 ? "item" : "items"
    } total: ${totalPrice}
        </div>
          <form action="${CHECKOUT_ENDPOINT}" method="post">
              <input type="hidden" name="cart_items" value="${lineItems.join(",")}" />
              <button type="submit" class="button primary">proceed to checkout</button>
          </form>
          <button class="button secondary" id="clear-cart">clear cart</button>
      </div>`;

    const removeButtons = document.querySelectorAll("#cart-list button");
    Array.prototype.forEach.call(removeButtons, (el) => {
      el.addEventListener("click", (e) => {
        const newCart = this.cart.filter((item) => item !== e.target.dataset.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.cart = newCart;
        this.render(newCart);
      });
    });
    if (this.cart.length) {
      const clearButton = document.getElementById("clear-cart");
      clearButton.addEventListener("click", () => {
        localStorage.setItem("cart", JSON.stringify([]));
        this.cart = [];
        this.render([]);
      });
    }
  }

  async connectedCallback() {
    const render = this.render.bind(this);
    await this._init();
    render();
  }
}

module.exports = ShoppingCart;
