import React, { useState, useEffect } from 'react';
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
  Search
} from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { label: 'Patient Registration & Book Issuance', path: '/personalDetails', icon: <UserPlus className="w-5 h-5 mr-2" /> },
  { label: 'Patient Records', path: '/patientRecords', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Reports & Alerts', path: '/reports', icon: <Bell className="w-5 h-5 mr-2" /> },
  { label: 'Departments/Clinics', path: '/departments', icon: <Building2 className="w-5 h-5 mr-2" /> },
  { label: 'Other', path: '/other', icon: <MoreHorizontal className="w-5 h-5 mr-2" /> },
];

// API base URL
const API_BASE_URL = 'http://localhost:3000';

const PatientRecords = () => {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patients from database
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/patients`);
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        setPatients(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to load patient records');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search
  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.tab1?.name && p.tab1.name.toLowerCase().includes(q)) ||
      (p.patientId && p.patientId.toLowerCase().includes(q)) ||
      (p.tab1?.nic && p.tab1.nic.toLowerCase().includes(q))
    );
  });

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
              className={`flex items-center px-6 py-3 hover:bg-blue-500/60 transition rounded-r-full font-medium text-white/90 hover:text-white ${item.path === '/patientRecords' ? 'bg-blue-500/80' : ''}`}
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
        {/* Header */}
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <FileText className="w-7 h-7 text-cyan-600" />
            Patient Records
          </h1>
        </div>
        {/* Search Bar */}
        <div className="w-full max-w-5xl mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-blue-200">
            <div className="flex items-center gap-3 px-8 py-6 border-b-2 border-blue-300">
              <Search className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Search Patients</h2>
            </div>
            <div className="px-8 py-6">
                              <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, patient ID, or NIC..."
                  className="w-full p-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 bg-white mb-2"
                />
            </div>
          </div>
        </div>
        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 w-full max-w-5xl">
          {loading ? (
            <div className="col-span-2 text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading patient records...</p>
            </div>
          ) : error ? (
            <div className="col-span-2 text-center py-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-600 font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 py-8">
              {search ? 'No patient records found matching your search.' : 'No patient records found in the database.'}
            </div>
          ) : (
            filtered.map((p, idx) => (
              <div key={p._id || idx} className="bg-blue-50 border border-blue-200 rounded-lg shadow-sm p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="text-gray-800">{p.tab1?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Patient ID:</span>
                  <span className="text-gray-800">{p.patientId || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IdCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">NIC:</span>
                  <span className="text-gray-800">{p.tab1?.nic || 'N/A'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords; 