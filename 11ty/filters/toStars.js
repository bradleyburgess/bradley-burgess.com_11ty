module.exports = function (number) {
  const stars = [];
  for (let i = 1; i <= number; i++) {
    stars.push('<span class="icon flat star"></span>');
  }
  for (let i = 5; i > number; i--) {
    stars.push('<span class="icon flat star-empty"></span>');
  }
  return `<div class="stars" aria-label="${number} out of 5">${stars.join("")}</div>`;
};
