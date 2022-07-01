/* ------------------------- VARIÁVEIS ------------------------- */
let dadosDosQuizzes = [];
let pegarClasseConteudoNoHtml = document.querySelector('.conteudo');
let tituloQuizz;
let URLQuizz;
let qtdPerguntas;
let qtdNiveis;
let pagCriacaoPerguntas;
let tituloPergunta;
let corPergunta;
let respostaCorreta;
let URLRespostaCorreta;



/* ------------------------- FUNÇÕES DE CRIAÇÃO ------------------------- */

function criarQuizz() {
    pegarClasseConteudoNoHtml.innerHTML = `
    <div class="pag-criacao-quizz">
            <h2 class="titulo-instrucao">Comece pelo começo</h2>
            <div class="caixa-especificacoes">
                <input type="text" name="tituloQuizz" maxlength="65" placeholder="Título do seu quizz">
                <input type="text" name="URLQuizz" placeholder="URL da imagem do seu quizz">
                <input type="text" name="qtdPerg" placeholder="Quantidade de perguntas do seu quizz">
                <input type="text" name="qtdNiveis" placeholder="Quantidade de níveis do seu quizz">
            </div>
            <div class="botao criar-perguntas" onclick="checagemEspecificacoes()">
                <h2>Prosseguir para criar perguntas</h2>
            </div>
        </div>
    `
}

function checagemEspecificacoes() {
    tituloQuizz = document.querySelector(".caixa-especificacoes input:nth-child(1)").value;
    URLQuizz = document.querySelector(".caixa-especificacoes input:nth-child(2)").value;
    qtdPerguntas = Number(document.querySelector(".caixa-especificacoes input:nth-child(3)").value);
    qtdNiveis = Number(document.querySelector(".caixa-especificacoes input:nth-child(4)").value);
    if(tituloQuizz.length >= 20 && (URLQuizz.startsWith('https://') || URLQuizz.startsWith('http://')) && qtdPerguntas >= 3 && qtdNiveis >= 2) {
        prosseguirParaPerguntas();
    } else {
        alert("Preencha os dados corretamente");
    }
}

function prosseguirParaPerguntas() {
    pegarClasseConteudoNoHtml.innerHTML = `
    <div class="pag-criacao-perguntas">
            <h2 class="titulo-instrucao">Crie suas perguntas</h2>
    </div>
    `
    adicionarCaixasDePerguntas();
}

function adicionarCaixasDePerguntas() {
    pagCriacaoPerguntas = document.querySelector(".pag-criacao-perguntas");
    for(let i = 0; i < qtdPerguntas; i++) {
        pagCriacaoPerguntas.innerHTML += `
        <div class="caixa-perguntas pergunta${i + 1}">
                <div class="numero-pergunta">
                    <h2 class="subtitulo-instrucao">Pergunta ${i + 1}</h2>
                    <input type="text" name="pergunta" placeholder="Texto da pergunta">
                    <input type="text" name="corPergunta" maxlength="7" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="resposta-correta">
                    <h2 class="subtitulo-instrucao">Resposta correta</h2>
                    <input type="text" name="resposta" placeholder="Resposta correta">
                    <input type="text" name="URLResposta" placeholder="URL da imagem">
                </div>
                <div class="respostas-incorretas">
                    <h2 class="subtitulo-instrucao">Respostas incorretas</h2>
                    <input type="text" name="respostaIncorreta1" placeholder="Resposta incorreta 1">
                    <input type="text" name="URLRespostaIncorreta1" placeholder="URL da imagem 1">
                    <input type="text" name="respostaIncorreta2" placeholder="Resposta incorreta 2">
                    <input type="text" name="URLRespostaIncorreta2" placeholder="URL da imagem 2">
                    <input type="text" name="respostaIncorreta3" placeholder="Resposta incorreta 3">
                    <input type="text" name="URLRespostaIncorreta3" placeholder="URL da imagem 3">
                </div>
        </div>
        `
    }
    adicionarBotaoParaNiveis();
}

function adicionarBotaoParaNiveis() {
    pagCriacaoPerguntas.innerHTML += `
    <div class="botao criar-niveis" onclick="checagemPerguntas()">
        <h2>Prosseguir para criar níveis</h2>
    </div>
    `
}

function checagemPerguntas() {
    for(let i = 0; i < qtdPerguntas; i++) {
        tituloPergunta = document.querySelector(`.pergunta${i + 1} .numero-pergunta input:nth-child(2)`).value;
        corPergunta = document.querySelector(`.pergunta${i + 1} .numero-pergunta input:nth-child(3)`).value;
        if(tituloPergunta.length >= 20 && corPergunta.startsWith('#')/*&& corPergunta números ou letras de A a F*/) {
            checagemRespostaCorreta()
        } else {
            alert("Preencha os dados corretamente");
        }
    }
}

