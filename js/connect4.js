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

var playerColors = {
    '1': 'yellow',
    '-1': 'red',
    'null': 'white'
};

var board, turn, win;

var mess = document.getElementById('message');

document.querySelector('table').addEventListener('click', function (e) {
    if (win) return;
    var colIdx = parseInt(e.target.getAttribute('data-col'));
    var column = board[colIdx];
    if (!column.includes(null)) return;
    column[column.indexOf(null)] = turn;
    turn *= -1;
    win = getWinner();
    check();
});

document.querySelector('button').addEventListener('click', function (e) {
    initialize();
    check();
});

function check() {
    board.forEach(function (colArr, idx) {
        var cells = document.querySelectorAll(`[data-col="${idx}"]`)
        for (var i = 0; i < cells.length; i++) {
            cells[5 - i].style.backgroundColor = playerColors[board[idx][i]];
        }
        if (win) {
            mess.innerHTML = `${playerColors[win].toUpperCase()} Wins!`;
        } else {
            mess.innerHTML = ` ${playerColors[turn].toUpperCase()}'s Turn!`;
        }
    });
}

function getWinner() {
    var winner = null;
    for (var col = 0; col < board.length; col++) {
        winner = getColumnWinner(col);
        if (winner) break;
    }
    return winner;
}

function getColumnWinner(colIdx) {
    var winner;
    var colArr = board[colIdx];
    winner = checkVert(colArr);
    if (winner) {
        return winner;
    }
    winner = checkHoriz(colIdx);
    if (winner) {
        return winner;
    }
    winner = checkDiag(colIdx, 1);
    if (winner) {
        return winner;
    }
    winner = checkDiag(colIdx, -1);
    if (winner) {
        return winner;
    }
    return null;
}

// Check for winner going down
function checkVert(colArr) {
    for (var row = 0; row < 3; row++) {
        if (Math.abs(colArr[row] + colArr[row + 1] + colArr[row + 2] + colArr[row + 3]) === 4) {
            return colArr[row];
        }
    }
    return null;
}

// Check for winner going right
function checkHoriz(colIdx) {
    if (colIdx > 3) {
        return null;
    }
    for (var row = 0; row < 7; row++) {
        if (Math.abs(board[row][colIdx] + board[row][colIdx + 1] + board[row][colIdx + 2] + board[row][colIdx + 3]) === 4) {
            return board[row][colIdx];
        }
    }
    return null;
}

//Check for winner going diagnal
function checkDiag(colIdx, dia) {
    if (colIdx > 3) {
        return null;
    }
    for (var row = 0; row < 7; row++) {
        if ((dia === 1 && row > 2) || (dia === -1 && row > 3)) {
            break;
        }
        if (Math.abs(board[colIdx][row] + board[colIdx + 1][row + dia] + board[colIdx + 2][row + dia * 2] + board[colIdx + 3][row + dia * 3]) === 4) {
            return board[colIdx][row];
        }
    }
    return null;
}



initialize();
check();