const msg = localStorage.getItem("lastUploadMsg");
if (msg) {
  document.getElementById("uploadStatus").innerText = msg;
  localStorage.removeItem("lastUploadMsg");
}

const tableBody = document.querySelector("#leaderboardTable tbody");
const filter = document.getElementById("categoryFilter");

let fullData = [];

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${index + 1}</td>
      <td>${entry.username}</td>
      <td>${entry.category.replace("-", " ")}</td>
      <td>${entry.length}</td>
    `;
    tableBody.appendChild(row);
  });
}

filter.onchange = () => {
  const selected = filter.value;
  const filtered = selected === "all"
    ? fullData
    : fullData.filter(e => e.category === selected);

  renderTable(filtered);
};

async function fetchLeaderboard() {
  try {
    const res = await fetch("http://127.0.0.1:5000/leaderboard");
    const data = await res.json();

    // Sort descending by length
    fullData = data.sort((a, b) => b.length - a.length);
    renderTable(fullData);
  } catch (err) {
    document.getElementById("uploadStatus").innerText =
      "⚠️ Failed to load leaderboard.";
  }
}

fetchLeaderboard();
