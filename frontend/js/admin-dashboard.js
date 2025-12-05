const API = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadUsers();

    const form = document.getElementById("add-menu-item-form");
    form.addEventListener("submit", createProduct);
});

// ------------------ CRIAR PRODUTO ------------------

async function createProduct(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = Number(document.getElementById("price").value);

    const payload = {
        name,
        category,
        description,
        qtde_stock: 0,
        price_purchase: price,
        price_sale: price
    };

    try {
        const response = await fetch(`${API}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Erro ao criar produto");
            return;
        }

        alert("Produto adicionado com sucesso!");
        loadProducts();

    } catch (err) {
        alert("Erro ao conectar com o servidor");
    }
}


// ------------------ LISTAR PRODUTOS ------------------

async function loadProducts() {
    const list = document.getElementById("menu-items");

    try {
        const response = await fetch(`${API}/products`);
        const data = await response.json();

        if (!response.ok) {
            list.innerHTML = "<li>Erro ao carregar produtos.</li>";
            return;
        }

        list.innerHTML = data.products
            .map(prod => `
                <li>
                    ${prod.name} — R$ ${Number(prod.price_sale).toFixed(2)}
                    (${prod.category})
                </li>
            `)
            .join("");

    } catch (err) {
        list.innerHTML = "<li>Erro ao conectar com o servidor.</li>";
    }
}


// ------------------ LISTAR USUÁRIOS ------------------

async function loadUsers() {
    const list = document.getElementById("customers");

    try {
        const response = await fetch(`${API}/users`);
        const data = await response.json();

        if (!response.ok) {
            list.innerHTML = "<li>Erro ao carregar usuários.</li>";
            return;
        }

        list.innerHTML = data.users
            .map(u => `
                <li>${u.name} — ${u.email} — CPF: ${u.cpf}</li>
            `)
            .join("");

    } catch (err) {
        list.innerHTML = "<li>Erro ao conectar com o servidor.</li>";
    }
}
