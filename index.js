const Clientes = require("./Modelo/ClientesModel");

const clientes = new Clientes();

clientes.cpf = 11111111111;
clientes.nome = "eu";
clientes.telefone = 222222222;

console.log("teste", clientes.cpf, clientes.nome, clientes.telefone);