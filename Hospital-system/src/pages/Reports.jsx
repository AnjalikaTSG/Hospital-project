import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, BookOpen, Hospital } from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Hospital className="w-5 h-5 mr-2" /> },
  { label: 'Patient Summary Report', path: '/reports/patient', icon: <Users className="w-5 h-5 mr-2" /> },
  { label: 'Staff Activity Report', path: '/reports/staff', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Book Issuance & Lost Book Report', path: '/reports/book', icon: <BookOpen className="w-5 h-5 mr-2" /> },
];

const Reports = () => {
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
        <div className="w-full max-w-xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <FileText className="w-7 h-7 text-cyan-600" />
            Reports
          </h1>
        </div>
        
      </div>
    </div>
  );
};

export default Reports;
