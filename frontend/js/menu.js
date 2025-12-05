const API = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", () => {

  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Você precisa fazer login!");
    window.location.href = "login.html";
    return;
  }

  const items = document.querySelectorAll(".container-produtos .item");

  if (items.length === 0) {
    console.warn("Nenhum item encontrado no HTML!");
    return;
  }

  // Carregar carrinho local
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Atualiza contadores ao carregar
  items.forEach(item => {
    const id = item.dataset.id;
    const countEl = item.querySelector(".item-count");
    if (cart[id]) {
      countEl.textContent = cart[id].qtde;
    }
  });

  items.forEach(item => {

    const plus = item.querySelector(".btn-plus");
    const minus = item.querySelector(".btn-minus");
    const countEl = item.querySelector(".item-count");
    const titleEl = item.querySelector(".titulo-petisco");
    const priceEl = item.querySelector(".preco");

    if (!plus || !minus || !countEl || !titleEl || !priceEl) {
      console.warn("Elemento incompleto encontrado:", item);
      return;
    }

    const productId = item.dataset.id;
    let count = cart[productId]?.qtde || 0;

    // --- FUNÇÃO PARA SALVAR LOCAL E ONLINE ---
    async function syncCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
      try {
        await fetch(`${API}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            users_id: Number(localStorage.getItem("userId")),
            products_id: Number(productId),
            qtde_produto: cart[productId].qtde,
            price_product: cart[productId].price
          })
        });
      } catch (err) {
        console.warn("Servidor offline — carrinho salvo apenas localmente.");
      }
    }

    // --- BOTÃO DE ADICIONAR ---
    plus.addEventListener("click", async () => {
      count++;
      countEl.textContent = count;

      const name = titleEl.textContent;
      const price = parseFloat(priceEl.textContent.match(/[\d,]+/)[0].replace(",", "."));

      cart[productId] = {
        name,
        price,
        qtde: count
      };

      await syncCart();
    });

    // --- BOTÃO DE REMOVER ---
    minus.addEventListener("click", async () => {
      if (count > 0) {
        count--;
        countEl.textContent = count;

        if (count === 0) {
          delete cart[productId];
        } else {
          cart[productId].qtde = count;
        }

        await syncCart();
      }
    });
  });

});
