module.exports = class Carros{

    #placa;
    #montadora;
    #modelo;
    #cor;

    constructor(){
        console.log("funcionou Carros.constructor()");
    }

    get placa(){
        return this.#placa;
    }
    set placa(value){
        if(typeof value != "string"){
            throw new Error("a placa deve ser uma string");
        }
        if(value.length < 7){
            throw Error("a placa nao pode ter menos de 7 digitos");
        }
        if(value.length > 7){
            throw new Error("a placa nao pode ter mais de 7 digitos");
        }
        this.#placa = value;
    }

    get montadora(){
        return this.#montadora;
    }
    set montadora(value){
         if(typeof value != "string"){
            throw new Error("a montadora deve ser uma string");
        }        
        if(value.length < 2){
            throw new Error("a momntadora deve ter mais de 2 caracteres");
        }
        if(value.length > 20){
            throw new Error("a montadora nao pode ter mais de 20 carcteres");
        }
        this.#montadora = value;
    }
    get modelo(){
        return this.#modelo;
    }
    set modelo(value){
        if(typeof value != "string"){
            throw new Error("o modelo deve ser uma string");
        }
        if(value.length < 2){
            throw new Error("o modelo nao pode ter menos de 2 caracteres");
        }
        if(value.length > 15){
            throw new Error("o modelo nao pode ter mais de 15 caracteres");           
        }
        this.#modelo = value;
    }
    get cor(){
        return this.#cor
    }
    set cor(value){
        if(typeof value != "string"){
            throw new Error("o cor deve ser uma string");
        }
        if(value.length < 3){
            throw new Error("o cor nao pode ter menos de 3 caracteres");
        }
        if(value.length > 25){
            throw new Error("o cor nao pode ter mais de 25 caracteres");           
        }
        this.#cor = value;
    }
}