import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Game from './components/Game/Game';  
import Home from './components/Home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect from root (/) to /home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Define routes for Home and Game components */}
          <Route path="/home" element={<Home />} />
          <Route path="/Game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
