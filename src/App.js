import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import RegisterPatient from './components/RegisterPatient';
import Home from './components/Home';


function App() {

  return (
    <div className='App'>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPatient />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
