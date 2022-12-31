var array = [];
var copy = [...array]; //Make a copy of original array
var winNum;
var resetNum = 10000000000;
var xmlhttp;
const subOdometer = document.querySelector('.sub-odometer');
const rollBtn = document.querySelector('.roll-btn');
const resetBtn = document.querySelector('.reset-btn');
const body = document.getElementsByTagName('body');

//Initialize odometer here. 
//Odometer is a Javascript and CSS library for smoothly transitioning numbers
const odometer = new Odometer({
    auto: false, // Don't automatically initialize everything with class 'odometer'
    format: 'd', //Format digit groups
    el: subOdometer, //Selector used to automatically find things to be animated
    duration: 3000,
    // value: 10-00-00-00-00-00
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
            array.map((item) => {
                    // append('#container', item)
            })
            randomNoRepeats(array);
            console.log(winNum);
            odometer.update(winNum);
        }
    }

    xmlhttp.open("GET", "msisdn.txt", true);
    xmlhttp.send();
}




function start() {
    loadDoc();
    // setTimeout(loadDoc, 20000);
    setTimeout(winningText, 10000);
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
    winnerText.innerHTML = "Winner!!!";
    confetti();
    return winnerText;
}

rollBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);
// window.onload('load', )
