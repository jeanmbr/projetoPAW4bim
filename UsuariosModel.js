module.exports = class Usuarios{

    #id;
    #email;
    #senha;

    constructor(){
        console.log("funcionou Usuarios.constructor()");
    }

    get id(){
        return this.#id;
    }
    set id(value){
        const parsed = Number(value);

        if(!Number.isInteger(parsed)){
            throw new Error("id deve ser um número inteiro");
        }
        if(parsed <= 0){
            throw new Error("id deve ser maior do que 0");
        }
        this.#id = value;
    }

    get email(){
        return this.#email;
    }
    set email(value){
        if(typeof value != "string"){
            throw new Error("o email deve ser uma string");
        }
        if(value.length < 11){
            throw new Error("o email deve ter no mínimo 11 caracteres");
        }
        this.#email = value;
    }

    get senha(){
        return this.#senha;
    }
    set senha(value){
        if(value.length < 3){
            throw new Error("senha deve ter no mínimo 4 caracteres");
        }
        this.#senha = value;
    }

}
