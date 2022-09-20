// import Playlist from "./lib/playlist";

(() => {
  // asynchronously load the plyr css and the playlist component
  document.addEventListener("DOMContentLoaded", async () => {
    if (window.customElements) {
      const head = document.querySelector("head");
      const plyrCss = document.createElement("link");
      plyrCss.rel = "stylesheet";
      plyrCss.media = "screen";
      plyrCss.href = "/assets/css/plyr-3.7.2.css";
      plyrCss.as = "style";
      head.appendChild(plyrCss);
      const { Playlist } = await import("./lib/playlist");
      window.customElements.define("play-list", Playlist);
    }
  });
})();
