import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Syringe, Shield, FileText, History, AlertCircle, CheckCircle } from "lucide-react";
import SideBar from "../functions/SideBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ImmunizationRecords = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [immunizationData, setImmunizationData] = useState({
    vaccineName: "",
    vaccineType: "",
    doseNumber: "",
    dateGiven: null,
    nextDueDate: null,
    batchNumber: "",
    manufacturer: "",
    administeredBy: "",
    site: "",
    route: "",
    adverseReaction: "",
    notes: ""
  });
  const [immunizationRecords, setImmunizationRecords] = useState([
    { 
      vaccineName: "BCG", 
      vaccineType: "Live attenuated",
      doseNumber: "1",
      dateGiven: "2024-01-15", 
      nextDueDate: "2024-07-15",
      status: "Completed"
    },
    { 
      vaccineName: "DPT", 
      vaccineType: "Inactivated",
      doseNumber: "2",
      dateGiven: "2024-01-10", 
      nextDueDate: "2024-04-10",
      status: "Completed"
    },
    { 
      vaccineName: "MMR", 
      vaccineType: "Live attenuated",
      doseNumber: "1",
      dateGiven: "2024-01-05", 
      nextDueDate: "2024-07-05",
      status: "Pending"
    },
  ]);

  const handleInputChange = (field, value) => {
    setImmunizationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddImmunization = () => {
    if (!immunizationData.vaccineName.trim() || !immunizationData.dateGiven) return;
    
    const newRecord = {
      vaccineName: immunizationData.vaccineName,
      vaccineType: immunizationData.vaccineType,
      doseNumber: immunizationData.doseNumber,
      dateGiven: immunizationData.dateGiven ? immunizationData.dateGiven.toISOString().split("T")[0] : "",
      nextDueDate: immunizationData.nextDueDate ? immunizationData.nextDueDate.toISOString().split("T")[0] : "",
      status: "Completed"
    };
    
    setImmunizationRecords([...immunizationRecords, newRecord]);
    
    // Clear form
    setImmunizationData({
      vaccineName: "",
      vaccineType: "",
      doseNumber: "",
      dateGiven: null,
      nextDueDate: null,
      batchNumber: "",
      manufacturer: "",
      administeredBy: "",
      site: "",
      route: "",
      adverseReaction: "",
      notes: ""
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const InputField = ({ field, label, type = "text", placeholder, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        <label className="text-sm font-medium text-gray-700">{label}:</label>
      </div>
      <input
        type={type}
        value={immunizationData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
      />
    </div>
  );

  const DatePickerField = ({ field, label, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        <label className="text-sm font-medium text-gray-700">{label}:</label>
      </div>
      <DatePicker
        selected={immunizationData[field]}
        onChange={date => handleInputChange(field, date)}
        dateFormat="yyyy-MM-dd"
        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
        placeholderText={label}
      />
    </div>
  );

  const SelectField = ({ field, label, options, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        <label className="text-sm font-medium text-gray-700">{label}:</label>
      </div>
      <select
        value={immunizationData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 bg-white"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const TextAreaField = ({ field, label, placeholder, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        <label className="text-sm font-medium text-gray-700">{label}:</label>
      </div>
      <textarea
        value={immunizationData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 resize-none"
      />
    </div>
  );

  return (
    <SideBar>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Immunization Records
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Manage patient immunization schedules and vaccination records
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Add New Immunization */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Syringe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Add New Immunization
                  </h3>
                </div>

                <div className="space-y-4">
                  <InputField
                    field="vaccineName"
                    label="Vaccine Name"
                    placeholder="Enter vaccine name"
                    icon={Shield}
                  />

                  <SelectField
                    field="vaccineType"
                    label="Vaccine Type"
                    icon={Syringe}
                    options={[
                      "Live attenuated",
                      "Inactivated",
                      "Subunit",
                      "Toxoid",
                      "Conjugate",
                      "Recombinant",
                      "Other"
                    ]}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      field="doseNumber"
                      label="Dose Number"
                      type="number"
                      placeholder="1, 2, 3..."
                    />
                    <InputField
                      field="batchNumber"
                      label="Batch Number"
                      placeholder="Batch/Lot number"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <DatePickerField
                      field="dateGiven"
                      label="Date Given"
                      icon={Calendar}
                    />
                    <DatePickerField
                      field="nextDueDate"
                      label="Next Due Date"
                      icon={Calendar}
                    />
                  </div>

                  <InputField
                    field="manufacturer"
                    label="Manufacturer"
                    placeholder="Vaccine manufacturer"
                  />

                  <InputField
                    field="administeredBy"
                    label="Administered By"
                    placeholder="Healthcare provider name"
                    icon={Syringe}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      field="site"
                      label="Injection Site"
                      options={[
                        "Left arm",
                        "Right arm",
                        "Left thigh",
                        "Right thigh",
                        "Left buttock",
                        "Right buttock",
                        "Oral",
                        "Nasal"
                      ]}
                    />
                    <SelectField
                      field="route"
                      label="Route"
                      options={[
                        "Intramuscular",
                        "Subcutaneous",
                        "Intradermal",
                        "Oral",
                        "Nasal",
                        "Intranasal"
                      ]}
                    />
                  </div>

                  <TextAreaField
                    field="adverseReaction"
                    label="Adverse Reactions"
                    placeholder="Any adverse reactions or side effects..."
                    icon={AlertCircle}
                  />

                  <TextAreaField
                    field="notes"
                    label="Additional Notes"
                    placeholder="Any additional information..."
                    icon={FileText}
                  />

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      className="flex items-center gap-2 px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={() => navigate("/dashboard")}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      onClick={handleAddImmunization}
                    >
                      Add Immunization
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Immunization History */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Immunization History
                  </h3>
                </div>

                <div className="space-y-4">
                  {immunizationRecords.map((record, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-gray-800 font-semibold flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-600" />
                          {record.vaccineName}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Type:</span> {record.vaccineType}</p>
                        <p><span className="font-medium">Dose:</span> {record.doseNumber}</p>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Given:</span> {record.dateGiven}</p>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">Next Due:</span> {record.nextDueDate}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Stats */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Immunization Summary
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-blue-600 font-bold">{immunizationRecords.length}</div>
                      <div className="text-blue-500">Total Vaccines</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-600 font-bold">
                        {immunizationRecords.filter(r => r.status === 'Completed').length}
                      </div>
                      <div className="text-green-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-600 font-bold">
                        {immunizationRecords.filter(r => r.status === 'Pending').length}
                      </div>
                      <div className="text-orange-500">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ImmunizationRecords;
