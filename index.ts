import { db } from "./db"

const srv = Bun.serve({
    port: 3000,
    routes: {
        "/user": {
            GET: () => {
                const query = db.query(`
                    SELECT * FROM usuarios;
                `)
                const data = query.all()
                return Response.json(data, { status: 200 })
            }
            ,

            POST: async (req) => {
                const body = await req.body.json()
                const query = db.query(`
                    INSERT INTO usuarios(nome, email, senha, telefone)
                    VALUES(:nome, :email, :senha, :telefone)
                `)
                const dbResp = query.run({
                    ':nome': body.nome,
                    ':email': body.email, 
                    ':senha': body.senha,
                    ':telefone': body.telefone
                })
                return Response.json({
                    "message": "CADASTRADO COM SUCESSO, GAROTE!",
                    dbResp
                })
            }
           
        },

        "/user/:id": {
            GET: (req) => {
                const id = req.params.id
                const query = db.query(`
                    SELECT * FROM usuarios WHERE id = :id
                `)
                const data = query.get({
                    ':id': id
                })
                return Response.json(data)
            },  
            PUT: async(req) => {
                const body = await req.body.json()
                const query = db.query(`UPDATE usuarios SET nome = :nome, email = :email, senha = :senha, telefone = :telefone WHERE id = :id`)
                const dbResp = query.run({
                    ':nome': body.nome,
                    ':email': body.email,
                    ':senha': body.senha,
                    ':telefone': body.telefone,
                    ':id': req.params.id
                })
                return Response.json(dbResp)
            },

            DELETE: (req) => {
                const query = db.query(`DELETE FROM usuarios WHERE id=:id`)
                const data = query.run({ ':id': req.params.id })
                return Response.json(data)
            },
        },
        }
    }
)

console.log(`Servidor em ${srv.url}`)
