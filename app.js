const http = require('http'), express = require('express'), session = require('express-session'), app = express();
const Cliente = require('./model/Cliente'), Vendedor = require('./model/Vendedor'), Produto = require('./model/Produto');
const conectarDB = require('./db');

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

app.listen(8000);