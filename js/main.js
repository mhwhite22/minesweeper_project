/*----- constants -----*/

const squareStates = {
    'covered': 0,
    'uncovered': 1,
    'mine': -1,
}

// const proxlook = {
//     0: ,
//     1: ,
//     2: ,
//     3: ,
//     4: ,
//     5: ,
// }

/*----- app's state (variables) -----*/
let board = [];
let winner = null;
let timerStart = null;



/*----- cached element references -----*/
const squareEls = document.querySelectorAll('.square');
console.log(squareEls);
const boardEl = document.querySelector('#cells');


/*----- event listeners -----*/

squareEls.forEach(e => e.addEventListener('click', handleSquareClick));

/*----- functions -----*/

function init() {
    board = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    let winner = null;
    //render();
}

function render() {
    // randomly generate positions of mines in array
    board.forEach(function(row) {
        let mineIdx = Math.floor(Math.random()*board.length);;
        row[mineIdx] = -1;
    });
    // for each array, index of array, of each idx value in array
    //
    board.forEach(function(row, idx, bArr) {
        row.forEach(function(sq, i, bRow) {
            if ( sq === -1 && i < bRow.length) {
                bArr[idx][i-1] = 1;
                console.log(i);
                //console.log(sq);
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
   