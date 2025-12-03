/* cart.js
   - addToCart(id)
   - removeFromCart(id)
   - getCartItems()
   - clearCart()
   - getCartSummary() -> {count, total}
*/

const CART_KEY = "cafeeprosa_cart_v1";

function _readCartRaw() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function _writeCartRaw(arr) {
  localStorage.setItem(CART_KEY, JSON.stringify(arr));
}

// adiciona item (repete entrada para quantidade)
function addToCart(id) {
  const cart = _readCartRaw();
  cart.push(Number(id));
  _writeCartRaw(cart);

  // dá feedback simples (pode ser substituído por toast)
  if (window && window.alert) {
    alert("Item adicionado ao carrinho!");
  }
  // opcional: disparar evento custom para outras partes da UI
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
}

function removeFromCart(id) {
  let cart = _readCartRaw();
  const idx = cart.indexOf(Number(id));
  if (idx > -1) {
    cart.splice(idx, 1);
    _writeCartRaw(cart);
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
  }
}

function clearCart() {
  _writeCartRaw([]);
  window.dispatchEvent(
    new CustomEvent("cartUpdated", { detail: { cart: [] } })
  );
}

function getCartItems() {
  return _readCartRaw();
}

/**
 * Transforma array de ids em resumo {id, qty}
 * Ex: [1,2,1] -> [{id:1, qty:2}, {id:2, qty:1}]
 */
function getCartSummary() {
  const ids = _readCartRaw();
  const map = {};
  ids.forEach((id) => (map[id] = (map[id] || 0) + 1));
  const summary = Object.keys(map).map((k) => ({ id: Number(k), qty: map[k] }));
  return summary;
}

/* Exporta para console (útil pra debug) */
window.cartAPI = {
  addToCart,
  removeFromCart,
  clearCart,
  getCartItems,
  getCartSummary,
};
