const startupDate = Date.now();
const locale = require("./assets/locales/en");
const colors = require("./code/colors");
const timer = require("./code/timer");

console.log(`${colors.green}${locale.app_starting}${colors.reset}`);

const { io } = require("socket.io-client");

const WriteNoteServer = "https://midelight.net:2053";
const socket = io(WriteNoteServer, {
    withCredentials: !0
});

const readline = require("readline");
const Writable = require('stream').Writable;
const { v4, NIL } = require('uuid');
socket.on("connect", (data) => {
    console.log(colors.green + locale.server_connected + ` ${timer.getTimeElapsed(startupDate)}`);
    const logonData = {
        isConsole: true
    };

    const rlUsername = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    socket.on("disconnect", () => {
        rlUsername.close();
    })

    // var mutableStdout = new Writable({
    //     write: function(chunk, encoding, callback) {
    //         if (!this.muted)
    //             process.stdout.write(chunk, encoding);
    //         callback();
    //     }
    // });
      

    rlUsername.question(`${colors.gray}${locale.username}: ${colors.reset}`, function(data) {
        logonData.Username = data;
        
        rlUsername.close();

        const rlPassword = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        socket.on("disconnect", () => {
            rlPassword.close();
        })
        rlPassword.stdoutMuted = true;
        rlPassword.question(`${colors.gray}${locale.password}: ${colors.reset}` , function(data){
            rlPassword.close();
            console.log();
            logonData.Password = data;
            logonData.SessionID = v4();
            logon();
        });
        rlPassword._writeToOutput = function _writeToOutput(stringToWrite) {
            if(rlPassword.stdoutMuted)
                rlPassword.output.write("*");
            else
            rlPassword.output.write(stringToWrite);
        };
          
    });

    function logon(){
        socket.emit("logon", logonData, (success, error) => {
            console.log(success);
            console.log(error);
            const commandInterface = require("./code/commandInterface"); 
            commandInterface(socket);
        });
    }

});


console.log(`${colors.green}${locale.app_loaded} ${timer.getTimeElapsed(startupDate)}`);