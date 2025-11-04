module.exports = class Clientes {

    #cpf;
    #nome;
    #telefone;

    constructor(){
        console.log("funcionou Clientes.constructor()")
    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(value){
        const parsed = Number(value);

        if(!Number.isInteger(parsed)){
            throw new Error("cpf deve ser um numero inteiro")          
        }
        if(parsed <= 0){
            throw new Error("cpf deve ser maior do que 0")
        }
        this.#cpf = value;
    }
    
    get nome(){
        return this.#nome;
    }
    set nome(value){
        this.#nome = value;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){
        this.#telefone = value;
    }

}