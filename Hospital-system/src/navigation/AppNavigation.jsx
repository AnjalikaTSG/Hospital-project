import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '../functions/Dashboard';
import RegisterScreen from '../functions/RegisterScreen';
import LoginScreen from '../functions/LoginScreen';
import PersonalDetails from '../functions/PersonalDetails';
import PersonalDetails2 from '../functions/PersonalDetails2';
import PersonalDetails3 from '../functions/PersonalDetails3';

const AppNavigation = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<RegisterScreen />} />
            <Route path="/registerScreen" element={<RegisterScreen />} />
            <Route path="/loginScreen" element={<LoginScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/personalDetails" element={<PersonalDetails />} />
            <Route path="/personalDetails2" element={<PersonalDetails2 />} />
            <Route path="/personalDetails3" element={<PersonalDetails3 />} />
        </Routes>
        </BrowserRouter>
    );
}
export default AppNavigation;