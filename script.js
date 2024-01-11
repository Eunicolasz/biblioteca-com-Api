// Carrega as informações contidas no arquivo dados.JSON e preenche o array de itens com esses dados.
fetch("banco.json")
    .then((data) => data.json())
    .then((data) => {
        items = data.Livros;
    });

// Obtem o elemento conteiner dos cards e a entrada de busca
const cardContainer = document.getElementById("cardContainer");
const barraDePesquisa = document.getElementById("barraDePesquisa");

// Array que armazena os itens do meu banco de dados (JSON)
let items = [];

// Adiciona um EventListener ao botão "Confirmar"
document.getElementById("confirmarBtn").addEventListener("click", function () {
    exibirCards();
});

// Adiciona um EventListener à barra de pesquisa para capturar a tecla Enter

   
  


// Função para criar um card na div.conteiner...
function criarCard(item) {
    const card = document.createElement('div');
    card.classList.add('col', 'border', 'border-dark', 'p-3', 'border-5');

    // Adiciona a imagem ao card
    const imagem = document.createElement('img');
    imagem.src = "/img/capa.jpg"; // Substitua 'imagem' pelo caminho real da imagem no seu objeto JSON(imagem é única, então não tem necessidade)
    imagem.classList.add('card-img');
    imagem.alt = 'Imagem do Livro';

    // Defina um estilo para a imagem ajustar-se à tela
    imagem.style.maxWidth = '100%'; // Ajuste conforme necessário
    imagem.style.borderRadius = '10px'; // Bordas levemente arredondadas
    card.appendChild(imagem);

    // Adiciona o conteúdo do card
    const corpoCard = document.createElement('div');
    corpoCard.classList.add('corpo-card');

    // Adiciona o título ao card
    const titulo = document.createElement('h4');
    titulo.classList.add('titulo-card');
    titulo.innerHTML = `<br>
                        <strong>Título:</strong> ${item.titulo}`;
    corpoCard.appendChild(titulo);

    // Adiciona os sub-titulos (Autor, Ano Publicado, Gênero)
    const subTitulos = document.createElement('p');
    subTitulos.classList.add('texto-card');
    subTitulos.innerHTML = `<strong>Autor:</strong> ${item.autor}<br>
                        <strong>Ano Publicado:</strong> ${item.anoPublicado}<br>
                        <strong>Gênero:</strong> ${item.genero}`;
    corpoCard.appendChild(subTitulos);

    card.appendChild(corpoCard);

    // Adiciona o card ao conteiner
    cardContainer.appendChild(card);
}

