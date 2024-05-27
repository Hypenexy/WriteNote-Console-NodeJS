const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function commandInterface(){
    rl.question("", async function(command) {
        console.log("lol u raelly typed" + command)
        commandInterface();
    });
}

module.exports = commandInterface;