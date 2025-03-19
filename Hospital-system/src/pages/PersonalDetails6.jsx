import "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@material-tailwind/react";

const PersonalDetails6 = () => {
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
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-500">
                    Hearing:
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
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Peak Exploratory Flow Rate(PEFR):
                  </label>
                  <input
                    type="text"
                    placeholder="Peak Exploratory Flow Rate"
                    className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-500">
                    Blood sugar value:
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-500">
                      Random:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-500">
                      Fasting:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 mb-1 space-y-4">
                <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                  Topic should be change
                </h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-500">
                    PAP smear report:
                  </label>
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
                      Report:
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Serum Creatinine:
                  </label>
                  <input
                    type="text"
                    placeholder="Serum Creatinine"
                    className="w-half p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-500">
                    Lipid profile:
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-500">
                        TC:
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-500">
                        LDL:
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-500">
                        TG:
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-500">
                        TC:HDL:
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-500">
                        HDL:
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      />
                    </div>
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

export default PersonalDetails6;
