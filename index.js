const startupDate = Date.now();
const locale = require("./assets/locales/en");
const colors = require("./code/colors");

console.log(`${colors.green}${locale.app_starting}${colors.reset}`);

const { io } = require("socket.io-client");

const WriteNoteServer = "https://midelight.net:2053";
const socket = io(WriteNoteServer, {
    withCredentials: !0
});

socket.on("connect", (data) => {
    socket.emit("logon", (data) => {
        console.log(data);
    });
});

const timeLoading = (Date.now() - startupDate) / 1000;
console.log(`${colors.green}${locale.app_loaded}${colors.reset} ${colors.darkGray}(${timeLoading} seconds)${colors.reset}`);