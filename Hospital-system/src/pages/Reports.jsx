import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, BookOpen, Hospital } from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Hospital className="w-5 h-5 mr-2" /> },
  { label: 'Patient Summary Report', path: '/PatientReport', icon: <Users className="w-5 h-5 mr-2" /> },
  { label: 'Staff Activity Report', path: '/StaffReport', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Book Issuance & Lost Book Report', path: '/BookReport', icon: <BookOpen className="w-5 h-5 mr-2" /> },
];


const Reports = () => {
  // State for each report's period
  const [periods, setPeriods] = React.useState({
    patient: 'daily',
    staff: 'daily',
    book: 'daily',
  });

  // Build query string for download links
  const getQuery = (type) => {
    return `?period=${periods[type]}`;
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
        <div className="w-full max-w-5xl mb-2">
          <div className="bg-blue-700 rounded-t-xl py-3 px-6 text-center">
            <span className="text-white text-lg font-bold tracking-wide">Base Hospital - Avissawella</span>
          </div>
        </div>
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <FileText className="w-7 h-7 text-cyan-600" />
            Reports
          </h1>
        </div>
  {/* ...removed global period selection... */}
        <div className="w-full max-w-5xl flex flex-col gap-6">
          {/* Patient Summary Report */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow border border-blue-200 px-6 py-4 hover:bg-blue-50 transition">
            <div className="flex items-center gap-3 text-blue-800 font-semibold text-lg">
              <select
                value={periods.patient}
                onChange={e => setPeriods(p => ({ ...p, patient: e.target.value }))}
                className="border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200 text-gray-400 mr-3"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
              <FileText className="w-6 h-6 text-cyan-600" /> Patient Summary Report
            </div>
            <a
              href={`http://localhost:3000/reports/patient/download${getQuery('patient')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
            >
              <FileText className="w-5 h-5" />
            </a>
          </div>
          {/* Staff Activity Report */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow border border-blue-200 px-6 py-4 hover:bg-blue-50 transition">
            <div className="flex items-center gap-3 text-blue-800 font-semibold text-lg">
              <select
                value={periods.staff}
                onChange={e => setPeriods(p => ({ ...p, staff: e.target.value }))}
                className="border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200 text-gray-400 mr-3"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
              <FileText className="w-6 h-6 text-cyan-600" /> Staff Activity Report
            </div>
            <a
              href={`http://localhost:3000/reports/staff/download${getQuery('staff')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
            >
              <FileText className="w-5 h-5" />
            </a>
          </div>
          {/* Book Issuance & Lost Book Report */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow border border-blue-200 px-6 py-4 hover:bg-blue-50 transition">
            <div className="flex items-center gap-3 text-blue-800 font-semibold text-lg">
              <select
                value={periods.book}
                onChange={e => setPeriods(p => ({ ...p, book: e.target.value }))}
                className="border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-200 text-gray-400 mr-3"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
              <BookOpen className="w-6 h-6 text-cyan-600" /> Book Issuance & Lost Book Report
            </div>
            <a
              href={`http://localhost:3000/reports/book/download${getQuery('book')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
            >
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
