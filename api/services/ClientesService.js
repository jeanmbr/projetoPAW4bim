const ClienteDAO = require("../dao/ClientesDAO");
const Cliente = require("../models/ClientesModel");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class ClienteService {
    #clienteDAO;

    constructor(clienteDAODependency) {
        this.#clienteDAO = clienteDAODependency;
    }

    createCliente = async (clienteJson) => {
        const cliente = new Cliente();
        cliente.cpf = clienteJson.cpf;
        cliente.nome = clienteJson.nome;
        cliente.email = clienteJson.email;

        const resultado = await this.#clienteDAO.findByField("cpf", cliente.cpf);
        if (resultado.length > 0) {
            throw new ErrorResponse(
                400,
                "Cliente já existe",
                { message: `O cliente com CPF ${cliente.cpf} já existe` }
            );
        }
        return this.#clienteDAO.create(cliente);
    }

    findAll = async () => {
        return this.#clienteDAO.findAll();
    }

    findByCpf = async (cpf) => {
        const cliente = new Cliente();
        cliente.cpf = cpf;
        return this.#clienteDAO.findByCpf(cliente.cpf);
    }

    updateCliente = async (cpf, dadosCliente) => {
        const cliente = new Cliente();
        cliente.cpf = cpf;
        cliente.nome = dadosCliente.nome;
        cliente.email = dadosCliente.email;
        return this.#clienteDAO.update(cliente);
    }

    deleteCliente = async (cpf) => {
        const cliente = new Cliente();
        cliente.cpf = cpf;
        return this.#clienteDAO.delete(cliente);
    }
}
