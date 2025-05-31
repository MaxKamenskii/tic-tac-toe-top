// this function provides all of the data needed for the game controller
function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const printBoard = () => {
        console.log(board.map(row => row.map(cell => cell.getValue())));
    }

    const markBoard = (row, column, player) => {
        board[row][column].addMark(player);
        }

    let getCell = (row, column) => {
        return board[row][column].getValue()
    }

    const checkWinner = (playerName) => {
        let firstRow = [board[0][0].getValue(), board[0][1].getValue(), board[0][2].getValue()];
        let secondRow = [board[1][0].getValue(), board[1][1].getValue(), board[1][2].getValue()];
        let thirdRow = [board[2][0].getValue(), board[2][1].getValue(), board[2][2].getValue()];
        let rightDiagonal = [board[2][0].getValue(), board[1][1].getValue(), board[0][2].getValue()];
        let leftDiagonal = [board[0][0].getValue(), board[1][1].getValue(), board[2][2].getValue()];
        let firstColumn = [board[0][0].getValue(), board[1][0].getValue(), board[2][0].getValue()];
        let secondColumn = [board[0][1].getValue(), board[1][1].getValue(), board[2][1].getValue()];
        let thirdColumn = [board[0][2].getValue(), board[1][2].getValue(), board[2][2].getValue()];
        // Player 1 conditions
        if(firstRow.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the first row`)
            return true;
        } else if(secondRow.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the second row`)
            return true;
        } else if(thirdRow.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the third row`)
            return true;
        } else if(rightDiagonal.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the right diagonal`)
            return true;
        } else if(leftDiagonal.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the left diagonal`)
            return true;
        } else if(firstColumn.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the first column`)
            return true;
        } else if(secondColumn.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the second column`)
            return true;
        } else if(thirdColumn.toString() === "1,1,1") {
            console.log(`${playerName} wins  by marking the third column`)
            return true;
        }
        // Player 2 conditions
        else if(firstRow.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the first row`)
            return true;
        } else if(secondRow.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the second row`)
            return true;
        } else if(thirdRow.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the third row`)
            return true;
        } else if(rightDiagonal.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the right diagonal`)
            return true;
        } else if(leftDiagonal.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the left diagonal`)
            return true;
        } else if(firstColumn.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the first column`)
            return true;
        } else if(secondColumn.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the second column`)
            return true;
        } else if(thirdColumn.toString() === "2,2,2") {
            console.log(`${playerName} wins  by marking the third column`)
            return true;
        }
    }

    return {getBoard, printBoard, markBoard, getCell, checkWinner}
}


// this function represents one square on the board
// and three values: 0 - initial, 1 - player1, 2 - player2
function Cell() {
    let value = 0;

    const addMark = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}


function GameController(playerOneName = 'Player One',
    playerTwoName = 'Player Two') {

    const board = Gameboard()

    const players = [
        {
            name: playerOneName,
            mark: 1
        },
                {
            name: playerTwoName,
            mark: 2
        }
    ];

    let theCell;

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    }

    let markedCells = 0;

    const playRound = (row, column) => {
        
        theCell = board.getCell(row, column)
        console.log(`Get cell is: ${theCell}`)
        if(theCell === 0) {
            console.log(`${getActivePlayer().name} marks raw ${row} and column ${column}...`)
            markedCells++;
            
            console.log(`MarkedCells: ${markedCells}`)
            board.markBoard(row, column, getActivePlayer().mark)
            theCell = board.getCell(row, column)
            console.log(`Now the cell is: ${theCell}`)
                if(board.checkWinner(activePlayer.name)){
                    console.log("Game over");
                    return;
                } else if(markedCells === 9) {
                    // Switch player turn
                    console.log("Game is tied");
                    return;
                } else {
                    // Switch player turn
                    
                    switchPlayerTurn();
                    printNewRound(); 
                }

        } else if (theCell === (1 || 2)) {
            console.log('The cell is occupied, try again')
            printNewRound();
        }  
};

printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard
  };

};


function screenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.container')

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";
        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        // Render board squares
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                if(cell.getValue() === 1){
                    cellButton.innerHTML = '<img class="sign" src="assets/x.svg"></img>'
                } else if(cell.getValue() === 2) {
                    cellButton.innerHTML = '<img class="sign" src="assets/circle.svg"></img>'
                } else {
                    cellButton.innerHTML = ''
                }
                boardDiv.appendChild(cellButton)
            })
        })
}
    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row
        const selectedColumn = e.target.dataset.column
        if (!selectedColumn && !selectedRow) return;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }
boardDiv.addEventListener("click", clickHandlerBoard);

updateScreen()

}
screenController()






