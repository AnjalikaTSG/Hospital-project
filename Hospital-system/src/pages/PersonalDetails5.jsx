import "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@material-tailwind/react";

const PersonalDetails5 = () => {
  const Navigate = useNavigate();

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
      <div>
        <h2 className="text-xl text-gray-500 font-bold text-center mt-2 ml-2 mb-2">
          Register patients
        </h2>
        <div className="">
          <form className="px-8 pb-8">
            <div className="flex flex-wrap md:flex-nowrap gap-5">
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                  Basic information This should be change
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
                  <label className="text-sm font-medium text-gray-500">
                    Age:
                  </label>
                  <select className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                    {Array.from({ length: 66 }, (_, i) => i + 35).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Weight:
                  </label>
                  <select className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                    {Array.from({ length: 96 }, (_, i) => i + 25).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    BMI:
                  </label>
                  <select className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                  <option>Below 18.5</option>
                  <option>18.5 - 24.9</option>
                  <option>25 - 29.9</option>
                  <option>30 - 34.9</option>
                  <option>35 - 39.9</option>
                  <option>Above 40</option>
                </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                  Ideal body weight:
                  </label>
                  <select className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                    {Array.from({ length: 51 }, (_, i) => i + 50).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                  Waist circumference(cm):
                  </label>
                  <select className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                    {Array.from({ length: 61 }, (_, i) => i + 70).map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
                 
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Waist:Height Ratio:
                  </label>
                  <input
                    type="text"
                    placeholder="Ideal body weight"
                    className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 mb-1 space-y-4">
                <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                  Topic should be change
                </h3>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Blood pressure:
                  </label>
                  <input
                    type="text"
                    placeholder="Blood pressure"
                    className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <label className="text-sm text-gray-500">
                    Oral examination:
                  </label>
                  <div className="flex flex-col ml-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        color="gray"
                        className="border border-gray-500"
                      />
                      <span className="text-sm text-gray-500">Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        color="gray"
                        className="border border-gray-500"
                      />
                      <span className="text-sm text-gray-500">Abnormal</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="text-sm text-gray-500">
                    Breast Examination:
                  </label>
                  <div className="flex flex-col ml-2">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        color="gray"
                        className="border border-gray-500"
                      />
                      <span className="text-sm text-gray-500">Normal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        color="gray"
                        className="border border-gray-500"
                      />
                      <span className="text-sm text-gray-500">Abnormal</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-500">
                    Distant Vision:
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-500">
                      L:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-500">
                      R:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-4">
              <button
                className="w-full md:w-1/7 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
                onClick={() => Navigate("/dashboard")}
              >
                Back
              </button>
              <button
                className="w-full md:w-1/7 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-gray-500 transition-all"
                onClick={() => Navigate("/personalDetails2")}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails5;
