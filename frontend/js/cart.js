let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const itemsContainer = document.getElementById("cart-items");
  itemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const element = document.createElement("div");
    element.className = "item";
    element.innerHTML = `
            <span>${item.name} — R$ ${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})" class="button-primary" style="padding:5px 10px; font-size:0.8rem;">Remover</button>
        `;
    itemsContainer.appendChild(element);
  });

  const total = calculateTotal();
  document.getElementById("cart-total").textContent = "R$ " + total;

  localStorage.setItem("cartTotal", total);
}

function calculateTotal() {
  return cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
}

function addToCart(item) {
  const found = cart.find((i) => i.id === item.id);
  if (found) found.quantity++;
  else cart.push({ ...item, quantity: 1 });

  saveCart();
  updateCartDisplay();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCartDisplay();
}

window.addEventListener("DOMContentLoaded", updateCartDisplay);
