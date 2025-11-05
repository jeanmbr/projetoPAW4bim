const UsuarioDAO = require("../dao/UsuariosDAO");
const Usuario = require("../models/UsuariosModel");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class UsuarioService {
    #usuarioDAO;

    constructor(usuarioDAODependency) {
        this.#usuarioDAO = usuarioDAODependency;
    }

    createUsuario = async (usuarioJson) => {
        const usuario = new Usuario();
        usuario.nome = usuarioJson.nome;
        usuario.email = usuarioJson.email;
        usuario.senha = usuarioJson.senha;

        const resultado = await this.#usuarioDAO.findByField("email", usuario.email);
        if (resultado.length > 0) {
            throw new ErrorResponse(
                400,
                "Usuário já existe",
                { message: `O usuário com email ${usuario.email} já existe` }
            );
        }
        return this.#usuarioDAO.create(usuario);
    }

    findAll = async () => {
        return this.#usuarioDAO.findAll();
    }

    findById = async (id) => {
        const usuario = new Usuario();
        usuario.id = id;
        return this.#usuarioDAO.findById(usuario.id);
    }

    updateUsuario = async (id, dadosUsuario) => {
        const usuario = new Usuario();
        usuario.id = id;
        usuario.nome = dadosUsuario.nome;
        usuario.email = dadosUsuario.email;
        usuario.senha = dadosUsuario.senha;
        return this.#usuarioDAO.update(usuario);
    }

    deleteUsuario = async (id) => {
        const usuario = new Usuario();
        usuario.id = id;
        return this.#usuarioDAO.delete(usuario);
    }
}
