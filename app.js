let http = require('http'), express = require('express'), path = require('path'), app = express(), hbs = require('hbs'), session = require('express-session'), 
    Cliente = require('./model/Cliente'), Produto = require('./model/Produto'), Vendedor = require('./model/Vendedor');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: {secure : false}
}));

app.get('/teste', (req, res) => {
    res.end('Teste bem sucedido');
});

http.createServer(app).listen(3000);