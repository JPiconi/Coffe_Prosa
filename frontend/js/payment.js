const paymentForm = document.getElementById('payment-form');
const totalPriceElement = document.getElementById('total-price');
const paymentMethodSelect = document.getElementById('payment-method');
const submitButton = document.getElementById('submit');

paymentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const paymentData = {
        total: totalPriceElement.textContent,
        method: paymentMethodSelect.value,
    };

    fetch('/api/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Payment processing failed');
            }
            return response.json();
        })
        .then(data => {
            alert('Payment successful: ' + data.message);
            // Redirect to a success page or update the UI accordingly
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
});

// Function to update total price dynamically (if needed)
function updateTotalPrice(newPrice) {
    totalPriceElement.textContent = newPrice.toFixed(2);
}
