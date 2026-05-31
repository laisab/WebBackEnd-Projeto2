const http = require('http'), express = require('express'), session = require('express-session'), hbs = require('hbs'), path = require('path'), app = express();
const Cliente = require('./model/Cliente'), Vendedor = require('./model/Vendedor'), Produto = require('./model/Produto');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

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

// Rotas do Cliente
app.get('/cliente/cadastro', (req, res) => {
    res.render('cadastro-clientes', {titulo: 'Cadastro de Cliente'});
});

app.post('/cliente/cadastro', async (req, res) => {
    try{
        const {nome, cpf, email, senha, endereco} = req.body;
        const cliente = new Cliente(nome, cpf, email, senha, endereco);

        await cliente.validar();
        await cliente.inserirDB();

        res.render('cadastro-clientes', {titulo: 'Deu certo'});
    }catch(err){
        res.render('cadastro-clientes', {erro: "Erro ao cadastrar"});
        Cliente.logError(err);
    }
});

app.get('/cliente/login', (req, res) => {
    res.render('login-clientes', {titulo: 'Login de Cliente'});
});

app.post('/cliente/login', async (req, res) => {
    try{
        res.render('login-clientes', {titulo: 'Deu certo login'});
    }catch(err){
        res.render('login-clientes', {erro: "Erro login"});
        Cliente.logError(err);
    }
});

app.listen(8000);