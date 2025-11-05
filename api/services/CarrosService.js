const CarroDAO = require("../dao/CarrosDAO");
const Carro = require("../models/CarrosModel");
const ErrorResponse = require("../utils/ErrorResponse");

module.exports = class CarroService {
    #carroDAO;

    constructor(carroDAODependency) {
        this.#carroDAO = carroDAODependency;
    }

    createCarro = async (carroJson) => {
        const carro = new Carro();
        carro.placa = carroJson.placa;
        carro.modelo = carroJson.modelo;
        carro.cor = carroJson.cor;

        const resultado = await this.#carroDAO.findByField("placa", carro.placa);
        if (resultado.length > 0) {
            throw new ErrorResponse(
                400,
                "Carro já existe",
                { message: `O carro com placa ${carro.placa} já existe` }
            );
        }
        return this.#carroDAO.create(carro);
    }

    findAll = async () => {
        return this.#carroDAO.findAll();
    }

    findByPlaca = async (placa) => {
        const carro = new Carro();
        carro.placa = placa;
        return this.#carroDAO.findByPlaca(carro.placa);
    }

    updateCarro = async (placa, dadosCarro) => {
        const carro = new Carro();
        carro.placa = placa;
        carro.modelo = dadosCarro.modelo;
        carro.cor = dadosCarro.cor;
        return this.#carroDAO.update(carro);
    }

    deleteCarro = async (placa) => {
        const carro = new Carro();
        carro.placa = placa;
        return this.#carroDAO.delete(carro);
    }
}
