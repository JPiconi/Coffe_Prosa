const API = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Você precisa fazer login para continuar.");
    window.location.href = "login.html";
    return;
  }

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  try {
    const response = await fetch(`${API}/cart/${userId}`);

    if (!response.ok) {
      cartContainer.innerHTML = "<p>Erro ao carregar o carrinho.</p>";
      return;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
      totalElement.textContent = "R$ 0,00";
      return;
    }

    let total = 0;

    cartContainer.innerHTML = data.items
      .map(item => {
        total += Number(item.final_price_product);

        return `
          <div class="cart-item">
              <h4>${item.product_name}</h4>
              <p>Quantidade: ${item.qtde_produto}</p>
              <p>Preço unitário: R$ ${item.price_product.toFixed(2)}</p>
              <p><strong>Total: R$ ${item.final_price_product.toFixed(2)}</strong></p>
          </div>
        `;
      })
      .join("");

    totalElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;

    localStorage.setItem("total_price", total);

  } catch (err) {
    cartContainer.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
  }
});
