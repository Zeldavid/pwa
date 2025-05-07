const app = document.getElementById("app");

if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("✅ SW registrado"))
    .catch((err) => console.error("SW error:", err));
}

// SPA navigation
document.querySelectorAll("nav button").forEach((btn) => {
  btn.addEventListener("click", () => renderPage(btn.dataset.page));
});

const renderPage = (page) => {
  if (page === "leaderboard") {
    loadLeaderboard();
  } else if (page === "market") {
    loadMarket();
  }
};

const fetchData = (url) => {
  return fetch(url).then((res) => {
    if (!res.ok) {
      list.textContent = "<p>No player data available (offline?)</p>";
      return;
    }
    return res.json();
  });
};

const loadLeaderboard = () => {
  app.innerHTML =
    '<h2>Leaderboard</h2><div id="leaderboard-list">Cargando...</div>';
  const list = document.getElementById("leaderboard-list");

  fetchData("https://api-game.bloque.app/game/leaderboard")
    .then((data) => {
      list.innerHTML = "";

      data.players
        .sort((a, b) => a.rank - b.rank)
        .forEach((player) => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <section style="border: 1px solid black">
                <strong>#${player.rank} — ${player.username} - ${
            player.fishEmojis
          }</strong><br> 
            <span>Lvl: ${player.level}</span><br>
            <span>${player.xp} XP</span><br>
            <span>Gold: ${player.gold}</span><br>
            <span>${player.emojiDescription}</span><br>
            <small>${player.isInfected ? "infected" : "not infected"}</small>
            </section>
        `;

          list.appendChild(card);
        });
    })
    .catch((error) => {
      console.log(error);
      list.textContent = "Error querying leaderboard data";
    });
};

const loadMarket = () => {
  app.innerHTML = '<h2>Market</h2><div id="market-list">Cargando...</div>';
  const list = document.getElementById("market-list");

  fetchData("https://api-game.bloque.app/game/market")
    .then((data) => {
      list.innerHTML = "";
      data.items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <section style="border: 1px solid black">
            <strong>${item.name} — ${item.id}</strong><br>
            <span>Description: ${item.description}</span><br>
            <span>Type: ${item.type} XP</span><br>
            <span>Cost: ${item.cost} XP</span><br>
            </section>
          `;

        list.appendChild(card);
      });
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("market-list").textContent =
        "Error querying market data";
    });
};
