/*----- constants -----*/

class Square {
    constructor(isCovered, hasMine, proxNum) {
    this.isCovered = true;
    this.hasMine = false;
    this.proxNum = 0;
    this.isFlagged = false;
    }
}

/*----- app's state (variables) -----*/
let boardArr = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
let time = 0;
let winner = null;
let boardSize = null;
let gameOver = null;
let numMines = null;

/*----- cached element references -----*/

const squareEls = document.querySelectorAll('.square');
const indvSquare = document.querySelector('.square');
const boardEl = document.querySelector('#cells');
const msgEl = document.querySelector('span');
const replayBtn = document.querySelector('#replay');
const timerEl = document.querySelector('#timer');
const flagBtn = document.querySelector('#flag');

/*----- event listeners -----*/

// squareEls.forEach(e => e.addEventListener('click', handleSquareClick));
replayBtn.addEventListener('click', handleBtnClick);
flagBtn.addEventListener('click', flagClick);

/*----- functions -----*/

function init() {
    gameOver = false;
    boardArr.map((row, i) => {
        row.map((sq, j) => {
            boardArr[i][j] = {
             isCovered: true,
             hasMine: false,
             proxNum: 0,
             isFlagged: false,
          }
        }) 
    });
    boardArr.forEach(function(row) {
        let mineIdx = Math.floor(Math.random()*boardArr[0].length);
        row[mineIdx].hasMine = true;
    });
}

function render() {
    boardArr.forEach((row, i) => {
        row.forEach((sq, j) => {
            if (boardArr[i][j].hasMine === true) {
                    //add to prox number left of mine if not 0,0
                if ((j > 0) && boardArr[i][j - 1] && boardArr[i][j - 1].hasMine === false) {
                    boardArr[i][j - 1].proxNum += 1;
                };      
                    // add to prox number right of mine if not 0,4
                if ((j < row.length - 1) && boardArr[i][j + 1] && boardArr[i][j + 1].hasMine === false) {
                        boardArr[i][j + 1].proxNum += 1;
                };
                    // if not 0,0 to 0,4 add to prox number above and left
                if ((i > 0) && (j > 0) && boardArr[i - 1][j - 1].hasMine === false) {
                    boardArr[i - 1][j - 1].proxNum += 1;
                };
                    // if not 0 index, add to prox number of above square
                if ((i > 0) && boardArr[i - 1][j].hasMine === false) {
                    boardArr[i - 1][j].proxNum += 1;
                };
                    // if not 0 index or 2nd index 4, add to above right 
                if ((i > 0) && (j < row.length - 1) && boardArr[i - 1][j + 1].hasMine === false) {
                    boardArr[i - 1][j + 1].proxNum += 1;
                };
                    // if not 3 index or left side squares, add to square below & left
                if ((i < boardArr.length - 1) && (j > 0) && boardArr[i + 1][j - 1].hasMine === false) {
                    boardArr[i + 1][j - 1].proxNum += 1;
                };
                    // if not 3 index, add to square below
                if ((i < boardArr.length - 1) && boardArr[i + 1][j].hasMine === false) {
                    boardArr[i + 1][j].proxNum += 1;
                };
                    // if not 3 index or right side squares, add to square below and right;
                if ((i < boardArr.length - 1) && (j < row.length - 1) && boardArr[i + 1][j + 1].hasMine === false) {
                    boardArr[i + 1][j + 1].proxNum += 1;
                };   
            }    
        })
    });
}

// function uncoverEmpts() {
//     let i = e.target.parentElement.rowIndex;
//     let j = e.target.cellIndex;
//     const currentSq = boardArr[i][j];
//     if (currentSq.proxNum === 0) {
//         currentSq.isCovered = false;
//         currentSq.innerHTML = '0' 
//     } else {
//         return;
//     }
// }

function gameOverMsg() {
    msgEl.innerHTML = 'Game Over!';
    replayBtn.innerHTML = 'Play Again';
    return;
}

function clearBoard() {
    squareEls.forEach(indvSquare => indvSquare.textContent = '');
    msgEl.innerHTML = '';
    replayBtn.innerHTML = 'Start';
}

function flagClick(e) {
    squareEls.forEach(e => e.addEventListener('contextmenu', placeFlag),{once : true})
}

function placeFlag(e) {
    e.preventDefault();
    let i = e.target.parentElement.rowIndex;
    let j = e.target.cellIndex;
    const currentSq = boardArr[i][j];
    if (currentSq.isFlagged === false) {
        currentSq.isFlagged = true;
        const flag = document.createElement('img');
        flag.src = "imgs/Flag_icon_red_4.svg"
        flag.style.width = '10px';
        flag.style.height = 'auto';
        e.target.appendChild(flag);
    } else {
        currentSq.isFlagged = false;
        e.target.innerHTML = '';
    }
}

function winnerCheck() {
    let superBoard = boardArr.flat(boardArr.length);
    const numMines = superBoard.filter((sq) => sq.hasMine).length;
    const numUncovered = superBoard.filter((sq) => !sq.isCovered).length;
    if ((superBoard.length - numMines) === numUncovered) {
        winner = true;
    }
}

function startTimer(){
    time = 0;
    const gameTimer = window.setInterval(() => {
        if (gameOver){
            window.clearInterval(gameTimer);
        } else {
            time++;
            timerEl.innerHTML = time;
        }
    }, 1000)
}
/*----- event handler functions -----*/
function handleSquareClick(e) {
    let i = e.target.parentElement.rowIndex;
    let j = e.target.cellIndex;
    const currentSq = boardArr[i][j];
    if (currentSq.hasMine === true && currentSq.isFlagged === true) {
        return;
    } else if 
        (currentSq.hasMine === true && currentSq.isFlagged === false){
        currentSq.isCovered = false;
        gameOver = true;
        console.log('boom!')
        gameOverMsg();
        squareEls.forEach(e => e.removeEventListener('click', handleSquareClick));
        return;
    } else if 
    (currentSq.isCovered === false && currentSq.proxNum === 0) {
        //insert sqexplode function
    } else {
        currentSq.isCovered = false;
        e.target.textContent = currentSq.proxNum;  
    }
    winnerCheck();
    if (winner === true) {
        gameOver = true;
        msgEl.innerHTML = "Congratulations! You win!"
    }
}

function handleBtnClick(e) {
    if (gameOver === true) {
        clearBoard();
        init();
        render();
        timerEl.innerHTML = 0;
        startTimer();
        squareEls.forEach(e => e.addEventListener('click', handleSquareClick));
    }
    else {
        init();
        render();
        startTimer()
        squareEls.forEach(e => e.addEventListener('click', handleSquareClick));
    }
}



