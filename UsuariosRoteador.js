const express = require("express");
const JwtMiddleware = require("../middleware/JwtMiddleware");
const UsuarioMiddleware = require("../middleware/UsuariosMiddleware");
const UsuarioControle = require("../controllers/UsuariosController");

module.exports = class UsuariosRoteador {
    #router;
    #usuarioMiddleware;
    #usuarioControl;
    #jwtMiddleware;

    constructor(routerDependency, jwtMiddlewareDependency, usuarioMiddlewareDependency, usuarioControlDependency) {
        this.#router = routerDependency;
        this.#jwtMiddleware = jwtMiddlewareDependency;
        this.#usuarioMiddleware = usuarioMiddlewareDependency;
        this.#usuarioControl = usuarioControlDependency;
    }

    createRoutes = () => {
        this.#router.post("/",
            this.#jwtMiddleware.validateToken,
            this.#usuarioMiddleware.validateBody,
            this.#usuarioControl.store
        );

        this.#router.get("/",
            this.#jwtMiddleware.validateToken,
            this.#usuarioControl.index
        );

        this.#router.get("/:id",
            this.#jwtMiddleware.validateToken,
            this.#usuarioMiddleware.validateIdParam,
            this.#usuarioControl.show
        );

        this.#router.put("/:id",
            this.#jwtMiddleware.validateToken,
            this.#usuarioMiddleware.validateIdParam,
            this.#usuarioMiddleware.validateBody,
            this.#usuarioControl.update
        );

        this.#router.delete("/:id",
            this.#jwtMiddleware.validateToken,
            this.#usuarioMiddleware.validateIdParam,
            this.#usuarioControl.destroy
        );

        return this.#router;
    }
}
