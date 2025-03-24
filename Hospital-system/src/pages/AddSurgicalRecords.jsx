import React from "react";
import "react-datepicker/dist/react-datepicker.css";

const AddSurgicalRecords = () => {
  const today = new Date().toISOString().split("T")[0]; // get today's date

  return (
    <div className="dashImage bg-cover bg-no-repeat bg-center min-h-screen items-start justify-start px-4">
      <div className="flex w-full bg-blue-500 py-4 justify-center">
        <h1 className="text-xl font-semibold text-white text-center">
          Patient checkup management system - Base Hospital - Avissawella
        </h1>
      </div>
      <div>
        <div>
          <ul className="flex">
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              Personal details
            </li>
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              OPD records
            </li>
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              Hospitalization
            </li>
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              Currently mediation
            </li>
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              Lifestyles
            </li>
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              Immunization
            </li>
            <li className="text-white bg-blue-400 w-60 border border-black px-4 py-4 hover:bg-blue-600 active:bg-blue-300 cursor-pointer">
              Surgical history
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col ml-2 -mb-0.5 w-full">
        <h2 className="text-xl text-gray-500 font-bold text-center mt-1.5 ml-2 mb-2">
          Surgical Records
        </h2>
        <div className=" flex ml-20">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col">
              <div className="flex flex-col mb-6">
                <label className="text-sm font-medium text-gray-500 mb-2">
                  Surgery:
                </label>

                <input
                  type="text"
                  placeholder=""
                  className="w-3/4 h-30 p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                />
              </div>
              <div className="mb-8"></div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="flex  mt-8 space-x-4 ml-50">
          <button className="w-full md:w-1/7 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
          onClick={()=>Navigate("/personalDetails3")}
          >
            Back
          </button>
          <button className="w-full md:w-1/7 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-700 transition-all">
            Add
          </button>
        </div>
    </div>
  );
};

export default AddSurgicalRecords;
