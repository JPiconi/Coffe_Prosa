const API = "http://localhost:8000";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const msgError = document.querySelector(".msgError");

    msgError.textContent = "";
    msgError.style.color = "red";

    // ---------------------------
    // VALIDAÇÕES NO FRONTEND
    // ---------------------------

    // Email vazio
    if (email.length === 0) {
        msgError.textContent = "Por favor, informe seu e-mail.";
        return;
    }

    // Verificar formato do e-mail
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        msgError.textContent = "Formato de e-mail inválido.";
        return;
    }

    // Senha vazia
    if (password.length === 0) {
        msgError.textContent = "Por favor, informe sua senha.";
        return;
    }

    // ---------------------------
    // ENVIO AO BACKEND
    // ---------------------------
    try {
        const response = await fetch(`${API}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // Se o backend retornar erro (ex: usuário não existe ou senha incorreta)
        if (!response.ok) {
            msgError.textContent = data.error || "Erro ao fazer login";
            msgError.style.color = "red";
            return;
        }

        // SALVA O ID DO USUÁRIO NA SESSÃO
        localStorage.setItem("userId", data.userId);

        msgError.style.color = "green";
        msgError.textContent = "Login realizado com sucesso!";

        // Redireciona
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1200);

    } catch (err) {
        msgError.textContent = "Erro de conexão com o servidor";
        msgError.style.color = "red";
    }
});
