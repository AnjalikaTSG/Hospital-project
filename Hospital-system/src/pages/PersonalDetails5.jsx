import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Scale, Ruler, Heart, Eye, Stethoscope } from "lucide-react";
import SideBar from "../functions/SideBar";
import { useNavigate } from "react-router-dom";

const PersonalDetails5 = () => {
  const [formData, setFormData] = useState({
    date: '',
    age: '',
    weight: '',
    bmi: '',
    idealBodyWeight: '',
    waistCircumference: '',
    waistHeightRatio: '',
    bloodPressure: '',
    oralExamination: '',
    breastExamination: '',
    distantVisionLeft: '',
    distantVisionRight: '',
    // Medical Information fields
    hearingLeft: '',
    hearingRight: '',
    pefr: '',
    bloodSugarRandom: '',
    bloodSugarFasting: '',
    papSmearDate: '',
    papSmearReport: '',
    serumCreatinine: '',
    lipidTC: '',
    lipidLDL: '',
    lipidTG: '',
    lipidHDL: '',
    lipidTCHDL: ''
  });

  const navigate = useNavigate();

  // Set today's date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    console.log('Form Data:', formData);
    alert('Form submitted successfully! Moving to next step...');
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/personalDetails3');
  };

  const tabs = [
    "Personal Details",
    "OPD Records", 
    "Hospitalization",
    "Current Medication",
    "Lifestyles",
    "Immunization",
    "Surgical History"
  ];

  const RadioGroup = ({ field, options, label }) => (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">{label}:</label>
      <div className="flex gap-6">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name={field}
              value={option.toLowerCase()}
              checked={formData[field] === option.toLowerCase()}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  const InputField = ({ field, label, type = "text", placeholder, readOnly = false, icon: Icon }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        <label className="text-sm font-medium text-gray-700">{label}:</label>
      </div>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full p-3 rounded-lg border-2 transition-all ${
          readOnly 
            ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed' 
            : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700'
        }`}
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
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 bg-white"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'object' ? option.value : option}>
            {typeof option === 'object' ? option.label : option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <SideBar>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              General Examination Details
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Complete physical examination and vital measurements
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Basic Examination Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Basic Examination Information
                  </h3>
                </div>

                <InputField
                  field="date"
                  label="Date"
                  type="date"
                  readOnly={true}
                  icon={Calendar}
                />

                <SelectField
                  field="age"
                  label="Age"
                  icon={Calendar}
                  options={Array.from({ length: 66 }, (_, i) => i + 35)}
                />

                <SelectField
                  field="weight"
                  label="Weight (kg)"
                  icon={Scale}
                  options={Array.from({ length: 96 }, (_, i) => i + 25)}
                />

                <SelectField
                  field="bmi"
                  label="BMI"
                  icon={Scale}
                  options={[
                    "Below 18.5 (Underweight)",
                    "18.5 - 24.9 (Normal)",
                    "25 - 29.9 (Overweight)",
                    "30 - 34.9 (Obese Class I)",
                    "35 - 39.9 (Obese Class II)",
                    "Above 40 (Obese Class III)"
                  ]}
                />

                <SelectField
                  field="idealBodyWeight"
                  label="Ideal Body Weight (kg)"
                  icon={Scale}
                  options={Array.from({ length: 51 }, (_, i) => i + 50)}
                />

                <SelectField
                  field="waistCircumference"
                  label="Waist Circumference (cm)"
                  icon={Ruler}
                  options={Array.from({ length: 61 }, (_, i) => i + 70)}
                />

                <InputField
                  field="waistHeightRatio"
                  label="Waist:Height Ratio"
                  placeholder="Enter ratio (e.g., 0.5)"
                  icon={Ruler}
                />
              </div>

              {/* Right Column - Clinical Observations */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Clinical Observations
                  </h3>
                </div>

                <SelectField
                  field="bloodPressure"
                  label="Blood Pressure (Systolic)"
                  icon={Heart}
                  options={[
                    "Below 120 (Normal)",
                    "120–129 (Elevated)",
                    "130–139 (Stage 1 Hypertension)",
                    "140–179 (Stage 2 Hypertension)",
                    "180+ (Hypertensive Crisis)"
                  ]}
                />

                <div className="space-y-4">
                  <RadioGroup
                    field="oralExamination"
                    label="Oral Examination"
                    options={["Normal", "Abnormal"]}
                  />

                  <RadioGroup
                    field="breastExamination"
                    label="Breast Examination"
                    options={["Normal", "Abnormal"]}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <label className="text-sm font-medium text-gray-700">Distant Vision:</label>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      field="distantVisionLeft"
                      label="Left Eye"
                      placeholder="e.g., 20/20"
                    />
                    <InputField
                      field="distantVisionRight"
                      label="Right Eye"
                      placeholder="e.g., 20/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information Section */}
            <div className="rounded-xl p-6 mt-8 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Basic Health Information
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Hearing:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600">
                          Left:
                        </label>
                        <input
                          type="text"
                          value={formData.hearingLeft}
                          onChange={(e) => handleInputChange('hearingLeft', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600">
                          Right:
                        </label>
                        <input
                          type="text"
                          value={formData.hearingRight}
                          onChange={(e) => handleInputChange('hearingRight', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Peak Expiratory Flow Rate (PEFR):
                    </label>
                    <input
                      type="text"
                      value={formData.pefr}
                      onChange={(e) => handleInputChange('pefr', e.target.value)}
                      placeholder="Enter PEFR value"
                      className="w-full p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Blood Sugar Value:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600">
                          Random:
                        </label>
                        <input
                          type="text"
                          value={formData.bloodSugarRandom}
                          onChange={(e) => handleInputChange('bloodSugarRandom', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600">
                          Fasting:
                        </label>
                        <input
                          type="text"
                          value={formData.bloodSugarFasting}
                          onChange={(e) => handleInputChange('bloodSugarFasting', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Reports */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-blue-600" />
                    Test Reports
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      PAP Smear Report:
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600">
                          Date:
                        </label>
                        <input
                          type="date"
                          value={formData.papSmearDate}
                          onChange={(e) => handleInputChange('papSmearDate', e.target.value)}
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600">
                          Report:
                        </label>
                        <input
                          type="text"
                          value={formData.papSmearReport}
                          onChange={(e) => handleInputChange('papSmearReport', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Serum Creatinine:
                    </label>
                    <input
                      type="text"
                      value={formData.serumCreatinine}
                      onChange={(e) => handleInputChange('serumCreatinine', e.target.value)}
                      placeholder="Enter serum creatinine value"
                      className="w-full p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Lipid Profile:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600 w-12">
                          TC:
                        </label>
                        <input
                          type="text"
                          value={formData.lipidTC}
                          onChange={(e) => handleInputChange('lipidTC', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600 w-12">
                          LDL:
                        </label>
                        <input
                          type="text"
                          value={formData.lipidLDL}
                          onChange={(e) => handleInputChange('lipidLDL', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600 w-12">
                          TG:
                        </label>
                        <input
                          type="text"
                          value={formData.lipidTG}
                          onChange={(e) => handleInputChange('lipidTG', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-600 w-12">
                          HDL:
                        </label>
                        <input
                          type="text"
                          value={formData.lipidHDL}
                          onChange={(e) => handleInputChange('lipidHDL', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <label className="text-sm font-medium text-gray-600 w-16">
                          TC:HDL:
                        </label>
                        <input
                          type="text"
                          value={formData.lipidTCHDL}
                          onChange={(e) => handleInputChange('lipidTCHDL', e.target.value)}
                          placeholder=""
                          className="flex-1 p-3 text-gray-700 rounded-lg border-2 border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-12 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PersonalDetails5;