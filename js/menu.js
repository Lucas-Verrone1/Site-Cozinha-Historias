const botoes = document.querySelectorAll(".toggle-btn");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {

        const categoria = botao.parentElement;
        const conteudo = categoria.querySelector(".conteudo");
        const seta = botao.querySelector(".seta");

        categoria.classList.toggle("aberto");
        botao.classList.toggle("ativo");

        if (categoria.classList.contains("aberto")) {
            conteudo.style.maxHeight = conteudo.scrollHeight + "px";
            seta.textContent = "▲";
        } else {
            conteudo.style.maxHeight = 0;
            seta.textContent = "▼";
        }
        
    });
});
