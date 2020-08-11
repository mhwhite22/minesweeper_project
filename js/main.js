/*----- constants -----*/
class Square {
    constructor(isCovered, hasMine, proxNum) {
    this.isCovered = true;
    this.hasMine = false;
    this.proxNum = 0;
    }
}

const board = {
    // const width = new Array(5),
    // width.forEach((r) => new Array(5)),
    // console.log(board)
}

// reveal logic:
// if the user clicks on a square when the proxNum is zero, the program 
//runs over the board and reveals any zero that is adjacent to the one
//the user click and all non-mine squares that are adjacent to the zero squares


/*----- app's state (variables) -----*/
let boardArr = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
];

let winner = null;
let timerStart = null;

let boardSize = null;


/*----- cached element references -----*/
const squareEls = document.querySelectorAll('.square');
const boardEl = document.querySelector('#cells');


/*----- event listeners -----*/

squareEls.forEach(e => e.addEventListener('click', handleSquareClick));

/*----- functions -----*/

function init() {
    boardArr.map((row, i) => {
        row.map((sq, j) => {
            boardArr[i][j] = {
             isCovered: true,
             hasMine: false,
             proxNum: 0,
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
                    boardArr[i][j - 1].proxNum = boardArr[i][(j - 1)].proxNum + 1;
                    console.log('ran', i,j)
                };      
                    // add to prox number right of mine if not 0,4
                if ((j < row.length - 1) && boardArr[i][j + 1] && boardArr[i][j + 1].hasMine === false) {
                        boardArr[i][j + 1].proxNum = boardArr[i][j + 1].proxNum + 1;
                        console.log('ran', i, j)
                };
                    // if not 0,0 to 0,4 add to prox number above and left
                if ((i > 0) && (j > 0) && boardArr[i - 1][j - 1].hasMine === false) {
                    console.log('ran', i,j)
                    boardArr[i - 1][j - 1].proxNum = boardArr[i - 1][j - 1].proxNum + 1;
                };
                    // if not 0 index, add to prox number of above square
                if ((i > 0) && boardArr[i - 1][j].hasMine === false) {
                    console.log('ran', i,j)
                    boardArr[i - 1][j].proxNum = boardArr[i - 1][j].proxNum + 1;
                };
                    // if not 0 index or 2nd index 4, add to above right 
                if ((i > 0) && (j < row.length - 1) && boardArr[i - 1][j + 1].hasMine === false) {
                    console.log('ran', i,j)
                    boardArr[i - 1][j + 1].proxNum = boardArr[i - 1][j + 1].proxNum + 1;
                };
                    // if not 3 index or left side squares, add to square below & left
                if ((i < boardArr.length - 1) && (j > 0) && boardArr[i + 1][j - 1].hasMine === false) {
                    console.log('ran', i,j)
                    boardArr[i + 1][j - 1].proxNum = boardArr[i + 1][j - 1].proxNum + 1;
                };
                    // if not 3 index, add to square below
                if ((i < boardArr.length - 1) && boardArr[i + 1][j].hasMine === false) {
                    console.log('ran', i,j)
                    boardArr[i + 1][j].proxNum = boardArr[i + 1][j].proxNum + 1;
                };
                    // if not 3 index or right side squares, add to square below and right;
                if ((i < boardArr.length - 1) && (j < row.length - 1) && boardArr[i + 1][j + 1].hasMine === false) {
                    console.log('ran', i,j)
                    boardArr[i + 1][j + 1].proxNum = boardArr[i + 1][j + 1].proxNum + 1;
                };   
            }    
        })
    });
}

function handleSquareClick(e) {
    console.log('click');
}
init();
render();
console.log(boardArr);

