/* ------------------------- VARIÁVEIS ------------------------- */
let dadosDosQuizzes = [];
let pegarClasseConteudoNoHtml = document.querySelector('.conteudo');
let idUsuarios = [];
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

let novoQuizz;
let novoQuizzUsuario = null;
let ehValido;

function checagemEspecificacoes() {
    tituloQuizz = document.querySelector(".caixa-especificacoes input:nth-child(1)").value;
    URLQuizz = document.querySelector(".caixa-especificacoes input:nth-child(2)").value;
    qtdPerguntas = Number(document.querySelector(".caixa-especificacoes input:nth-child(3)").value);
    qtdNiveis = Number(document.querySelector(".caixa-especificacoes input:nth-child(4)").value);
    ehValido = tituloQuizz.length >= 20 && (URLQuizz.startsWith('https://') || URLQuizz.startsWith('http://'));
    if(ehValido && qtdPerguntas >= 3 && qtdNiveis >= 2) {
        novoQuizzUsuario = objetoNovoQuizz(qtdPerguntas, qtdNiveis);
        console.log(novoQuizzUsuario)
        novoQuizz.title = tituloQuizz;
        console.log(tituloQuizz)
        novoQuizz.image = URLQuizz;
        console.log(URLQuizz)
        console.log(novoQuizzUsuario)
        prosseguirParaPerguntas();
    } else {
        alert("Preencha os dados corretamente");
    } 
}


