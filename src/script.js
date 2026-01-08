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
                // toca campainha suave ao terminar
                try { tocarCampainha(); } catch (e) { /* silencioso */ }
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

// Relógio no canto superior esquerdo
function atualizarRelogio() {
    const el = document.getElementById('clock');
    if (!el) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    el.innerText = `${hh}:${mm}:${ss}`;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

// toca campainha suave com duração aproximada de 2.8s usando Web Audio
function tocarCampainha() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Osciladores suaves e um leve LFO para movimento natural
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();
    const lp = ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(520, now);
    osc2.frequency.setValueAtTime(780, now);
    osc2.detune.setValueAtTime(7, now);

    // LFO lento para pequenos movimentos de afinação (mais orgânico)
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.45, now);
    lfoGain.gain.setValueAtTime(4, now); // +/- 4Hz detune
    lfo.connect(lfoGain);
    lfoGain.connect(osc2.detune);

    // filtro lowpass para suavizar
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3000, now);
    lp.Q.setValueAtTime(0.8, now);

    // toque suave: ataque levemente arredondado, decaimento longo
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    // montar rota de áudio
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(lp);
    lp.connect(ctx.destination);

    // iniciar fontes
    lfo.start(now);
    osc1.start(now);
    osc2.start(now);

    // parar após ~2.85s
    const stopAt = now + 2.85;
    osc1.stop(stopAt);
    osc2.stop(stopAt);
    lfo.stop(stopAt);

    // fechar contexto após reprodução
    setTimeout(() => { try { ctx.close(); } catch (e) {} }, 3400);
}