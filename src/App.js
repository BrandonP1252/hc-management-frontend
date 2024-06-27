import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientsComponent from './components/patient';
import Login from './components/login';

function App() {

  return (
    <Router>

      <div className="App">
        <Login />
      </div>

    </Router>
    
  );
}

export default App;
