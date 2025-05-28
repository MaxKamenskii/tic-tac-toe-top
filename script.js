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
    return {printBoard, markBoard}
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

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} marks raw ${row} and column ${column}...`)
        board.markBoard(row, column, getActivePlayer().mark)

    // Switch player turn
    switchPlayerTurn();
    printNewRound();
};

printNewRound();

  return {
    playRound,
    getActivePlayer
  };

};

const game = GameController();

