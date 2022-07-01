/* ------------------------- VARIÁVEIS ------------------------- */
let dadosDosQuizzes = [];
let pegarClasseConteudoNoHtml = document.querySelector('.conteudo');

/* ------------------------- FUNÇÕES DE CRIAÇÃO ------------------------- */

function criarQuizz () {
    pegarClasseConteudoNoHtml.innerHTML = `
    <div class="pag-criacao-quizz">
            <h2 class="titulo-instrucao">Comece pelo começo</h2>
            <div class="caixa-especificacoes">
                <input type="text" name="tituloQuizz" maxlength="65" placeholder="Título do seu quizz">
                <input type="text" name="URLQuizz" placeholder="URL da imagem do seu quizz">
                <input type="text" name="qtdPerg" placeholder="Quantidade de perguntas do seu quizz">
                <input type="text" name="qtdNiveis" placeholder="Quantidade de níveis do seu quizz">
            </div>
            <div class="botao criar-perguntas" onclick="prosseguirParaPerguntas()">
                <h2>Prosseguir para criar perguntas</h2>
            </div>
        </div>
    `
}

function prosseguirParaPerguntas () {
    pegarClasseConteudoNoHtml.innerHTML = `
    <div class="pag-criacao-perguntas">
            <h2 class="titulo-instrucao">Crie suas perguntas</h2>
            <div class="caixa-perguntas">
                <div class="numero-pergunta">
                    <h2 class="subtitulo-instrucao">Pergunta 1</h2>
                    <input type="text" name="pergunta" placeholder="Texto da pergunta">
                    <input type="text" name="corPergunta" placeholder="Cor de fundo da pergunta">
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
            <div class="botao criar-niveis">
                <h2>Prosseguir para criar níveis</h2>
            </div>
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
    console.log(resposta);
    dadosDosQuizzes = resposta.data;
    quizzesDeOutrosUsuarios();
}


if(id !== idsUsuario) { "roda a funcao quizzesDeOutrosUsuarios" } else if(id === idsUsuario) { "guardar na lista de quizzes do usuario" }

function quizzesDeOutrosUsuarios() {

    pegarClasseConteudoNoHtml.innerHTML += `
        <div class="todos-quizzes">
            <h2>Todos os Quizzes</h2>
            <div class="lista-todos-quizzes">
            </div>
        </div>
    `

    let pegarClasseListaTodosQuizzesNoHtml = document.querySelector('.lista-todos-quizzes');

    console.log(pegarClasseConteudoNoHtml)

    for(let i = 0; i < dadosDosQuizzes.length; i++) {
        pegarClasseListaTodosQuizzesNoHtml.innerHTML += `
            <div>
                <img src="${dadosDosQuizzes[i].image}">
                <p>${dadosDosQuizzes[i].title}</p>
            </div>
        `
     }

    console.log(pegarClasseListaTodosQuizzesNoHtml);
}

function errorPegarDados() {
    alert('deu erro');
}

