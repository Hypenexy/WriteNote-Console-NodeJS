const locale = require("./assets/locales/en");
const colors = require("./code/colors");

console.log(`${colors.green}${locale.app_starting}${colors.reset}`);

const { io } = require("socket.io-client");
// var fs = require('fs');
// eval(fs.readFileSync('./node_modules/socket.io/client-dist/socket.io.min.js')+'');
// const io = require("socket.io");

const WriteNoteServer = "https://midelight.net:2053";
const socket = io(WriteNoteServer, {
    withCredentials: !0
});

console.log(socket);
