const Carro = require("../models/CarrosModel");
const MysqlDatabase = require("../database/MysqlDatabase");

module.exports = class CarrosDAO {
    #database;

    constructor(databaseInstance) {
        this.#database = databaseInstance;
    }

    create = async (objCarroModel) => {
        const SQL = "INSERT INTO carros (placa, montadora, modelo, cor, clientes_cpf) VALUES (?, ?, ?, ?, ?);";
        const params = [
            objCarroModel.placa,
            objCarroModel.montadora,
            objCarroModel.modelo,
            objCarroModel.cor,
            objCarroModel.clientes_cpf
        ];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);

        if (!resultado.affectedRows) throw new Error("Falha ao inserir carro");
        return objCarroModel.placa;
    };

    delete = async (objCarroModel) => {
        const SQL = "DELETE FROM carros WHERE placa = ?;";
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, [objCarroModel.placa]);

        return resultado.affectedRows > 0;
    };

    update = async (objCarroModel) => {
        const SQL = `
            UPDATE carros 
            SET montadora = ?, modelo = ?, cor = ?, clientes_cpf = ?
            WHERE placa = ?;
        `;
        const params = [
            objCarroModel.montadora,
            objCarroModel.modelo,
            objCarroModel.cor,
            objCarroModel.clientes_cpf,
            objCarroModel.placa
        ];

        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, params);
        return resultado.affectedRows > 0;
    };

    findAll = async () => {
        const SQL = "SELECT * FROM carros;";
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL);
        return resultado;
    };

    findByPlaca = async (placa) => {
        const resultado = await this.findByField("placa", placa);
        return resultado[0] || null;
    };

    findByField = async (field, value) => {
        const allowedFields = ["placa", "montadora", "modelo", "cor", "clientes_cpf"];
        if (!allowedFields.includes(field)) throw new Error(`Campo inválido: ${field}`);

        const SQL = `SELECT * FROM carros WHERE ${field} = ?;`;
        const pool = await this.#database.getPool();
        const [resultado] = await pool.execute(SQL, [value]);
        return resultado || [];
    };
};
