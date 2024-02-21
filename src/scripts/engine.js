const state = {
    view: {
        celulas: document.querySelectorAll(".celula"),
        inimigo: document.querySelector(".inimigo"),
        tempoRestante: document.querySelector("#tempo-restante"),
        pontos: document.querySelector("#pontos"),
    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        velocidadeJogo: 1000,
        posicaoInimigo: 0,
        pontuacao: 0,
        tempoRestante: 60,
    },
}

function celulaAleatoria(){
    state.view.celulas.forEach((celula) => {
        celula.classList.remove("inimigo");
    });

    state.values.posicaoInimigo = Math.floor(Math.random() * 9);
    let celulaAleatoria = state.view.celulas[state.values.posicaoInimigo];

    celulaAleatoria.classList.add("inimigo");

}

function moverInimigo(){
    state.values.timerId = setInterval(celulaAleatoria, state.values.velocidadeJogo);
}

function removerInimigo(celulaId){
    state.view.celulas[celulaId].classList.remove("inimigo");
}

function countDown(){
    state.values.tempoRestante--;
    state.view.tempoRestante.textContent = state.values.tempoRestante;

    if(state.values.tempoRestante <= 0)
        alert("Acabou! O seu resultado foi: " + state.values.pontuacao);
}

function addListenerHitBox(){
    state.view.celulas.forEach((celula) => {

        celula.addEventListener("mousedown", () => {
            if(celula.id == state.values.posicaoInimigo){
                state.values.pontuacao++;
                state.view.pontos.textContent = state.values.pontuacao;
                removerInimigo(state.values.posicaoInimigo);
                state.values.posicaoInimigo = null;
            }
        });

    });
}

function init() {
    addListenerHitBox();
    moverInimigo();
}

init();