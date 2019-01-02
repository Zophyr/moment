function timeGo() {
    x = 1; // x = seconds
    var date = new Date()
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    if (hour <= 9) {
        hour = '0' + hour
    };
    if (minute <= 9) {
        minute = '0' + minute
    };
    if (seconds <= 9) {
        seconds = '0' + seconds
    };

    var color = '#' + hour + minute + seconds;

    $("div.background").css("background-color", color);
    $("p#hex").text(color);

    setTimeout(timeGo, x * 1000);
}

timeGo(); // execute function