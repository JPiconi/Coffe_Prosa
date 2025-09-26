const adminDashboard = (() => {
    const menuTableBody = document.getElementById('menu-table-body');
    const customerTableBody = document.getElementById('customer-table-body');

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('/api/admin/menu');
            const menuItems = await response.json();
            renderMenuItems(menuItems);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const renderMenuItems = (menuItems) => {
        menuTableBody.innerHTML = '';
        menuItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.category}</td>
                <td>
                    <button onclick="adminDashboard.editMenuItem(${item.id})">Edit</button>
                    <button onclick="adminDashboard.deleteMenuItem(${item.id})">Delete</button>
                </td>
            `;
            menuTableBody.appendChild(row);
        });
    };

    const addMenuItem = async (menuItem) => {
        try {
            const response = await fetch('/api/admin/menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItem),
            });
            if (response.ok) {
                fetchMenuItems();
            } else {
                console.error('Failed to add menu item');
            }
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    const editMenuItem = async (id) => {
        const menuItem = prompt('Enter new menu item details (name, description, price, category) separated by commas:');
        if (menuItem) {
            const [name, description, price, category] = menuItem.split(',');
            await updateMenuItem(id, { name, description, price, category });
        }
    };

    const updateMenuItem = async (id, menuItem) => {
        try {
            const response = await fetch(`/api/admin/menu/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItem),
            });
            if (response.ok) {
                fetchMenuItems();
            } else {
                console.error('Failed to update menu item');
            }
        } catch (error) {
            console.error('Error updating menu item:', error);
        }
    };

    const deleteMenuItem = async (id) => {
        if (confirm('Are you sure you want to delete this menu item?')) {
            try {
                const response = await fetch(`/api/admin/menu/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchMenuItems();
                } else {
                    console.error('Failed to delete menu item');
                }
            } catch (error) {
                console.error('Error deleting menu item:', error);
            }
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch('/api/admin/customers');
            const customers = await response.json();
            renderCustomers(customers);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const renderCustomers = (customers) => {
        customerTableBody.innerHTML = '';
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.created_at}</td>
            `;
            customerTableBody.appendChild(row);
        });
    };

    return {
        fetchMenuItems,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        fetchCustomers,
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    adminDashboard.fetchMenuItems();
    adminDashboard.fetchCustomers();
});