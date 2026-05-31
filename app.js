const http = require('http'), express = require('express'), session = require('express-session'), app = express();
const Cliente = require('./model/Cliente'), Vendedor = require('./model/Vendedor'), Produto = require('./model/Produto');
const conectarDB = require('./db');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Middleware que implementa a session
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: {secure : false}
}));

// Rota de teste
app.get('/teste', (req, res) => {
    res.end('E-commerce funcionando!');
});

// Rotas para Cliente
app.get('/cliente/cadastro', async (req, res) => {
    try{
        const {nome, cpf, email, senha, endereco} = req.body;
        const cliente = new Cliente(nome, cpf, email, senha, endereco);

        await cliente.validar();
        await cliente.inserirDB();

        res.status(201).json({mensagem: "Cliente cadastrado com sucesso!"});
    }catch(err){
        res.status(403).json({erro: "Erro ao cadastrar cliente"});
        Cliente.logError(err);
    }
});

app.post('/cliente/login', async (req, res) => {
    try{
        const cpf = req.body.cpf, senha = req.body.senha;
        const cpfCadastrado = await Cliente.pesquisarCpf(cpf);

        if(!cpfCadastrado){
            return res.status(401).json({message : "Cliente não encontrado, tente novamente!"});
        }

        if(cliente.senha !== senha){
            return res.status(401).json({message : "Senha incorreta, tente novamente!"});
        }

        req.session.cliente = {
            nome: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            endereco: cliente.endereco
        };

        res.status(201).json({message : "Cliente logado com sucesso!"});
    }catch(err){
        res.status(403).json({erro: "O cliente não forneceu as credenciais corretas para acessar o recurso"});
        Cliente.logError(err);
    }
});

/*app.get('/cliente/cadastro', (req, res) => {
    res.end('Cadastro de Cliente');
});*/

/*app.post('/cliente/cadastro', async (req, res) => {
    try{
        const {nome, cpf, email, senha, endereco} = req.body;
        const cliente = new Cliente(nome, cpf, email, senha, endereco);

        await cliente.validar();
        await cliente.inserirDB();

        res.status(201).json({mensagem: "Cliente cadastrado com sucesso!"});
    }catch(err){
        res.status(403).json({erro: "Erro ao cadastrar cliente"});
        Cliente.logError(err);
    }
});

app.post('/cliente/login', async (req, res) => {
    try{
        const cpf = req.body.cpf, senha = req.body.senha;
        const cpfCadastrado = await Cliente.pesquisarCpf(cpf);

        if(!cpfCadastrado){
            return res.status(401).json({message : "Cliente não encontrado, tente novamente!"});
        }

        if(cliente.senha !== senha){
            return res.status(401).json({message : "Senha incorreta, tente novamente!"});
        }

        req.session.cliente = {
            nome: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            endereco: cliente.endereco
        };

        res.status(201).json({message : "Cliente logado com sucesso!"});
    }catch(err){
        res.status(403).json({erro: "O cliente não forneceu as credenciais corretas para acessar o recurso"});
        Cliente.logError(err);
    }
});*/

app.listen(8000);