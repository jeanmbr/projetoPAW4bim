const ClienteService = require("../services/ClientesService");

module.exports = class ClientesController {
    #clienteService

    constructor(clienteServiceDependency) {
        this.#clienteService = clienteServiceDependency;
    }

    store = async (request, response, next) => {
        try {
            const clienteBodyRequest = request.body.cliente;
            const novoCpf = await this.#clienteService.createCliente(clienteBodyRequest);
            const objResposta = {
                success: true,
                message: "Cadastro realizado com sucesso",
                data: {
                    clientes: [{
                        cpf: novoCpf,
                        nome: clienteBodyRequest.nome
                    }]
                }
            };
            if (novoCpf) response.status(201).send(objResposta);
            else throw new Error("Falha ao cadastrar novo Cliente");
        } catch (error) {
            next(error);
        }
    }

    index = async (request, response, next) => {
        try {
            const arrayClientes = await this.#clienteService.findAll();
            response.status(200).send({
                success: true,
                message: "Busca realizada com sucesso",
                data: {
                    clientes: arrayClientes
                }
            });
        } catch (error) {
            next(error);
        }
    }

    show = async (request, response, next) => {
        try {
            const clienteCpf = request.params.cpf;
            const cliente = await this.#clienteService.findByCpf(clienteCpf);
            const objResposta = {
                success: true,
                message: "Executado com sucesso",
                data: {
                    clientes: cliente
                }
            };
            response.status(200).send(objResposta);
        } catch (error) {
            next(error);
        }
    }

    update = async (request, response, next) => {
        try {
            const clienteCpf = request.params.cpf;
            const dadosCliente = request.body.cliente;
            const atualizou = await this.#clienteService.updateCliente(clienteCpf, dadosCliente);
            if (atualizou) {
                response.status(200).send({
                    success: true,
                    message: "Atualizado com sucesso",
                    data: {
                        clientes: [{
                            cpf: clienteCpf,
                            ...dadosCliente
                        }]
                    }
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: "Cliente não encontrado para atualização",
                    data: {
                        clientes: [{
                            cpf: clienteCpf
                        }]
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    }

    destroy = async (request, response, next) => {
        try {
            const clienteCpf = request.params.cpf;
            const excluiu = await this.#clienteService.deleteCliente(clienteCpf);
            if (excluiu) {
                response.status(204).send({
                    success: true,
                    message: "Excluído com sucesso",
                    data: { clientes: [{ cpf: clienteCpf }] }
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: "Cliente não encontrado para exclusão",
                    data: { clientes: [{ cpf: clienteCpf }] }
                });
            }
        } catch (error) {
            next(error);
        }
    }
}
