// Seleciona todos os botões da navegação
const buttons = document.querySelectorAll(".menu-nav button");

// -----------------------
// Scroll suave para seções
// -----------------------
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// -----------------------
// Fetch e render dos itens
// -----------------------
function fetchMenuItems() {
  fetch("http://localhost:3000/menu")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => displayMenuItems(data))
    .catch((error) => console.error("Fetch error:", error));
}

// Renderiza cada item na sua seção correta
function displayMenuItems(items) {
  items.forEach((item) => {
    const section = document.getElementById(item.category); // category deve ser igual ao id da seção
    if (!section) return;

    const menuItemsDiv = section.querySelector(".menu-items");
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>R$ ${item.price.toFixed(2)}</p>
      <button onclick="addToCart(${item.id})">Adicionar ao carrinho</button>
    `;
    menuItemsDiv.appendChild(itemDiv);
  });
}

// Placeholder do carrinho
function addToCart(itemId) {
  console.log(`Item ${itemId} adicionado ao carrinho`);
}

// Fetch quando a página carregar
document.addEventListener("DOMContentLoaded", fetchMenuItems);
