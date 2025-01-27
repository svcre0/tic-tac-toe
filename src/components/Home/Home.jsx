import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header'; 

const Home = () => {
  return (
    <>
      <Header />  
      <div className="Home">
        {/* Game instructions */}
        <p>
          The first player to get three of their marks in a row horizontally, vertically, or diagonally wins.<br />
          If all 9 spaces are filled and no one has three marks in a row, the game ends in a draw.
        </p> 
        
        {/* Play button */}
        <Link to="/game">
          <button className="reset-btn">Play</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
