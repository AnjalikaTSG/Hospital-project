import React from "react";
import { Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PersonalDetails2 = () => {
  const navigate = useNavigate();

  return (
    <div className="dashImage bg-cover bg-no-repeat bg-center min-h-screen items-start justify-start px-4">
      <div className="flex w-full bg-blue-500 py-4 justify-center">
        <h1 className="text-xl font-semibold text-white text-center">
          Patient Checkup Management System - Base Hospital - Avissawella
        </h1>
      </div>

      <div>
        <ul className="flex">
          {[
            "Personal details",
            "OPD records",
            "Hospitalization",
            "Currently mediation",
            "Lifestyles",
            "Immunization",
            "Surgical history",
          ].map((item, index) => (
            <li
              key={index}
              className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-xl text-gray-500 font-bold text-center mt-2 ml-2 mb-2">
        Register Patients
      </h2>

      <div className="px-8 pb-8">
        <form>
          <div className="flex flex-wrap md:flex-nowrap gap-5">
            {/* Emergency Contact Information */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl text-gray-500 font-semibold ml-1.5">
                Emergency Contact Information
              </h3>

              {[
                { label: "Name:", placeholder: "Name" },
                { label: "Relationship:", placeholder: "NIC no." },
                { label: "TP no:", placeholder: "Telephone" },
              ].map((field, index) => (
                <div className="flex items-center space-x-2 mt-2.5" key={index}>
                  <label className="text-sm font-medium text-gray-500">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-3/4 p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
              ))}

              <div className="flex items-center space-x-2 mt-2.5">
                <label className="text-sm font-medium text-gray-500">
                  Gender:
                </label>
                <select className="w-3/4 p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            {/* At Registration */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl text-gray-500 font-semibold ml-1.5">
                At Registration
              </h3>

              <div className="flex flex-col">
                {["Married", "Unmarried", "Widowed", "Separated"].map(
                  (status, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox id={`status-${index}`} color="gray" />
                      <label htmlFor={`status-${index}`} className="text-gray-700">
                        {status}
                      </label>
                    </div>
                  )
                )}
              </div>

              {/* Education Level */}
              <h3 className="text-xl text-gray-500 font-semibold ml-1.5 mt-4">
                Highest Education Level
              </h3>
              <div className="flex flex-col space-y-1">
                {[
                  "No formal education",
                  "Grade 1-5",
                  "Grade 6-11",
                  "O/L",
                  "A/L",
                  "Diploma",
                  "Degree",
                ].map((level, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <Checkbox id={`education-${index}`} color="gray" />
                    <label htmlFor={`education-${index}`} className="text-gray-700">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-5 space-x-4">
            <button
              type="button"
              className="w-full md:w-1/7 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
              onClick={() => navigate("/personalDetails")}
            >
              Back
            </button>
            <button
              type="button"
              className="w-full md:w-1/7 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-700 transition-all"
              onClick={() => navigate("/personalDetails3")}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails2;
