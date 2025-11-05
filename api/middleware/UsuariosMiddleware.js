const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class UsuarioMiddleware {

    validateBody = (request, response, next) => {
        const body = request.body;

        if (!body.usuario) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'usuario' é obrigatório!" });
        }

        const usuario = body.usuario;

        if (!usuario.email || usuario.email.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'email' é obrigatório!" });
        }

        if (!usuario.senha || usuario.senha.trim() === "") {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O campo 'senha' é obrigatório!" });
        }

        next();
    }

    validateIdParam = (request, response, next) => {
        const { id } = request.params;

        if (!id) {
            throw new ErrorResponse(400, "Erro na validação de dados", { message: "O parâmetro 'id' é obrigatório!" });
        }

        next();
    }
}
