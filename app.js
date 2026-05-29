let http = require('http'), express = require('express'), path = require('path'), app = express(), hbs = require('hbs'), session = require('express-session'), 
    Cliente = require('./model/Cliente'), Produto = require('./model/Produto'), Vendedor = require('./model/Vendedor');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'seu-segredo',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.get('/teste', (req, res) => {
    res.end('Teste bem sucedido');
});

app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.pesquisarCpf("61111111111");
    res.render('clientes', {clientes:clientes})
});

/*app.get('/posts', async (req,res) => {
    const posts = await Posts.find();
    res.render('posts', {posts:posts});
}) */

/*app.post('/cliente', async (req, res) => {
    // const {nome, cpf, email, senha, endereco} = req.body;
    // const cliente = new Cliente(nome, cpf, email, senha, endereco);

    const cliente = new Cliente("Ana", "22222222222", "exemplo@gmail.com", "62345", "Avenida XV de Novembro, 124, Centro, Cornélio Procópio - PR");

    cliente.validar();

    try{
        await cliente.inserirDB();
    }catch(e){
        const mensagem = `[${new Date().toISOString()}] Erro ao inserir Cliente: ${e.message}\n`;
        fs.appendFileSync('error.log', mensagem);
    }
    
    res.render('/cliente', {cliente:cliente});
    
});*/

http.createServer(app).listen(3000);