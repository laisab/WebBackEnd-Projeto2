const Vendedor = require("./model/Vendedor");
const Produto = require("./model/Produto");
const Cliente = require("./model/Cliente");

async function main() {
    const vendedor = new Vendedor("Lais", "12345678912345", "Rua Vicente Sales, 33, Porto Belo, Cornélio Procópio - PR");
    const produto = new Produto("Teclado", "Mecânico, novo", 150, "12345678912345");
    const cliente = new Cliente("Maria", "11111111111", "ap@gmail.com", "12345", "Avenida XV de Novembro, 1595, Centro, Cornélio Procópio - PR");

    vendedor.validar();
    produto.validar();
    cliente.validar();

    try{
        await vendedor.inserirDB();
        await produto.inserirDB();
        await cliente.inserirDB();

        await Vendedor.pesquisarCnpj("12345678912345");
        await Produto.pesquisarNome("Teclado");
        await Cliente.pesquisarCpf("21111111111");

        /*await Vendedor.deletarCnpj("12345678912345");
        await Produto.deletarNome("Teclado");
        await Cliente.deletarCpf("11111111111");*/
    }catch(e){
        console.log("Recomendado verificar o log.");
    }
}

main();