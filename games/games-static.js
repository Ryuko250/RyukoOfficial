document.querySelectorAll(".package input").forEach(input => {
  input.addEventListener("change", () => {
    document.getElementById("productName").textContent = input.dataset.name || "-";
    document.getElementById("productItems").textContent = input.dataset.items || "-";
    document.getElementById("productPrice").textContent = "₹" + (input.value || "-");
    document.getElementById("amountPayable").textContent = "₹" + (input.value || "-");
  });
});

const firstPackage = document.querySelector(".package input");
if (firstPackage) {
  firstPackage.checked = true;
  firstPackage.dispatchEvent(new Event("change"));
}