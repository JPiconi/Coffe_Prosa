const API = "http://localhost:8000";

// pegar token da URL SEM ERRO
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const tokenField = document.getElementById("token");
    if (tokenField) tokenField.value = token;

    document.getElementById("reset-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const password = document.getElementById("password").value;
        const msg = document.querySelector(".msgError");

        try {
            const response = await fetch(`${API}/users/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password })
            });

            const data = await response.json();

            if (!response.ok) {
                msg.style.color = "red";
                msg.textContent = data.error;
                return;
            }

            msg.style.color = "green";
            msg.textContent = "Senha redefinida com sucesso!";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        } catch (err) {
            msg.textContent = "Erro ao conectar com o servidor.";
            msg.style.color = "red";
        }
    });
});