function objetoNovoQuizz () {
    novoQuizz = {
        title: "",
        image: "",
        questions: [],
        levels: []
    }

    return novoQuizz;
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
        <div class="caixa-perguntas">
            <div class="numero-pergunta">
                <h2 class="subtitulo-instrucao">Pergunta ${i + 1}</h2>
                <input class="texto-pergunta" type="text" name="pergunta" placeholder="Texto da pergunta" autocomplete>
                <input class="cor-pergunta" type="color" name="corPergunta" placeholder="Cor de fundo da pergunta">
            </div>
            <div class="resposta-correta">
                <h2 class="subtitulo-instrucao">Resposta correta</h2>
                <input class="resposta-certa-texto" type="text" name="resposta" placeholder="Resposta correta" autocomplete>
                <input class="resposta-certa-imagem" type="text" name="URLResposta" placeholder="URL da imagem" autocomplete>
            </div>
            <div class="respostas-incorretas">
                <h2 class="subtitulo-instrucao">Respostas incorretas</h2>
                <input class="resposta-errada-texto" type="text" name="respostaIncorreta1" placeholder="Resposta incorreta 1" autocomplete>
                <input class="resposta-errada-imagem" type="text" pattern="^(http|https)://" name="URLRespostaIncorreta1" placeholder="URL da imagem 1" autocomplete>
                <input class="resposta-errada-texto" type="text" name="respostaIncorreta2" placeholder="Resposta incorreta 2" autocomplete>
                <input class="resposta-errada-imagem" type="text" name="URLRespostaIncorreta2" placeholder="URL da imagem 2" autocomplete>
                <input class="resposta-errada-texto" type="text" name="respostaIncorreta3" placeholder="Resposta incorreta 3" autocomplete>
                <input class="resposta-errada-imagem" type="text" name="URLRespostaIncorreta3" placeholder="URL da imagem 3" autocomplete>
            </div>
        </div>
        `
    }
    adicionarBotaoParaNiveis();
}

function adicionarBotaoParaNiveis() {
    pagCriacaoPerguntas.innerHTML += `
    <div class="botao criar-niveis" onclick="validacaoDosDadosDasPerguntas()">
        <h2>Prosseguir para criar níveis</h2>
    </div>
    `

    
}


function arrayDeVerificacao(array){
    for(let i = 0; i<array.length; i++){
        let resultado = !array[i] ? true : false;
        return resultado;
    }
}



function validacaoDosDadosDasPerguntas() {
    let dadosCorretos = [];
    let estahValido;
    let temPeloMenosUmaRespostaErrada = false;
    const caixaDasPerguntas = document.querySelectorAll(".caixa-perguntas");

    for(let i=0; i < caixaDasPerguntas.length; i++) {
        temPeloMenosUmaRespostaErrada = false;
        const respostasIncorretas = caixaDasPerguntas[i].querySelectorAll(".respostas-incorretas");
        const textoPergunta = caixaDasPerguntas[i].querySelector(".texto-pergunta").value;
        const corDaPergunta = caixaDasPerguntas[i].querySelector(".cor-pergunta").value;
        const respostaCertaTexto = caixaDasPerguntas[i].querySelector(".resposta-certa-texto").value;
        const respostaCertaImagem = caixaDasPerguntas[i].querySelector(".resposta-certa-imagem").value;
        estahValido = textoPergunta.length >= 20 && respostaCertaTexto !== undefined && (respostaCertaImagem.startsWith('https://') || respostaCertaImagem.startsWith('http://'));


        if(estahValido) {
            console.log("passou no primeiro if")
            const perguntaDepoisDeReceberValorNovo = {
                title: textoPergunta,
                color: corDaPergunta,
                answers: []
            } 

            const respostaDepoisDeReceberValorNovo = {
                text: respostaCertaTexto,
                image: respostaCertaImagem,
                isCorrectAnswer: true
            }

            //resposta certa
            perguntaDepoisDeReceberValorNovo.answers.push(respostaDepoisDeReceberValorNovo);
           
            const respostaErradas = respostasIncorretas[0].querySelectorAll(".resposta-errada-texto");
            const respostaErradaImagens = respostasIncorretas[0].querySelectorAll(".resposta-errada-imagem");
            for(let x=0; x < respostaErradas.length; x++) {
                estahValido = tituloQuizz.length >= 20 && 
                    (respostaErradaImagens[x].value.startsWith('https://') || respostaErradaImagens[x].value.startsWith('http://'));
    
                if(estahValido) {
                    const respostaErradaDepoisDeReceberValor = {
                        text: respostaErradas[x].value,
                        image: respostaErradaImagens[x].value,
                        isCorrectAnswer: false
                    } 
    
                    perguntaDepoisDeReceberValorNovo.answers.push(respostaErradaDepoisDeReceberValor);
                    temPeloMenosUmaRespostaErrada = true;
                    dadosCorretos.push(true);
                    prosseguirParaNiveis();
                } else {
                    //alert("Preencha os dados corretamente")
                    //perguntaDepoisDeReceberValorNovo.answers = [];
                    return;
                }
            }
            
            dadosCorretos.push(true);
            novoQuizzUsuario.questions.push(perguntaDepoisDeReceberValorNovo);
            prosseguirParaNiveis();
        } else {
            dadosCorretos.push(false);
        }

        
    }


    estahValido = arrayDeVerificacao(dadosCorretos);


    if(temPeloMenosUmaRespostaErrada) {
        console.log("show");
    } /* else {
        alert("Reveja os dados inseridos!");
    } */
    
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
                <input class="texto-nivel" type="text" name="tituloNivel" placeholder="Título do nível">
                <input class="porcentagem-acerto" type="text" name="%Acerto" placeholder="% de acerto mínima">
                <input class="nivel-imagem" type="text" name="URLNivel" placeholder="URL da imagem do nível">
                <input class="texto-descricao-nivel" type="text" name="desricaoNivel" placeholder="Descrição do nível">
            </div>
            
        `
    }
    adicionarBotaoFinal();
 }

 function adicionarBotaoFinal() {
    pagCriacaoNiveis.innerHTML += `
    <div class="botao finalizar-quizz" onclick="validacaoDosDadosDosNiveis()">
        <h2>Finalizar Quizz</h2>
    </div>
    `
 }

 function validacaoDosDadosDosNiveis() {
    let dadosCorretos = [];
    let estahValido;
    const caixaDosNiveis = document.querySelectorAll(".caixa-niveis");
    const caixaDosNiveisInputs = document.querySelectorAll(".caixa-niveis input");

    for(let i = 0; i < caixaDosNiveis.length; i++) {
        const textoNivel = caixaDosNiveis[i].querySelector(".texto-nivel").value;
        const porcentagemAcerto = Number(caixaDosNiveis[i].querySelector(".porcentagem-acerto").value);
        const nivelImagem = caixaDosNiveis[i].querySelector(".nivel-imagem").value;
        const descricaoNivel = caixaDosNiveis[i].querySelector(".texto-descricao-nivel").value;
        estahValido = textoNivel.length >= 10 && (porcentagemAcerto >= 0 && porcentagemAcerto <= 100) && (nivelImagem.startsWith('https://') || nivelImagem.startsWith('http://')) && descricaoNivel.length >= 30;

        if(caixaDosNiveisInputs[i].value !== "") {
            if(estahValido) {
                const objetoNiveis = {
                    title: textoNivel,
                    image: nivelImagem,
                    text: descricaoNivel,
                    minValue: porcentagemAcerto,
                    
                }
    
                dadosCorretos.push(true);
                novoQuizzUsuario.levels.push(objetoNiveis);
            } else {
                dadosCorretos.push(false);
                return;
            }
            prosseguirParaSucessoDoQuiz();
        }
        
        
    }


    estahValido = arrayDeVerificacao(dadosCorretos);    
}

 function prosseguirParaSucessoDoQuiz() {
    pegarClasseConteudoNoHtml.innerHTML = `
    <div class="pag-sucesso-quizz">
            <h2 class="titulo-instrucao">Seu quizz está pronto!</h2>
            <div>
                <img src="${URLQuizz}">
                <h3>${tituloQuizz}</h3>
            </div>
            <div id="${object.data.id} class="botao" onclick="enviarQuizzUsuário()">
                <h2>Acessar Quizz</h2>
            </div>
            <div class="botao-home" onclick="voltarHome()">
                <h2>Voltar para o home</h2>
            </div>
        </div>
    `
 }

 function enviarQuizzUsuário() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes", novoQuizz);
    promise.then(terminarQuizz);
    promise.catch(erro);
    let erro = alert("ocorreu um erro");
    console.log(promise);
    //acessarQuizzDoUsuário();
 }

 function terminarQuizz(object){
    console.log(object);
    addLocalQuizzID(object.data.id);
    axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${object.data.id}`)
    .then(mostrarQuizzCriado); 
}

function voltarHome() {
    pegarClasseConteudoNoHtml.innerHTML = ""
    quizzesDeOutrosUsuarios();
}





























/* ------------------------- FUNÇÕES DE LISTAGENS ------------------------- */

listarTodosQuizzes();

function listarTodosQuizzes() {
    let promise = axios.get('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes');
    promise.then(pegarDadosDosQuizzes);
    promise.catch(errorPegarDados);
}

let dadosPerguntasQuizzes;
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
            <div id="${dadosDosQuizzes[i].id}" onclick="acessarQuizzOutroUsuario(this)">
                <img src="${dadosDosQuizzes[i].image}">
                <p>${dadosDosQuizzes[i].title}</p>
            </div>
        `
    }
}

