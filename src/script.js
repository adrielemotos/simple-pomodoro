let botao5Min = document.getElementById("btn1");
let botao15Min = document.getElementById("btn2");
let botao25Min = document.getElementById("btn3");
let temporizador = document.getElementById("timer");
let botaoIniciar = document.getElementById("startBtn");
let intervaloId = null;
let segundosRestantes = 0;

// converte uma string 'MM:SS' em segundos (número)
function converterParaSegundos(t){
    const partes = t.split(":").map(Number);
    return partes[0] * 60 + partes[1];
}

// formata segundos como 'MM:SS'
function formatarTempo(s){
    const minutos = Math.floor(s / 60);
    const segundos = s % 60;
    return String(minutos).padStart(2, '0') + ':' + String(segundos).padStart(2, '0');
}


botao5Min.addEventListener("click", function () {
    if (intervaloId) return; 
    temporizador.innerText = "05:00"; 
});

botao15Min.addEventListener("click", function (){
    if (intervaloId) return; 
    temporizador.innerText = "15:00"; 
});

botao25Min.addEventListener("click", function (){
    if (intervaloId) return; 
    temporizador.innerText = "25:00"; 
});

// comportamento do botão iniciar/pausar
botaoIniciar.addEventListener("click", function(){
    if (!intervaloId){
        // iniciar a contagem
        segundosRestantes = converterParaSegundos(temporizador.innerText);
        if (segundosRestantes <= 0) return; // não inicia se já estiver zero
        // desabilita botão de selecionar duração enquanto conta
        botao5Min.disabled = botao15Min.disabled = botao25Min.disabled = true;
        botaoIniciar.innerText = "Pausar"; // altera texto para Pausar
        // cria o intervalo que reduz os segundos a cada segundo
        intervaloId = setInterval(() => {
            segundosRestantes--; // decrementa 1 segundo
            temporizador.innerText = formatarTempo(segundosRestantes); // atualiza display
            if (segundosRestantes <= 0){
                clearInterval(intervaloId); // para o intervalo quando chega a zero
                intervaloId = null; // marca como parado
                botaoIniciar.innerText = "Iniciar"; // restaura texto do botão
                // reativa os botões de duração
                botao5Min.disabled = botao15Min.disabled = botao25Min.disabled = false;
            }
        }, 1000);
    } else {
        // pausar a contagem
        clearInterval(intervaloId); // para o intervalo
        intervaloId = null; // marca como parado
        botaoIniciar.innerText = "Iniciar"; // restaura texto do botão
        // reativa os botões de duração
        botao5Min.disabled = botao15Min.disabled = botao25Min.disabled = false;
    }
});