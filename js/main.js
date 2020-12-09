/*----- constants -----*/
const flagImg = '<img width=10 src="imgs/Flag_icon_red_4.svg">';
const mineImg = '<img width=20 src="imgs/mine.png">';

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
let gameRunning = false;
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

squareEls.forEach(e => e.addEventListener('click', handleSquareClick));
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
    let mineNum = 24;
    while (mineNum > 0) {
        i = Math.floor(Math.random()*boardArr.length);
        j = Math.floor(Math.random()*boardArr[0].length);
        boardArr[i][j].hasMine = true;
        mineNum -= 1;
    }
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

function gameOverMsg() {
    msgEl.innerHTML = 'Game Over!';
    replayBtn.innerHTML = 'Play Again';
    boardArr.forEach((row, i) => {
        row.forEach((sq, j) => {
            if (boardArr[i][j].hasMine === true) {
            let currentCell = boardEl.rows[i].cells[j];
            currentCell.innerHTML = mineImg;
            }
        })  
    })
    return;
}

function clearBoard() {
    squareEls.forEach(indvSquare => indvSquare.style.backgroundColor = '#c0c0c0');
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
        e.target.innerHTML = flagImg;
    } else {
        currentSq.isFlagged = false;
        e.target.innerHTML = '';
    }
}

function winnerCheck() {
    let superBoard = boardArr.flat(boardArr.length);
    const numMines = superBoard.filter((sq) => sq.hasMine).length;
    const numUncovered = superBoard.filter((sq) => !sq.isCovered).length;

    if (((superBoard.length - numMines) === numUncovered) && (gameRunning === true)) {
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
        e.target.style.backgroundColor = 'red';
        e.target.innerHTML = mineImg;
        gameOver = true;
        gameOverMsg();
        squareEls.forEach(e => e.removeEventListener('click', handleSquareClick));
        return;
    } else if 
    (currentSq.isCovered === true && currentSq.proxNum === 0) {
        currentSq.isCovered = false;
        e.target.textContent = '';
        e.target.style.backgroundColor = '#595959';
    } else {
        currentSq.isCovered = false;
        e.target.textContent = currentSq.proxNum;  
    }
    winnerCheck();
    if (winner === true && gameRunning === true) {
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
        gameRunning = false
        squareEls.forEach(e => e.addEventListener('click', handleSquareClick));
    }
    else {
        init();
        render();
        startTimer()
        gameRunning = true
        squareEls.forEach(e => e.addEventListener('click', handleSquareClick));
    }
}



