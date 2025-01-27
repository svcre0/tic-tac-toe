/**
 * Load the board from localStorage
 */
export const loadBoardFromStorage = loader('board');

/**
 * Load the turn from localStorage
 */
export const loadTurnFromStorage = loader('turn');

/**
 * Save the game state (board and turn) to localStorage
 * @param {Object} gameState - The current game state
 * @param {Array} gameState.board - The board state
 * @param {string} gameState.turn - The current player's turn
 */
export const saveGameToStorage = ({ board, turn }) => {
  // Store the board and turn as JSON strings in localStorage
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', JSON.stringify(turn));
};

/**
 * Reset the game state in localStorage by removing stored data
 */
export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
};

/**
 * Loader function to retrieve and validate data from localStorage
 * @param {string} key - The key for retrieving the item from localStorage
 * @returns {Function} A function to load and validate the stored data
 */
function loader(key) {
  return (validator, fallbackSupplier) => () => {
    const item = window.localStorage.getItem(key);

    try {
      // Attempt to parse and validate the stored item
      if (item) return validator(JSON.parse(item));
    } catch (e) {
      // Ignore errors during parsing
    }

    // Return the fallback value if no valid data is found
    return fallbackSupplier();
  };
}
