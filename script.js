// Selects all elements with the class "cell" (each cell of the Tic-Tac-Toe board)
const cells = document.querySelectorAll(".cell");

// Selects the element with the ID "statusText" to display the game status (whose turn it is, win, or draw)
const statusText = document.querySelector("#statusText");

// Selects the restart button with the ID "restartBtn"
const restartBtn = document.querySelector("#restartBtn");

// Defines the win conditions based on the indexes of the cells
// These represent the combinations of cells that result in a win (rows, columns, diagonals)
const winConditions = [
    [0, 1, 2],  // top row
    [3, 4, 5],  // middle row
    [6, 7, 8],  // bottom row
    [0, 3, 6],  // left column
    [1, 4, 7],  // middle column
    [2, 5, 8],  // right column
    [0, 4, 8],  // diagonal (top-left to bottom-right)
    [2, 4, 6]   // diagonal (top-right to bottom-left)
];

// Array that keeps track of the current state of each cell ("" means empty, "X" or "O" means filled by a player)
let options = ["", "", "", "", "", "", "", "", ""];

// Variable to track the current player ("X" or "O")
let currentPlayer = "X";

// Flag to check whether the game is running (used to prevent actions if the game is over)
let running = false;

// Initializes the game when the page loads
initializeGame();

function initializeGame() {
    // Add event listeners to each cell so they can be clicked to make a move
    cells.forEach(cell => cell.addEventListener("click", cellClicked));

    // Add event listener to the restart button
    restartBtn.addEventListener("click", restartGame);

    // Set the initial status text to show it's Player X's turn
    statusText.textContent = `${currentPlayer}'s turn`;

    // Set the game as running
    running = true;
}

// This function is triggered when a cell is clicked
function cellClicked() {
    // Get the index of the cell that was clicked (from its "cellIndex" attribute)
    const cellIndex = this.getAttribute("cellIndex");

    // If the cell is already filled or if the game is not running, return and do nothing
    if (options[cellIndex] != "" || !running) {
        return;
    }

    // Update the cell with the current player's symbol and mark it in the options array
    updateCell(this, cellIndex);

    // Check if there's a winner after this move
    checkWinner();
}

// Updates the cell content and the game state array with the current player's move
function updateCell(cell, index) {
    options[index] = currentPlayer; // Mark the cell as filled with the current player's symbol
    cell.textContent = currentPlayer; // Update the cell's visual content to show the player's symbol
}

// Switches the player after each valid move
function changePlayer() {
    // Switch between "X" and "O"
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    // Update the status text to indicate whose turn it is
    statusText.textContent = `${currentPlayer}'s turn`;
}

// This function checks if there is a winner or if the game is a draw
function checkWinner() {
    let roundWon = false;

    // Loop through each win condition to check if any of them are satisfied
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // Skip the check if any of the cells in this win condition are empty
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        // If all three cells in the win condition have the same value (either "X" or "O"), the round is won
        if (cellA == cellB && cellB == cellC) {
            roundWon = true; // Set roundWon to true if a winner is found
            break; // Exit the loop since we found a winner
        }
    }

    // If a winner is found, display the winner's message and stop the game
    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`; // Show winner's message
        running = false; // Set running to false to stop the game
    }
    // If the board is full and no winner is found, it's a draw
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`; // Show draw message
        running = false; // Stop the game
    }
    // If no winner and the game is not over, change the player
    else {
        changePlayer();
    }
}

// This function is triggered when the restart button is clicked
function restartGame() {
    // Reset the current player to "X"
    currentPlayer = "X";

    // Reset the game board (all cells are empty again)
    options = ["", "", "", "", "", "", "", "", ""];

    // Update the status text to indicate it's Player X's turn
    statusText.textContent = `${currentPlayer}'s turn`;

    // Clear the text content of all cells (reset the board's appearance)
    cells.forEach(cell => cell.textContent = "");

    // Set running to true to allow the game to continue
    running = true;
}
