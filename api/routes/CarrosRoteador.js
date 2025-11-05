const express = require("express");
const JwtMiddleware = require("../middleware/JwtMiddleware");
const CarroMiddleware = require("../middleware/CarrosMiddleware");
const CarroControle = require("../controllers/CarrosController");

module.exports = class CarrosRoteador {
    #router;
    #carroMiddleware;
    #carroControl;
    #jwtMiddleware;

    constructor(routerDependency, jwtMiddlewareDependency, carroMiddlewareDependency, carroControlDependency) {
        this.#router = routerDependency;
        this.#jwtMiddleware = jwtMiddlewareDependency;
        this.#carroMiddleware = carroMiddlewareDependency;
        this.#carroControl = carroControlDependency;
    }

    createRoutes = () => {
        this.#router.post("/",
           // this.#jwtMiddleware.validateToken,
            this.#carroMiddleware.validateBody,
            this.#carroControl.store
        );

        this.#router.get("/",
           // this.#jwtMiddleware.validateToken,
            this.#carroControl.index
        );

        this.#router.get("/:placa",
           // this.#jwtMiddleware.validateToken,
            this.#carroMiddleware.validatePlacaParam,
            this.#carroControl.show
        );

        this.#router.put("/:placa",
           // this.#jwtMiddleware.validateToken,
            this.#carroMiddleware.validatePlacaParam,
            this.#carroMiddleware.validateBody,
            this.#carroControl.update
        );

        this.#router.delete("/:placa",
           // this.#jwtMiddleware.validateToken,
            this.#carroMiddleware.validatePlacaParam,
            this.#carroControl.destroy
        );

        return this.#router;
    }
}
