var playerColors = {
    '1': 'black',
    '-1': 'red',
    'null': 'white'
};

var board, turn, win;

var msgEl = document.getElementById('message');

document.querySelector('table').addEventListener('click', function(evt) {
    if (win) return;
    var colIdx = parseInt(evt.target.getAttribute('data-col'));
    var column = board[colIdx];
    if (!column.includes(null)) return;
    column[column.indexOf(null)] = turn;
    turn *= -1;
    win = checkWinner();
    render();
});

document.querySelector('button').addEventListener('click', function(evt) {
    initialize();
    render();
});

function initialize() {
    board = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null]
    ];
    turn = 1;
    win = null;
}

function render() {
    board.forEach(function(colArr, idx) {
        var cells = document.querySelectorAll(`[data-col="${idx}"]`)
        for( var i = 0; i < cells.length; i++) {
            cells[5 - i].style.backgroundColor = playerColors[board[idx][i]];
        }
        if (win) {
        msgEl.innerHTML = `${playerColors[win].toUpperCase()} Wins!`;
        } else {
        msgEl.innerHTML = `${playerColors[turn].toUpperCase()}'s Turn!`;
        }
    });
}

function checkLine(cellA, cellB, cellC, cellD) {
    // Check first cell non-zero and all cells match
    return ((cellA != 0) && (cellA == cellB) && (cellA == cellC) && (cellA == cellD));
}

function checkWinner(check) {
    // Check for winner going down
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 7; col++) {
            if (Math.abs(checkLine(check[row][col], check[row + 1][col], check[row + 2][col], check[row + 3][col]))) {
                return check[row][col];

            }
        }
    }
    // Check for winner going right
    for (row = 0; row < 6; row++){
        for (col = 0; col < 4; col++){
            if (Math.abs(checkLine(check[row][col], check[row][col + 1], check[row][col + 2], check[row][col + 3]))){
                return check[row][col];
            }
        }
    }
    // Check for winner diagnally going down-right
    for (row = 0; row < 3; row++){
        for (col = 0; col < 4; col++){
            if (Math.abs(checkLine(check[row][col], check[row + 1][col + 1], check[row + 2][col + 2], check[row + 3][col + 3]))){
                return check[row][col];
            }
        }
    }
    // Check for winner diagnally going down-left
    for (row = 3; row < 6; row++){
        for (col = 0; col < 4; col++){
            if (Math.abs(checkLine(check[row][col], check[row - 1][col + 1], check[row - 2][col + 2], check[row - 3][col + 3]))){
                return check[row][col];
            }
        }
    }
    return null;
}
initialize();
render();