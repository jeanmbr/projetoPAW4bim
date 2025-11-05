module.exports = class Clientes {

    #cpf;
    #nome;
    #telefone;

    constructor(){
        console.log("funcionou Clientes.constructor()");
    }

    get cpf(){
        return this.#cpf;
    }
    set cpf(value) {
        this._cpf = value.trim().replace(/[.\-]/g, "");

        const parsed = Number(this._cpf);

        if (!Number.isInteger(parsed)) {
            throw new Error("CPF deve conter apenas números inteiros.");
        }

        if (parsed <= 0) {
            throw new Error("CPF deve ser maior do que 0.");
        }

        if (this._cpf.length !== 11) {
            throw new Error("CPF deve ter exatamente 11 dígitos.");
        }
        this.#cpf = value;
    }
        
    
    get nome(){
        return this.#nome;
    }
    set nome(value){
        if (typeof value != "string"){
            throw new Error("o nome deve ser uma string");
        }

        const _nome = value.trim();

        if(_nome.length < 3){
            throw new Error("o nome deve ter mais do que tres letras");
        }

        if(_nome >= 45){
            throw new Error("o nome nao pode ter mais de 45 letras");
        }

        this.#nome = value;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(value){
        
        this._telefone = value.toString().trim().replace(/[()\-\s]/g, "");
        
        console.log("Telefone recebido:", this._telefone);

        const parsed = Number(this._telefone);

        if(!Number.isInteger(parsed)){
            throw new Error("telefone deve ser um numero inteiro");          
        }

        if(this._telefone <= 8){
            throw new Error("telefone deve ser maior do que 8");
        }

        if(this._telefone > 11){
            throw new Error("telefone nao pode ter mais de 11 digitos");
        }

        this.#telefone = value;
    }

}