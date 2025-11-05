const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports = class MeuTokenJWT {
    #key;
    #alg;
    #type;
    #iss;
    #aud;
    #sub;
    #duracaoToken;
    #payload;

    constructor() {
        this.#key = "x9S4q0v+V0IjvHkG20uAxaHx1ijj+q1HWjHKv+ohxp/oK+77qyXkVj/l4QYHHTF3";
        this.#alg = "HS256";
        this.#type = "JWT";
        this.#iss = "http://localhost";
        this.#aud = "http://localhost";
        this.#sub = "acesso_sistema";
        this.#duracaoToken = 3600 * 24 * 60;
        this.#payload = null;
    }

    gerarToken = (claims) => {
        const headers = {
            alg: this.#alg,
            typ: this.#type,
        };

        const payload = {
            iss: this.#iss,
            aud: this.#aud,
            sub: this.#sub,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + this.#duracaoToken,
            nbf: Math.floor(Date.now() / 1000),
            jti: crypto.randomBytes(16).toString("hex"),
            email: claims.email,
            role: claims.role,
            name: claims.name,
            idFuncionario: claims.idFuncionario
        };

        return jwt.sign(payload, this.#key, {
            algorithm: this.#alg,
            header: headers,
        });
    };

    validarToken = (stringToken) => {
        if (!stringToken) return false;
        if (stringToken.trim() === "") return false;

        const token = stringToken.replace("Bearer ", "").trim();

        try {
            const decoded = jwt.verify(token, this.#key, {
                algorithms: [this.#alg],
            });
            this.#payload = decoded;
            return true;
        } catch (err) {
            return false;
        }
    };

    get key() { return this.#key; }
    set key(value) { this.#key = value; }

    get alg() { return this.#alg; }
    set alg(value) { this.#alg = value; }

    get type() { return this.#type; }
    set type(value) { this.#type = value; }

    get iss() { return this.#iss; }
    set iss(value) { this.#iss = value; }

    get aud() { return this.#aud; }
    set aud(value) { this.#aud = value; }

    get sub() { return this.#sub; }
    set sub(value) { this.#sub = value; }

    get duracaoToken() { return this.#duracaoToken; }
    set duracaoToken(value) { this.#duracaoToken = value; }

    get payload() { return this.#payload; }
    set payload(value) { this.#payload = value; }
};
