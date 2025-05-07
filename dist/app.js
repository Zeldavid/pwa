const r=document.getElementById("app");navigator.serviceWorker&&navigator.serviceWorker.register("/sw.js").then(()=>console.log("\u2705 SW registrado")).catch(e=>console.error("SW error:",e)),document.querySelectorAll("nav button").forEach(e=>{e.addEventListener("click",()=>s(e.dataset.page))});const s=e=>{e==="leaderboard"?d():e==="market"&&i()},o=e=>fetch(e).then(n=>{if(!n.ok){list.textContent="<p>No player data available (offline?)</p>";return}return n.json()}),d=()=>{r.innerHTML='<h2>Leaderboard</h2><div id="leaderboard-list">Cargando...</div>';const e=document.getElementById("leaderboard-list");o("https://api-game.bloque.app/game/leaderboard").then(n=>{e.innerHTML="",n.players.sort((t,a)=>t.rank-a.rank).forEach(t=>{const a=document.createElement("div");a.className="card",a.innerHTML=`
            <section style="border: 1px solid black">
                <strong>#${t.rank} \u2014 ${t.username} - ${t.fishEmojis}</strong><br> 
            <span>Lvl: ${t.level}</span><br>
            <span>${t.xp} XP</span><br>
            <span>Gold: ${t.gold}</span><br>
            <span>${t.emojiDescription}</span><br>
            <small>${t.isInfected?"infected":"not infected"}</small>
            </section>
        `,e.appendChild(a)})}).catch(n=>{console.log(n),e.textContent="Error querying leaderboard data"})},i=()=>{r.innerHTML='<h2>Market</h2><div id="market-list">Cargando...</div>';const e=document.getElementById("market-list");o("https://api-game.bloque.app/game/market").then(n=>{e.innerHTML="",n.items.forEach(t=>{const a=document.createElement("div");a.className="card",a.innerHTML=`
            <section style="border: 1px solid black">
            <strong>${t.name} \u2014 ${t.id}</strong><br>
            <span>Description: ${t.description}</span><br>
            <span>Type: ${t.type} XP</span><br>
            <span>Cost: ${t.cost} XP</span><br>
            </section>
          `,e.appendChild(a)})}).catch(n=>{console.log(n),document.getElementById("market-list").textContent="Error querying market data"})};
