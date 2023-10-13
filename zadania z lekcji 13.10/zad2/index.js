const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/home.html'))
})

app.get('/kontakt', (req, res)=>{
    res.sendFile(path.join(__dirname+'/contact.html'))
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})