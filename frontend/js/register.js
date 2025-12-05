console.log("JS CONECTADO!");

<<<<<<< HEAD
const name = document.getElementById('nome').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirmPassword').value;
const cpf = document.getElementById('cpf').value;
const birthday = document.getElementById('birthday').value;

=======
const formulario = document.getElementById("registerForm");
const nome = document.getElementById("name");
const email = document.getElementById("email");
const senha = document.getElementById("password");
const confirmarSenha = document.getElementById("confirmPassword");
const cpfInput = document.getElementById("cpf");
const msgErrorElements = document.getElementsByClassName("msgError");

/* ------ FUNÇÃO PARA RENDERIZAR AS DIFERENTES MENSAGENS DE ERRO! ------ */
>>>>>>> 342ffbc707fff7c6bbe1abf63e0dc21cd2b30a37
const createDisplayMsgError = (mensagem) => {
    if (msgErrorElements.length > 0) {
        msgErrorElements[0].textContent = mensagem;
        msgErrorElements[0].style.display = mensagem ? "block" : "none";
    }
};

const checkNome = () => {
    const nomeRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
    return nomeRegex.test(nome.value.trim());
};

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

function checkPasswordMatch() {
    return senha.value === confirmarSenha.value ? true : false;
}

<<<<<<< HEAD
function checkPasswordStrength(password) {
    if (!/[a-z]/.test(password)) {
=======
/* ------------- FUNÇÃO PARA VERIFICAR FORÇA DA SENHA ------------------ */
function checkPasswordStrength(senha) {
    if (!/[a-z]/.test(senha)) {
>>>>>>> 342ffbc707fff7c6bbe1abf63e0dc21cd2b30a37
        return "A senha deve ter pelo menos uma letra minúscula!";
    }
    if (!/[A-Z]/.test(senha)) {
        return "A senha deve ter pelo menos uma letra maiúscula!";
    }
    if (!/[\W_]/.test(senha)) {
        return "A senha deve ter pelo menos um caractere especial!";
    }
    if (!/\d/.test(senha)) {
        return "A senha deve ter pelo menos um número!";
    }
    if (senha.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres!";
    }

    return null;
}


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



    const senhaError = checkPasswordStrength(senha.value);
    if (senhaError) {
        createDisplayMsgError(senhaError);
        senha.focus();
        return;
    }
    if (!checkPasswordMatch()) {
        createDisplayMsgError("As senhas não coincidem!");
        confirmarSenha.focus();
        return;
    }

    const formData = {
        username: nome.value.trim(),
        email: email.value.trim(),
<<<<<<< HEAD
        password: password.value,
=======

        //`password`: Contém a senha digitada pelo usuário.
        //Importante: A senha não deve ser "Trimmed" (não se deve usar .trim())
        //porque espaços no ínicio ou no fim podem ser intencionais e parte da senha escolhida
        password: senha.value,

        //replace(/\D/d, "") usado para remover todos os carcteres que não são digitos
>>>>>>> 342ffbc707fff7c6bbe1abf63e0dc21cd2b30a37
        cpf: cpf.value.replace(/\D/g, ""),

    };

    console.log("Dados a serem enviados: ", JSON.stringify(formData, null, 2));
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
}

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

senha.addEventListener("input", () => {
    if (senha.value && checkPasswordStrength(senha.value)) {
        createDisplayMsgError(checkPasswordStrength(senha.value));
    } else {
        createDisplayMsgError("");
    }
});

function checkPasswordStrength(senha) {
    if (!/[a-z]/.test(senha)) {
        return "A senha deve ter pelo menos uma letra minúscula!";
    }
    if (!/[A-Z]/.test(senha)) {
        return "A senha deve ter pelo menos uma letra maiúscula!";
    }
    if (!/[\W_]/.test(senha)) {
        return "A senha deve ter pelo menos um caractere especial!";
    }
    if (!/\d/.test(senha)) {
        return "A senha deve ter pelo menos um número!";
    }
    if (senha.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres!";
    }

    return null;
}

function validarDataAniversario(birthday) {
    // 1. Criar objetos Date para a data de nascimento e a data atual
    const dataAtual = new Date();
    const dataNascimento = new Date(birthday); // Espera-se o formato YYYY-MM-DD para compatibilidade

    // 2. Verificar se a data é válida (isNaN)
    // Uma data inválida em JS resulta em um objeto Date cujo getTime() é NaN
    if (isNaN(dataNascimento.getTime())) {
        return "Data inválida.";
    }

    // 3. Verificar se a data não é futura
    if (dataNascimento > dataAtual) {
        return "A data de nascimento não pode ser no futuro.";
    }

    // 4. (Opcional) Verificar idade mínima (exemplo: 18 anos)
    const idadeMinima = 18;
    const dataMinimaNascimento = new Date();
    // Define a data mínima de nascimento (hoje - 18 anos)
    dataMinimaNascimento.setFullYear(dataAtual.getFullYear() - idadeMinima);

    if (dataNascimento > dataMinimaNascimento) {
        return "Você deve ter pelo menos " + idadeMinima + " anos de idade.";
    }
    return "Data de nascimento válida.";
}
