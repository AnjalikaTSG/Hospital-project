
import React from "react";
import SideBar from "../functions/SideBar";
import { ArrowLeft, FileText, Calendar, User, Brain } from "lucide-react";

// Mock data for demonstration
const mockPsychologicalHistory = [
  {
    name: "Major Depressive Disorder",
    date: "2022-05-10",
    comments: "Treated with CBT and medication",
    doctor: "Dr. Adams"
  },
  {
    name: "Generalized Anxiety Disorder",
    date: "2021-12-01",
    comments: "Ongoing therapy, stable",
    doctor: "Dr. Lee"
  },
  {
    name: "Panic Disorder",
    date: "2020-08-15",
    comments: "Episodes reduced, follow-up in 6 months",
    doctor: "Dr. Patel"
  }
];

const PastPsychologicalHistory = () => {
  // Mock patient info for demonstration
  const patient = {
    name: "John Doe",
    id: "P123456",
    dob: "1985-07-12"
  };

  return (
    <SideBar>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Past Psychological Disease History</h1>
              <p className="text-gray-600">Patient: {patient.name} | ID: {patient.id} | DOB: {patient.dob}</p>
            </div>
          </div>
        </div>

        {/* Psychological History Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            Psychological Records
          </h2>

          {mockPsychologicalHistory.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No psychological disease history found for this patient.</h3>
            </div>
          ) : (
            <div className="space-y-6">
              {mockPsychologicalHistory.map((record, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-blue-600" />
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
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Doctor:</span> {record.doctor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SideBar>
  );
};

export default PastPsychologicalHistory;