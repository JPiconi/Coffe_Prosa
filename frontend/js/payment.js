const API = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", () => {
  const totalPrice = localStorage.getItem("total_price") || "0.00";
  document.getElementById("total-price").value = `R$ ${totalPrice}`;
});

document.getElementById("payment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payment_value = Number(localStorage.getItem("total_price"));
  const id_effective_product_sale = localStorage.getItem("last_sale_id");
  const payment_description = document.getElementById("payment-method").value;

  const msg = document.getElementById("payment-message");

  if (!id_effective_product_sale) {
    msg.innerHTML = "Nenhuma venda foi encontrada.";
    msg.style.color = "red";
    return;
  }

  const payload = {
    payment_value,
    id_effective_product_sale,
    payment_description
  };

  try {
    const response = await fetch(`${API}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      msg.textContent = data.error || "Erro ao processar pagamento.";
      msg.style.color = "red";
      return;
    }

    msg.style.color = "green";
    msg.textContent = "Pagamento realizado com sucesso!";

    localStorage.removeItem("last_sale_id");
    localStorage.removeItem("total_price");

  } catch (err) {
    msg.textContent = "Erro de conexão com o servidor.";
    msg.style.color = "red";
  }
});
