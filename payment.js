// CONFIG
const MERCHANT_UPI_ID = "7005121396@ptsbi";
const MERCHANT_NAME = "Ryuko Official";

// DOM references
const qrcode = document.getElementById("qrcode");
const upiLink = document.getElementById("upiLink");
const openUpiBtn = document.getElementById("openUpiBtn");
const copyUpiBtn = document.getElementById("copyUpiBtn");
const screenshotInput = document.getElementById("screenshotInput");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const removeImgBtn = document.getElementById("removeImgBtn");
const confirmBtn = document.getElementById("confirmBtn");
const statusMsg = document.getElementById("statusMsg");

// Info elements (may not exist on every game)
const productNameEl = document.getElementById("productName");
const productItemsEl = document.getElementById("productItems");
const amountPayableEl = document.getElementById("amountPayable");
const userIdEl = document.getElementById("userId");
const zoneIdEl = document.getElementById("zoneId");
const serverEl = document.getElementById("server");

// Generate unique order ID
function generateOrderID() {
  return "RYO-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

// Get package details and IDs from URL
function getPackageFromURL() {
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product") || "-";
  const items = params.get("items") || "-";
  const amount = params.get("amount") || "0";
  const userId = params.get("userId") || "";
  const zoneId = params.get("zoneId") || "";
  const server = params.get("server") || "";

  // Populate page safely
  if (productNameEl) productNameEl.textContent = product;
  if (productItemsEl) productItemsEl.textContent = items;
  if (amountPayableEl) amountPayableEl.textContent = "₹" + amount;

  // Handle User ID
  if (userIdEl) {
    if (userId) {
      userIdEl.textContent = userId;
      userIdEl.parentElement.style.display = "flex";
    } else {
      userIdEl.parentElement.style.display = "none";
    }
  }

  // Handle Zone ID
  if (zoneIdEl) {
    if (zoneId) {
      zoneIdEl.textContent = zoneId;
      zoneIdEl.parentElement.style.display = "flex";
    } else {
      zoneIdEl.parentElement.style.display = "none";
    }
  }

  // Handle Server
  if (serverEl) {
    if (server) {
      serverEl.textContent = server;
      serverEl.parentElement.style.display = "flex";
    } else {
      serverEl.parentElement.style.display = "none";
    }
  }

  return { product, items, amount, userId, zoneId, server };
}

// Generate UPI QR
function generateUPI({ product, amount }) {
  const upiUri = `upi://pay?pa=${encodeURIComponent(MERCHANT_UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&tn=${encodeURIComponent(product)}&cu=INR`;
  if (upiLink) upiLink.textContent = upiUri;

  if (qrcode) {
    new QRCode(qrcode, {
      text: upiUri,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  if (openUpiBtn) openUpiBtn.onclick = () => window.location.href = upiUri;
  if (copyUpiBtn) copyUpiBtn.onclick = () => {
    navigator.clipboard.writeText(upiUri).then(() => {
      if (statusMsg) statusMsg.textContent = "UPI link copied!";
    });
  };
}

// Screenshot preview
if (screenshotInput) {
  screenshotInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewContainer) previewContainer.hidden = false;
      if (previewImage) previewImage.src = URL.createObjectURL(file);
    }
  });
}

if (removeImgBtn) {
  removeImgBtn.onclick = () => {
    if (previewContainer) previewContainer.hidden = true;
    if (screenshotInput) screenshotInput.value = "";
  };
}

// WhatsApp Share Logic
if (confirmBtn) {
  confirmBtn.onclick = async () => {
    if (statusMsg) statusMsg.textContent = "Preparing WhatsApp...";

    const { product, items, amount, userId, zoneId, server } = getPackageFromURL();
    const orderId = generateOrderID();
    const file = screenshotInput?.files?.[0];

    // WhatsApp message (auto hides missing fields)
    let msg = `Hello, I have placed an order!:\n\n` +
              `🆔 Order ID: ${orderId}\n` +
              `🎮 Game: ${product}\n`;

    if (userId) msg += `🆔 User ID: ${userId}\n`;
    if (zoneId) msg += `🌍 Zone ID: ${zoneId}\n`;
    if (server) msg += `🗺️ Server: ${server}\n`;

    msg += `💎 Package: ${items}\n` +
           `💰 Amount: ₹${amount}\n` +
           `💳 Payment: ${MERCHANT_UPI_ID}`;

    // Send with screenshot if supported
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          text: msg,
          title: "Ryuko Official Payment"
        });
        if (statusMsg) statusMsg.textContent = "Opened WhatsApp share sheet!";
        return;
      } catch (err) {
        console.warn(err);
      }
    }

    // Fallback: WhatsApp web link
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/7005121396?text=${encoded}`, "_blank");
    if (statusMsg) statusMsg.textContent = "Opened WhatsApp — please attach screenshot manually.";
  };
}

// Initialize
const packageData = getPackageFromURL();
generateUPI(packageData);