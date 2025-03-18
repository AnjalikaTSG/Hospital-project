import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Dashboard from './pages/Dashboard';
import RegisterScreen from './pages/RegisterScreen';
import LoginScreen from './pages/LoginScreen';
import PersonalDetails from './pages/PersonalDetails';
import PersonalDetails2 from './pages/PersonalDetails2';
import PersonalDetails3 from './pages/PersonalDetails3';
import PersonalDetails4 from './pages/PersonalDetails4';
import PersonalDetails5 from './pages/PersonalDetails5';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PersonalDetails5 />}>
        <Route path="/registerScreen" element={<RegisterScreen />} />
            <Route path="/loginScreen" element={<LoginScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/personalDetails" element={<PersonalDetails />} />
            <Route path="/personalDetails2" element={<PersonalDetails2 />} />
            <Route path="/personalDetails3" element={<PersonalDetails3 />} />
            <Route path="/personalDetails4" element={<PersonalDetails4 />} />
            <Route path="/personalDetails5" element={<PersonalDetails5 />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
