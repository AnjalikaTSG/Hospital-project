import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Activity, Cigarette, Coffee, Wine } from "lucide-react";
import SideBar from "../functions/SideBar";

const PersonalDetails3 = () => {
  const [formData, setFormData] = useState({
    physicalActivity: '',
    tobaccoSmoking: '',
    betelChewing: '',
    otherTobacco: '',
    alcoholConsumption: '',
    otherSubstance: '',
    unhealthySnacks: ''
  });

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    console.log('Form Data:', formData);
    alert('Form submitted successfully! Moving to next step...');
  };

  const handleBack = () => {
    alert('Going back to previous step...');
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

  const CheckboxGroup = ({ field, options, icon: Icon, label }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <label className="text-sm font-medium text-gray-700">{label}:</label>
      </div>
      <div className="space-y-2 ml-7">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name={field}
              value={option.value}
              checked={formData[field] === option.value}
              onChange={(e) => handleCheckboxChange(field, e.target.value)}
              className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2 transition-all"
            />
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <SideBar>
      <div className="bg-white w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                Risk Behavioral History
              </h2>
              <p className="text-gray-600 text-center mt-2">
                Please provide information about lifestyle and behavioral factors
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <CheckboxGroup
                    field="physicalActivity"
                    label="Physical Activity"
                    icon={Activity}
                    options={[
                      { value: 'active', label: 'Active (Regular exercise/physical activity)' },
                      { value: 'non-active', label: 'Non-active (Sedentary lifestyle)' }
                    ]}
                  />

                  <CheckboxGroup
                    field="tobaccoSmoking"
                    label="Tobacco Smoking"
                    icon={Cigarette}
                    options={[
                      { value: 'active', label: 'Active smoker' },
                      { value: 'non-active', label: 'Non-smoker' }
                    ]}
                  />

                  <CheckboxGroup
                    field="betelChewing"
                    label="Betel Chewing"
                    icon={Coffee}
                    options={[
                      { value: 'user', label: 'Regular user' },
                      { value: 'non-user', label: 'Non-user' }
                    ]}
                  />

                  <CheckboxGroup
                    field="otherTobacco"
                    label="Other Tobacco/Arecanut Preparations"
                    icon={Coffee}
                    options={[
                      { value: 'user', label: 'Regular user' },
                      { value: 'non-user', label: 'Non-user' }
                    ]}
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <CheckboxGroup
                    field="alcoholConsumption"
                    label="Alcohol Consumption"
                    icon={Wine}
                    options={[
                      { value: 'user', label: 'Regular consumer' },
                      { value: 'non-user', label: 'Non-consumer' }
                    ]}
                  />

                  <CheckboxGroup
                    field="otherSubstance"
                    label="Other Substance Use"
                    icon={Coffee}
                    options={[
                      { value: 'user', label: 'Regular user' },
                      { value: 'non-user', label: 'Non-user' }
                    ]}
                  />

                  <CheckboxGroup
                    field="unhealthySnacks"
                    label="Unhealthy Snacks Intake"
                    icon={Coffee}
                    options={[
                      { value: 'non-consumer', label: 'Non-consumer' },
                      { value: 'low', label: '≤ 5 times per week' },
                      { value: 'high', label: '> 5 times per week' }
                    ]}
                  />
                </div>
              </div>

              {/* ✅ New Section: Family History of Diseases */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl text-gray-500 font-semibold mb-4 ml-1.5">
                  Diseases that family members are suffering
                </h3>
                <div className="flex flex-col ml-2 space-y-3">
                  {[
                    "Ischaemic heart diseases",
                    "High blood pressure",
                    "Stroke",
                    "Diabetes Mellitus",
                    "Cancer",
                    "COPD and Asthma",
                    "Kidney Diseases",
                    "Other",
                    "Sudden deaths of relatives due to unknown causes"
                  ].map((disease, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-gray-600 border border-gray-500 focus:ring-gray-500"
                      />
                      <span className="text-sm text-gray-500">{disease}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
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
      </div>
    </SideBar>
  );
};

export default PersonalDetails3;
