import React, { useState } from 'react';
import LogoImg from '../assets/logo.png';
import docImg from '../assets/doctor.png';
import nurImg from '../assets/nurse.png';
import pharImg from '../assets/phar.png';
import patImg from '../assets/patient.png';
import labImg from '../assets/lab.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  UserPlus,
  FileText,
  Bell,
  Building2,
  MoreHorizontal,
  Stethoscope,
  UserCog,
  BriefcaseMedical,
  Users,
  FlaskConical,
  ShieldCheck,
  Hospital,
  LogOut,
} from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { label: 'Patient Registration & Book Issuance', path: '/personalDetails', icon: <UserPlus className="w-5 h-5 mr-2" /> },
  { label: 'Patient Records', path: '/patientRecords', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Notifications', path: '/Notifications', icon: <Bell className="w-5 h-5 mr-2" /> },
  { label: 'Reports', path: '/Reports', icon: <FileText className="w-5 h-5 mr-2" /> },
  // { label: 'Departments/Clinics', path: '/departments', icon: <Building2 className="w-5 h-5 mr-2" /> },
  { label: 'Request Lost Book', path: '/RequestLostBook', icon: <Building2 className="w-5 h-5 mr-2" /> },
  // { label: 'Other', path: '/other', icon: <MoreHorizontal className="w-5 h-5 mr-2" /> },
  { label: 'Logout', path: '/loginScreen', icon: <LogOut className="w-5 h-5 mr-2" />, action: 'logout' },
  
];

// Dynamic stats state
const initialStats = [
  {
    label: 'Doctors',
    value: 0,
    icon: <Stethoscope className="w-8 h-8 text-cyan-600 mb-2" />,
    img: docImg,
  },
  {
    label: 'Nurses',
    value: 0,
    icon: <UserCog className="w-8 h-8 text-cyan-600 mb-2" />,
    img: nurImg,
  },
  {
    label: 'Pharmacists',
    value: 0,
    icon: <BriefcaseMedical className="w-8 h-8 text-cyan-600 mb-2" />,
    img: pharImg,
  },
  {
    label: 'Patients',
    value: 0,
    icon: <Users className="w-8 h-8 text-cyan-600 mb-2" />,
    img: patImg,
  },
  {
    label: 'Laboratorists',
    value: 0,
    icon: <FlaskConical className="w-8 h-8 text-cyan-600 mb-2" />,
    img: labImg,
  },
  {
    label: 'Extra',
    value: 0,
    icon: <ShieldCheck className="w-8 h-8 text-cyan-600 mb-2" />,
    img: docImg,
  },
];

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/dashboard');
  const navigate = useNavigate();
  const [stats, setStats] = useState(initialStats);

  // Update active tab based on current location
  React.useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Fetch stats from backend
  React.useEffect(() => {
    fetch('http://localhost:3000/stats')
      .then(res => res.json())
      .then(data => {
        setStats(prev => prev.map(stat => {
          if (stat.label === 'Doctors') return { ...stat, value: data.doctors };
          if (stat.label === 'Nurses') return { ...stat, value: data.nurses };
          if (stat.label === 'Pharmacists') return { ...stat, value: data.pharmacists };
          if (stat.label === 'Laboratorists') return { ...stat, value: data.laboratorists };
          if (stat.label === 'Patients') return { ...stat, value: data.patients };
          return stat;
        }));
      });
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/loginScreen');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-cyan-600 shadow-xl flex flex-col divide-y divide-blue-500 text-white">
        <div className="flex items-center gap-3 px-6 py-6">
          <Hospital className="w-10 h-10 text-white" />
          <span className="text-lg font-bold tracking-wide">Base Hospital - Avissawella</span>
        </div>
        <nav className="flex-1 flex flex-col py-4">
          {sidebarItems.map((item, idx) => (
            item.action === 'logout' ? (
              <button
                key={idx}
                className={`flex items-center w-full px-6 py-3 transition rounded-r-full font-medium ${
                  activeTab === item.path
                    ? 'bg-blue-500/80 text-white shadow-lg'
                    : 'text-white/90 hover:bg-blue-500/60 hover:text-white'
                }`}
                onClick={handleLogout}
              >
                {item.icon}
                {item.label}
              </button>
            ) : (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center px-6 py-3 transition rounded-r-full font-medium ${
                  activeTab === item.path 
                    ? 'bg-blue-500/80 text-white shadow-lg' 
                    : 'text-white/90 hover:bg-blue-500/60 hover:text-white'
                }`}
                onClick={() => setActiveTab(item.path)}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center w-full py-10 px-4">
        {/* Hospital Bar */}
        <div className="w-full max-w-5xl mb-2">
          <div className="bg-blue-700 rounded-t-xl py-3 px-6 text-center">
            <span className="text-white text-lg font-bold tracking-wide">Base Hospital - Avissawella</span>
          </div>
        </div>
        {/* Header */}
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <ShieldCheck className="w-7 h-7 text-cyan-600" />
            Patient Checkup Management System
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {stats.slice(0, 3).map((stat, idx) => (
            <div key={stat.label} className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-xl transition-all">
              {stat.icon}
              <img src={stat.img} alt={stat.label} className="w-16 h-16 mb-2" />
              <span className="text-lg font-semibold text-blue-800">{stat.label}</span>
              <span className="text-2xl font-bold text-cyan-700">{stat.value}</span>
            </div>
          ))}
        </div>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {stats.slice(3).map((stat, idx) => (
            <div key={stat.label} className="flex flex-col items-center p-6 rounded-2xl bg-white shadow-lg border border-blue-100 hover:shadow-xl transition-all">
              {stat.icon}
              <img src={stat.img} alt={stat.label} className="w-16 h-16 mb-2" />
              <span className="text-lg font-semibold text-blue-800">{stat.label}</span>
              <span className="text-2xl font-bold text-cyan-700">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
