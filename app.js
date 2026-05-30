const http = require('http'), express = require('express'), path = require('path'), session = require('express-session'), app = express();
const Cliente = require('./model/Cliente'), Vendedor = require('./model/Vendedor'), Produto = require('./model/Produto');

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


http.createServer(app).listen(8000);