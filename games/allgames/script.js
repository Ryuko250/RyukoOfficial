  // ================= PRODUCT DATABASE =================
  const products = [
    { name: "Mobile Legends Small Pack", url: "games/allgames/mobilelegendssmall.html", image: "../../assets/images/game-icons/smallpack.jpg" },
    { name: "Mobile Legends Large Pack", url: "games/allgames/mobilelegends.html", image: "../../assets/images/game-icons/mlbb.jpg" },
    { name: "MLBB Weekly Pass", url: "games/allgames/mlbbweeklypass.html", image: "../../assets/images/game-icons/weeklypass.jpg" },
    { name: "Mobile Legends Double Diamonds", url: "games/allgames/doublediamond.html", image: "../../assets/images/game-icons/doublediamonds.jpg" },
    { name: "Starlight Card", url: "games/allgames/mlbbstarlight.html", image: "../../assets/images/game-icons/starlight.jpg" },
    { name: "Magic Chess Go Go", url: "games/allgames/magicchessgogo.html", image: "../../assets/images/game-icons/magicchessgogo.jpg" },
    { name: "Flash Sales", url: "games/allgames/flashsale.html", image: "../../assets/images/game-icons/flashsale.jpg" },
    { name: "BGMI Battleground Mobile India", url: "games/allgames/bgmi.html", image: "../../assets/images/game-icons/bgmi.jpg" },
    { name: "PUBG Mobile Global", url: "games/allgames/pubgmobile.html", image: "../../assets/images/game-icons/pubgmobile.jpg" },
    { name: "Genshin Impact", url: "games/allgames/genshinimpact.html", image: "../../assets/images/game-icons/genshinimpact.jpg" },
    { name: "Honkai Star Rail", url: "games/allgames/honkaistar.html", image: "../../assets/images/game-icons/honkaistar.jpg" },
    { name: "Honor Of Kings", url: "games/allgames/honorofkings.html", image: "../../assets/images/game-icons/honorofkings.jpg" }
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
