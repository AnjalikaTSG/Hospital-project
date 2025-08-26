import React, { useEffect, useState } from 'react';
import { CheckCircle, User, Hash, MapPin, Phone, IdCard, Landmark, Calendar } from 'lucide-react';
import SideBar from "../functions/SideBar";
import { useLocation } from 'react-router-dom';
import { generatePatientId } from '../utils/patientIdGenerator';

const SuccessfulRegistration = () => {
  const location = useLocation();
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    // Get patient data from localStorage or URL params
    const urlParams = new URLSearchParams(location.search);
    const patientIdFromUrl = urlParams.get('patientId');
    
    if (patientIdFromUrl) {
      setPatientId(patientIdFromUrl);
      
      // Try to get patient data from localStorage
      const tab1Data = localStorage.getItem(`patient_${patientIdFromUrl}_tab1`);
      const tab3Data = localStorage.getItem(`patient_${patientIdFromUrl}_tab3`);
      const tab5Data = localStorage.getItem(`patient_${patientIdFromUrl}_tab5`);
      
      if (tab1Data) {
        const parsedTab1 = JSON.parse(tab1Data);
        setPatientData(parsedTab1);
      }
    }
  }, [location]);

  // Default values if no data is available
  const displayData = {
    name: patientData?.name || 'Patient Name',
    nic: patientData?.nic || 'NIC Number',
    address: patientData?.address || 'Address',
    telephone: patientData?.emergencyContactPhone || 'Phone Number',
    district: patientData?.district || 'District',
    dateOfBirth: patientData?.dateOfBirth ? new Date(patientData.dateOfBirth).toLocaleDateString() : 'Date of Birth',
    age: patientData?.age || 'Age',
    gender: patientData?.gender || 'Gender'
  };

  return (
    <SideBar>
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="bg-white rounded-xl shadow-lg border border-blue-200 max-w-lg w-full p-8 flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Registration Successful!</h2>
          <p className="text-gray-600 mb-6 text-center">Your patient registration has been completed successfully. Please find your details below.</p>
          
          {/* Patient ID Display */}
          <div className="flex flex-col items-center bg-blue-50 border border-blue-300 rounded-lg px-6 py-3 mb-6 shadow-sm w-full">
            <div className="flex items-center gap-2 mb-1">
              <Hash className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-700">Patient ID:</span>
            </div>
            <span className="text-xl font-extrabold text-blue-700 tracking-wide">{patientId || 'Generated ID'}</span>
          </div>

          {/* Patient Details */}
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-800">{displayData.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <IdCard className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">NIC:</span>
              <span className="text-gray-800">{displayData.nic}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Age:</span>
              <span className="text-gray-800">{displayData.age}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Gender:</span>
              <span className="text-gray-800">{displayData.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-800">{displayData.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="text-gray-800">{displayData.telephone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">District:</span>
              <span className="text-gray-800">{displayData.district}</span>
            </div>
          </div>

          {/* Success Message */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-center text-sm">
              Your patient registration is complete. You can now access all patient services.
            </p>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default SuccessfulRegistration; 