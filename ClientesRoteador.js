const express = require("express");
const JwtMiddleware = require("../middleware/JwtMiddleware");
const ClienteMiddleware = require("../middleware/ClientesMiddleware");
const ClienteControle = require("../controllers/ClientesController");

module.exports = class ClientesRoteador {
    #router;
    #clienteMiddleware;
    #clienteControl;
    #jwtMiddleware;

    constructor(routerDependency, jwtMiddlewareDependency, clienteMiddlewareDependency, clienteControlDependency) {
        this.#router = routerDependency;
        this.#jwtMiddleware = jwtMiddlewareDependency;
        this.#clienteMiddleware = clienteMiddlewareDependency;
        this.#clienteControl = clienteControlDependency; 
    }
    
    createRoutes = () => {

        this.#router.post("/",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateBody,
            (req, res) => this.#clienteControl.store(req, res) 
        );

        this.#router.get("/",
            this.#jwtMiddleware.validateToken,
            (req, res) => this.#clienteControl.index(req, res)
        );

        this.#router.get("/:cpf",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateCpfParam,
            (req, res) => this.#clienteControl.show(req, res)
        );

        this.#router.put("/:cpf",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateCpfParam,
            this.#clienteMiddleware.validateBody,
            (req, res) => this.#clienteControl.update(req, res)
        );

        this.#router.delete("/:cpf",
            this.#jwtMiddleware.validateToken,
            this.#clienteMiddleware.validateCpfParam,
            (req, res) => this.#clienteControl.destroy(req, res)
        );

        return this.#router;
    }
}
