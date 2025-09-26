const onboardingPage = document.getElementById('onboarding-page');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
    onboardingPage.style.display = 'none';
    window.location.href = 'login.html'; // Redirect to login page
});

// Function to display onboarding content
function displayOnboardingContent() {
    const content = `
        <h1>Welcome to Café&Prosa</h1>
        <p>Your cozy café experience awaits!</p>
        <p>Join us for delicious coffee, pastries, and a warm atmosphere.</p>
        <button id="start-button">Get Started</button>
    `;
    onboardingPage.innerHTML = content;
}

// Initialize onboarding page
document.addEventListener('DOMContentLoaded', () => {
    displayOnboardingContent();
});