const locale = require("../assets/locales/en");
const colors = require("../code/colors");

function getTimeElapsed(since){
    var milliseconds = (Date.now() - since);
    var time = milliseconds;
    var type = "milliseconds";
    if(milliseconds > 1000){
        time = milliseconds / 1000; // Seconds
        var type = "seconds";
    }
    if(milliseconds > 1000 * 60){
        time = milliseconds / 1000 / 60; // Minutes
        var type = "minutes";
    }
    if(milliseconds > 1000 * 60 * 60){
        time = milliseconds / 1000 / 60 / 60; // Hours
        var type = "hours";
    }
    return `${colors.darkGray}(${time} ${locale[type]})${colors.reset}`;
}

module.exports.getTimeElapsed = getTimeElapsed;