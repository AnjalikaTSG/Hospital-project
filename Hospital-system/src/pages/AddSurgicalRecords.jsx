import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

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
    <div className="dashImage bg-cover bg-no-repeat bg-center min-h-screen px-4">
      {/* Header */}
      <div className="flex w-full bg-blue-500 py-4 justify-center">
        <h1 className="text-xl font-semibold text-white text-center">
          Patient Checkup Management System - Base Hospital - Avissawella
        </h1>
      </div>

      {/* Navigation Tabs */}
      <div>
        <ul className="flex">
          {["Personal Details", "OPD Records", "Hospitalization", "Currently Mediation", "Lifestyles", "Immunization", "Surgical History"].map((tab, index) => (
            <li
              key={index}
              className="text-white bg-blue-400 w-60 border border-black px-4 py-4 text-center hover:bg-blue-600 active:bg-blue-300 cursor-pointer"
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      {/* Form for adding Surgical Records */}
      <div>
        <h2 className="text-xl text-gray-500 font-bold text-center mt-2 ml-2 mb-2">
           Surgical Records
        </h2>
        <div>
          <form className="px-8 pb-8">
            <div className="flex flex-wrap md:flex-nowrap gap-5">
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                  Add New Surgery
                </h3>
                
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Date:
                  </label>
                  <input
                    type="text"
                    value={today}
                    readOnly
                    className="w-half p-3 pl-10 text-gray-500 rounded-lg border-2 border-gray-200 outline-none bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">Surgery Name:</label>
                  <input
                    type="text"
                    value={surgery}
                    onChange={(e) => setSurgery(e.target.value)}
                    className="w-3/4 p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">Comments:</label>
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-3/4 p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 mb-1 space-y-4">
                <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                  Surgical History
                </h3>

                <div className="flex flex-col gap-4">
                  {surgicalRecords.map((record, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
                      <h4 className="text-gray-700 font-semibold">{record.name}</h4>
                      <p className="text-sm text-gray-500">Date: {record.date}</p>
                      <p className="text-sm text-gray-500">Comments: {record.comments}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-5 space-x-4">
              <button
                className="w-full md:w-1/7 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </button>
              <button
                type="button"
                className="w-full md:w-1/7 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-gray-500 transition-all"
                onClick={handleAddSurgery}
              >
                Add Surgery
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSurgicalRecords;
