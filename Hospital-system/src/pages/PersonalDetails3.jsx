import React from "react";
import { Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PersonalDetails3 = () => {
  const navigate = useNavigate();

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
              Currently medication
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
                <h3 className="text-xl text-gray-500 font-semibold text-left">
                  Risk Behavioral History
                </h3>
                <div className="flex flex-col">
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Physical Activity:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Non-active</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Tobacco smoking:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                         
                        />
                        <span className="text-sm text-gray-500">Active</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Non-active</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Betel chewing:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                         
                        />
                        <span className="text-sm text-gray-500">User</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Non-user</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Other tobacco or arecanut preparations use:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">User</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                         
                        />
                        <span className="text-sm text-gray-500">Non-user</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 mb-1">
                <div className="flex flex-col">
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Alcohol consumption:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">User</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Non-user</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Other substance use:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">User</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Non-user</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-sm text-gray-500">
                      Unhealthy snacks intake:
                    </label>
                    <div className="flex flex-col ml-2">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">Non-consumer</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">{"<= 5 times/week"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="gray"
                          className="border border-gray-500"
                          
                        />
                        <span className="text-sm text-gray-500">{"= 5 times/week"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5 space-x-4">
              <button
                className="w-full md:w-1/7 bg-blue-400 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-600 transition-all"
                onClick={() => navigate("/personalDetails2")}
              >
                Back
              </button>
              <button className="w-full md:w-1/7 bg-blue-500 p-4 text-sm text-white uppercase rounded-2xl cursor-pointer hover:bg-blue-700 transition-all">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails3;
