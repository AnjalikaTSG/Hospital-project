import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../functions/SideBar";
import { Calendar, Syringe, Shield, FileText, History, User, ChevronLeft, CheckCircle } from "lucide-react";

// Mock data for demonstration
const mockImmunizationHistory = [
  {
    vaccineName: "BCG",
    vaccineType: "Live attenuated",
    doseNumber: "1",
    dateGiven: "2024-01-15",
    nextDueDate: "2024-07-15",
    status: "Completed",
    comments: "No reaction"
  },
  {
    vaccineName: "DPT",
    vaccineType: "Inactivated",
    doseNumber: "2",
    dateGiven: "2024-01-10",
    nextDueDate: "2024-04-10",
    status: "Completed",
    comments: "Mild fever for 1 day"
  },
  {
    vaccineName: "MMR",
    vaccineType: "Live attenuated",
    doseNumber: "1",
    dateGiven: "2024-01-05",
    nextDueDate: "2024-07-05",
    status: "Pending",
    comments: ""
  }
];

const PastImmunizationHistory = () => {
  const navigate = useNavigate();
  // In a real app, patient info and immunization history would come from props, context, or API
  const patient = {
    name: "John Doe",
    id: "P123456",
    dob: "1985-07-12"
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <SideBar>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <History className="w-6 h-6 text-blue-600" />
                Past Immunization History
              </h2>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{patient.name}</span> | ID: {patient.id} | DOB: {patient.dob}
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          </div>

          <div className="p-8">
            {mockImmunizationHistory.length === 0 ? (
              <div className="text-center text-gray-500">No immunization history found for this patient.</div>
            ) : (
              <div className="space-y-6">
                {mockImmunizationHistory.map((record, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        {record.vaccineName}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>{record.status}</span>
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                        <Syringe className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Type:</span> {record.vaccineType}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Dose:</span> {record.doseNumber}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Given:</span> {record.dateGiven}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Next Due:</span> {record.nextDueDate}
                      </p>
                      {record.comments && (
                        <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Comments:</span> {record.comments}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PastImmunizationHistory; 