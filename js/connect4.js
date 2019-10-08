const playerColors = {
    '1': 'black',
    '2': 'red',
    'null': 'white'
};

const board, turn, win;

function initGrid() {
    board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];
    turn = 1;
    win = null;
}

// Check for winner going down
function checkVert(colArr) {
    for (var row = 0; row < 3; row++) {
        if ((colArr[row] + colArr[row + 1] + colArr[row + 2] + colArr[row + 3]) === 4) return colArr[row];
    }
    return null;
}