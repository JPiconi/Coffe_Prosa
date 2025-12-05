const API = "http://localhost:8000";

// ---------------------------
// MÁSCARA DE CPF
// ---------------------------
function aplicarMascaraCPF(valor) {
    return valor
        .replace(/\D/g, '')            // remove tudo que não é número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Ativa máscara no input
document.getElementById("cpf").addEventListener("input", (e) => {
    e.target.value = aplicarMascaraCPF(e.target.value);
});


// ---------------------------
// VALIDADORES
// ---------------------------

// Nome
function validarNome(nome) {
    if (nome.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
    return null;
}

// Email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "E-mail inválido.";
    return null;
}

// CPF
function validarCPF(cpf) {
    if (!/^\d{11}$/.test(cpf)) {
        return "O CPF deve conter exatamente 11 números.";
    }
    return null;
}

// Data de nascimento
function validarData(birthday) {
    if (!birthday) return "A data de nascimento é obrigatória.";

    const dataNasc = new Date(birthday);
    const hoje = new Date();

    if (dataNasc > hoje) {
        return "A data de nascimento não pode ser no futuro.";
    }

    const idade =
        hoje.getFullYear() -
        dataNasc.getFullYear() -
        (hoje < new Date(hoje.getFullYear(), dataNasc.getMonth(), dataNasc.getDate()) ? 1 : 0);

    if (idade < 13) return "É necessário ter pelo menos 13 anos.";

    return null;
}

// Senha
function validarSenha(senha) {
    const erros = [];

    if (senha.length < 8)
        erros.push("A senha deve ter pelo menos 8 caracteres.");

    if (!/[A-Z]/.test(senha))
        erros.push("A senha deve conter pelo menos 1 letra maiúscula.");

    if (!/[a-z]/.test(senha))
        erros.push("A senha deve conter pelo menos 1 letra minúscula.");

    if (!/[0-9]/.test(senha))
        erros.push("A senha deve conter pelo menos 1 número.");

    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(senha))
        erros.push("A senha deve conter pelo menos 1 caractere especial.");

    return erros;
}


// ---------------------------
// ENVIO DO FORMULÁRIO
// ---------------------------

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const birthday = document.getElementById("dataNascimento").value;
    const cpf = document.getElementById("cpf").value.replace(/\D/g, ""); // ← remove máscara
    const msgError = document.querySelector(".msgError");

    msgError.innerHTML = "";
    msgError.style.color = "red";

    // ----------------------
    // VERIFICAÇÕES
    // ----------------------
    const erros = [];

    const erroNome = validarNome(name);
    if (erroNome) erros.push(erroNome);

    const erroEmail = validarEmail(email);
    if (erroEmail) erros.push(erroEmail);

    const erroCPF = validarCPF(cpf);
    if (erroCPF) erros.push(erroCPF);

    const erroData = validarData(birthday);
    if (erroData) erros.push(erroData);

    const errosSenha = validarSenha(password);
    erros.push(...errosSenha);

    if (password !== confirmPassword)
        erros.push("As senhas não coincidem.");

    // Se tiver erros → mostra e para tudo
    if (erros.length > 0) {
        msgError.innerHTML = erros.map(err => `• ${err}`).join("<br>");
        return;
    }

    // ----------------------
    // SE PASSOU NAS VERIFICAÇÕES → ENVIA AO BACKEND
    // ----------------------
    try {
        const response = await fetch(`${API}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, birthday, cpf })
        });

        const data = await response.json();

        if (!response.ok) {
            msgError.textContent = data.error || "Erro ao cadastrar usuário";
            msgError.style.color = "red";
            return;
        }

        msgError.style.color = "green";
        msgError.textContent = "Cadastro realizado com sucesso!";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (err) {
        msgError.textContent = "Erro de conexão com o servidor.";
    }
});
