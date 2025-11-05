const Cliente = require("../models/ClientesModel");
const MysqlDatabase = require("../database/MysqlDatabase");

module.exports = class ClientesDAO {
    #database;

    constructor(databaseInstance) {
        this.#database = databaseInstance;
    }

    create = async (objClienteModel) => {
        const SQL = "INSERT INTO clientes (cpf, nome, telefone) VALUES (?, ?, ?);";
        const params = [objClienteModel.cpf, objClienteModel.nome, objClienteModel.telefone];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        if (!resultado.affectedRows) {
            throw new Error("Falha ao inserir cliente");
        }

        return objClienteModel.cpf;
    };

    delete = async (objClienteModel) => {
        const SQL = "DELETE FROM clientes WHERE cpf = ?;";
        const params = [objClienteModel.cpf];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    update = async (objClienteModel) => {
        const SQL = "UPDATE clientes SET nome = ?, telefone = ? WHERE cpf = ?;";
        const params = [objClienteModel.nome, objClienteModel.telefone, objClienteModel.cpf];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        return resultado.affectedRows > 0;
    };

    findAll = async () => {
        const SQL = "SELECT * FROM clientes;";
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL);
        return resultado;
    };

    findByCpf = async (cpf) => {
        const resultado = await this.findByField("cpf", cpf);
        return resultado[0] || null;
    };

    findByField = async (field, value) => {
        const allowedFields = ["cpf", "nome", "telefone"];
        if (!allowedFields.includes(field)) throw new Error(`Campo inválido: ${field}`);

        const SQL = `SELECT * FROM clientes WHERE ${field} = ?;`;
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, [value]);
        return resultado || [];
    };
};
