const startupDate = Date.now();
const locale = require("./assets/locales/en");
const colors = require("./code/colors");

console.log(`${colors.green}${locale.app_starting}${colors.reset}`);

const { io } = require("socket.io-client");

const WriteNoteServer = "https://midelight.net:2053";
const socket = io(WriteNoteServer, {
    withCredentials: !0
});

const readline = require("readline");
const { v4, NIL } = require('uuid');
socket.on("connect", (data) => {
    const logonData = {
        isConsole: true
    };

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Username: ", async function(data) {
        logonData.Username = data;
        rl.question("Password: ", async function(data){
            logonData.Password = data;
            logonData.SessionID = v4();
            logon();
        });
    });

    function logon(){
        socket.emit("logon", logonData, (success, error) => {
            console.log(success);
            console.log(error);
        });
    }

});

// const commandInterface = require("./code/commandInterface"); 
// commandInterface();

const timeLoading = (Date.now() - startupDate);
console.log(`${colors.green}${locale.app_loaded}${colors.reset} ${colors.darkGray}(${timeLoading} milliseconds)${colors.reset}`);