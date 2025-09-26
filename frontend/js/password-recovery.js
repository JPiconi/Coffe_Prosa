const passwordRecoveryForm = document.getElementById('password-recovery-form');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');

passwordRecoveryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = emailInput.value;

    fetch('/api/auth/password-recovery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Password recovery failed');
        }
        return response.json();
    })
    .then(data => {
        messageDiv.textContent = data.message || 'Check your email for recovery instructions.';
        messageDiv.style.color = 'green';
    })
    .catch(error => {
        messageDiv.textContent = error.message;
        messageDiv.style.color = 'red';
    });
});