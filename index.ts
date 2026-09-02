const  srv = Bun.serve({
    port: 3000,
    routes:{
        "/teste": {
            GET: () => new Response("__William__GET"),
            PUT: () => new Response("__William__PUT"),
            POST: () => new Response("__William__POST"),
            DELETE: () => new Response("__William__DELETE"),
        }
    }
})

console.log(`servidor rodando em ${srv.url}`)