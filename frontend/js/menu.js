const menuContainer = document.getElementById('menu-container');

function fetchMenuItems() {
    fetch('http://localhost:3000/menu')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayMenuItems(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayMenuItems(items) {
    menuContainer.innerHTML = '';
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(itemDiv);
    });
}

function addToCart(itemId) {
    // Logic to add item to cart
    console.log(`Item ${itemId} added to cart`);
}

// Fetch menu items when the page loads
document.addEventListener('DOMContentLoaded', fetchMenuItems);