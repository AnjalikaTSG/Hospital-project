import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../functions/SideBar";
import { Calendar, Stethoscope, FileText, History, User, ChevronLeft } from "lucide-react";

// Mock data for demonstration
const mockSurgicalHistory = [
  {
    name: "Appendectomy",
    date: "2021-03-15",
    comments: "Laparoscopic, no complications",
    surgeon: "Dr. Smith"
  },
  {
    name: "Gallbladder Removal",
    date: "2019-11-02",
    comments: "Routine, quick recovery",
    surgeon: "Dr. Lee"
  },
  {
    name: "Hernia Repair",
    date: "2018-06-21",
    comments: "Mesh used, follow-up required",
    surgeon: "Dr. Patel"
  }
];

const PastSurgicalHistory = () => {
  const navigate = useNavigate();
  // In a real app, patient info and surgical history would come from props, context, or API
  const patient = {
    name: "John Doe",
    id: "P123456",
    dob: "1985-07-12"
  };

  return (
    <SideBar>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <History className="w-6 h-6 text-blue-600" />
                Past Surgical History
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
            {mockSurgicalHistory.length === 0 ? (
              <div className="text-center text-gray-500">No surgical history found for this patient.</div>
            ) : (
              <div className="space-y-6">
                {mockSurgicalHistory.map((record, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                        {record.name}
                      </h4>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Date:</span> {record.date}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Comments:</span> {record.comments}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Surgeon:</span> {record.surgeon}
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

export default PastSurgicalHistory; 