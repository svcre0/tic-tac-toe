import { useEffect, useState } from 'react';
import {
  checkEndGame,
  checkWinnerFrom,
  nextTurn,
  provideInitialArray,
  provideDefaultTurn,
  validateBoard,
  validateTurn
} from '../logic/board';
import { createConfetti, resetConfetti } from '../logic/confetti';
import {
  loadBoardFromStorage,
  loadTurnFromStorage,
  resetGameStorage,
  saveGameToStorage
} from '../logic/storage';
import { BoardTile } from '../logic/BoardTile';
import { Link } from 'react-router-dom';



function Game() {
  // State initialization with loaded data from storage
  const [board, setBoard] = useState(
    loadBoardFromStorage(validateBoard, provideInitialArray)
  );
  const [turn, setTurn] = useState(
    loadTurnFromStorage(validateTurn, provideDefaultTurn)
  );
  const [winner, setWinner] = useState(null);
  const [winnerCombo, setWinnerCombo] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 }); // Track scores
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Reset the game state
  const handleReset = () => {
    setBoard(provideInitialArray);
    setTurn(provideDefaultTurn);
    setWinner(null);
    setWinnerCombo(null);
    resetConfetti(); // Stop confetti
    resetGameStorage(); // Clear storage
    setShowModal(false); // Hide the modal
  };

  // Check if the board can be updated (i.e., the tile is empty and no winner)
  const canBoardBeUpdated = (index) => board[index] === null && winner === null;

  // Update the board after a move
  const updateBoardTile = (index, value) => {
    const newBoard = [...board];
    newBoard[index] = value;
    setBoard(newBoard);
    return newBoard;
  };

  // Handle a player's move
  const onBoardTileAction = (index) => {
    if (!canBoardBeUpdated(index)) return; // Prevent action if invalid

    // Play click sound on action
    const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/254/254-preview.mp3');
    clickSound.play();

    const newBoard = updateBoardTile(index, turn); // Update the board
    const newTurn = nextTurn(turn); // Switch turn
    setTurn(newTurn);
    
    // Save updated game state to localStorage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });
  };

  // Check for winner or tie after each board update
  useEffect(() => {
    const [newWinner, newWinnerCombo] = checkWinnerFrom(board);

    if (newWinner !== null) {
      createConfetti(); // Trigger confetti for the winner
      setWinner(newWinner);
      setWinnerCombo(newWinnerCombo);

      // Play win sound
      const winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2065/2065-preview.mp3');
      winSound.play();

      // Update score
      setScore((prevScore) => ({
        ...prevScore,
        [newWinner]: prevScore[newWinner] + 1
      }));

      setShowModal(true); // Show winner modal
    } else if (checkEndGame(board)) {
      setWinner(false); // Declare a tie if board is full
    }
  }, [board]);

  return (
    <>
      <main className="App">
        <div className="score">
          {/* Display current score */}
          <p> X 👦🏼 : {score.X}</p>
          <p> O 👧🏼 : {score.O}</p>
        </div>

        <section className="board">
          {/* Render the board tiles */}
          {board.map((value, index) => (
            <BoardTile
              key={index}
              value={value}
              action={onBoardTileAction}
              index={index}
              highlight={winnerCombo?.includes(index)} // Highlight winning combination
            />
          ))}
        </section>
        
        <footer>
          <button onClick={handleReset} className="reset-btn">Reset</button>
          
          {/* Display turn or result */}
          {winner === null && <p><span>{turn}</span>'s turn</p>}
          {winner === false && <p>TIE!</p>}
          {winner && <p><span>{winner}</span> Won!</p>}

          {/* Link to Home */}
          <Link to="/home">
            <button className="reset-btn">Home</button>
          </Link>
        </footer>
      </main>

      {/* Modal for displaying winner */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Congratulations!</p>
            <span className="close" onClick={() => setShowModal(false)}>Exit</span>
            <h2>{winner} <span role="img" aria-label="medal">🏅</span></h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Game;
