import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  UserPlus,
  FileText,
  Bell,
  Building2,
  MoreHorizontal,
  Hospital,
  CheckCircle,
  XCircle
} from 'lucide-react';

const sidebarItems = [
  { label: 'Home', path: '/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
  { label: 'Patient Registration & Book Issuance', path: '/personalDetails', icon: <UserPlus className="w-5 h-5 mr-2" /> },
  { label: 'Patient Records', path: '/patientRecords', icon: <FileText className="w-5 h-5 mr-2" /> },
  { label: 'Reports & Alerts', path: '/reports', icon: <Bell className="w-5 h-5 mr-2" /> },
  { label: 'Departments/Clinics', path: '/departments', icon: <Building2 className="w-5 h-5 mr-2" /> },
  { label: 'Other', path: '/other', icon: <MoreHorizontal className="w-5 h-5 mr-2" /> },
];

const initialNotifications = [
  { id: 1, message: 'New staff pending verification', time: '2 min ago', read: false },
  { id: 2, message: 'Patient John Doe registered', time: '10 min ago', read: false },
  { id: 3, message: 'Lab report FBC ready for Saman Perera', time: '1 hour ago', read: true },
  { id: 4, message: 'Appointment reminder for Kumari Jayasinghe', time: '2 hours ago', read: true },
  { id: 5, message: 'System maintenance scheduled for tonight', time: '1 day ago', read: false },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
        <div className="w-full max-w-xl mb-2">
          <div className="bg-blue-700 rounded-t-xl py-3 px-6 text-center">
            <span className="text-white text-lg font-bold tracking-wide">Base Hospital - Avissawella</span>
          </div>
        </div>
        {/* Header */}
        <div className="w-full max-w-xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <Bell className="w-7 h-7 text-cyan-600" />
            Notifications
          </h1>
        </div>
        {/* Notifications List */}
        <div className="w-full max-w-xl flex flex-col gap-4">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500">No notifications.</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-center justify-between p-4 rounded-lg border shadow-sm transition-all ${n.read ? 'bg-gray-100 border-gray-200' : 'bg-blue-50 border-blue-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Bell className={`w-6 h-6 ${n.read ? 'text-gray-400' : 'text-blue-600 animate-bounce'}`} />
                  <div>
                    <div className={`font-medium ${n.read ? 'text-gray-600' : 'text-blue-800'}`}>{n.message}</div>
                    <div className="text-xs text-gray-500">{n.time}</div>
                  </div>
                </div>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                  >
                    <CheckCircle className="w-4 h-4" /> Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 