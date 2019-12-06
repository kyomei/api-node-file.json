// Importe o express
const express = require('express');

// Instancia na variável app
const app = express();


// JSON com dados (Opcional)
const data = require("./data.json");

// Express precisa usar json, então estamos dizendo para ele usar o json
app.use(express.json());

/**
 * Tipos de STATUS
 * 
 * 1xx: Informação
 * 2xx: Sucesso
 *    200 - OK
 *    201 - CREATED
 *    204 - Não tem conteúdo PUT POST DELETE
 * 3xx: Redirection
 * 4xx: Client Error
 *    400: Bad Request
 *    404: Not Found
 * 5xx: Server Error
 * 500: Internal Server Error
 **/

// Busca todos os registros
app.get("/clients", function (req, res) {
    res.json(data);
});

// Busca um registro
app.get("/clients/:id", function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    // Erro com status 204, nenhum registro foi encontrado
    if (!client) return res.status(204).json();

    res.json(client);
});

// Insere o registro
app.post("/clients", function(req, res) {
    // Recuperando nome e email do corpo da requisição
    const { name, email} = req.body;

    // salvar o cliente no banco....


    res.json({name, email});
});

// Atualiza o registro
app.put("/clients/:id", function(req, res) {
    // Pega os parametros passado na requisção e procura no arquivo data.json
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    // Erro com status 204, nenhum registro foi encontrado
    if (!client) return res.status(204).json();

    // Recuperando nome e email do corpo da requisição
    const { name } = req.body;

    // Atualiza o novo nome no arquivo data.json
    client.name = name;

    res.json(client);
});

// Exclui um registro
app.delete(":/clients/:id", function(req, res) {
    const { id } = req.params;
    const clientsFieltered = data.filter(client => client.id != id);

    res.json(clientsFieltered);
});

// Inicia o servidor na porta 3000, e add um callback para exibir uma informação
app.listen(3000 ,function() {
    console.log("Server is running");
});

