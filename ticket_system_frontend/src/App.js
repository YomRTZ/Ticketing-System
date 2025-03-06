import './App.css';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import { Routes, Route } from "react-router-dom";
import UsersPage from './pages/UsersPage';
import LogIn from './pages/authPages/LogIn';
import SignUp from './pages/authPages/SignUp';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import ForgotPassword from './pages/authPages/ForgotPassword';
function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<LogIn />} />
     <Route path="/signup" element={<SignUp />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/forgotpassword" element={<ForgotPassword />}/>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/home" element={<Dashboard />} />
          {/* <Route
        path="/home"
        element={
          <ProtectedRoute >
           <Dashboard/>
          </ProtectedRoute>
        }
      /> */}
     </Routes>
    
    </div>
  );
}

export default App;
