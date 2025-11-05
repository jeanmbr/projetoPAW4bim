const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class ClienteMiddleware {

    validateBody = (request, response, next) => {
        const body = request.body;

        if (!body.cliente) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'cliente' é obrigatório!" });
        }

        const cliente = body.cliente;

        if (!cliente.cpf || cliente.cpf.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'cpf' é obrigatório!" });
        }

        if (!cliente.nome || cliente.nome.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'nome' é obrigatório!" });
        }

        next();
    }

    validateCpfParam = (request, response, next) => {
        const { cpf } = request.params;

        if (!cpf) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'cpf' é obrigatório!" });
        }

        next();
    }
}
