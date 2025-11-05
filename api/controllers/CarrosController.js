const CarroService = require("../services/CarrosService");

module.exports = class CarrosController {
    #carroService

    constructor(carroServiceDependency) {
        this.#carroService = carroServiceDependency;
    }

    store = async (request, response, next) => {
        try {
            const carroBodyRequest = request.body.carro;
            const novaPlaca = await this.#carroService.createCarro(carroBodyRequest);
            const objResposta = {
                success: true,
                message: "Cadastro realizado com sucesso",
                data: {
                    carros: [{
                        placa: novaPlaca,
                        modelo: carroBodyRequest.modelo
                    }]
                }
            };
            if (novaPlaca) response.status(201).send(objResposta);
            else throw new Error("Falha ao cadastrar novo Carro");
        } catch (error) {
            next(error);
        }
    }

    index = async (request, response, next) => {
        try {
            const arrayCarros = await this.#carroService.findAll();
            response.status(200).send({
                success: true,
                message: "Busca realizada com sucesso",
                data: {
                    carros: arrayCarros
                }
            });
        } catch (error) {
            next(error);
        }
    }

    show = async (request, response, next) => {
        try {
            const carroPlaca = request.params.placa;
            const carro = await this.#carroService.findByPlaca(carroPlaca);
            const objResposta = {
                success: true,
                message: "Executado com sucesso",
                data: {
                    carros: carro
                }
            };
            response.status(200).send(objResposta);
        } catch (error) {
            next(error);
        }
    }

    update = async (request, response, next) => {
        try {
            const carroPlaca = request.params.placa;
            const dadosCarro = request.body.carro;
            const atualizou = await this.#carroService.updateCarro(carroPlaca, dadosCarro);
            if (atualizou) {
                response.status(200).send({
                    success: true,
                    message: "Atualizado com sucesso",
                    data: {
                        carros: [{
                            placa: carroPlaca,
                            ...dadosCarro
                        }]
                    }
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: "Carro não encontrado para atualização",
                    data: {
                        carros: [{
                            placa: carroPlaca
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
            const carroPlaca = request.params.placa;
            const excluiu = await this.#carroService.deleteCarro(carroPlaca);
            if (excluiu) {
                response.status(204).send({
                    success: true,
                    message: "Excluído com sucesso",
                    data: { carros: [{ placa: carroPlaca }] }
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: "Carro não encontrado para exclusão",
                    data: { carros: [{ placa: carroPlaca }] }
                });
            }
        } catch (error) {
            next(error);
        }
    }
}
