const Usuario = require("../models/UsuariosModel");
const MysqlDatabase = require("../database/MysqlDatabase");

module.exports = class UsuariosDAO {
    #database;

    constructor(databaseInstance) {
        this.#database = databaseInstance;
    }

    create = async (objUsuarioModel) => {
        const SQL = "INSERT INTO usuarios (email, senha) VALUES (?, ?);";
        const params = [objUsuarioModel.email, objUsuarioModel.senha];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        if (!resultado.insertId) throw new Error("Falha ao inserir usuário");
        return resultado.insertId;
    };

    delete = async (objUsuarioModel) => {
        const SQL = "DELETE FROM usuarios WHERE id = ?;";
        const params = [objUsuarioModel.id];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    update = async (objUsuarioModel) => {
        const SQL = "UPDATE usuarios SET email = ?, senha = ? WHERE id = ?;";
        const params = [objUsuarioModel.email, objUsuarioModel.senha, objUsuarioModel.id];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    findAll = async () => {
        const SQL = "SELECT * FROM usuarios;";
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL);
        return resultado;
    };

    findById = async (id) => {
        const resultado = await this.findByField("id", id);
        return resultado[0] || null;
    };

    findByField = async (field, value) => {
        const allowedFields = ["id", "email", "senha"];
        if (!allowedFields.includes(field)) throw new Error(`Campo inválido: ${field}`);

        const SQL = `SELECT * FROM usuarios WHERE ${field} = ?;`;
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, [value]);
        return resultado || [];
    };
};
