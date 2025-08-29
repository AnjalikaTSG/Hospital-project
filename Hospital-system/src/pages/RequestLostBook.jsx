
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, UserPlus, FileText, Bell, Building2, MoreHorizontal, Hospital } from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { label: 'Patient Registration & Book Issuance', path: '/personalDetails', icon: <UserPlus className="w-5 h-5 mr-2" /> },
  { label: 'Patient Records', path: '/patientRecords', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Notifications', path: '/Notifications', icon: <Bell className="w-5 h-5 mr-2" /> },
  { label: 'Reports', path: '/Reports', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Departments/Clinics', path: '/departments', icon: <Building2 className="w-5 h-5 mr-2" /> },
  { label: 'Request Lost Book', path: '/RequestLostBook', icon: <MoreHorizontal className="w-5 h-5 mr-2" /> },
  { label: 'Other', path: '/other', icon: <MoreHorizontal className="w-5 h-5 mr-2" /> },
  
];

const RequestLostBook = () => {
  const [patientId, setPatientId] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:3000/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Lost book request for Patient ID: ${patientId}. Reason: ${reason}`,
          type: 'lost_book',
        }),
      });
      if (!response.ok) throw new Error('Failed to send request');
      setSuccess(true);
      setMessage('Request sent successfully!');
      setPatientId('');
      setReason('');
    } catch (err) {
      setError(err.message);
    }
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
        {/* Header */}
        <div className="w-full max-w-5xl mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <MoreHorizontal className="w-7 h-7 text-cyan-600" />
            Request a Lost Book
          </h2>
        </div>
        {/* Form */}
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Patient ID"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              required
              className="border rounded px-3 py-2 text-gray-700"
            />
            <textarea
              placeholder="Reason for lost book"
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
              className="border rounded px-3 py-2 text-gray-700"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
            >
              Submit Request
            </button>
          </form>
          {success && <div className="mt-4 text-green-600">{message}</div>}
          {error && <div className="mt-4 text-red-600">Error: {error}</div>}
        </div>
      </div>
    </div>
  );
};

export default RequestLostBook;
