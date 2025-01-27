
const TURNS = Object.freeze({
  X: 'X',
  O: 'O'
});


const winningConditions = [
  [0, 1, 2], // Horizontal
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Vertical
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonal
  [2, 4, 6]
];

/**
 * Provide the initial state of the board (empty)
 * @returns {Array} An array representing an empty board (9 null values)
 */
export const provideInitialArray = () => Array(9).fill(null);

/**
 * Validate the board state to ensure it follows the correct format
 * @param {Array} board - The current board state
 * @returns {Array} The validated board
 * @throws {Error} If the board is not an array of length 9 or contains invalid values
 */
export const validateBoard = (board) => {
  if (!Array.isArray(board) || board.length !== 9) {
    throw new Error('Board must be an Array(9)');
  }

  if (board.some((turn) => ![null, ...Object.values(TURNS)].includes(turn))) {
    throw new Error('Board items must be in [null, "X", "O"]');
  }

  return board;
};

/**
 * Provide the default starting turn (always 'X')
 * @returns {string} The default turn ('X')
 */
export const provideDefaultTurn = () => TURNS.X;

/**
 * Get the next turn (if the current turn is 'X', return 'O', else return 'X')
 * @param {string} turn - The current turn
 * @returns {string} The next turn
 */
export const nextTurn = (turn) => (turn === TURNS.X ? TURNS.O : TURNS.X);

/**
 * Validate the current turn (should be either 'X' or 'O')
 * @param {string} turn - The current turn to validate
 * @returns {string} The validated turn
 * @throws {Error} If the turn is not valid
 */
export const validateTurn = (turn) => {
  if (typeof turn !== 'string') {
    throw new Error('Turn must be a string');
  }

  if (!Object.values(TURNS).includes(turn)) {
    throw new Error(`Turn must be one of [${Object.values(TURNS).join(', ')}]`);
  }

  return turn;
};

/**
 * Check if there is a winner on the board
 * @param {Array} board - The current board state
 * @returns {Array} An array with the first element being the winner ('X' or 'O') or null if no winner,
 *                  and the second element being the winning combination (or null if no winner)
 */
export const checkWinnerFrom = (board) => {
  // Check each winning condition to see if there's a match
  for (const condition of winningConditions) {
    const [a, b, c] = condition;

    // If all three positions in the condition are the same, there's a winner
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return [board[a], [...condition]]; // Return the winner and the winning indexes
    }
  }

  // No winner
  return [null, null];
};

/**
 * Check if the game has ended (i.e., if there's a tie)
 * @param {Array} board - The current board state
 * @returns {boolean} True if the game is over (no more empty tiles), otherwise false
 */
export const checkEndGame = (board) => {
  return board.every((value) => value !== null); // Check if all tiles are filled
};
