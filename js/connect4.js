

function checkLine(cellA,cellB,cellC,cellD) {
    // Check first cell non-zero and all cells match
    return ((cellA != 0) && (cellA ==cellB) && (cellA == cellC) && (cellA == cellD));
}

function checkWinner(check) {
    // Check for winner going down
    for ( row = 0; row < 3; row++)
        for ( col = 0; col < 7; col++)
            if (checkLine(check[row][col], check[row+1][col], check[row+2][col], check[row+3][col]))
                return check[row][col];


    return 0;
}

