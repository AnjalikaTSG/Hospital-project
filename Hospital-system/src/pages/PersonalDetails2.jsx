import "react";
import { Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PersonalDetails2 = () => {
const Navigate = useNavigate();

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
              <div className="w-full md:w-1/2">
                <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                  Emergency contact information
                </h3>
                <div className="flex items-center space-x-2 mt-2.5">
                  <label className="text-sm font-medium text-gray-500">
                    Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Relationship:
                  </label>
                  <input
                    type="text"
                    placeholder="NIC no."
                    className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mt-1.5"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    TP no:
                  </label>
                  <input
                    type="text"
                    placeholder="Age"
                    className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mt-1.5"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-500">
                    Gender:
                  </label>
                  <select className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 mt-1.5">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="w-full md:w-1/2 mb-1">
                <div>
                  <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                    At registrition
                  </h3>
                  <div className="flex flex-col">
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Married"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Unmarried"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Widowed"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Seperated"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                    Highest education level
                  </h3>
                  <div className="flex flex-col space-y-1">
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="No formal education"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Grade 1-5"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Grade 6-11"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="O/L"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="A/L"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Diploma"
                    />
                    <Checkbox
                      color="gray"
                      Checked
                      className="border border-gray-500 -mt-2"
                      label="Degree"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-4">
              <button className="w-full md:w-1/5 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
              onClick={()=>Navigate("/personalDetails")}
              >
                Back
              </button>
              <button className="w-full md:w-1/5 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-700 transition-all"
              onClick={()=>Navigate("/personalDetails3")}
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

export default PersonalDetails2;