// Função para exibir os cards com base na pesquisa
function exibirCards() {
    // Obtém o termo de busca
    const termoDePesquisa = barraDePesquisa.value;

    // Verifica se algo foi digitado antes de realizar a busca
    if (termoDePesquisa.trim() !== "") {
        // Limpa o conteúdo atual do container de cards
        cardContainer.innerHTML = "";

        function result() {
            
        
        const str = {};

// ⛔️ TypeError: str.toLowerCase is not a function
const result = str.toLowerCase();

        // Filtra os itens com base no termo de busca e adiciona os cards correspondentes
        items.filter((item) =>
            item.titulo.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
            item.autor.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
            item.anoPublicado.toLowerCase().includes(termoDePesquisa.toLowerCase()) ||
            item.genero.toLowerCase().includes(termoDePesquisa.toLowerCase())
        )
        .forEach((item) => criarCard(item));
    }

    } else {
        // Limpa o conteúdo se a barra de pesquisa estiver vazia
        cardContainer.innerHTML = "";
    }
    // Função para salvar dados no arquivo JSON
function salvarDados() {
    fs.writeFileSync(__dirname + '/banco.json', JSON.stringify(banco, null,  2))
}

// Inicia o servidor na porta 3000
const express = require('express');
const server = express('');
const banco = require('./banco.json');
const fs = require('fs');
const { json } = require('body-parser');
const { log } = require('console');

server.use(express.json());

// Rota raiz
server.get('/', (req, res) => {
    return res.json({mensagem: "Nossa Api está funcionando"})
});
server.listen(3000, () => {
    console.log("server está funcionando")
});

//LIVROS:

//gets === consumir APIS / Rota para obter todos os livros
server.get('/livros', (req, res) => {
    return res.json(banco.Livros)
})

//gets === consumir APIS / Rota para obter todos os livros
server.get('/livros/pesquisa', (req, res) => {
    return res.json(banco.Livros)
})

// Rota para consultar livros por variável
server.get('/livros/pesquisa/:variavel', (req, res) => {
    const variaveisLivro = req.params.variavel.toLowerCase();
    const livrosTitulo = banco.Livros.filter(Livros => Livros.titulo.toLowerCase() === variaveisLivro);
    const livrosAutor = banco.Livros.filter(Livros => Livros.autor.toLowerCase() === variaveisLivro);
    const livrosAnoPublicado = banco.Livros.filter(Livros => Livros.anoPublicado.toString().toLowerCase() === variaveisLivro);
    const livrosGenero = banco.Livros.filter(Livros => Livros.genero.toLowerCase() === variaveisLivro);

    if (livrosTitulo.length > 0) {
        res.json(livrosTitulo);

    }
    else if (livrosAutor.length > 0) {
        res.json(livrosAutor);

    }
    else if (livrosAnoPublicado.length > 0) {
        res.json(livrosAnoPublicado);

    }
    else if (livrosGenero.length > 0) {
        res.json(livrosGenero);

    }
    else {
        res.status(404).json({ mensagem: "livro não encontrado."}); 
    }
});



// Rota para consultar livros ordenação
server.get('/livros/ordenar/:variavel', (req, res) => {
    var variaveisLivro = req.params.variavel.toLowerCase();
    variaveisLivro = variaveisLivro.toLowerCase();
    var livrosOrdenados = [];

    switch (variaveisLivro) {
        case "titulo":
            livrosOrdenados = banco.Livros.sort((a, b) => a.titulo.localeCompare(b.titulo));
            res.json(livrosOrdenados);
        break;

        case "autor":
            livrosOrdenados = banco.Livros.sort((a, b) => a.autor.localeCompare(b.autor));
            res.json(livrosOrdenados);
        break;

        case "ano":
            livrosOrdenados = banco.Livros.sort((a, b) => a.anoPublicado.localeCompare(b.anoPublicado));
            res.json(livrosOrdenados);
        break;

        case "genero":
            livrosOrdenados = banco.Livros.sort((a, b) => a.genero.localeCompare(b.genero));
            res.json(livrosOrdenados);
        break;
        
        case "id":
            res.json(banco.Livros);
        break;
    
        default:
            res.json("erro errado");
            break;
    }
});


//post === salvar/inserir dados no JSON / Rota para adicionar um novo livro
server.post('/livros', (req, res) => {
    const novoLivros = req.body

    if (!novoLivros.id || !novoLivros.titulo || !novoLivros.autor || !novoLivros.anoPublicado || !novoLivros.genero) {
        return res.status(400).json({mensagem: "Informações incompletas."})
    } else {
        banco.Livros.push(novoLivros)
        salvarDados(banco)
        return res.status(201).json({mensagem: "Livro cadastrado com sucesso.",})
    }
})



//EDITORES DO JSON:
//put === updade de dados / Rota para atualizar um livro existente
server.put('/livros/:id', (req, res) => {
    const livrosId = parseInt(req.params.id)
    const atualizaLivros = req.body
    const idLivros = banco.Livros.findIndex(Livros => Livros.id === livrosId)

    if (idLivros === -1) {
        return res.status(404).json({mensagem: "Erro na alteração do livro."})

    } else {
        //Atualiza ou não o título do livro:
        banco.Livros[idLivros].titulo = atualizaLivros.titulo || banco.Livros[idLivros].titulo

        //Atualiza ou não o autor do livro:
        banco.Livros[idLivros].autor = atualizaLivros.autor || banco.Livros[idLivros].autor

        //Atualiza ou não o ano publicado do livro:
        banco.Livros[idLivros].anoPublicado = atualizaLivros.anoPublicado || banco.Livros[idLivros].anoPublicado

        //Atualiza ou não o genêro do livro:
        banco.Livros[idLivros].genero = atualizaLivros.genero || banco.Livros[idLivros].genero

        salvarDados(banco)

        return res.json({mensagem: "Livro atualizado com sucesso.", Livros: banco.Livros[idLivros] })
    }
})



//delete === para deletar um JSON / Rota para excluir um livro
server.delete('/livros/:id', (req, res) => {
    const livrosId = parseInt(req.params.id)

    banco.Livros = banco.Livros.filter(Livros => Livros.id !== livrosId)
    salvarDados(banco)

    return res.status(200).json({mensagem: "Livro excluido com sucesso"})
})

}