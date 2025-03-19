import "react";
import { Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const RefferedTo = () => {

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
      <div className="flex flex-col ml-2 -mb-0.5 w-full">
        <h2 className="text-xl text-gray-500 font-bold text-center mt-1.5 ml-2 mb-2">
          Register patients
        </h2>
        <div className=" justify-center">
          <div className="w-full md:w-1/2 mb-1 ml-50">
            <div className="">
              <h3 className="text-xl text-gray-500 font-semibold text-left ml-1.5">
                Referred to:
              </h3>
              <div className="flex flex-col ml-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                      color="gray"
                      className="border border-gray-500"
                    />
                  <span className="text-sm text-gray-500">Medical Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                      color="gray"
                      className="border border-gray-500"
                    />
                  <span className="text-sm text-gray-500">Specialist Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                      color="gray"
                      className="border border-gray-500"
                    />
                  <span className="text-sm text-gray-500">Well women clinic</span>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                      color="gray"
                      className="border border-gray-500"
                    />
                  <span className="text-sm text-gray-500">Dental Clinic</span>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                      color="gray"
                      className="border border-gray-500"
                    />
                  <span className="text-sm text-red-500">Add here</span>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                      color="gray"
                      className="border border-gray-500"
                    />
                  <span className="text-sm text-red-500">Add here</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 space-x-4">
          <button className="w-full md:w-1/7 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
          onClick={()=>Navigate("/personalDetails3")}
          >
            Back
          </button>
          <button className="w-full md:w-1/7 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-700 transition-all">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefferedTo;
