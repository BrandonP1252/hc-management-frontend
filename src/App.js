import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManager from './pages/UserManager';
import ProtectedAdminRoute from './utils/ProtectedAdminRoute';
import AdminRegisterPatient from './pages/AdminRegisterPatient';
import AdminRegisterDoctor from './pages/AdminRegitserDoctor';
import { PatientHome } from './pages/PatientHome';
import ProtectedPatientRoute from './utils/ProtectedPatientRoute';

function App() {

  return (
    <div className='App'>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<ProtectedAdminRoute />}>
            <Route path="/admin/manager" element={<UserManager />}/>
            <Route path="/admin/add-patient" element={<AdminRegisterPatient />} />
            <Route path="/admin/add-doctor" element={<AdminRegisterDoctor />} />
          </Route>
          <Route exact path="/" element={<ProtectedPatientRoute />}>
            <Route path="/patient/home" element={<PatientHome />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
