import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  UserPlus,
  FileText,
  Bell,
  Building2,
  MoreHorizontal,
  Hospital,
  User,
  Hash,
  IdCard,
  FileText as ReportIcon
} from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { label: 'Patient Registration & Book Issuance', path: '/personalDetails', icon: <UserPlus className="w-5 h-5 mr-2" /> },
  { label: 'Patient Records', path: '/patientRecords', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Reports & Alerts', path: '/reports', icon: <Bell className="w-5 h-5 mr-2" /> },
  { label: 'Departments/Clinics', path: '/departments', icon: <Building2 className="w-5 h-5 mr-2" /> },
  { label: 'Other', path: '/other', icon: <MoreHorizontal className="w-5 h-5 mr-2" /> },
];

const reportData = [
  {
    registrationNumber: 'REG2024005',
    name: 'Saman Perera',
    nic: '200045678912',
    reports: ['FBC', 'LFT', 'KFT']
  },
  {
    registrationNumber: 'REG2024006',
    name: 'Nimal Silva',
    nic: '198765432109',
    reports: ['FBC', 'RBS']
  },
  {
    registrationNumber: 'REG2024007',
    name: 'Kumari Jayasinghe',
    nic: '199012345678',
    reports: ['LFT', 'TSH', 'CRP']
  },
  {
    registrationNumber: 'REG2024008',
    name: 'Amal Fernando',
    nic: '200112345678',
    reports: ['FBC', 'Lipid Profile']
  },
];

const PatientReport = () => {
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
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center px-6 py-3 hover:bg-blue-500/60 transition rounded-r-full font-medium text-white/90 hover:text-white`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center w-full py-10 px-4">
        {/* Hospital Bar */}
        <div className="w-full max-w-xl mb-2">
          <div className="bg-blue-700 rounded-t-xl py-3 px-6 text-center">
            <span className="text-white text-lg font-bold tracking-wide">Base Hospital - Avissawella</span>
          </div>
        </div>
        {/* Header */}
        <div className="w-full max-w-xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <FileText className="w-7 h-7 text-cyan-600" />
            Patient Reports
          </h1>
        </div>
        {/* Report Cards */}
        <div className="w-full max-w-xl flex flex-col gap-8">
          {reportData.map((patient, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Registration No:</span>
                <span className="text-gray-800">{patient.registrationNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-gray-800">{patient.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <IdCard className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">NIC:</span>
                <span className="text-gray-800">{patient.nic}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <ReportIcon className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-700">Reports:</span>
                <div className="flex flex-wrap gap-2 ml-2">
                  {patient.reports.map((report, rIdx) => (
                    <span key={rIdx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                      {report}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientReport; 