import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../functions/SideBar";
import { Calendar, Brain, FileText, History } from "lucide-react";

const PsychologicalRecords = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [Psychological, setSurgery] = useState("");
  const [comment, setComment] = useState("");
  const [surgicalRecords, setSurgicalRecords] = useState([
    { name: "Psychological 1", date: "2021-09-01", comments: "Comment 1" },
    { name: "Psychological 2", date: "2021-09-02", comments: "Comment 2" },
    { name: "Psychological 3", date: "2021-09-03", comments: "Comment 3" },
  ]);

  const handleAddSurgery = () => {
    if (Psychological.trim() === "") return;
    const newRecord = { name: Psychological, date: today, comments: comment };
    setSurgicalRecords([...surgicalRecords, newRecord]);
    setSurgery(""); // Clear input after adding
    setComment(""); // Clear input after adding comment
  };

  return (
    <SideBar>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              Psychological Records
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Manage psychological disease conditions and records
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Add New Psychological Disease */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Add New Psychological Disease
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <label className="text-sm font-medium text-gray-700">Date:</label>
                    </div>
                    <input
                      type="text"
                      value={today}
                      readOnly
                      className="w-full p-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-blue-600" />
                      <label className="text-sm font-medium text-gray-700">
                        Psychological Disease conditions:
                      </label>
                    </div>
                    <input
                      type="text"
                      value={Psychological}
                      onChange={(e) => setSurgery(e.target.value)}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <label className="text-sm font-medium text-gray-700">Comments:</label>
                    </div>
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      className="flex items-center gap-2 px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => navigate("/dashboard")}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={handleAddSurgery}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Psychological Disease History */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Psychological Disease History
                  </h3>
                </div>

                <div className="space-y-4">
                  {surgicalRecords.map((record, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                    >
                      <h4 className="text-gray-800 font-semibold mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-blue-600" />
                        {record.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" /> Date: {record.date}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" /> Comments: {record.comments}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Next Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={handleAddSurgery}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PsychologicalRecords;