function checagemRespostaCorreta() {
    for(let i = 0; i < qtdPerguntas; i++) {
        respostaCorreta = document.querySelector(`.pergunta${i + 1} .resposta-correta input:nth-child(2)`).value;
        URLRespostaCorreta = document.querySelector(`.pergunta${i + 1} .numero-pergunta input:nth-child(3)`).value;
        if(respostaCorreta !== undefined && (URLRespostaCorreta.startsWith('https://') || URLRespostaCorreta.startsWith('http://'))) {
            prosseguirParaNiveis();
        } else {
            alert("Preencha os dados corretamente");
        }
    }
}

 function prosseguirParaNiveis() {
    pegarClasseConteudoNoHtml.innerHTML = `
    <div class="pag-criacao-niveis">
        <h2 class="titulo-instrucao">Agora, decida os níveis</h2>
    </div>
     `
     adicionarCaixasDeNiveis();
 }

 function adicionarCaixasDeNiveis() {
    pagCriacaoNiveis = document.querySelector(".pag-criacao-niveis");
    for(let i = 0; i < qtdNiveis; i++) {
        pagCriacaoNiveis.innerHTML += `
        <div class="caixa-niveis">
                <h2 class="subtitulo-instrucao">Nível ${i + 1}</h2>
                <input type="text" name="tituloNivel" placeholder="Título do nível">
                <input type="text" name="%Acerto" placeholder="% de acerto mínima">
                <input type="text" name="URLNivel" placeholder="URL da imagem do nível">
                <input type="text" name="desricaoNivel" placeholder="Descrição do nível">
            </div>
            
        `
    }
    adicionarBotaoFinal();
 }

 function adicionarBotaoFinal() {
    pagCriacaoNiveis.innerHTML += `
    <div class="botao criar-niveis">
        <h2>Finalizar Quizz</h2>
    </div>
    `
 }


































/* ------------------------- FUNÇÕES DE LISTAGENS ------------------------- */

listarTodosQuizzes();

function listarTodosQuizzes() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    promise.then(pegarDadosDosQuizzes);
    promise.catch(errorPegarDados);
}

function pegarDadosDosQuizzes(resposta) {
    dadosDosQuizzes = resposta.data;
    quizzesDeOutrosUsuarios();
}


// if(id !== idsUsuario) { "roda a funcao quizzesDeOutrosUsuarios" } else if(id === idsUsuario) { "guardar na lista de quizzes do usuario" }

function quizzesDeOutrosUsuarios() {

    pegarClasseConteudoNoHtml.innerHTML += `
        <div class="todos-quizzes">
            <h2>Todos os Quizzes</h2>
            <div class="lista-todos-quizzes">
            </div>
        </div>
    `

    let pegarClasseListaTodosQuizzesNoHtml = document.querySelector('.lista-todos-quizzes');

    for(let i = 0; i < dadosDosQuizzes.length; i++) {
        pegarClasseListaTodosQuizzesNoHtml.innerHTML += `
            <div onclick="acessarQuizzOutroUsuario(this)">
                <img src="${dadosDosQuizzes[i].image}">
                <p>${dadosDosQuizzes[i].title}</p>
            </div>
        `
    }

    console.log(dadosDosQuizzes)
}

function errorPegarDados() {
    alert('deu erro');
}


function acessarQuizzOutroUsuario(element) {
    let imagemQuizzCLicado = element.querySelector('img').src;
    let tituloQuizzCLicado = element.querySelector('p').innerHTML;
    
    pegarClasseConteudoNoHtml.innerHTML = `
        <div class="banner-pagina-de-um-quizz">
            <img src="${imagemQuizzCLicado}">
            <h2>${tituloQuizzCLicado}</h2>
        </div> 
    `


    pegarClasseConteudoNoHtml.innerHTML += `
        <div class="pagina-de-um-quizz-inteiro">
            <div class="quizz">
                <span><h3>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h3></span>

                <div class="caixa-imagens-quizz">
                    <div>
                        <img src="./assets/simpsons.png" width="330px" height="175px">
                        <p>Gatíneo</p>
                    </div>
                    <div>
                        <img src="./assets/simpsons.png" width="300px">
                        <p>Gatíneo</p>
                    </div>
                    <div>
                        <img src="./assets/simpsons.png" width="300px">
                        <p>Gatíneo</p>
                    </div>
                    <div>
                        <img src="./assets/simpsons.png" width="300px">
                        <p>Gatíneo</p>
                    </div>
                </div>
            </div>

            <div class="quizz">
                <span><h3>Em qual animal Olho-Tonto Moody transfigurou Malfoy?</h3></span>

                <div class="caixa-imagens-quizz">
                    <div>
                        <img src="./assets/simpsons.png" width="330px" height="175px">
                        <p>Gatíneo</p>
                    </div>
                    <div>
                        <img src="./assets/simpsons.png" width="300px">
                        <p>Gatíneo</p>
                    </div>
                    <div>
                        <img src="./assets/simpsons.png" width="300px">
                        <p>Gatíneo</p>
                    </div>
                    <div>
                        <img src="./assets/simpsons.png" width="300px">
                        <p>Gatíneo</p>
                    </div>
                </div>
            </div>
        </div>
    `

    console.log(pegarClasseConteudoNoHtml); 
}


