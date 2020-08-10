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
let boardArr = [];
let winner = null;
let timerStart = null;

let boardSize = null;


/*----- cached element references -----*/
const squareEls = document.querySelectorAll('.square');
console.log(squareEls);
const boardEl = document.querySelector('#cells');


/*----- event listeners -----*/

squareEls.forEach(e => e.addEventListener('click', handleSquareClick));

/*----- functions -----*/

function init() {
    let width = 5;
    let height = 4;
    
    // use width and height to create a new array and then put your squares into each one
    
    boardArr.length = 

    let winner = null;
    //render();
}

function render() {
    // randomly generate positions of mines in array

    boardArr.forEach(function(row) {
        let mineIdx = Math.floor(Math.random()*board.length);
        row[mineIdx]
    });



    // for each -1, create a new array of its adjacent squares
    boardArr.forEach(function(row, idx, bArr) {
        row.forEach(function(sq, i, bRow) {
            if ( sq === -1 && i <= (row.length -1)) {
                //console.log(bRow[i-1]);
                //console.log(i);
                //console.log(bRow.length);
                bArr[idx][i-1] = (row[i-1] + 1);
                bArr[idx][i+1] = (row[i+1] + 1);
                //bArr[idx-1][i-1] = (bRow[i-1] + 1);
                //bArr[idx-1][i] = (bRow[i] + 1);
                //bArr[idx-1][i+1] = (bRow[i+1] + 1);
                //bArr[idx+1][i-1] = (bRow[i-1] + 1);
                //bArr[idx+1][i] = (bRow[i] + 1);
                //bArr[idx+1][i+1] = (bRow[i] +1);
            }
            
        });
    });
}

function handleSquareClick(e) {
    console.log('click');
}
init();
render();
console.log(board);





        //strings version of board
/*    let board = [
        ['null', 'null', 'null', 'null', 'null'],
        ['null', 'null', 'null', 'null', 'null'],,
        ['null', 'null', 'null', 'null', 'null'],
        ['null', 'null', 'null', 'null', 'null'],
        ['null', 'null', 'null', 'null', 'null'],,
    ]

//null version of board
    let board = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
    ]
// 1 version of board
    let board = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
    ]
    */
   