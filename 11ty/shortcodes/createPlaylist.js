const ytUrl = require("../filters/ytUrl");

const createListItem = (track, type) =>
  `<li class="playlist__list-item">
  <a href="${type === "youtube" ? ytUrl(track.id) : track.src}" data-id="${
    track.id
  }" class="playlist__link">
    <span class="playlist__composer">${track.composer}: </span>
    <span class="playlist__title">${track.title} </span>
    <span class="playlist__tags">(${track.tags.join(", ")})</span>
  </a>
</li>`;

const createList = (tracks, type) =>
  `<ul class="flow playlist__list" role="list">
  ${tracks.map((track) => createListItem(track, type)).join("")}
</ul>`;

module.exports = createList;
