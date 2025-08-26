
import React from "react";
import SideBar from "../functions/SideBar";
import ImmunizationRecords from "./ImmunizationRecords";
import PastImmunizationHistory from "./PastImmunizationHistory";

const ImmunizationPage = () => {
  return (
    <SideBar>
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Immunization Management</h1>
          <p className="text-gray-600">Add new record & view history</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Add New Immunization Record */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Immunization Record</h2>
              <ImmunizationRecords />
            </div>
          </div>
          {/* Right: Display Immunization History */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Immunization History</h2>
              <PastImmunizationHistory />
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ImmunizationPage;
