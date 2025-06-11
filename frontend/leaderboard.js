const leaderboardData = [
    { rank: 1, user: "PlantKing42", category: "biggest-chili", image: "🌶️" },
    { rank: 2, user: "LeafLord", category: "tallest-tomato", image: "🍅" },
    { rank: 3, user: "GreenQueen", category: "biggest-chili", image: "🌶️" },
    { rank: 4, user: "VeggieChamp", category: "tallest-tomato", image: "🍅" },
    { rank: 5, user: "SproutBoss", category: "biggest-chili", image: "🌶️" }
  ];
  
  const tableBody = document.querySelector("#leaderboardTable tbody");
  const filter = document.getElementById("categoryFilter");
  
  function renderTable(data) {
    tableBody.innerHTML = "";
    data.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>#${entry.rank}</td>
        <td>${entry.user}</td>
        <td>${entry.category.replace("-", " ")}</td>
        <td>${entry.image}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  filter.onchange = () => {
    const selected = filter.value;
    const filtered = selected === "all"
      ? leaderboardData
      : leaderboardData.filter(e => e.category === selected);
    renderTable(filtered);
  };
  
  renderTable(leaderboardData);
  