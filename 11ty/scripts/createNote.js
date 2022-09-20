const md = require("markdown-it")();

const monthMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const createDateString = (input, live) => {
  const stringElems = [];
  const dateElems = input.split("/");
  let date, month, year;
  month = dateElems[0];
  date = dateElems.length === 3 ? dateElems[1] : null;
  year = dateElems[dateElems.length - 1];

  stringElems.push("Recorded");
  if (live) stringElems.push("live");
  stringElems.push(date ? "on" : "in");
  stringElems.push(monthMap[month]);
  if (date) stringElems.push(`${date},`);
  stringElems.push(year);
  return stringElems.join(" ");
};

const createNote = (track) =>
  `<p><strong>${track.composer}: ${track.title}</strong></p>
${md.render(track.notes)}
<p>${createDateString(track.date, track.live)}<br />${track.location}</p>
`;

module.exports = createNote;
