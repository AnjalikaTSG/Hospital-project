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
  const [debouncedSearch, setDebouncedSearch] = useState('');
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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Helper function to highlight search terms
  const highlightText = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  };

  // Filter patients based on search
  const filtered = patients.filter((p) => {
    if (!debouncedSearch.trim()) return true; // Show all if search is empty
    
    const q = debouncedSearch.toLowerCase().trim();
    
    // Search in multiple fields with better null checking
    const nameMatch = p.tab1?.name && p.tab1.name.toLowerCase().includes(q);
    const patientIdMatch = p.patientId && p.patientId.toLowerCase().includes(q);
    const nicMatch = p.tab1?.nic && p.tab1.nic.toLowerCase().includes(q);
    
    // Also search in other tab fields if they exist
    const tab2Match = p.tab2?.name && p.tab2.name.toLowerCase().includes(q);
    const tab3Match = p.tab3?.name && p.tab3.name.toLowerCase().includes(q);
    const tab4Match = p.tab4?.name && p.tab4.name.toLowerCase().includes(q);
    const tab5Match = p.tab5?.name && p.tab5.name.toLowerCase().includes(q);
    const tab6Match = p.tab6?.name && p.tab6.name.toLowerCase().includes(q);
    
    return nameMatch || patientIdMatch || nicMatch || tab2Match || tab3Match || tab4Match || tab5Match || tab6Match;
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
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name, patient ID, or NIC... (Press Ctrl+K to focus)"
                  className="w-full p-3 pr-12 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 bg-white"
                  ref={(input) => {
                    if (input) {
                      // Add keyboard shortcut Ctrl+K to focus search
                      const handleKeyDown = (e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                          e.preventDefault();
                          input.focus();
                        }
                      };
                      document.addEventListener('keydown', handleKeyDown);
                      return () => document.removeEventListener('keydown', handleKeyDown);
                    }
                  }}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              {debouncedSearch && (
                <div className="mt-3 text-sm text-gray-600">
                  {filtered.length === 1 
                    ? `Found 1 patient record` 
                    : `Found ${filtered.length} patient records`
                  }
                  {patients.length > 0 && (
                    <span className="text-gray-400 ml-2">
                      (out of {patients.length} total)
                    </span>
                  )}
                </div>
              )}
              <div className="mt-3 text-xs text-gray-400">
                💡 Search tip: You can search by patient name, ID, or NIC number. Use Ctrl+K to quickly focus the search box.
              </div>
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
              <div key={p._id || idx} className="bg-blue-50 border border-blue-200 rounded-lg shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span 
                    className="text-gray-800"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(p.tab1?.name || 'N/A', debouncedSearch)
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">Patient ID:</span>
                  <span 
                    className="text-gray-800 font-mono"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(p.patientId || 'N/A', debouncedSearch)
                    }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <IdCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">NIC:</span>
                  <span 
                    className="text-gray-800 font-mono"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(p.tab1?.nic || 'N/A', debouncedSearch)
                    }}
                  />
                </div>
                {debouncedSearch && (p.tab2?.name || p.tab3?.name || p.tab4?.name || p.tab5?.name || p.tab6?.name) && (
                  <div className="mt-2 pt-2 border-t border-blue-200">
                    <span className="text-xs text-gray-500">Also found in other records</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords; 