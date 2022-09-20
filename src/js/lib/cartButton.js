class CartButton extends HTMLElement {
  constructor() {
    super();
    this.productId = this.getAttribute("product-id");
    this.button = this.querySelector("button");
    this.buttonText = this.querySelector(".button-text");
    this.button.removeAttribute("disabled");
  }

  checkCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart.includes(this.productId);
  }

  changeButtonText(value) {
    this.buttonText.innerText = value === "add" ? "add to cart" : "remove";
  }

  handleClick() {
    const isInCart = this.isInCart;
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!Array.isArray(cart)) cart = [cart];

    if (isInCart) {
      cart = cart.filter((item) => item != this.productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      this.isInCart = false;
      this.changeButtonText("add");
    } else {
      cart.push(this.productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      this.isInCart = true;
      this.changeButtonText("remove");
    }
  }

  connectedCallback() {
    const button = this.button;
    const handleClick = this.handleClick.bind(this);

    const isInCart = this.checkCart();
    if (isInCart) {
      this.isInCart = true;
      this.changeButtonText("remove");
    } else {
      this.isInCart = false;
      this.changeButtonText("add");
    }

    button.addEventListener("click", handleClick);
  }
}

module.exports = CartButton;
