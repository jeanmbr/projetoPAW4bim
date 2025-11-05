const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class CarroMiddleware {

    validateBody = (request, response, next) => {
        const body = request.body;

        if (!body.carro) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'carro' é obrigatório!" });
        }

        const carro = body.carro;

        if (!carro.placa || carro.placa.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'placa' é obrigatório!" });
        }

        if (!carro.montadora || carro.montadora.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'montadora' é obrigatório!" });
        }

        if (!carro.modelo || carro.modelo.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'modelo' é obrigatório!" });
        }

        next();
    }

    validatePlacaParam = (request, response, next) => {
        const { placa } = request.params;

        if (!placa) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'placa' é obrigatório!" });
        }

        next();
    }
}
