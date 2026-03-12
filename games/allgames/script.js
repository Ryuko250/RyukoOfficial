document.addEventListener("DOMContentLoaded", function () {

  // ================= PRODUCT DATABASE =================
  const products = [
    { name: "EVENT RECHARGE TASKS", url: "event.html", image: "../../assets/images/game-icons/event.jpg" },
    { name: "MOBILE LEGENDS SMALL PACKS", url: "mobilelegendssmall.html", image: "../../assets/images/game-icons/smallpack.jpg" },
    { name: "MOBILE LEGENDS LARGE PACKS", url: "mobilelegends.html", image: "../../assets/images/game-icons/mlbb.jpg" },
    { name: "MLBB WEEKLY PASS", url: "mlbbweeklypass.html", image: "../../assets/images/game-icons/weeklypass.jpg" },
    { name: "MOBILE LEGENDS DOUBLE DIAMONDS", url: "doublediamond.html", image: "../../assets/images/game-icons/doublediamonds.jpg" },
    { name: "STARLIGHT CARD", url: "mlbbstarlight.html", image: "../../assets/images/game-icons/starlight.jpg" },
    { name: "MAGIC CHESS GO GO", url: "magicchessgogo.html", image: "../../assets/images/game-icons/magicchessgogo.jpg" },
    { name: "FLASH SALES", url: "flashsale.html", image: "../../assets/images/game-icons/flashsale.jpg" },
    { name: "BGMI BATTLEGROUND MOBILE INDIA", url: "bgmi.html", image: "../../assets/images/game-icons/bgmi.jpg" },
    { name: "PUBG MOBILE GLOBAL", url: "pubgmobile.html", image: "../../assets/images/game-icons/pubgmobile.jpg" },
    { name: "GENSHIN IMPACT", url: "genshinimpact.html", image: "../../assets/images/game-icons/genshinimpact.jpg" },
    { name: "HONKAI STAR RAIL", url: "honkaistar.html", image: "../../assets/images/game-icons/honkaistar.jpg" },
    { name: "HONOR OF KINGS", url: "honorofkings.html", image: "../../assets/images/game-icons/honorofkings.jpg" }
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
