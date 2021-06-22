import Login from "./components/authentication/Login"
import Signup from './components/authentication/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* isLogin */}
      {false ?
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace={true} />} />
          {/* <Route path="*" element={<h2>not found</h2>} /> */}
        </Routes>
        :
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/auth/login" replace={true} />} />
        </Routes>
      }
    </Router>
  );
}

export default App;
