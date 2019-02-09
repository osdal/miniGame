var table = document.querySelector('table'),
    body = document.getElementsByTagName("BODY")[0],
    cellSize = document.documentElement.clientWidth / 30,
    compCount = document.getElementById('#comp-count'),
    playerCount = document.getElementById('player-count'),
    inputTime = document.getElementById('input-time'),
    modalCompCount = document.getElementById('modal-comp-count'),
    modalPlayerCount = document.getElementById('modal-player-count'),
    delay;
var countWinComp = 0,
    countWinPlayaer = 0,
    playUp = 4;
var gen, oldGen;
var winComp = true;
var winPlayer = true;

inputTime.style.width = cellSize * 4 + 'px';

function getTime() {
    delay = parseInt(inputTime.value);
}

for (let i = 0; i < 10; i++) {
    let tr = document.createElement('TR');
    table.appendChild(tr);
    for (let k = 0; k < 10; k++) {
        let td = document.createElement('TD');
        td.width = cellSize + 'px';
        td.height = cellSize + 'px';
        td.style.backgroundColor = 'blue';
        table.appendChild(tr);
        tr.appendChild(td);
    }
}

var tds = document.querySelectorAll('TD');

table.addEventListener('click', function(event) {
    if (event.target.style.backgroundColor == 'yellow') {
        event.target.style.backgroundColor = 'green';
        winComp = false;
    }
});

function startGame() {
    clearInterval(activeCell);
    clearInterval(compWin);
    clearInterval(takeGreen);
    countWinComp = 0;
    countWinPlayaer = 0;
    compCount.innerText = 0;
    playerCount.innerText = 0;
    gen = false;

    function makeBlue() {
        for (let i = 0; i < tds.length; i++) {
            if (tds[i].style.backgroundColor != 'blue') {
                setTimeout(() => {
                    tds[i].style.backgroundColor = 'blue';
                }, 500);
            }
        }
    }

    makeBlue();

    function generateCellNumber() {
        if (!!gen) {
            oldGen = gen;
        }

        gen = (-0.5 + Math.random() * (99));
        gen = Math.round(gen);
        tds[gen].style.backgroundColor = 'yellow';
    }

    var activeCell = setInterval(generateCellNumber, delay);

    function setRed() {
        if (winComp && oldGen) {
            countWinComp++;
            tds[oldGen].style.backgroundColor = 'red';
            compCount.innerText = countWinComp;

            if (countWinComp == playUp) {
                $("#modal-form").modal('show');
                tds[gen].style.backgroundColor = 'blue';
                modalCompCount.innerText = countWinComp;
                modalPlayerCount.innerText = countWinPlayaer;
                clearInterval(activeCell);
                clearInterval(compWin);
                clearInterval(takeGreen);
                winComp = false;
                oldGen = false;
            }
        }
        winComp = true;
    };

    var compWin = setInterval(setRed, delay);

    function takeWinPlayer() {
        for (let i = 0; i < tds.length; i++) {
            if (tds[i].style.backgroundColor == 'green') {
                countWinPlayaer++;
                playerCount.innerText = countWinPlayaer;

                if (countWinPlayaer == playUp) {
                    $("#modal-form").modal('show');
                    modalCompCount.innerText = countWinComp;
                    modalPlayerCount.innerText = countWinPlayaer;
                    clearInterval(activeCell);
                    clearInterval(compWin);
                    clearInterval(takeGreen);
                    winComp = false;
                }
            }

            if (tds[i].style.backgroundColor !== 'yellow') {
                tds[i].style.backgroundColor = 'blue';
            }

        }

    }

    var takeGreen = setInterval(takeWinPlayer, delay / 3.9);

}