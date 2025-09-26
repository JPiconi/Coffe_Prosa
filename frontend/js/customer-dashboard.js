const customerDashboard = document.getElementById('customer-dashboard');
const orderList = document.getElementById('order-list');
const accountDetails = document.getElementById('account-details');

// Function to fetch customer orders
function fetchCustomerOrders() {
    fetch('/api/customers/orders')
        .then(response => response.json())
        .then(data => {
            displayOrders(data);
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Function to display orders in the dashboard
function displayOrders(orders) {
    orderList.innerHTML = '';
    orders.forEach(order => {
        const orderItem = document.createElement('li');
        orderItem.textContent = `Order ID: ${order.id}, Total: $${order.total}, Status: ${order.status}`;
        orderList.appendChild(orderItem);
    });
}

// Function to fetch customer account details
function fetchAccountDetails() {
    fetch('/api/customers/account')
        .then(response => response.json())
        .then(data => {
            displayAccountDetails(data);
        })
        .catch(error => {
            console.error('Error fetching account details:', error);
        });
}

// Function to display account details
function displayAccountDetails(details) {
    accountDetails.innerHTML = `
        <h2>Account Details</h2>
        <p>Name: ${details.name}</p>
        <p>Email: ${details.email}</p>
        <p>CPF: ${details.cpf}</p>
    `;
}

// Initialize the dashboard
function initDashboard() {
    fetchCustomerOrders();
    fetchAccountDetails();
}

// Call the init function on page load
document.addEventListener('DOMContentLoaded', initDashboard);