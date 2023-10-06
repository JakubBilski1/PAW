const { writeFile } = require('fs/promises')
const { readFile } = require('fs/promises')
const http = require('http')
const port = 5000
const server = http.createServer(async(req, res)=>{
    const url = req.url
    const method = req.method
    const error = {
        statusCode: "404",
        message: "Strona nie istnieje"
    }
    if(url==="/"){
        res.statusCode = 200
        res.setHeader('content-type', 'text/html')
        const html = await readFile("./main.html")
        res.write(html)
        res.end()
    }
    else if(url==="/dziekujemy"){
        res.statusCode = 200
        res.setHeader('content-type', 'text/html')
        const html = await readFile("./thank-you.html")
        res.write(html)
        res.end()
    }
    else if(url==="/api"){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        const json = [
            {
                "Akkra": "Kopydkowski",
                "Obiekt": "drugi"
            },
            {
                1: "Akkkra",
                2: "Kkraaa"
            }
        ]
        res.write(JSON.stringify(json))
        return res.end()
    }
    else if(url==='/kontakt' && method==='POST'){
        const body = []
        req.on('data', chunk=>{
            body.push(chunk)
        })
        req.on('end', async()=>{
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split("=")[1]
            await writeFile(`contact/message-${Date.now().toString()}.txt`, message)
            res.statusCode = 302
            res.setHeader('Location', '/dziekujemy')
            return res.end()
        })
    }
    else{
        res.statusCode = 404
        res.setHeader('content-type', 'application/json')
        res.write(JSON.stringify(error))
        res.end()
    }
})

server.listen(port, ()=>{
    console.log("Server listening on port ", port)
})