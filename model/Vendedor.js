const conectarDB = require('../db');
const fs = require('fs');

class Vendedor{
    constructor(nome, cnpj, endereco){
        this.nome = nome;
        this.cnpj = cnpj;
        this.endereco = endereco;
    }

    validar(){
        if(!this.nome){
            throw new Error("O nome do vendedor é obrigatório.");
        }

        if(this.nome.trim() === ""){
            throw new Error("O nome do vendedor não pode estar vazio.");
        }

        if(!this.cnpj){
            throw new Error("O CNPJ do vendedor é obrigatório.");
        }

        if(this.cnpj.trim() === ""){
            throw new Error("O CNPJ do vendedor não pode estar vazio.");
        }

        if(this.cnpj){
            const cnpjLimpo = String(this.cnpj).replace(/\D/g, "");

            if(cnpjLimpo.length !== 14){
                throw new Error("O CNPJ é inválido, pois não possui 14 caracteres.");
            }
            this.cnpj = cnpjLimpo;
        }
    }

    static async logError(error){
        const mensagem = `[${new Date().toISOString()}] Erro ao inserir Produto: ${error.message}\n`;
        fs.appendFileSync('error.log', mensagem);
    }

    async inserirDB(){
        try{
            const db = await conectarDB();
            const collection = db.collection("vendedores");

            const result = await collection.insertOne({
                nome: this.nome,
                cnpj: this.cnpj,
                endereco: this.endereco
            });

            console.log("Vendedor inserido: ID", result.insertedId);
            return result;
        }catch(error){
            Vendedor.logError(error);
        }
    }

    async pesquisarCnpj(cnpj){
        try{
            const db = await conectarDB();
            const collection = db.collection("vendedores");

            const result = await collection.findOne({
                cnpj
            });

            if(result){
                console.log("Vendedor encontrado: ", result);
            }else{
                console.log("Vendedor não encontrado.");
            }

            return result;
        }catch(error){
            Vendedor.logError(error);
        }
    }

    async deletarCnpj(cnpj){
        try{
            const db = await conectarDB();
            const collection = db.collection("vendedores");

            const result = await collection.deleteOne({
                cnpj
            });

            if(result){
                console.log("Vendedor excluído com sucesso.");
            }else{
                console.log("Vendedor não encontrado.");
            }
        }catch(error){
            Vendedor.logError(error);
        }
    }

}

module.exports = Vendedor;