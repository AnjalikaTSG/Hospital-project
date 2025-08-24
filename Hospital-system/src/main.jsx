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
import PersonalDetails6 from './pages/PersonalDetails6';
import RefferedTo from './pages/RefferedTo';
import AddSurgicalRecords from './pages/AddSurgicalRecords';
import PsychologicalRecords from './pages/PsychologicalRecords';
import ImmunizationRecords from './pages/ImmunizationRecords';
import PastSurgicalHistory from './pages/PastSurgicalHistory';
import PastPsychologicalHistory from './pages/PastPsychologicalHistory';
import PastImmunizationHistory from './pages/PastImmunizationHistory';
import GynHistoryPage from './pages/GynHistoryPage';
import OccupationalHistory from './pages/OccupationalHistory';
import SuccessfulRegistration from './pages/SuccessfulRegistration';
import PatientRecords from './pages/PatientRecords';
import PatientBasicInfo from './pages/PatientBasicInfo';
import PatientReport from './pages/PatientReport';
import AdminStaffVerification from './pages/AdminStaffVerification';
import Notifications from './pages/Notifications';

import SideBar from './functions/SideBar';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/registerScreen" element={<RegisterScreen />} />
        <Route path="/loginScreen" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/personalDetails" element={<PersonalDetails />} />
        {/* <Route path="/personalDetails2" element={<PersonalDetails2 />} /> */}
        <Route path="/personalDetails3" element={<PersonalDetails3 />} />
        {/* <Route path="/personalDetails4" element={<PersonalDetails4 />} /> */}
        <Route path="/personalDetails5" element={<PersonalDetails5 />} />
        {/* <Route path="/personalDetails6" element={<PersonalDetails6 />} /> */}
        <Route path="/RefferedTo" element={<RefferedTo />} />
        <Route path="/AddSurgicalRecords" element={<AddSurgicalRecords />} />
        <Route path="/psychologicalRecords" element={<PsychologicalRecords />} />
        <Route path="/immunizationRecords" element={<ImmunizationRecords />} />
        <Route path="/PastSurgicalHistory" element={<PastSurgicalHistory />} />
        <Route path="/PastPsychologicalHistory" element={<PastPsychologicalHistory />} />
        <Route path="/PastImmunizationHistory" element={<PastImmunizationHistory />} />
        <Route path="/GynHistoryPage" element={<GynHistoryPage />} />
        <Route path="/OccupationalHistory" element={<OccupationalHistory />} />
        <Route path="/SuccessfulRegistration" element={<SuccessfulRegistration />} />
        <Route path="/PatientRecords" element={<PatientRecords />} />
        <Route path="/PatientBasicInfo" element={<PatientBasicInfo />} />
        <Route path="/PatientReport" element={<PatientReport />} />
        <Route path="/AdminStaffVerification" element={<AdminStaffVerification />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/sideBar" element={<SideBar />} />
      </Routes>
    </Router>
  </StrictMode>,
)