function errorPegarDados() {
    alert('deu erro');
}

/* 
    function pegarDadosDosQuizzes(resposta) {
        console.log(resposta)
        dadosDosQuizzes = resposta.data;
        dadosPerguntasQuizzes = resposta.data[0].questions[0].title;
        console.log(dadosPerguntasQuizzes);
    }
 */

function acessarQuizzOutroUsuario(element) {
    let imagemQuizzCLicado = element.querySelector('img').src;
    let tituloQuizzCLicado = element.querySelector('p').innerHTML;
   
    let idDoElemento = element.getAttribute("id");

    let promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${idDoElemento}`);
    promise.then(pegarDadosDosQuizzes);

    function pegarDadosDosQuizzes(resposta) {
        console.log(resposta.questions);
    } 

    pegarClasseConteudoNoHtml.innerHTML = `
        <div class="banner-pagina-de-um-quizz">
            <img src="${imagemQuizzCLicado}">
            <h2>${tituloQuizzCLicado}</h2>
        </div> 
    `


    let cadaQuizzUsuario = [];
    for(let i = 0; i < dadosDosQuizzes.length; i++) {
        cadaQuizzUsuario = dadosDosQuizzes[i];
        console.log(cadaQuizzUsuario);


        let testeParaveroqueeh = [];
        for(let j = 0; j < cadaQuizzUsuario.length; j++) {
            testeParaveroqueeh = cadaQuizzUsuario.questions[j];
            console.log(cadaQuizzUsuario);

            pegarClasseConteudoNoHtml.innerHTML += `
                <div class="pagina-de-um-quizz-inteiro">
                    <div class="quizz">
                        <span><h3>${testeParaveroqueeh[j].title}</h3></span>

                    </div>
                </div>    
            `

            let pegueiAsRespostas = [];
            for(let k = 0; k < testeParaveroqueeh.length; k++) {
                pegueiAsRespostas = testeParaveroqueeh.answers[k];
                console.log(pegueiAsRespostas);
            } 


        }
    }


   

   /*  <div class="caixa-imagens-quizz">
                        <div>
                            <img src=".${cadaQuizzUsuario.questions[j].answers[j].image}" width="330px" height="175px">
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
            </div> */


    console.log(pegarClasseConteudoNoHtml); 
}
