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
            throw Error("a placa não pode ter menos de 7 dígitos");
        }
        if(value.length > 7){
            throw new Error("a placa não pode ter mais de 7 dígitos");
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
            throw new Error("a montadora deve ter mais de 2 caracteres");
        }
        if(value.length > 20){
            throw new Error("a montadora não pode ter mais de 20 caracteres");
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
            throw new Error("o modelo não pode ter menos de 2 caracteres");
        }
        if(value.length > 15){
            throw new Error("o modelo não pode ter mais de 15 caracteres");           
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
            throw new Error("o cor não pode ter menos de 3 caracteres");
        }
        if(value.length > 25){
            throw new Error("o cor não pode ter mais de 25 caracteres");           
        }
        this.#cor = value;
    }

}
