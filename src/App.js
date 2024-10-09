import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManager from './pages/UserManager';
import ProtectedAdminRoute from './utils/ProtectedRoute';

function App() {

  return (
    <div className='App'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<ProtectedAdminRoute />}>
            <Route path="/admin/manager" element={<UserManager />}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
