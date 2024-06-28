import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import NavigationBar from './components/NavigationBar/NavigationBar';


function App() {

  return (
    <Router>
      <div className='App'>
          <NavigationBar />
          <Login />
          <Routes>
              <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
    
  );
}

export default App;
