const readline = require("readline");
const locale = require("../assets/locales/en");
const colors = require("../code/colors");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function splitCommand(str){
    return str.match(/\\?.|^$/g).reduce((p, c) => {
        if(c === '"'){
            p.quote ^= 1;
        }else if(!p.quote && c === ' '){
            p.a.push('');
        }else{
            p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
        }
        return  p;
    }, {a: ['']}).a
}

function commandInterface(socket){
    socket.on("disconnect", (data) => {
        rl.close();
        console.log(`Reason ${data}`);
        console.log(`${colors.red}${locale.server_disconnected}${colors.reset}`);
    });
    rl.question("", async function(data) {
        const commandArgs = splitCommand(data);
        const command = commandArgs[0].toLowerCase();

        if(command == "ping"){
            socket.emit("ping", (success) => {
                
            });
        }

        commandInterface(socket);
    });
}

// function status(){

// }

module.exports = commandInterface;