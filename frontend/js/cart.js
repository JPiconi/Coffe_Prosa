const cart = [];

// Function to add an item to the cart
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    updateCartDisplay();
}

// Function to update the quantity of an item in the cart
function updateItemQuantity(itemId, quantity) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        }
    }
    updateCartDisplay();
}

// Function to calculate the total price of the cart
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `Total: $${calculateTotal()}`;
    cartContainer.appendChild(totalElement);
}

// Event listener for the checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        // Proceed to payment or another action
        alert('Proceeding to payment...');
    }
});

// Initial display update
updateCartDisplay();