
import { db } from "../db"

const srv = Bun.serve({
    port: 3000,
    routes: {
        "/user": {
            GET: () => {
                const query = db.query(`
                    SELECT * FROM users;
                `)
                const data = query.all()
                return Response.json(data, { status: 200 })
            }
            ,

            POST: async (req) => {
                const body = await req.body.json()
                const query = db.query(`
                    INSERT INTO users(username, email, password_hash)
                    VALUES(:username, :email, :password_hash)
                `)
                const dbResp = query.run({
                    ':username': body.username, 
                    ':email': body.email, 
                    ':password_hash': body.password
                })
                return Response.json({
                    "message": "deu boa garote!",
                    dbResp
                })
            },
            PUT: async (req) => {
                const body = await req.body.json()
                const id = req.params.id
                const query = db.query(`
                    UPDATE users SET username = :username, email = :email, password_hash = :password_hash WHERE id = :id
                `) 
                const dbResp = query.run({
                    ':username': body.username, 
                    ':email': body.email,
                    ':password': body.password,
                    ':id': id
                })
                return Response.json({
                    "message": "deu boa garote!",
                    dbResp
                })
            },
            DELETE: (req) => {
                const id = req.params.id
                const query = db.query(`
                    DELETE FROM users WHERE id = :id
                `)
                const dbResp = query.run({
                    ':id': id
                })
                return Response.json({
                      "message": "deu bom",
                    dbResp          
                })
            },
        },

        "/user/:id": {
            GET: (req) => {
                const id = req.params.id
                const query = db.query(`
                    SELECT * FROM users WHERE id = :id
                `)
                const data = query.get({
                    ':id': id
                })
                return Response.json(data, { status: 200 })
            },  
            POST: () =>{
                
                Response.json("", { status: 501 })
            },
            PUT: () => Response.json("", { status: 501 }),
            DELETE: () => Response.json("", { status: 501 }),
        }
    }
})

console.log(`Servidor em ${srv.url}`)
