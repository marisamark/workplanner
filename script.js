$(document).ready(function () {
    console.log("Here!")
    buildTable();
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
    $(".save").on("click", saveInfo)
});


// =========Current Time Display ========

var datetime = null;
date = null;



var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));

}
console.log(datetime)

// ======== Local Storage ========
function getLocal() {
    var schedArr = [];
    for (var i = 8; i <= 18; i++) {
        var key = "time:" + i;
        var schedule = localStorage.getItem(key);
        if (!schedule) {
            schedule = "Insert Plans Here!"
        }
        schedArr.push({ key, schedule })
    }
    return schedArr;
}
function saveLocal(time, input) {
    localStorage.setItem(time, input)
}

// ======== Building Table =======
function buildTable() {
    var schedArr = getLocal()
    console.log(schedArr)
    for (var i = 0; i < schedArr.length; i++) {
        buildTime(schedArr[i])
    }
}
function buildTime(schedObj) {
    // schedObj.key === "time:8"
    // .split(":") === ['time', '8']
    // [1] === '8'
    // parseInt() === 8
    var time = parseInt(schedObj.key.split(":")[1]);
    var text = schedObj.schedule;

    var parentDiv = $("<div class='row " + returnColor(time) + " text-white'>")
    var timeDiv = $("<div class='col-2'>").text(returnTime(time))

    var inputDiv = $("<div class='col-8 input-box' contenteditable='true'>")
    inputDiv.text(text);
    inputDiv.attr("data-time", time);

    var button = $("<button class='btn btn-dark save'>")
    button.text("Save");
    button.attr("data-time", time);

    var buttonDiv = $("<div class='col-2'>")
    buttonDiv.append(button);
    parentDiv.append(timeDiv, inputDiv, buttonDiv)
    $("#time-slots").append(parentDiv);
}
function returnTime(number) {
    if (number > 12) {
        return (number - 12) + " pm";
    }
    else if (number === 12) {
        return number + " pm";
    } else {
        return number + " am";
    }
}
function returnColor(number) {
    if (number < 12) {
        return 'bg-primary'
    } else {
        return 'bg-info'
    }
}
// var currenthour = update.datetime.html(date.format('h'));
// function returnColor(currenthour) {
//     if (currenthour === number) {
//         return 'bg-primary'
//     } else {
//         return 'bg-info'
//     }
// }

// ======== Handling Click ========
function saveInfo() {
    console.log(this)
    var time = $(this).attr("data-time")
    var input = $("div.input-box[data-time=" + time + "]").text()
    var key = "time:" + time
    saveLocal(key, input)
}
