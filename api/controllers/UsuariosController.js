const UsuarioService = require("../services/UsuariosService");

module.exports = class UsuariosController {
    #usuarioService

    constructor(usuarioServiceDependency) {
        this.#usuarioService = usuarioServiceDependency;
    }

    store = async (request, response, next) => {
        try {
            const usuarioBodyRequest = request.body.usuario;
            const novoId = await this.#usuarioService.createUsuario(usuarioBodyRequest);
            const objResposta = {
                success: true,
                message: "Cadastro realizado com sucesso",
                data: {
                    usuarios: [{
                        id: novoId,
                        nome: usuarioBodyRequest.nome
                    }]
                }
            };
            if (novoId) response.status(201).send(objResposta);
            else throw new Error("Falha ao cadastrar novo Usuário");
        } catch (error) {
            next(error);
        }
    }

    index = async (request, response, next) => {
        try {
            const arrayUsuarios = await this.#usuarioService.findAll();
            response.status(200).send({
                success: true,
                message: "Busca realizada com sucesso",
                data: {
                    usuarios: arrayUsuarios
                }
            });
        } catch (error) {
            next(error);
        }
    }

    show = async (request, response, next) => {
        try {
            const usuarioId = request.params.id;
            const usuario = await this.#usuarioService.findById(usuarioId);
            const objResposta = {
                success: true,
                message: "Executado com sucesso",
                data: {
                    usuarios: usuario
                }
            };
            response.status(200).send(objResposta);
        } catch (error) {
            next(error);
        }
    }

    update = async (request, response, next) => {
        try {
            const usuarioId = request.params.id;
            const dadosUsuario = request.body.usuario;
            const atualizou = await this.#usuarioService.updateUsuario(usuarioId, dadosUsuario);
            if (atualizou) {
                response.status(200).send({
                    success: true,
                    message: "Atualizado com sucesso",
                    data: {
                        usuarios: [{
                            id: usuarioId,
                            ...dadosUsuario
                        }]
                    }
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: "Usuário não encontrado para atualização",
                    data: {
                        usuarios: [{
                            id: usuarioId
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
            const usuarioId = request.params.id;
            const excluiu = await this.#usuarioService.deleteUsuario(usuarioId);
            if (excluiu) {
                response.status(204).send({
                    success: true,
                    message: "Excluído com sucesso",
                    data: { usuarios: [{ id: usuarioId }] }
                });
            } else {
                response.status(404).send({
                    success: false,
                    message: "Usuário não encontrado para exclusão",
                    data: { usuarios: [{ id: usuarioId }] }
                });
            }
        } catch (error) {
            next(error);
        }
    }
}
