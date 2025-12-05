const paymentForm = document.getElementById("payment-form");
const totalPriceElement = document.getElementById("total-price");
const paymentMethodSelect = document.getElementById("payment-method");

window.addEventListener("DOMContentLoaded", () => {
  const total = localStorage.getItem("cartTotal");
  if (total) totalPriceElement.value = "R$ " + total;
});

paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const paymentData = {
    total: totalPriceElement.value,
    method: paymentMethodSelect.value,
  };

  fetch("/api/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Pagamento aprovado!");
      localStorage.removeItem("cartTotal");
      window.location.href = "/frontend/public/success.html";
    })
    .catch(() => alert("Erro ao processar pagamento."));
});
