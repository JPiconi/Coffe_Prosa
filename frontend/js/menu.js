/* menu.js
   - Carrega ../data/menu.json
   - Renderiza menu por categoria
   - Busca com debounce
   - Filtra vegano
   - Ordena
   - Destaque de categoria ao scroll/clicar
*/

const DATA_URL = "../data/menu.json";

let MENU_ITEMS = []; // cache de items carregados
let CURRENT_FILTER = { onlyVegan: false, sort: "default", query: "" };

// helper debounce
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// cria DOM do item
function createMenuItemElement(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "menu-item";
  wrapper.setAttribute("role", "listitem");

  // img
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.loading = "lazy";

  // title
  const h3 = document.createElement("h3");
  h3.textContent = item.name;

  // description
  const desc = document.createElement("p");
  desc.className = "item-desc";
  desc.textContent = item.description || "";

  // price
  const price = document.createElement("p");
  price.className = "item-price";
  const showPrice =
    CURRENT_FILTER.onlyVegan && item.vegan && item.veganPrice
      ? item.veganPrice
      : item.price;
  price.textContent = `R$ ${Number(showPrice).toFixed(2)}`;

  // actions
  const actions = document.createElement("div");
  actions.className = "item-actions";
  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn-add";
  addBtn.textContent = "Adicionar ao carrinho";
  addBtn.onclick = () => {
    // função definida em cart.js
    addToCart(item.id);
  };

  actions.appendChild(addBtn);

  wrapper.appendChild(img);
  wrapper.appendChild(h3);
  wrapper.appendChild(desc);
  wrapper.appendChild(price);
  wrapper.appendChild(actions);

  return wrapper;
}

function clearAllSections() {
  document
    .querySelectorAll(".menu-items")
    .forEach((div) => (div.innerHTML = ""));
}

function renderMenuItems(items) {
  // items: array filtrado/ordenado
  clearAllSections();

  // agrupa por categoria
  const grouped = items.reduce((acc, it) => {
    acc[it.category] = acc[it.category] || [];
    acc[it.category].push(it);
    return acc;
  }, {});

  // percorre seções do DOM
  document.querySelectorAll(".menu-section").forEach((section) => {
    const container = section.querySelector(".menu-items");
    const id = section.id;
    const list = grouped[id] || [];

    // se vazio, mostra mensagem
    if (list.length === 0) {
      container.innerHTML = `<p class="empty-msg">Nenhum item encontrado nesta seção.</p>`;
      return;
    }

    // cria elementos
    list.forEach((item) => {
      const el = createMenuItemElement(item);
      container.appendChild(el);
    });
  });
}

function applyFiltersAndRender() {
  const q = CURRENT_FILTER.query.trim().toLowerCase();
  let items = MENU_ITEMS.slice();

  // busca por nome / descrição
  if (q.length > 0) {
    items = items.filter((it) => {
      return (
        it.name.toLowerCase().includes(q) ||
        (it.description && it.description.toLowerCase().includes(q))
      );
    });
  }

  // vegano
  if (CURRENT_FILTER.onlyVegan) {
    items = items.filter((it) => it.vegan === true);
  }

  // ordenação
  switch (CURRENT_FILTER.sort) {
    case "price-asc":
      items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      break;
    case "price-desc":
      items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      break;
    case "name-asc":
      items.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // sem ordenação extra
      break;
  }

  renderMenuItems(items);
}

/* ---- Setup: busca, filtros e navegação de categorias ---- */
function setupControls() {
  const searchInput = document.getElementById("searchInput");
  const onlyVegan = document.getElementById("onlyVegan");
  const sortSelect = document.getElementById("sortSelect");

  // debounce search
  const deb = debounce((ev) => {
    CURRENT_FILTER.query = ev.target.value;
    applyFiltersAndRender();
  }, 220);

  searchInput.addEventListener("input", deb);

  onlyVegan.addEventListener("change", (ev) => {
    CURRENT_FILTER.onlyVegan = ev.target.checked;
    applyFiltersAndRender();
  });

  sortSelect.addEventListener("change", (ev) => {
    CURRENT_FILTER.sort = ev.target.value;
    applyFiltersAndRender();
  });
}

/* ---- Navegação por categorias: scroll suave + destaque do botão ativo ---- */
function setupCategoryNav() {
  const navButtons = document.querySelectorAll(".menu-nav .nav-btn");
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const sec = document.getElementById(id);
      if (sec) {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // toggle active
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ao rolar, atualiza botão ativo (interseção)
  const sections = document.querySelectorAll(".menu-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // encontra botão correspondente
          const id = entry.target.id;
          navButtons.forEach((b) => {
            if (b.getAttribute("data-target") === id) b.classList.add("active");
            else b.classList.remove("active");
          });
        }
      });
    },
    { root: null, threshold: 0.25 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---- Carrega menu.json ---- */
async function loadMenuData() {
  try {
    const resp = await fetch(DATA_URL, { cache: "no-cache" });
    if (!resp.ok) throw new Error("Falha ao buscar menu.json");
    const data = await resp.json();
    MENU_ITEMS = data;
    applyFiltersAndRender();
  } catch (err) {
    console.error("Erro carregando menu:", err);
    document
      .querySelectorAll(".menu-items")
      .forEach(
        (c) =>
          (c.innerHTML =
            "<p class='error-msg'>Erro ao carregar o cardápio.</p>")
      );
  }
}

/* ---- Inicialização ---- */
document.addEventListener("DOMContentLoaded", () => {
  setupControls();
  setupCategoryNav();
  loadMenuData();
});
