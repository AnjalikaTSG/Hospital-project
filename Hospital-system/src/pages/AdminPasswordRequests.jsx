import React, { useEffect, useState } from 'react';
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle, Hash, IdCard, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Home,
    UserPlus,
    FileText,
    Bell,
    Building2,
    LogOut,
    Users
} from 'lucide-react';

const sidebarItems = [
    { label: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
    { label: 'Admin Staff Verification', path: '/AdminStaffVerification', icon: <ShieldCheck className="w-5 h-5 mr-2" /> },
    { label: 'Pending Staff Requests', path: '/PendingStaffRequests', icon: <Users className="w-5 h-5 mr-2" /> },
    { label: 'Admin Password Requests', path: '/AdminPasswordRequests', icon: <KeyRound className="w-5 h-5 mr-2" /> },
    { label: 'Patient Registration & Book Issuance', path: '/personalDetails', icon: <UserPlus className="w-5 h-5 mr-2" /> },
    { label: 'Patient Records', path: '/patientRecords', icon: <FileText className="w-5 h-5 mr-2" /> },
    { label: 'Notifications', path: '/Notifications', icon: <Bell className="w-5 h-5 mr-2" /> },
    { label: 'Reports', path: '/Reports', icon: <FileText className="w-5 h-5 mr-2" /> },
    { label: 'Request Lost Book', path: '/RequestLostBook', icon: <Building2 className="w-5 h-5 mr-2" /> },
    { label: 'Logout', path: '/loginScreen', icon: <LogOut className="w-5 h-5 mr-2" />, action: 'logout' },
];

const API_BASE_URL = 'http://localhost:3000';

const AdminPasswordRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/forgot-password`);
            if (!response.ok) {
                throw new Error('Failed to fetch password requests');
            }
            const data = await response.json();
            // Only show requests with status 'pending'
            setRequests(data.filter(r => r.status === 'pending'));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAccept = async (username) => {
        try {
            setMessage({ type: '', text: '' });
            const response = await fetch(`${API_BASE_URL}/forgot-password/accept`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to accept request');
            }
            setMessage({ type: 'success', text: data.message || 'Request accepted successfully!' });
            await fetchRequests();
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-gradient-to-b from-blue-700 via-blue-600 to-cyan-600 shadow-xl flex flex-col divide-y divide-blue-500 text-white">
                <div className="flex items-center gap-3 px-6 py-6">
                    <ShieldCheck className="w-10 h-10 text-white" />
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
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
                        <KeyRound className="w-7 h-7 text-cyan-600" />
                        Forgot Password Requests
                    </h1>
                </div>
                {/* Message Display */}
                {message.text && (
                    <div className="w-full max-w-3xl mb-6">
                        <div className={`flex items-center gap-2 p-4 rounded-xl ${
                            message.type === 'success' 
                                ? 'bg-green-50 border border-green-200 text-green-700' 
                                : 'bg-red-50 border border-red-200 text-red-700'
                        }`}>
                            {message.type === 'success' ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                            <span className="font-medium">{message.text}</span>
                        </div>
                    </div>
                )}
                {/* Requests Table/Card */}
                <div className="w-full max-w-5xl flex flex-col gap-8">
                    {loading && (
                        <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-8 text-center">
                            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600">Loading password requests...</p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 rounded-xl shadow-lg border border-red-200 p-6">
                            <p className="text-red-600 font-semibold">Error: {error}</p>
                            <button
                                onClick={fetchRequests}
                                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}
                    {!loading && !error && requests.length === 0 && (
                        <div className="bg-white rounded-xl shadow-lg border border-blue-200 p-8 text-center">
                            <p className="text-gray-600">No password requests found.</p>
                        </div>
                    )}
                    {!loading && !error && requests.map((req, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg border border-blue-200 p-6 flex flex-col gap-4">
                            <div className="flex flex-wrap gap-6 mb-2">
                                <div className="flex items-center gap-2">
                                    <Hash className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-gray-700">Username:</span>
                                    <span className="text-gray-800">{req.username}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IdCard className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-gray-700">Employee No:</span>
                                    <span className="text-gray-800">{req.employeeNumber}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className={`w-5 h-5 ${req.status === 'accepted' ? 'text-green-600' : req.status === 'pending' ? 'text-yellow-500' : 'text-red-600'}`} />
                                    <span className="font-semibold text-gray-700">Status:</span>
                                    <span className={`font-bold ${req.status === 'accepted' ? 'text-green-600' : req.status === 'pending' ? 'text-yellow-500' : 'text-red-600'}`}>
                                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-700">Requested At:</span>
                                    <span className="text-gray-800">{new Date(req.requestedAt).toLocaleString()}</span>
                                </div>
                            </div>
                            {req.status === 'pending' && (
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => handleAccept(req.username)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Accept</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPasswordRequests;
