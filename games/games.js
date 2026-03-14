/* ===== BANNER BACKGROUND ===== */
const banner = document.getElementById('productBanner');
const gameIcon = banner?.querySelector('.game-icon');
if (gameIcon) banner.style.backgroundImage = `url('${gameIcon.src}')`;

/* ===== NOTES TOGGLE ===== */
const toggleBtn = document.getElementById('toggleBtn');
const moreText = document.querySelector('.more-text');
const dots = document.querySelector('.dots');
const notesText = document.getElementById('notesText');

if (toggleBtn) {
  let expanded = false;
  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;
    if (moreText && dots && notesText) {
      moreText.style.display = expanded ? 'inline' : 'none';
      dots.style.display = expanded ? 'none' : 'inline';
      notesText.classList.toggle('expanded', expanded);
      toggleBtn.textContent = expanded ? 'View Less' : 'View More';
    }
  });
}

/* ===== HOW TO PURCHASE POPUP ===== */
const howToBtn = document.getElementById("howToBtn");
const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");

if (howToBtn && popupOverlay && closePopup) {
  howToBtn.addEventListener("click", () => popupOverlay.classList.add("show"));
  closePopup.addEventListener("click", () => popupOverlay.classList.remove("show"));
  popupOverlay.addEventListener("click", e => {
    if (e.target === popupOverlay) popupOverlay.classList.remove("show");
  });
}

/* ===== PACKAGE SELECTION ===== */
function updateDetails(input) {
  const name = input.dataset.name || "-";
  const items = input.dataset.items || "-";
  const price = input.value || "-";

  document.getElementById("productName").textContent = name;
  document.getElementById("productItems").textContent = items;
  document.getElementById("productPrice").textContent = "₹" + price;
  document.getElementById("amountPayable").textContent = "₹" + price;

  updateBuyButtonState(); // update Buy button based on stock
}

function attachPackageListeners(container) {
  container.querySelectorAll(".package input").forEach(input => {
    input.addEventListener("change", () => updateDetails(input));
  });
}

function loadPackage(file) {
  const container = document.getElementById("package-container");
  if (!container) return;

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error("File not found: " + file);
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;
      attachPackageListeners(container);

      const firstPackage = container.querySelector(".package input");
      if (firstPackage) {
        firstPackage.checked = true;
        updateDetails(firstPackage);
      }

      container.querySelectorAll('.package').forEach(applyStockOverlay);
      updateBuyButtonState();
    })
    .catch(err => {
      container.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
      console.error(err);
    });
}

/* ===== CATEGORY SELECTION ===== */
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const file = card.dataset.file;
    if (file) loadPackage(file);
  });
});

// Load default package on page load
const defaultCard = document.querySelector(".category-card.active");
if (defaultCard) {
  const file = defaultCard.dataset.file;
  if (file) loadPackage(file);
}

/* ===== PAYMENT SELECTION ===== */
const paymentCards = document.querySelectorAll(".payment-card");

paymentCards.forEach(card => {
  card.addEventListener("click", () => {
    paymentCards.forEach(c => {
      c.classList.remove("active");
      const icon = c.querySelector(".left i");
      icon.classList.replace("fa-circle-check", "fa-circle"); // uncheck
    });

    card.classList.add("active");
    const icon = card.querySelector(".left i");
    icon.classList.replace("fa-circle", "fa-circle-check"); // check

    const input = card.querySelector("input");
    if (input) input.checked = true;
  });
});

