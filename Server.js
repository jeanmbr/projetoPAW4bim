const express = require('express');
module.exports = class Server {

    #exports
    #app;
    #database;
    
    #CarrosDao;
    #CarrosControl;
    #CarrosService;

    #ClientesDao;
    #ClientesControl
    #ClientesService;

    #UsuariosDao;
    #UsuariosControl;
    #USuariosService

    constructor(porta){
        console.log("⬆️Server.constructor()");
        this.porta = porta ?? 8080;
    }

    init = async () => {
        console.log("⬆️Server.init()");
        this.#app = express();
        this.#app.use(express.json());
        this.#app.use(express.static("static"));
    }

}