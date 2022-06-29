/* ------------------------- VARIÁVEIS ------------------------- */
let dadosDosQuizzes = [];
let pegarClasseConteudoNoHtml = document.querySelector('.conteudo');

/* ------------------------- FUNÇÕES DE CRIAÇÃO ------------------------- */

function criarQuizz () {
    
}




































/* ------------------------- FUNÇÕES DE LISTAGENS ------------------------- */

listarTodosQuizzes();

function listarTodosQuizzes() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
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

    pegarClasseConteudoNoHtml.innerHTML = `
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

