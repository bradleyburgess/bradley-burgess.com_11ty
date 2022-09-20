import CartButton from "./lib/cartButton";

(async () => {
  document.addEventListener("DOMContentLoaded", async () => {
    // PhotoSwipe
    const { default: PhotoSwipeLightbox } = await import(
      "photoswipe/dist/photoswipe-lightbox.esm.min.js"
    );
    await import("photoswipe/dist/photoswipe.css");
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".gallery",
      children: ".image a",
      pswpModule: () => import("photoswipe"),
      bgClickAction: "close",
    });
    lightbox.init();
  });

  // CartButton
  if (window.customElements) window.customElements.define("cart-button", CartButton);
})();
