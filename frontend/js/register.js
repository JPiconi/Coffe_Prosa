console.log("JS CONECTADO!");

document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const name = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const cpf = document.getElementById('cpf').value;
    const birthday = document.getElementById('birthday').value;

    // Cria o objeto com os dados do usuário
    const userData = { name, email, password, cpf, birthday };

    try {
        // Faz a requisição POST para o backend
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const message = await response.text();
            alert(message);
        } else {
            const error = await response.text();
            alert(`Erro: ${error}`);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao conectar com o servidor.');
    }
});

/* ------ FUNÇÃO PARA RENDERIZAR AS DIFERENTES MENSAGENS DE ERRO! ------ */
const createDisplayMsgError = (mensagem) => {
    if (msgErrorElements.length > 0) {
        msgErrorElements[0].textContent = mensagem;
        msgErrorElements[0].style.display = mensagem ? "block" : "none";
    }
};
/* --------------------------------------------------------------------- */

/* ---------------- FUNÇÃO PARA VERIFICAR O NOME ----------------------- */
const checkNome = () => {
    const nomeRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
    return nomeRegex.test(nome.value.trim());
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR O EMAIL --------------------- */
const checkEmail = (emailValue) => {
    const emailTrimmed = emailValue.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailTrimmed)) {
        return false;
    }

    const partesEmail = emailTrimmed.split("@");
    if (partesEmail.length === 2) {
        const domain = partesEmail[1].toLowerCase();
        const allowedDomains = [
            "gmail.com",
            "outlook.com",
            "hotmail.com",
            "icloud.com",
            "yahoo.com",
        ];

        return true;
    }
    return false;
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR IGUALDADE DAS SENHAS --------------- */
function checkPasswordMatch() {
    return password.value === confirmPassword.value ? true : false;
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VERIFICAR FORÇA DA SENHA ------------------ */
function checkPasswordStrength(password) {
    if (!/[a-z]/.test(password)) {
        return "A senha deve ter pelo menos uma letra minúscula!";
    }
    if (!/[A-Z]/.test(password)) {
        return "A senha deve ter pelo menos uma letra maiúscula!";
    }
    if (!/[\W_]/.test(password)) {
        return "A senha deve ter pelo menos um caractere especial!";
    }
    if (!/\d/.test(password)) {
        return "A senha deve ter pelo menos um número!";
    }
    if (password.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres!";
    }

    return null;
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO DE MASCARA DE CPF ------------------ */

cpfInput.addEventListener("input", function (e) {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 3) {
        value = value.replace(/^(\d{3})(\d)/, '$1.$2');
    }
    if (value.length > 6) {
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (value.length > 9) {
        value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    e.target.value = value.slice(0, 14); // garante no máximo 14 caracteres
});



/* ------------- FUNÇÃO PARA VERIFICAR E ENVIAR DADOS ------------------ */
async function fetchDatas(event) {
    // Tornar a Função async para usar await
    event.preventDefault();
    createDisplayMsgError(""); //Limpa mensagens de erro anteriores

    if (!checkNome()) {
        //Correção aqui : chamar a função
        createDisplayMsgError(
            "O nome não pode conter números ou caracteres especiais!"
        );
        nome.focus();
        return;
    }

    if (!checkEmail(email.value)) {
        createDisplayMsgError(
            //Correção aqui: mensagem apropriada
            "O e-mail digitado não é valido ou não é de domínio permitido!"
        );
        email.focus();

        return;
    }



    const passError = checkPasswordStrength(password.value);
    if (passError) {
        createDisplayMsgError(passError);
        password.focus();
        return;
    }
    if (!checkPasswordMatch()) {
        createDisplayMsgError("As senhas não coincidem!");
        confirmPassword.focus();
        return;
    }

    const formData = {
        // `username`: Representa o nome de usuário inserido pelo usuário
        // `.trim()` é usado para remover quaisquer espaços em branco extras.
        // do início ou do fim da string do nome do usuário
        username: nome.value.trim(),

        // `email`: Armazena o endereço de e-mail fornecido
        // `.trim()` é usado para remover quaisquer espaços em branco extras.
        // desnecessários, garantindo que o e-mail seja processado corretamente.
        email: email.value.trim(),

        //`password`: Contém a senha digitada pelo usuário.
        //Importante: A senha não deve ser "Trimmed" (não se deve usar .trim())
        //porque espaços no ínicio ou no fim podem ser intencionais e parte da senha escolhida
        password: password.value,

        //replace(/\D/d, "") usado para remover todos os carcteres que não são digitos
        cpf: cpf.value.replace(/\D/g, ""),

    };

    console.log("Dados a serem enviados: ", JSON.stringify(formData, null, 2));

    // ---- INÍCIO DA LÓGICA DE ENVIO ----
    try {
        const response = await fetch("/register", {
            method: "POST", //método HTTP 200
            headers: {
                "Content-Type": "application/json", //Indicando que estamos enviando JSON
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            const result = await response.json();
            console.log("Sucesso: ", result);
            formulario.reset();
            alert("Cadastro realizado com sucesso! " + (result.message || ""));
            window.location.href = "/index";
        } else {
            const errorData = await response.json().catch(() => ({
                message: "Erro ao processar a resposta do servidor.",
            }));
            console.error("Erro do servidor:", response.status, errorData);
            createDisplayMsgError(
                `Erro: ${errorData.message || response.statusText}`
            );
        }
    } catch (error) {
        console.error("Erro na requisição: ", error);
        createDisplayMsgError("Erro de conexão. Por Favor, tente novamente");
    }
    // ---FIM DA LÓGICA DE ENVIO ---
}
/* --------------------------------------------------------------------- */

formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
    if (nome.value && !checkNome()) {
        createDisplayMsgError(
            "O nome não pode conter números ou caracteres especiais!"
        );
    } else {
        createDisplayMsgError("");
    }
});

email.addEventListener("input", () => {
    if (email.value && !checkEmail(email.value)) {
        createDisplayMsgError("O e-mail digitado não é valido!");
    } else {
        createDisplayMsgError("");
    }
});

password.addEventListener("input", () => {
    if (password.value && checkPasswordStrength(password.value)) {
        createDisplayMsgError(checkPasswordStrength(password.value));
    } else {
        createDisplayMsgError("");
    }
});

function checkPasswordStrength(senha) {
    if (!/[a-z]/.test(password)) {
        return "A senha deve ter pelo menos uma letra minúscula!";
    }
    if (!/[A-Z]/.test(password)) {
        return "A senha deve ter pelo menos uma letra maiúscula!";
    }
    if (!/[\W_]/.test(password)) {
        return "A senha deve ter pelo menos um caractere especial!";
    }
    if (!/\d/.test(password)) {
        return "A senha deve ter pelo menos um número!";
    }
    if (password.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres!";
    }

    return null;
}
