const toml = require("toml");
const path = require("path");
const fs = require("fs");
const promisify = require("util").promisify;
const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);
const createNote = require("./createNote");

const INPUT_PATH = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "_data",
  "content",
  "music",
  "video.toml"
);
const OUTPUT_PATH = path.join(__dirname, "..", "..", "dist", "assets", "js", "youtubeTracks.json");

async function videoToJson() {
  const input = await read(INPUT_PATH, "utf-8");
  const data = toml.parse(input);
  data.tracks.forEach((track) => {
    track.notes = createNote(track);
  });
  await write(OUTPUT_PATH, JSON.stringify(data), { encoding: "utf-8" });
}

module.exports = videoToJson;
