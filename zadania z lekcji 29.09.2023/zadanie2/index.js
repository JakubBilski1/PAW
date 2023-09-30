const http = require('http')
const fs = require('fs/promises')

const server = http.createServer(async(req, res)=>{
    const url = req.url
    if(url === "/"){
        const html = await fs.readFile("./index.html")
        res.end(html)
    }
})

const PORT = 3000

server.listen(PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`)
})