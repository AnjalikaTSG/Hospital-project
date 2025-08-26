import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SideBar from '../functions/SideBar';
import { ArrowLeft, FileText, Calendar, User, Stethoscope } from 'lucide-react';

const PatientOPDRecords = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  return (
    <SideBar>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/patient/${patientId}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Patient Details
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">OPD Records</h1>
              <p className="text-gray-600">Patient ID: {patientId}</p>
            </div>
          </div>
        </div>
        
        {/* OPD Records Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            OPD Records
          </h2>
          
          <div className="text-center py-12">
            <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">OPD Records</h3>
            <p className="text-gray-500">Content for OPD records will be added here as specified.</p>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PatientOPDRecords;
