const btnComecar = document.querySelector(".btnComecar");
const addPalavra = document.querySelector(".addPalavra");
let palavras = [amereica, amendoin, jardim, computador, transporte, livraria, tecnologia, monitor, brinquedos];
let palavra = palavras.length
let inicio = false;
let desenho = [];
let acertos = [];
let erros = 0;

btnComecar.addEventListener('click', async () => {
    btnComecar.textContent = 'Novo Jogo';
    const index = Math.floor(Math.random() * palavras.length);
    let cadaPalavra = palavras[index];
    const secret = document.querySelector(".palavraSecreta");
    secret.innerHTML = '';
    for(let i = 0; i < cadaPalavra.length; i++) {
        const value = cadaPalavra[i] == '-' ? '- ' : cadaPalavra[i] == '\'' ? '\' ' : '_ ';
        secret.innerHTML += value;
    }
    inicio = true;
    reset(false); 
});


const reset = (desistir) => {
    for(let i = 14; i < 24; i++) {
        document.getElementById(`r${i}`).style.background = 'none';
        document.getElementById(`r${i}`).style.border = '1px solid #E5E5E5';
    }
    count = 14;
    document.querySelector('.mensagemFinal').innerHTML = '';
    document.querySelector('.erros').innerHTML = erros = [];
    document.getElementById('addPalavras').style.display = desistir ? 'block' : 'none';
    document.getElementById('addPalavra').style.display = desistir ? 'block' : 'none';
    document.getElementById('desistir').style.display = desistir ? 'none' : 'block';
    document.getElementById('forca').style.display = desistir ? 'none' : 'flex';

    if(document.getElementById('addPalavras').style.display == 'none'){
        document.getElementById('paginaInicial').style.height = 'auto';
        document.getElementById('paginaInicial').style.padding = '1%';
        document.getElementById('buttons').style.margin = '0';
        document.getElementById('buttons').style.padding = '0';
    }

    if(document.getElementById('addPalavras').style.display == 'block'){
        document.getElementById('paginaInicial').style.height = '100vh';
        document.getElementById('paginaInicial').style.padding = '5%';
        document.getElementById('buttons').style.margin = '2%';
        document.getElementById('buttons').style.padding = '4%';
        document.getElementById('forca').style.display = 'none';
    }

    if(document.getElementById('forca').style.display == 'none'){
        document.getElementById('forca').style.padding = '0';
        document.getElementById('forca').style.height = '1%';
        document.getElementById('canvas').style.height = '1%';
    }

    if(document.getElementById('forca').style.display == 'flex'){
        document.getElementById('forca').style.padding = '5%';
    }
    
}

document.getElementById('desistir').addEventListener('click', () => {
    reset(true);
    document.querySelector('.mensagemFinal').innerHTML = '';
    inicio = false;
});


document.querySelector("body").addEventListener('keypress', (e) => {

    const letra = e.key.toUpperCase();
    if(!letra.match(/[A-Z]/i) || erros.length === 10 || !inicio) return;
    if(palavras.indexOf(letra) < 0 && erros.indexOf(letra) < 0) {
        erros.push(letra);       
        document.querySelector('.erros').innerHTML = erros.join(' ');
        document.getElementById(`r${count++}`).style.background = '#0A3871';
        gameOver(null);
        return;
    }    
    const secret = document.querySelector(".palavraSecreta");
    secret.innerHTML = palavras.split('').map((l,i) => {
        if(l === letra) return '<u>'+l+'</u>'+' ';
        else return '<u>'+secret.textContent.replace(/\s+/g, '').split('')[i]+'</u>'+' ';
    }).join('');
    const resp = secret.textContent.replace(/\s+/g, '');
    gameOver(resp);
});

const gameOver = (resp) => {
    if(erros.length === 10 || resp == word) {
        document.querySelector('.mensagemFinal').innerHTML = (resp == word) ? 
                        'Você Venceu. Parabéns!' : 'Você perdeu! Jogue novamente!';
        inicio = false;
    }
}


const getWord = () => {
    const newWord = document.querySelector("#new-word");
    newWord.value = newWord.value.replace(/[^A-Z]/ig,"").toUpperCase();
}