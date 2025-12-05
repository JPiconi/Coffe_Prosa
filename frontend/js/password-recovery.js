const API = "http://localhost:8000";

document.getElementById("password-recovery-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const msgError = document.querySelector(".msgError");

    const payload = { email };

    try {
        const response = await fetch(`${API}/users/recover-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            msgError.textContent = data.error || "Erro ao enviar e-mail.";
            msgError.style.color = "red";
            return;
        }

        msgError.style.color = "green";
        msgError.textContent = "Se o e-mail existir, enviaremos um link de recuperação.";

    } catch (err) {
        msgError.textContent = "Erro ao conectar com o servidor.";
        msgError.style.color = "red";
    }
});
