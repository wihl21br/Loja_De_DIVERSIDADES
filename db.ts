import { Database } from "bun:sqlite";

const db = new Database("database.sqlite");

const query = db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        nome            TEXT NOT NULL UNIQUE,
        email           TEXT NOT NULL UNIQUE,
        senha           TEXT NOT NULL,
        telefone        TEXT
    );
    CREATE TABLE IF NOT EXISTS categorias (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        nome            TEXT NOT NULL,
        descricao       TEXT
);

    CREATE TABLE IF NOT EXISTS produtos (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        nome            TEXT NOT NULL,
        descricao       TEXT,
        preco           REAL NOT NULL,
        imagem          TEXT,
        data_validade   TEXT,
        data_cadastro   TEXT,
        estoque         INTEGER NOT NULL DEFAULT 0,
        id_categoria    INTEGER,

        FOREIGN KEY (id_categoria)
            REFERENCES categorias(id)
);

    CREATE TABLE IF NOT EXISTS lojas (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        nome            TEXT NOT NULL,
        descricao       TEXT,
        endereco        TEXT,
        telefone        TEXT,
        email           TEXT
);
`);
    

query.run();

export { db }