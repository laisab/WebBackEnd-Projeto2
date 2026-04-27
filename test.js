const conectarDB = require('./db');

async function testar() {
    const db = await conectarDB();
    console.log("Banco: ", db.databaseName);
}

testar();