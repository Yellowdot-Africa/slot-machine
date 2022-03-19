var winNum;
let msisdn;
let prize;
var resetNum = 10000000000;
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

// if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
//     xmlhttp = new XMLHttpRequest();
// } else { // code for IE6, IE5
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
// }

// function loadDoc() {
//     xmlhttp.onreadystatechange = function() {
//         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//             var text = xmlhttp.responseText;

//             // Now convert it into array using regex
//             array = text.split(/\r?\n|\r/g);
//             console.log(array);
//             randomNoRepeats(array);
//             odometer.update(winNum);
//         }
//     }

//     xmlhttp.open("GET", "/assets/msisdn.txt", true);
//     xmlhttp.send();
// }

async function getWinner(){

    const winner = await fetch(`https://slot-machine-be.herokuapp.com`, {

        method: 'GET',

        headers: {

            'Accept': 'application/json',

            'Content-Type': 'application/json'

        },

    }).then((data) => data.json());
    msisdn = winner.doc.msisdn;
    odometer.update(msisdn);
    return winner;
}



async function start() {
    prize = await getWinner();
    setTimeout(winningText, 11000);
}

function reset() {
    const winnerText = document.querySelector('p');
    winnerText.innerHTML = "";
    odometer.update(resetNum);
}

function winningText() {
    prize = prize.doc.prize;
    const winnerText = document.querySelector('p');
    winnerText.innerHTML = `Congratulations, you won ${prize}`;
    // confetti.start(10000, 50, 150);
    myConfetti();

    // setTimeout(() => {
    //     myConfetti.reset();
    // }, 1000);
    return winnerText;
}

rollBtn.addEventListener('click', start);
resetBtn.addEventListener('click', reset);