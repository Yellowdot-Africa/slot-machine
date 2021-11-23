var array = [];
var copy = [...array]; //Make a copy of original array
var winNum;
var resetNum = 10000000000;
var xmlhttp;
const subOdometer = document.querySelector('.sub-odometer');
const rollBtn = document.querySelector('.roll-btn');
const resetBtn = document.querySelector('.reset-btn');

var myCanvas = document.createElement('canvas');
document.body.appendChild(myCanvas);

var myConfetti = confetti.create(myCanvas, { resize: false });

//Initialize odometer here. 
//Odometer is a Javascript and CSS library for smoothly transitioning numbers
const odometer = new Odometer({
    auto: false, // Don't automatically initialize everything with class 'odometer'
    format: 'd', //Format digit groups
    el: subOdometer, //Selector used to automatically find things to be animated
    duration: 10000,
    value: 10000000000
});

if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
} else { // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

function loadDoc() {
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var text = xmlhttp.responseText;

            // Now convert it into array using regex
            array = text.split(/\r?\n|\r/g);
            randomNoRepeats(array);
            console.log(winNum);
            odometer.update(winNum);
        }
    }

    xmlhttp.open("GET", "/assets/msisdn.txt", true);
    xmlhttp.send();
}




function start() {
    loadDoc();
    setTimeout(winningText, 15000);
}

function reset() {
    const winnerText = document.querySelector('p');
    winnerText.innerHTML = "";
    odometer.update(resetNum);
}

//Function to select an item randomly from the array without repeating. There will be no repetition until array is exhausted
function randomNoRepeats(array) {
    if (copy.length < 1) {
        copy = [...array]; //Make a copy of array if all items are exhausted
    }
    var index = Math.floor(Math.random() * copy.length);
    winNum = copy[index];
    copy.splice(index, 1);
    return winNum;
};

function winningText() {
    const winnerText = document.querySelector('p');
    winnerText.innerHTML = "Winning Number!!!";
    // confetti.start(10000, 50, 150);
    myConfetti();

    // setTimeout(() => {
    //     myConfetti.reset();
    // }, 1000);
    return winnerText;
}

rollBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);