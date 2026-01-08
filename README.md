# Pomodoro Timer

Pequeno projeto em HTML/CSS/JavaScript que implementa um temporizador Pomodoro simples.

Veja abaixo uma demonstração rápida do temporizador. Se o vídeo não reproduzir diretamente no GitHub, use o link de download.

<video src="src/assets/Gravando 2026-01-08 110206.mp4" controls width="720" style="max-width:100%; border-radius:8px; box-shadow:0 6px 18px rgba(0,0,0,0.12);">Seu navegador não suporta vídeo embutido.</video>

- Download: [Gravando 2026-01-08 110206.mp4](src/assets/Gravando%202026-01-08%20110206.mp4)

## Visão Geral
- Permite escolher durações rápidas (05:00, 15:00, 25:00).
- Botão `Iniciar` inicia a contagem regressiva e vira `Pausar` enquanto está rodando.
- Durante a contagem os botões de duração são desabilitados; quando chega em `00:00` os botões são reativados.

## Como usar
1. Abra o arquivo `index.html` no navegador (duplo-clique ou arraste-o para o navegador).
2. Clique em um dos botões de duração (`05:00`, `15:00`, `25:00`).
3. Clique em `Iniciar` para começar a contagem; o botão passa a `Pausar`.
4. Clique em `Pausar` para interromper temporariamente; clique em `Iniciar` para retomar.

## Estrutura de arquivos
- `index.html` - marcação da página e botões.
- `style.css` - estilos visuais.
- `script.js` - lógica do temporizador (seleção de duração, iniciar/pausar, formatação de tempo).

## Notas para desenvolvedores

## Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.
