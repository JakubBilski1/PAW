import { Readable } from 'stream'
import fs from "fs"
const writableStream = fs.createWriteStream(`random${Date.now().toString()}.txt`)

async function * generate(){
    for(let i=0; i<20; i++){
        yield Math.floor(Math.random()*2137-420)
    }
}

const readable = Readable.from(generate())

readable.on('data', chunk=>{
    writableStream.write(`${chunk.toString()}\n`)
})