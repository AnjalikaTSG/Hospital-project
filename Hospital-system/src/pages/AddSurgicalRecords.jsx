import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Stethoscope, FileText, History } from "lucide-react";

const AddSurgicalRecords = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [surgery, setSurgery] = useState("");
  const [comment, setComment] = useState("");
  const [surgicalRecords, setSurgicalRecords] = useState([
    { name: "Surgery 1", date: "2021-09-01", comments: "Comment 1" },
    { name: "Surgery 2", date: "2021-09-02", comments: "Comment 2" },
    { name: "Surgery 3", date: "2021-09-03", comments: "Comment 3" },
  ]);

  const handleAddSurgery = () => {
    if (surgery.trim() === "") return;
    const newRecord = { name: surgery, date: today, comments: comment };
    setSurgicalRecords([...surgicalRecords, newRecord]);
    setSurgery(""); // Clear input after adding
    setComment(""); // Clear input after adding comment
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Add New Surgery</h3>
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
              <Stethoscope className="w-4 h-4 text-blue-600" />
              <label className="text-sm font-medium text-gray-700">Surgery Name:</label>
            </div>
            <input
              type="text"
              value={surgery}
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
              Add Surgery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSurgicalRecords;
