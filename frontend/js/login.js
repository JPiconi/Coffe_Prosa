const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            errorMessage.textContent = errorData.error || 'Login failed. Please try again.';
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token for authenticated requests
        window.location.href = 'customer-dashboard.html'; // Redirect to customer dashboard
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});