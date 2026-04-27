# E-commerce

## Projeto 1 - Programação Web Back-End

Este projeto foi desenvolvido como parte da disciplina de Programação Web Back-End, com o objetivo de implementar um sistema de e-commerce utilizando Node.js e MongoDB.

### Funcionalidades
O sistema gerencia três entidades principais: **Vendedor**, **Produto** e **Cliente**.

* **Cadastro**: inserção de dados com validação e verificação de campos.
* **Busca**: leitura dos dados inseridos por meio de campos como CNPJ (Vendedor), Nome (Produto) e CPF (Cliente).
* **Deleção**: exclusão dos dados inseridos por meio de campos como CNPJ (Vendedor), Nome (Produto) e CPF (Cliente).
* **Persistência:** Uso de MongoDB com conexão centralizada.
* **Log de Erros:** Captura e armazenamento automático de exceções em um arquivo `error.log`.

### Como Executar (com Node.js instalado e o MongoDB rodando)

Clone o repositório:
   
`git clone https://github.com/laisab/WebBackEnd-Projeto1.git`

Instale as dependências:

`npm install`

Configure a URI do seu banco de dados no arquivo `db.js`.

Execute o sistema:

`node index.js`

### Estrutura do Projeto

```text
├── Cliente.js      # Classe de modelo do Cliente
├── Produto.js      # Classe de modelo do Produto
├── Vendedor.js     # Classe de modelo do Vendedor
├── db.js           # Configuração da conexão com MongoDB
├── index.js        # Script principal de execução
├── error.log       # Arquivo de log gerado automaticamente
└── package.json    # Dependências do projeto
