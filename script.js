document.addEventListener("DOMContentLoaded", function () {

  // ================= SWIPER =================
  let mainSwiper = null;

  if (typeof Swiper !== "undefined") {
    const swiperEl = document.querySelector(".mySwiper");
    if (swiperEl) {
      mainSwiper = new Swiper(swiperEl, {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        effect: "slide",
        speed: 700,
        spaceBetween: 10,
      });
    }
  }

  // ================= PROMO =================
  const promo = document.getElementById("topPromo");
  const promoClose = document.getElementById("promoClose");

  if (promo && promoClose) {
    promoClose.addEventListener("click", () => {
      promo.classList.add("hide");
      setTimeout(() => promo.remove(), 500);
    });
  }

  // ================= LOAD BOTTOM NAV =================
  const navContainer = document.getElementById("bottom-nav-container");

  if (navContainer) {
    fetch("nav.html")
      .then(res => res.text())
      .then(data => {
        navContainer.innerHTML = data;
      });
  }

  // ================= SEARCH SYSTEM (Delegation) =================
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("search-input");
  const closeBtn = document.getElementById("close-search");
  const searchResults = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");

  function openSearch() {
    if (!overlay || !input) return;

    overlay.classList.add("active");
    input.focus();
    document.body.style.overflow = "hidden";

    if (searchResults) searchResults.innerHTML = "";
    if (noResults) noResults.style.display = "none";
  }

  function closeSearch() {
    if (!overlay || !input) return;

    overlay.classList.remove("active");
    input.value = "";
    document.body.style.overflow = "";

    if (searchResults) searchResults.innerHTML = "";
    if (noResults) noResults.style.display = "none";

    if (mainSwiper) mainSwiper.update();
  }

  // 🔥 CLICK ANYWHERE (Dynamic Support)
  document.addEventListener("click", function (e) {

    // NAV ACTIVE
    const navItem = e.target.closest(".nav-item");
    if (navItem) {
      document.querySelectorAll(".nav-item").forEach(n =>
        n.classList.remove("active")
      );
      navItem.classList.add("active");
    }

    // SEARCH BUTTON CLICK
    if (e.target.closest("#search-btn")) {
      openSearch();
    }

    // CLOSE SEARCH BUTTON
    if (e.target.closest("#close-search")) {
      closeSearch();
    }

    // CLICK OUTSIDE SEARCH
    if (overlay && e.target === overlay) {
      closeSearch();
    }

  });

// LIVE SEARCH
if (input) {
  input.addEventListener("input", () => {
    if (!searchResults || !noResults) return;

    const query = input.value.toLowerCase().trim();

    // 🔥 REMOVE DUPLICATES FIRST
    const uniqueMap = new Map();

    document.querySelectorAll(".product-card").forEach(product => {
      const uniqueKey = product.textContent.trim(); // unique by content

      if (!uniqueMap.has(uniqueKey)) {
        uniqueMap.set(uniqueKey, product);
      }
    });

    const products = Array.from(uniqueMap.values());

    searchResults.innerHTML = "";
    noResults.style.display = "none";

    if (!query) return;

    const filtered = products.filter(product =>
      product.textContent.toLowerCase().includes(query)
    );

    if (!filtered.length) {
      noResults.style.display = "block";
      return;
    }

    filtered.forEach(product => {
      const clone = product.cloneNode(true);
      clone.style.display = "block";
      clone.style.width = "100%";
      searchResults.appendChild(clone);
    });
  });
}

  // ================= SUPPORT SYSTEM (Delegation) =================
  let supportOpen = false;

  document.addEventListener("click", function (e) {

    const supportBtn = e.target.closest("#support-btn");
    const whatsappIcon = e.target.closest("#whatsapp-icon");

    const supportIcon = document.getElementById("support-icon");
    const whatsappPopup = document.getElementById("whatsapp-popup");

    // Toggle Support
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

    // WhatsApp Redirect
    if (whatsappIcon) {
      const phoneNumber = "917005121396";
      const message = "Hi bro need help in top up";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }

  });

});
