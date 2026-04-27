const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017/');
const databaseName = "ecommerce";

let db = null;

async function conectarDB() {
    if(db) return db;

    try{
        await client.connect();
        console.log("Conexão com o MongoDB bem sucedida!");
        
        db = client.db(databaseName);

        // Índice único para CNPJ
        await db.collection("vendedores").createIndex({cnpj: 1}, {unique: true});
        // Índice único para CPF
        await db.collection("clientes").createIndex({cpf: 1}, {unique: true});
        
        return db;
    }catch (error){
        console.error("Erro ao tentar conectar com o MongoDB: ", error.message);
        throw error;
    }
}

module.exports = conectarDB;