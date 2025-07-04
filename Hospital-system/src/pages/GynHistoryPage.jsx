import React from "react";
import SideBar from "../functions/SideBar";
import { Baby, Calendar, User, FileText, AlertCircle, CheckCircle, ChevronLeft, ChevronRight, HeartPulse } from "lucide-react";

const GynHistoryPage = () => {
  const symptoms = [
    "Hot flushes",
    "Night sweats",
    "Tiredness",
    "Palpitations",
    "Anxiety",
    "Poor memory",
    "Urinary symptoms",
    "Isomnia",
    "Irritability",
  ];

  return (
    <SideBar>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-center flex items-center gap-2 justify-center text-black">
              <HeartPulse className="w-5 h-5 text-blue-600" />
              Obstetrics and Gynaecological History
            </h2>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT SECTION */}
              <div className="space-y-6 border border-gray-300 p-4 rounded-md shadow">
                {/* Consanguineous marriage */}
                <div>
                  <p className="font-medium mb-1 text-black flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    Consanguineous marriage:
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-black">
                      <input type="checkbox" className="accent-purple-600" />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-black">
                      <input type="checkbox" className="accent-purple-600" />
                      No
                    </label>
                  </div>
                </div>

                {/* Number of Pregnancies */}
                <div>
                  <label className="block font-medium mb-1 text-black flex items-center gap-2">
                    <Baby className="w-4 h-4 text-blue-600" />
                    Number of Pregnancies
                  </label>
                  <select className="w-full border border-gray-300 rounded px-3 py-1 text-black">
                    <option value="">Select count</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                {/* Results */}
                <div>
                  <label className="block font-medium mb-1 text-black flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Results of the pregnancies:
                  </label>

                  <div className="mb-3">
                    <label className="block text-sm mb-1 text-black">Live Births</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-1 text-black">
                      <option value="">Select count</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-1 text-black">Still Births</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-1 text-black">
                      <option value="">Select count</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-1 text-black">No. of living children</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-1 text-black">
                      <option value="">Select count</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm mb-1 text-black">Miscarriages</label>
                    <select className="w-full border border-gray-300 rounded px-3 py-1 text-black">
                      <option value="">Select count</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="space-y-6 border border-gray-300 p-4 rounded-md shadow">
                {/* Complications */}
                <div>
                  <p className="font-medium mb-2 text-black flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    Complications during each pregnancy (if present)
                  </p>
                  {["1st", "2nd", "3rd", "4th"].map((label) => (
                    <div key={label} className="mb-2">
                      <label className="block text-sm mb-1 text-black">{label} pregnancy:</label>
                      <input
                        type="text"
                        placeholder="Describe any complications"
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Age at Menopause */}
                <div>
                  <label className="block font-medium mb-1 text-black flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Age at Menopause
                  </label>
                  <select className="w-full border border-gray-300 rounded px-3 py-1 text-black">
                    <option value="">Select age</option>
                    {[...Array(30)].map((_, i) => (
                      <option key={i}>{35 + i}</option>
                    ))}
                  </select>
                </div>

                {/* Menopause Symptoms */}
                <div>
                  <p className="font-medium mb-2 text-black flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Symptoms:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {symptoms.map((symptom) => (
                      <label key={symptom} className="flex items-center gap-2 text-black">
                        <input type="checkbox" className="accent-purple-600" />
                        <span>{symptom}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-10">
              <button className="flex items-center gap-2 bg-gray-500 px-6 py-2 rounded text-white hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg">
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button className="flex items-center gap-2 bg-blue-600 px-6 py-2 rounded text-white hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Add
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default GynHistoryPage;
