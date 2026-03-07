function getYear(d) {
  return d ? d.slice(0, 4) : "N/A";
}
function getTitle(m) {
  return m?.title || m?.name || "Untitled";
}
function getDate(m) {
  return m?.release_date || m?.first_air_date || "";
}

function ratingColor(r) {
  if (r >= 8) return "#2ed573";
  if (r >= 6.5) return "#f5c518";
  return "#ff4757";
}

export { getYear, getTitle, getDate, ratingColor };
