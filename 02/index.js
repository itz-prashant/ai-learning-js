import readline from "node:readline/promises"
import { chat } from "./chat.js"
import { stdin, stdout } from 'node:process'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function ask(){

    const userInput = await  rl.question("You", )

    if(userInput == "bye"){
        rl.close()
        return
    }
    const res = await chat(userInput)
    console.log(res)
    ask()

}

ask()