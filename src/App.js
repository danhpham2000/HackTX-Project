// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.js';
import Notes from './pages/notes.js';
import Questions from './pages/questions.js'
import Summary from './pages/summary.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
