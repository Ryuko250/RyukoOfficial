/* ===============================
   GLOBAL MAINTENANCE FILE
=============================== */

document.addEventListener("DOMContentLoaded", function(){

  const maintenanceMode = false; 
  // true  = website closed
  // false = website open

  if (maintenanceMode){

    const maintenanceHTML = `
    <div id="maintenance-mode">
      <div class="grid-bg"></div>

      <div class="corner corner1"></div>
      <div class="corner corner2"></div>
      <div class="corner corner3"></div>
      <div class="corner corner4"></div>

      <div class="maintenance-center">
        <h1>Website Under Maintenance</h1>
        <p>We are currently improving the website.<br>
        Please come back after some time.</p>

        <div class="cube-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", maintenanceHTML);

    // Hide full website
    Array.from(document.body.children).forEach(el=>{
      if(el.id !== "maintenance-mode"){
        el.style.display = "none";
      }
    });

  }

});

/* ===== Page Loader ===== */
(function() {

  const loader = document.createElement("div");
  loader.id = "site-loader";

  loader.innerHTML = `
    <div class="loader-box">
      <div class="loader-ring"></div>
      <p>Loading Website</p>
    </div>
  `;

  document.body.prepend(loader);

  window.addEventListener("load", function() {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 600);
  });

})();


document.addEventListener("DOMContentLoaded", function () {

  // ================= PRODUCT DATABASE =================
  const products = [
    { name: "EVENT RECHARGE TASKS", url: "event.html", image: "../assets/game-icons/event.jpg" },
    { name: "MOBILE LEGENDS SMALL PACKS", url: "mobilelegendssmall.html", image: "../assets/game-icons/smallpack.jpg" },
    { name: "MOBILE LEGENDS LARGE PACKS", url: "mobilelegends.html", image: "../assets/game-icons/mlbb.jpg" },
    { name: "MLBB WEEKLY PASS", url: "mlbbweeklypass.html", image: "../assets/game-icons/weeklypass.jpg" },
    { name: "MOBILE LEGENDS DOUBLE DIAMONDS", url: "doublediamond.html", image: "../assets/game-icons/doublediamonds.jpg" },
    { name: "STARLIGHT CARD", url: "mlbbstarlight.html", image: "../assets/game-icons/starlight.jpg" },
    { name: "MAGIC CHESS GO GO", url: "magicchessgogo.html", image: "../assets/game-icons/magicchessgogo.jpg" },
    { name: "FLASH SALES", url: "flashsale.html", image: "../assets/game-icons/flashsale.jpg" },
    { name: "BGMI BATTLEGROUND MOBILE INDIA", url: "bgmi.html", image: "../assets/game-icons/bgmi.jpg" },
    { name: "PUBG MOBILE GLOBAL", url: "pubgmobile.html", image: "../assets/game-icons/pubgmobile.jpg" },
    { name: "GENSHIN IMPACT", url: "genshinimpact.html", image: "../assets/game-icons/genshinimpact.jpg" },
    { name: "HONKAI STAR RAIL", url: "honkaistar.html", image: "../assets/game-icons/honkaistar.jpg" },
    { name: "HONOR OF KINGS", url: "honorofkings.html", image: "../assets/game-icons/honorofkings.jpg" },
    { name: "ALL IN ONE APPLICATION", url: "netflix.html", image: "../assets/game-icons/netflix.jpg" }
  ];

  let supportOpen = false;

  // ================= SEARCH ELEMENTS =================
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("search-input");
  const closeBtn = document.getElementById("close-search");
  const searchResults = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");

  function openSearch() {
    if (!overlay || !input) return;

    overlay.classList.add("active");
    input.focus();
    searchResults.innerHTML = "";
    noResults.style.display = "none";
    document.body.style.overflow = "hidden";
  }

  function closeSearch() {
    if (!overlay || !input) return;

    overlay.classList.remove("active");
    input.value = "";
    searchResults.innerHTML = "";
    noResults.style.display = "none";
    document.body.style.overflow = "";
  }

  // ================= GLOBAL CLICK HANDLER =================
  document.addEventListener("click", function (e) {

    // 🔍 OPEN SEARCH (works even if nav loaded later)
    if (e.target.closest("#search-btn")) {
      openSearch();
    }

    // ❌ CLOSE SEARCH BUTTON
    if (e.target.closest("#close-search")) {
      closeSearch();
    }

    // CLICK OUTSIDE SEARCH
    if (overlay && e.target === overlay) {
      closeSearch();
    }

    // ================= SUPPORT =================
    const supportBtn = e.target.closest("#support-btn");
    const whatsappIcon = e.target.closest("#whatsapp-icon");
    const supportIcon = document.getElementById("support-icon");
    const whatsappPopup = document.getElementById("whatsapp-popup");

    if (supportBtn && supportIcon && whatsappPopup) {
      supportOpen = !supportOpen;

      if (supportOpen) {
        whatsappPopup.classList.add("show");
        supportIcon.classList.replace("fa-headset", "fa-times");
      } else {
        whatsappPopup.classList.remove("show");
        supportIcon.classList.replace("fa-times", "fa-headset");
      }
    }

    if (whatsappIcon) {
      const phoneNumber = "917005121396";
      const message = "Hi bro need help in top up";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }

  });

  // ================= LIVE SEARCH =================
  if (input) {
    input.addEventListener("input", function () {

      const query = input.value.toLowerCase().trim();
      searchResults.innerHTML = "";
      noResults.style.display = "none";

      if (!query) return;

      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query)
      );

      if (!filtered.length) {
        noResults.style.display = "block";
        return;
      }

      filtered.forEach(product => {
        const card = document.createElement("a");
        card.href = product.url;
        card.className = "search-result-item";

        card.innerHTML = `
          <img src="${product.image}" class="search-logo">
          <div class="search-title">${product.name}</div>
        `;

        searchResults.appendChild(card);
      });

    });
  }

});
