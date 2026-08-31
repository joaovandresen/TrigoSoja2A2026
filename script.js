const botao = document.getElementById("botao-tema");

botao.onclick = function() {
    document.body.classList.toggle("tema-escuro");
    
    if (botao.textContent == "🌙") {
        botao.textContent = "☀️";
    } else {
        botao.textContent = "🌙";
    }
};