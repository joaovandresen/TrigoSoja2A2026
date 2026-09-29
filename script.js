const botaoTema = document.getElementById("botao-tema");

botaoTema.onclick = function () {
    document.body.classList.toggle("tema-escuro");

    if (botaoTema.textContent === "🌙") {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }
};

const formulario = document.querySelector("#formulario-contato");
const resposta = document.querySelector("#resposta-formulario");
const botaoEnviar = formulario.querySelector("button");
const campoTelefone = document.querySelector("#telefone");

campoTelefone.addEventListener("input", function () {
    let numeros = campoTelefone.value.replace(/\D/g, "");

    numeros = numeros.slice(0, 11);

    if (numeros.length <= 2) {
        campoTelefone.value = numeros
            ? `(${numeros}`
            : "";

    } else if (numeros.length <= 3) {
        campoTelefone.value = numeros.replace(
            /(\d{2})(\d{0,1})/,
            "($1) $2"
        );

    } else if (numeros.length <= 7) {
        campoTelefone.value = numeros.replace(
            /(\d{2})(\d{1})(\d{0,4})/,
            "($1) $2 $3"
        );

    } else {
        campoTelefone.value = numeros.replace(
            /(\d{2})(\d{1})(\d{4})(\d{0,4})/,
            "($1) $2 $3-$4"
        );
    }
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    resposta.textContent = "";

    fetch(formulario.action, {
        method: "POST",
        body: new FormData(formulario),
        headers: {
            Accept: "application/json"
        }
    })
        .then(function (retorno) {
            if (!retorno.ok) {
                throw new Error();
            }

            resposta.textContent = "Mensagem enviada com sucesso!";
            resposta.className = "aviso-formulario sucesso";

            formulario.reset();
        })
        .catch(function () {
            resposta.textContent =
                "Não foi possível enviar. Verifique a internet e tente novamente.";

            resposta.className = "aviso-formulario erro";
        })
        .finally(function () {
            botaoEnviar.disabled = false;
            botaoEnviar.textContent = "Enviar";
        });
});