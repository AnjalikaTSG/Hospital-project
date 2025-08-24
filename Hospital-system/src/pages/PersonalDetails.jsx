import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import SideBar from "../functions/SideBar";
import { User, Phone, MapPin, Heart, Calendar, IdCard, Hash, Users, GraduationCap } from "lucide-react";

const TABS = [1, 2, 3, 4, 5, 6];

const PersonalDetails = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [formData, setFormData] = useState({
    1: {
      name: '',
      nic: '',
      age: '',
      dateOfBirth: null,
      gender: '',
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      emergencyContactGender: '',
      address: '',
      district: '',
      mohArea: '',
      phmArea: '',
      phiArea: '',
      maritalStatus: '',
      educationLevel: ''
    },
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
  });
  const [patientId, setPatientId] = useState(null);

  // Generate unique patient ID when component mounts
  useEffect(() => {
    const generatePatientId = () => {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 9);
      const uniqueId = `PAT${timestamp}${random}`.toUpperCase();
      setPatientId(uniqueId);
      console.log('Generated Patient ID:', uniqueId);
    };
    
    generatePatientId();
  }, []);

  const Navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [tabIndex]: { ...formData[tabIndex], [name]: value }
    });
    
    // If age is manually changed, validate against date of birth
    if (name === 'age' && selectedDate) {
      const today = new Date();
      const birthDate = new Date(selectedDate);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      // If the manually entered age differs significantly from calculated age, show a warning
      if (Math.abs(parseInt(value) - calculatedAge) > 1) {
        console.warn(`Age mismatch: Entered age (${value}) differs from calculated age (${calculatedAge}) based on date of birth`);
      }
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      [tabIndex]: { ...formData[tabIndex], dateOfBirth: date }
    });
    
    // Also update age if date is selected
    if (date) {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({
        ...prev,
        [tabIndex]: { ...prev[tabIndex], age: age.toString() }
      }));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [tabIndex]: { ...formData[tabIndex], [name]: value }
    });
  };

  const regeneratePatientId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const uniqueId = `PAT${timestamp}${random}`.toUpperCase();
    setPatientId(uniqueId);
    console.log('Regenerated Patient ID:', uniqueId);
  };

  const clearForm = () => {
    setFormData({
      1: {
        name: '',
        nic: '',
        age: '',
        dateOfBirth: null,
        gender: '',
        emergencyContactName: '',
        emergencyContactRelationship: '',
        emergencyContactPhone: '',
        emergencyContactGender: '',
        address: '',
        district: '',
        mohArea: '',
        phmArea: '',
        phiArea: '',
        maritalStatus: '',
        educationLevel: ''
      },
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    });
    setSelectedDate(null);
    alert('Form cleared successfully!');
  };

  const handleNext = async () => {
    if (!patientId) {
      alert('Patient ID is being generated. Please wait a moment and try again.');
      return;
    }

    // Basic validation - check if required fields are filled
    const requiredFields = ['name', 'nic', 'age', 'gender'];
    const missingFields = requiredFields.filter(field => !formData[tabIndex][field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Prepare data for saving
      const dataToSave = {
        patientId,
        tabIndex,
        data: {
          ...formData[tabIndex],
          dateOfBirth: selectedDate ? selectedDate.toISOString() : null
        }
      };
      
      console.log('Saving data:', dataToSave);
      
      // Save current tab data
      await axios.post('http://localhost:3000/patient/save', dataToSave);
      
      console.log('Data saved successfully for patient:', patientId);
      
      // Navigate to next page
      Navigate("/personalDetails3");
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  return (
    <SideBar>
      <div className="bg-white w-full min-h-screen">
        <div className="p-6">
          <h2 className="text-2xl text-gray-700 font-bold text-center mb-8 flex items-center justify-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            Register Patients
          </h2>
          
          {/* Patient ID Display */}
          {patientId ? (
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg border border-blue-300">
                <div className="flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  <span className="font-medium">Patient ID:</span>
                  <span className="font-mono text-sm">{patientId}</span>
                </div>
                <button
                  type="button"
                  onClick={regeneratePatientId}
                  className="px-2 py-1 text-xs bg-blue-200 hover:bg-blue-300 text-blue-800 rounded transition-colors"
                  title="Regenerate Patient ID"
                >
                  ↻
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg border border-yellow-300">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                <span className="font-medium">Generating Patient ID...</span>
              </div>
            </div>
          )}
          <div className="max-w-7xl mx-auto">
            <form className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Basic Info + Emergency Contact */}
                <div className="space-y-8">
                  {/* Basic Information Section */}
                  <div className="bg-white p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl text-gray-700 font-semibold mb-6 border-b border-blue-300 pb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Basic Information
                    </h3>
                    <div className="space-y-4">
                      {/* Name */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <User className="w-4 h-4 text-blue-600" /> Name:
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData[tabIndex].name || ''}
                          onChange={handleChange}
                          placeholder="Enter full name"
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      {/* NIC */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <IdCard className="w-4 h-4 text-blue-600" /> NIC:
                        </label>
                        <input
                          type="text"
                          name="nic"
                          value={formData[tabIndex].nic || ''}
                          onChange={handleChange}
                          placeholder="NIC no."
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      {/* Age */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Hash className="w-4 h-4 text-blue-600" /> Age:
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData[tabIndex].age || ''}
                          onChange={handleChange}
                          placeholder="Enter age"
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      {/* DOB */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-blue-600" /> Date of Birth:
                        </label>
                        <div className="relative">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={50}
                            showMonthDropdown
                            className="w-full p-3 pl-10 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                            placeholderText="Select Date"
                          />
                          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      {/* Gender */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-600" /> Gender:
                        </label>
                        <select 
                          name="gender"
                          value={formData[tabIndex].gender || ''}
                          onChange={handleChange}
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Emergency Contact Information */}
                  <div className="bg-white p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl text-gray-700 font-semibold mb-6 border-b border-blue-300 pb-2 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      Emergency Contact Information
                    </h3>
                    <div className="space-y-4">
                      {/* Emergency Contact Name */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <User className="w-4 h-4 text-blue-600" /> Name:
                        </label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={formData[tabIndex].emergencyContactName || ''}
                          onChange={handleChange}
                          placeholder="Emergency contact name"
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      {/* Relationship */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-600" /> Relationship:
                        </label>
                        <input
                          type="text"
                          name="emergencyContactRelationship"
                          value={formData[tabIndex].emergencyContactRelationship || ''}
                          onChange={handleChange}
                          placeholder="Relationship"
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      {/* Phone Number */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Phone className="w-4 h-4 text-blue-600" /> Phone Number:
                        </label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          value={formData[tabIndex].emergencyContactPhone || ''}
                          onChange={handleChange}
                          placeholder="Telephone number"
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        />
                      </div>
                      {/* Emergency Contact Gender */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-600" /> Gender:
                        </label>
                        <select 
                          name="emergencyContactGender"
                          value={formData[tabIndex].emergencyContactGender || ''}
                          onChange={handleChange}
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Contact Details + At Registration */}
                <div className="space-y-8">
                  {/* Contact Details Section */}
                  <div className="bg-white p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl text-gray-700 font-semibold mb-6 border-b border-blue-300 pb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      {/* Address */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-600" /> Address:
                        </label>
                        <textarea
                          name="address"
                          value={formData[tabIndex].address || ''}
                          onChange={handleChange}
                          placeholder="Enter address"
                          rows="3"
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                        />
                      </div>
                      {/* District */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-600" /> District:
                        </label>
                        <select 
                          name="district"
                          value={formData[tabIndex].district || ''}
                          onChange={handleChange}
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        >
                          <option value="">Select District</option>
                          <option value="colombo">Colombo</option>
                          <option value="rathnapura">Rathnapura</option>
                          <option value="kegalle">Kegalle</option>
                          <option value="kaluthara">Kaluthara</option>
                          <option value="kurunegala">Kurunegala</option>
                          <option value="galle">Galle</option>
                          <option value="mathara">Mathara</option>
                          <option value="jaffna">Jaffna</option>
                          <option value="vavniya">Vavniya</option>
                          <option value="nuwaraeliya">Nuwaraeliya</option>
                        </select>
                      </div>
                      {/* MOH area */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-600" /> MOH Area:
                        </label>
                        <select 
                          name="mohArea"
                          value={formData[tabIndex].mohArea || ''}
                          onChange={handleChange}
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        >
                          <option value="">Select MOH Area</option>
                          <option value="dehiowita">Dehiowita</option>
                          <option value="rathnapura">Rathnapura</option>
                          <option value="kegalle">Kegalle</option>
                          <option value="kaluthara">Kaluthara</option>
                          <option value="kurunegala">Kurunegala</option>
                          <option value="galle">Galle</option>
                          <option value="mathara">Mathara</option>
                          <option value="jaffna">Jaffna</option>
                          <option value="vavniya">Vavniya</option>
                          <option value="nuwaraeliya">Nuwaraeliya</option>
                        </select>
                      </div>
                      {/* PHM area */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-600" /> PHM Area:
                        </label>
                        <select 
                          name="phmArea"
                          value={formData[tabIndex].phmArea || ''}
                          onChange={handleChange}
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        >
                          <option value="">Select PHM Area</option>
                          <option value="dehiowita">Dehiowita</option>
                          <option value="rathnapura">Rathnapura</option>
                          <option value="kegalle">Kegalle</option>
                          <option value="kaluthara">Kaluthara</option>
                          <option value="kurunegala">Kurunegala</option>
                          <option value="galle">Galle</option>
                          <option value="mathara">Mathara</option>
                          <option value="jaffna">Jaffna</option>
                          <option value="vavniya">Vavniya</option>
                          <option value="nuwaraeliya">Nuwaraeliya</option>
                        </select>
                      </div>
                      {/* PHI area */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-600" /> PHI Area:
                        </label>
                        <select 
                          name="phiArea"
                          value={formData[tabIndex].phiArea || ''}
                          onChange={handleChange}
                          className="w-full p-3 text-gray-700 rounded-lg border border-gray-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                        >
                          <option value="">Select PHI Area</option>
                          <option value="dehiowita">Dehiowita</option>
                          <option value="rathnapura">Rathnapura</option>
                          <option value="kegalle">Kegalle</option>
                          <option value="kaluthara">Kaluthara</option>
                          <option value="kurunegala">Kurunegala</option>
                          <option value="galle">Galle</option>
                          <option value="mathara">Mathara</option>
                          <option value="jaffna">Jaffna</option>
                          <option value="vavniya">Vavniya</option>
                          <option value="nuwaraeliya">Nuwaraeliya</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* At Registration Section */}
                  <div className="bg-white p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl text-gray-700 font-semibold mb-6 border-b border-blue-300 pb-2 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-blue-600" />
                      At Registration
                    </h3>
                    <div className="space-y-6">
                      {/* Marital Status */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-600 mb-3 flex items-center gap-1">
                          <Users className="w-4 h-4 text-blue-600" /> Marital Status:
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {["Married", "Unmarried", "Widowed", "Separated"].map(
                            (status, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors"
                              >
                                <input
                                  type="radio"
                                  name="maritalStatus"
                                  id={`status-${index}`}
                                  value={status.toLowerCase()}
                                  checked={formData[tabIndex].maritalStatus === status.toLowerCase()}
                                  onChange={() => handleRadioChange('maritalStatus', status.toLowerCase())}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                                <label
                                  htmlFor={`status-${index}`}
                                  className="text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                  {status}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      {/* Education Level */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-600 mb-3 flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-blue-600" /> Highest Education Level:
                        </h4>
                        <div className="space-y-2">
                          {[
                            "No formal education",
                            "Grade 1-5",
                            "Grade 6-11",
                            "O/L",
                            "A/L",
                            "Diploma",
                            "Degree",
                          ].map((level, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg transition-colors"
                            >
                              <input
                                type="radio"
                                name="educationLevel"
                                id={`education-${index}`}
                                value={level.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                                checked={formData[tabIndex].educationLevel === level.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                                onChange={() => handleRadioChange('educationLevel', level.toLowerCase().replace(/[^a-z0-9]/g, '-'))}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                              />
                              <label
                                htmlFor={`education-${index}`}
                                className="text-sm font-medium text-gray-700 cursor-pointer"
                              >
                                {level}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex justify-center mt-12 space-x-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-8 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => Navigate("/dashboard")}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="px-8 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={clearForm}
                >
                  Clear Form
                </button>
                <button
                  type="button"
                  disabled={!patientId}
                  className={`px-8 py-3 font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                    patientId 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  onClick={handleNext}
                >
                  {patientId ? 'Next' : 'Generating ID...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PersonalDetails;