/* ===== CUSTOM SMOOTH POPUP ===== */
const popup = document.getElementById("smoothPopup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupClose = document.getElementById("popupClose");

function showPopup(title, message) {
  if (!popup) return;
  popupTitle.textContent = title;
  popupMessage.textContent = message;
  popup.classList.add("show");
}

popupClose?.addEventListener("click", () => popup.classList.remove("show"));
popup?.addEventListener("click", e => {
  if (e.target === popup) popup.classList.remove("show");
});

/* ===== BUY BUTTON ===== */
const buyBtn = document.getElementById("buyBtn");

buyBtn?.addEventListener("click", () => {
  const selectedPackage = document.querySelector(".package input:checked");
  if (!selectedPackage) return showPopup("No Package Selected", "Please select a package!");

  const stock = parseInt(selectedPackage.dataset.stock || "1");
  if (stock === 0) return showPopup("Out Of Stock", "This package is currently unavailable!");

  // Detect inputs
  const userIdInput = document.querySelector('input[placeholder="User ID"]');
  const zoneIdInput = document.querySelector('input[placeholder="Zone ID"]');
  const serverSelect = document.querySelector('select');

  const missingFields = [];
  if (!userIdInput || !userIdInput.value.trim()) missingFields.push("User ID");
  if (zoneIdInput && !zoneIdInput.value.trim()) missingFields.push("Zone ID");
  if (serverSelect && serverSelect.value.includes("Select")) missingFields.push("Server");

  if (missingFields.length) {
    return showPopup("Missing Information", `Please enter: ${missingFields.join(", ")}`);
  }

  // Prepare URL
  const product = encodeURIComponent(selectedPackage.dataset.name || "-");
  const items = encodeURIComponent(selectedPackage.dataset.items || "-");
  const amount = encodeURIComponent(selectedPackage.value || "-");
  const userId = encodeURIComponent(userIdInput?.value.trim() || "");
  const zoneId = encodeURIComponent(zoneIdInput?.value.trim() || "");
  const server = encodeURIComponent(serverSelect?.value || "");

  let url = `../../payment.html?product=${product}&items=${items}&amount=${amount}&userId=${userId}`;
  if (zoneIdInput) url += `&zoneId=${zoneId}`;
  if (serverSelect) url += `&server=${server}`;

  window.location.href = url;
});

/* ===== STOCK OVERLAY ===== */
function applyStockOverlay(pkg) {
  const input = pkg.querySelector('input[type="radio"]');
  if (!input) return;

  const stock = parseInt(input.dataset.stock || "1");

  if (stock === 0) {
    input.disabled = true;
    pkg.classList.add('disabled');
    if (!pkg.querySelector('.stock-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'stock-overlay';
      overlay.textContent = 'Out Of Stock';
      pkg.appendChild(overlay);
    }
  } else {
    input.disabled = false;
    pkg.classList.remove('disabled');
    const overlay = pkg.querySelector('.stock-overlay');
    if (overlay) overlay.remove();
  }

  updateBuyButtonState();
}

/* ===== UPDATE BUY NOW BUTTON STATE ===== */
function updateBuyButtonState() {
  if (!buyBtn) return;
  const selectedPackage = document.querySelector(".package input:checked");

  if (!selectedPackage) {
    buyBtn.disabled = true;
    buyBtn.classList.add("disabled");
    return;
  }

  const stock = parseInt(selectedPackage.dataset.stock || "1");
  if (stock === 0) {
    buyBtn.disabled = true;
    buyBtn.classList.add("disabled");
  } else {
    buyBtn.disabled = false;
    buyBtn.classList.remove("disabled");
  }
}

/* ===== OBSERVE PACKAGE CHANGES ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.package').forEach(applyStockOverlay);
  updateBuyButtonState();
});

const packageContainer = document.getElementById('package-container');
if (packageContainer) {
  const observer = new MutationObserver(() => {
    packageContainer.querySelectorAll('.package').forEach(applyStockOverlay);
    updateBuyButtonState();
  });
  observer.observe(packageContainer, { childList: true, subtree: true });
}

/* ===== ENTER IDS POPUP ===== */
(function () {
  const icon = document.getElementById('idInfoIcon');
  const popup = document.getElementById('idInfoPopup');
  const closeBtn = document.getElementById('idCloseBtn');

  function openPopup() {
    if (!popup) return;
    popup.style.display = 'flex';
    requestAnimationFrame(() => popup.classList.add('active'));
    popup.setAttribute('aria-hidden', 'false');
    document.addEventListener('click', handleDocClick, true);
    document.addEventListener('keydown', handleEsc, true);
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
    setTimeout(() => popup.style.display = 'none', 220);
    document.removeEventListener('click', handleDocClick, true);
    document.removeEventListener('keydown', handleEsc, true);
  }

  function handleDocClick(e) {
    if (!popup || popup.getAttribute('aria-hidden') === 'true') return;
    if (e.target === icon || icon.contains(e.target)) return;
    closePopup();
    e.stopPropagation();
  }

  function handleEsc(e) {
    if (e.key === 'Escape') closePopup();
  }

  icon?.addEventListener('click', ev => { ev.stopPropagation(); openPopup(); });
  closeBtn?.addEventListener('click', ev => { ev.stopPropagation(); closePopup(); });
})();


