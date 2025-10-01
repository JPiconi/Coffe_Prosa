const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const cpf = document.getElementById('cpf').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        cpf: cpf
    };

    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            window.location.href = 'login.html';
        })
        .catch(error => {
            alert(error.message);
        });
});
