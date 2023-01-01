import ytEmbed from "../../../11ty/filters/ytEmbed";
import createList from "../../../11ty/shortcodes/createPlaylist";
// import Plyr from "plyr";

class Playlist extends HTMLElement {
  constructor() {
    super();

    // must set type
    if (!["youtube", "audio"].includes(this.getAttribute("type")))
      throw new Error("Must supply a type to component");

    this.root = this.querySelector(".playlist");
    this.type = this.getAttribute("type");
    this.currentTrack = null;
  }

  async getTracks() {
    const URL = `/assets/js/${this.type}Tracks.json?ver=${Date.now()}`;
    try {
      const response = await fetch(URL);
      const { tracks } = await response.json();
      this.tracks = tracks;
      this.currentTrack = tracks[0].id;
    } catch (error) {
      throw new Error("Could not fetch tracks");
    }
  }

  createNowPlaying() {
    const root = this.querySelector(".playlist__now-playing");
    const currentTrack = this.tracks.find((track) => track.id === this.currentTrack);

    // mobile version: details
    if (this.size === "mobile") {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      const note = document.createElement("div");
      note.classList.add("playlist__note");
      note.innerHTML = currentTrack.notes;
      summary.innerHTML = `<h3>Now Playing</h3>`;
      details.append(summary);
      details.append(note);
      root.innerHTML = "";
      root.append(details);
    }

    // desktop version: plain div
    if (this.size === "desktop") {
      root.innerHTML = `<h3>Now Playing</h3><div class="playlist__note">${currentTrack.notes}</div>`;
    }
  }

  formatList() {
    const composers = this.querySelectorAll(".playlist__composer");
    const titles = this.querySelectorAll(".playlist__title");
    const tags = this.querySelectorAll(".playlist__tags");

    [composers, titles, tags].forEach((item) => {
      const elemArray = Array.from(item);
      const longest = elemArray.map((elem) => elem.offsetWidth).reduce((a, c) => (c > a ? c : a));
      elemArray.forEach((elem) => {
        elem.style.width = `${(longest + 20) / 16}rem`;
      });
    });
  }

  renderPlaylist() {
    // apply the correct class
    if (this.size === "mobile") {
      this.root.classList.remove("desktop");
      this.root.classList.add("mobile");
    }
    if (this.size === "desktop") {
      this.root.classList.remove("mobile");
      this.root.classList.add("desktop");
    }

    // create empty "Now Playing" div with populated playlist
    this.root.innerHTML = `<div class="flow | playlist__now-playing"></div>${createList(
      this.tracks,
      this.type
    )}`;

    // create the actual "Now Playing" content
    this.createNowPlaying();

    this.setSelected();

    // format the list
    this.formatList();
  }

  async initPlayer() {
    const Plyr = await import("plyr");
    const mediaContainer = document.createElement("div");
    mediaContainer.classList.add("media-container", this.type);
    let player;

    if (this.type === "youtube") {
      mediaContainer.innerHTML = `<div class="media-player">
  <div class="plyr__video-embed" id="youtube-player">
    <iframe width="560" 
            height="315" 
            src="${ytEmbed(this.currentTrack)}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>
  </div>
</div>`;
      this.root.parentNode.insertBefore(mediaContainer, this.root);
      player = new Plyr("#youtube-player", { settings: ["quality"] });
      player.on("enterfullscreen", () => {
        if (window.navigator) {
          screen.orientation.lock("landscape");
        }
      });
      player.on("exitfullscreen", () => {
        screen.orientation.unlock();
      });
    }

    if (this.type === "audio") {
      mediaContainer.innerHTML = `<div class="media-player">
      <audio playsinline crossorigin id="audio-player">
        <source src="${this.tracks[0].src}" type="audio/mp3">
      </audio>
</div>`;
      this.root.parentNode.insertBefore(mediaContainer, this.root);
      player = new Plyr("#audio-player", {
        settings: ["quality"],
        controls: ["play", "rewind", "fast-forward", "progress", "current-time", "mute", "volume"],
      });
    }

    if (!window.players) window.players = [];
    window.players.push(player);

    this.player = player;

    // make sure only one player running at a time
    this.player.on("play", () => {
      const otherPlayers = window.players.filter((plyr) => plyr != this.player);
      otherPlayers.forEach((player) => player.pause());
    });
  }

  setSelected() {
    const prevAnchor = this.querySelector(`[aria-label="selected"]`);
    if (prevAnchor) prevAnchor.removeAttribute("aria-label");
    const currentAnchor = this.querySelector(`[data-id="${this.currentTrack}"]`);
    currentAnchor.setAttribute("aria-label", "selected");
  }

  handleResize(entries) {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        // handle difference in API with Firefox
        const contentBoxSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize;
        const { inlineSize } = contentBoxSize;

        // if there's a size set:
        // check to see if we need to render, and apply correct size
        if (this.size) {
          if (inlineSize < 1300 && this.size === "desktop") {
            this.size = "mobile";
            this.renderPlaylist();
          }
          if (inlineSize >= 1300 && this.size === "mobile") {
            this.size = "desktop";
            this.renderPlaylist();
          }
          return;
        }

        // if there's no size set yet:
        // set it and render
        this.size = inlineSize < 1300 ? "mobile" : "desktop";
        this.renderPlaylist();
      }
    }
  }

  handleAnchorClick(e) {
    const path = e.path ?? (e.composedPath && e.composedPath());
    const anchor = path.find((elem) => elem.tagName === "A");

    if (!anchor) return;
    e.preventDefault();
    if (this.currentTrack === anchor.dataset.id) return;

    // update
    const newId = anchor.dataset.id;
    this.currentTrack = newId;
    const newSource = {
      type: this.type === "youtube" ? "video" : "audio",
      sources: [],
    };
    const _source = {};
    if (this.type === "youtube") {
      _source.src = newId;
      _source.provider = "youtube";
    }
    if (this.type === "audio") {
      _source.src = this.tracks.find((track) => track.id === newId).src;
      _source.type = "audio/mp3";
    }
    newSource.sources.push(_source);
    this.player.source = newSource;

    this.player.once("ready", this.player.play);
    this.createNowPlaying();
    this.setSelected();
  }

  handleObserver(entries, observer) {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        this.initPlayer();
        observer.disconnect();
      }
    }
  }

  async _init() {
    const handleResize = this.handleResize.bind(this);
    const handleAnchorClick = this.handleAnchorClick.bind(this);
    const handleObserver = this.handleObserver.bind(this);

    // format list, in case everything else breaks
    this.formatList();

    try {
      // first get the tracks, and set the first as the current
      await this.getTracks();

      // init player with IntersectionObserver
      // this.initPlayer();
      const intersectionObserver = new IntersectionObserver(handleObserver, {
        rootMargin: "60px",
      });
      intersectionObserver.observe(this);

      // handle resizing and update the now playing if needed
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(this.root);

      // set the aria-selected to current track
      this.setSelected();

      // disable the playlist links and update the UI instead
      this.root.addEventListener("click", handleAnchorClick);
    } catch (error) {
      console.error(error);
    }
  }

  async connectedCallback() {
    await this._init();
    document.addEventListener("DOMContentLoaded", () => {
      import("plyr");
    });
  }
}

module.exports = { Playlist };
