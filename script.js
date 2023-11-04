let gameSequence = [];
let usrerSequence = [];

let btns = ['red', 'green', 'blue', 'yellow']; // to choose random color
let scores = [];

let isGameStarted = false;
let level = 0;

let boxContainer = document.querySelector('.mark-container');
let h2 = document.querySelector('h2');

document.addEventListener('keypress', function () {
    if (isGameStarted == false) {
        console.log("Game started!");
        isGameStarted = true;

        levelUp();
    }
})


function gameFlash(btn) {
    createCheckBox();
    removeChekMarks();
    btn.classList.add('flash');
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}
function userFlash(btn) {
    btn.classList.add('user-flash');
    setTimeout(function () {
        btn.classList.remove('user-flash');
    }, 250);
}

function levelUp() {
    usrerSequence = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);// generate 0 - 3
    let randomcolor = btns[randomIdx];
    let randomBtn = document.querySelector(`#${randomcolor}`);

    gameSequence.push(randomcolor); // push to array
    console.log(gameSequence);

    gameFlash(randomBtn); // to light up random button
}

function checkAns(idx) {
    if (gameSequence[idx] === usrerSequence[idx]) {
        markCheckBox(idx);
        if (usrerSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br/> Press any key to start`;
        scores.push(level);
        let highScore = getHighScore(scores);
        document.querySelector('#highScore').innerText = `High Score : ${highScore}`;
        gameReset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    // console.log(this.id);
    let userColor = this.id;
    usrerSequence.push(userColor);
    checkAns(usrerSequence.length - 1);
}

let allBtn = document.querySelectorAll('.btn');
for (let elm of allBtn) {
    elm.addEventListener('click', btnPress);
}

function gameReset() {
    usrerSequence = [];
    gameSequence = [];
    level = 0;
    isGameStarted = false;
    boxContainer.innerHTML = '';
}

function getHighScore(scores) {
    let high = 0;
    scores.forEach(element => {
        if (element > high) {
            high = element;
        }
    });

    return high;
}

function createCheckBox() {
    let box = document.createElement('i');
    box.classList.add('fa-regular');
    box.classList.add('fa-circle-check');

    boxContainer.appendChild(box);
}

function markCheckBox(idx) {
    let prnt = document.querySelector('.mark-container');
    let chilrens = prnt.children;
    console.dir(chilrens);

    chilrens[idx].classList.add('mark-check');

    console.log(idx);
}

function removeChekMarks() {
    let prnt = document.querySelector('.mark-container');
    let chilrens = prnt.children;
    for (let child of chilrens) {
        child.classList.remove('mark-check');
    }
}
