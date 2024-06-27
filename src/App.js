import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Login from './components/Login';

function App() {

  return (
    <Router>

      <div className='App'>
          <nav>
              <ul>
                  <li>
                      <Link to="/login">Login</Link>
                  </li>
                  <li>
                      <p>test</p>
                  </li>
              </ul>
          </nav>

          <Routes>
              <Route path="/login" element={<Login />} />
          </Routes>
      </div>

    </Router>
    
  );
}

export default App;
