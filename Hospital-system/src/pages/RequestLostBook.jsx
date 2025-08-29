
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../functions/NavBar';
import { Home, UserPlus, FileText, Bell, Building2, MoreHorizontal, Hospital } from 'lucide-react';



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
      <NavBar />
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
