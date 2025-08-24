import React from 'react';
import { CheckCircle, User, Hash, MapPin, Phone, IdCard, Landmark } from 'lucide-react';
import SideBar from '../functions/SideBar';

const SuccessfulRegistration = ({
  registrationNumber = 'REG2024001',
  name = 'John Doe',
  nic = '123456789V',
  address = '123 Main Street, Colombo',
  telephone = '+94 77 123 4567',
  district = 'Colombo'
}) => {
  return (
    <SideBar>
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="bg-white rounded-xl shadow-lg border border-blue-200 max-w-lg w-full p-8 flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Registration Successful!</h2>
          <p className="text-gray-600 mb-6 text-center">Your registration has been completed. Please find your details below.</p>
          <div className="flex flex-col items-center bg-blue-50 border border-blue-300 rounded-lg px-6 py-3 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Hash className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-700">Registration number:</span>
            </div>
            <span className="text-xl font-extrabold text-blue-700 tracking-wide">{registrationNumber}</span>
          </div>
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-800">{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">NIC no:</span>
              <span className="text-gray-800">{nic}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-800">{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Telephone no.:</span>
              <span className="text-gray-800">{telephone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">District:</span>
              <span className="text-gray-800">{district}</span>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default SuccessfulRegistration; 