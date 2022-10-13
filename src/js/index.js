import BurgerMenu from "./lib/burger-menu";
import "firetower-scores/dist/fts.min.js";

// Load hamburger menu
if ("customElements" in window) {
  customElements.define("burger-menu", BurgerMenu);
}

// Disable link to the current page
const headerLinks = document.querySelectorAll(".site-head a");
Array.prototype.forEach.call(headerLinks, (el) => {
  el.addEventListener("click", (e) => {
    const hrefPathname = new URL(e.currentTarget.href).pathname;
    if (hrefPathname === window.location.pathname) e.preventDefault();
  });
});

// Make cards clickable
const cards = document.querySelectorAll("[data-card]");
Array.prototype.forEach.call(cards, (elem) => {
  if (elem.hasAttribute("data-url")) {
    elem.addEventListener("click", () => window.location.assign(elem.getAttribute("data-url")));
  }
});

// GIF Video element play/pause
// toggle on click or enter/space
function handleVideoClick(elem) {
  if (elem.paused) return elem.play();
  elem.pause();
}
const videoElems = document.querySelectorAll("video");
if (videoElems) {
  Array.prototype.forEach.call(videoElems, (elem) => {
    if (elem.dataset.gif) elem.removeAttribute("controls");
    elem.tabIndex = "0";
    elem.addEventListener("click", (e) => {
      handleVideoClick(e.target);
    });
    elem.addEventListener("keypress", (e) => {
      if ([13, 32].includes(e.keyCode)) handleVideoClick(e.target);
    });
  });
}

// Upgrade HTML5 audio to plyr
const audioElems = document.querySelectorAll("audio[data-plyraudio]");
if (audioElems.length) {
  (async () => {
    const plyrCss = document.createElement("link");
    plyrCss.rel = "stylesheet";
    plyrCss.media = "screen";
    plyrCss.href = "/assets/css/plyr-3.7.2.css";
    document.querySelector("head").appendChild(plyrCss);
    const Plyr = await import("plyr");
    Array.prototype.forEach.call(audioElems, (elem) => {
      const player = new Plyr(elem, { settings: [] });
      if (!window.players) window.players = [];
      window.players.push(player);
      player.on("play", () => {
        const otherPlayers = window.players.filter((i) => i != player);
        Array.prototype.forEach.call(otherPlayers, (elem) => elem.pause());
      });
    });
  })();
}

// Check if cart is valid JSON
const cart = localStorage.getItem("cart");
if (!cart) localStorage.setItem("cart", JSON.stringify([]));
try {
  JSON.parse(cart);
} catch (error) {
  localStorage.setItem("cart", JSON.stringify([]));
}
