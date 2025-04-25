// Select all game board cells
let boxes = document.querySelectorAll('.cell');

// Select buttons and message elements
let resetBtn = document.querySelector('#resetBtn');
let newGame = document.querySelector('#newGame');
let winnerContainer = document.querySelector('.winnercontainer');
let msg = document.querySelector('#msg');

// Track which player's turn it is — true for 'O', false for 'X'
let turnO = true;

// Counter to track number of moves (to detect draw)
let count = 0;

// All possible winning combinations (indexes of cells)
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Add click event listeners to each cell
boxes.forEach(box => {
    box.addEventListener("click", () => {
        // Place either 'O' or 'X' depending on turn
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        // Disable the clicked cell
        box.disabled = true;
        count++;

        // Check if there's a winner
        let isWinner = checkWinner();

        // If all boxes filled and no winner, it's a draw
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

// Function to handle draw game
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg.classList.add("draw");
    winnerContainer.classList.remove('hide');
    disableBoxes();
}

// Function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    winnerContainer.classList.add('hide');
    msg.classList.remove("draw", "winner");
    msg.innerText = "";
}

// Function to enable all cells (used when resetting the game)
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

// Function to disable all cells (used when game ends)
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

// Function to check for a winner
const checkWinner = () => {
    for (const pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        // Check if all three positions are filled and equal
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
}

// Function to display winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Player ${winner} Wins!`;
    msg.classList.add("winner");
    winnerContainer.classList.remove('hide');
    disableBoxes();
}

// Attach event listeners to reset and new game buttons
newGame.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
