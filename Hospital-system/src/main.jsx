import AdminPasswordRequests from './pages/AdminPasswordRequests';
import AcceptedRejectedPasswordRequests from './pages/AcceptedRejectedPasswordRequests';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
import Dashboard from './pages/Dashboard';
import RegisterScreen from './pages/RegisterScreen';
import LoginScreen from './pages/LoginScreen';
import PersonalDetails from './pages/PersonalDetails';

import PersonalDetails3 from './pages/PersonalDetails3';

import PersonalDetails5 from './pages/PersonalDetails5';

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
import PatientDetail from './pages/PatientDetail';
import PatientOPDRecords from './pages/PatientOPDRecords';
import PatientHospitalization from './pages/PatientHospitalization';
import PatientMedication from './pages/PatientMedication';
import PatientLifestyles from './pages/PatientLifestyles';
import PatientBasicInfo from './pages/PatientBasicInfo';
import AdminStaffVerification from './pages/AdminStaffVerification';
import Notifications from './pages/Notifications';
import ImmunizationPage from './pages/ImmunizationPage';
import PendingStaffRequests from './pages/PendingStaffRequests';
import RequestLostBook from './pages/RequestLostBook';
import Reports from './pages/Reports';
import PatientReport from './pages/PatientReport';
import StaffReport from './pages/StaffReport';
import BookReport from './pages/BookReport';

import SideBar from './functions/SideBar';
import NavBar from './functions/NavBar';


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
        <Route path="/patient/:patientId" element={<PatientDetail />} />
        <Route path="/patient/:patientId/personal" element={<PatientDetail />} />
        <Route path="/patient/:patientId/opd" element={<PatientOPDRecords />} />
        <Route path="/patient/:patientId/hospitalization" element={<PatientHospitalization />} />
        <Route path="/patient/:patientId/medication" element={<PatientMedication />} />
        <Route path="/patient/:patientId/lifestyles" element={<PatientLifestyles />} />
        <Route path="/patient/:patientId/surgical" element={<AddSurgicalRecords />} />
        <Route path="/patient/:patientId/gyn" element={<GynHistoryPage />} />
        <Route path="/patient/:patientId/occupational" element={<OccupationalHistory />} />
        <Route path="/patient/:patientId/psychological" element={<PastPsychologicalHistory />} />
        <Route path="/patient/:patientId/immunizationpage" element={<ImmunizationPage />} /> 
  <Route path="/AdminPasswordRequests" element={<AdminPasswordRequests />} />
  <Route path="/AcceptedRejectedPasswordRequests" element={<AcceptedRejectedPasswordRequests />} />
        <Route path="/patient/:patientId/referral" element={<RefferedTo />} /> 
        <Route path="/PatientBasicInfo" element={<PatientBasicInfo />} />
        <Route path="/AdminStaffVerification" element={<AdminStaffVerification />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/sideBar" element={<SideBar />} />
        <Route path="/PendingStaffRequests" element={<PendingStaffRequests />} />
        <Route path="/RequestLostBook" element={<RequestLostBook />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/PatientReport" element={<PatientReport />} />
        <Route path="/StaffReport" element={<StaffReport />} />
        <Route path="/BookReport" element={<BookReport />} />
        <Route path="/AdminPasswordRequests" element={<AdminPasswordRequests />} />
        <Route path="/NavBar" element={<NavBar />} />
      </Routes>
    </Router>
  </StrictMode>,
)
