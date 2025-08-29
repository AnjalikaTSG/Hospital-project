import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../functions/NavBar';
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




const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/notifications');
        if (!response.ok) throw new Error('Failed to fetch notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:3000/notifications/${id}/read`, { method: 'PUT' });
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <NavBar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center w-full py-10">
        {/* Hospital Bar */}
        <div className="w-full max-w-5xl mb-2">
          <div className="bg-blue-700 rounded-t-xl py-3 px-6 text-center">
            <span className="text-white text-lg font-bold tracking-wide">Base Hospital - Avissawella</span>
          </div>
        </div>
        {/* Header */}
        <div className="w-full max-w-5xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800 flex items-center gap-3 bg-white rounded-b-xl py-6 px-6 shadow">
            <Bell className="w-7 h-7 text-cyan-600" />
            Notifications
          </h1>
        </div>
        {/* Notifications List */}
        <div className="w-full max-w-5xl flex flex-col gap-4">
          {loading && (
            <div className="text-center text-gray-500">Loading notifications...</div>
          )}
          {error && (
            <div className="text-center text-red-600">Error: {error}</div>
          )}
          {!loading && !error && notifications.length === 0 && (
            <div className="text-center text-gray-500">No notifications.</div>
          )}
          {!loading && !error && notifications.map((n) => (
            <div
              key={n._id}
              className={`flex items-center justify-between p-4 rounded-lg border shadow-sm transition-all ${n.read ? 'bg-gray-100 border-gray-200' : 'bg-blue-50 border-blue-200'}`}
            >
              <div className="flex items-center gap-3">
                <Bell className={`w-6 h-6 ${n.read ? 'text-gray-400' : 'text-blue-600 animate-bounce'}`} />
                <div>
                  <div className={`font-medium ${n.read ? 'text-gray-600' : 'text-blue-800'}`}>{n.message}</div>
                  <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
                </div>
              </div>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                >
                  <CheckCircle className="w-4 h-4" /> Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 