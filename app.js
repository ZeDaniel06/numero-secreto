function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemVitoria = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1','Acertou!');
        exibirTextoNaTela('p', mensagemVitoria);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }else{
            exibirTextoNaTela('p','O número secreto é maior');
        }
        tentativas ++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

function novoJogo(){
    tentativas = 1;
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


mensagemInicial();

