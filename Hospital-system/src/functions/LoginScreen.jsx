import 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
    const Navigate = useNavigate();

    return (
        <div className="div1 bg-cover bg-no-repeat bg-center min-h-screen flex flex-col md:flex-row items-center justify-center px-4">
            {/* Form Section */}
            <div className="bg-white p-6 md:p-10 w-full max-w-sm md:max-w-lg lg:max-w-xl shadow-lg ml-20"> 
                <div className="mb-5 text-center md:text-left text-gray-500">
                    <h1 className="text-2xl font-bold">Login</h1>
                </div>
                <form>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-500">Username:</label>
                        <input
                            type="text"
                            className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-500">Password:</label>
                        <input
                            type="password"
                            className="w-full p-3 text-gray-500 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex justify-center mt-5">
                    <button className="w-full md:w-2/3 bg-blue-500 p-4 text-sm text-white uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600"
                    onClick={()=>Navigate("/dashboard")}
                    >
                        Login
                    </button>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-gray-500 inline">Do not have an account?</p>
                        <Link to="/registerScreen" className="text-blue-500 hover:text-blue-800 focus:text-purple-800 inline ml-1">Register</Link>
                    </div>
                </form>
            </div>
            
            {/* Image Section (Hidden on small screens) */}
            <div className="logImage bg-cover bg-no-repeat hidden md:block w-1/3 h-96 mr-20"></div>
        </div>
    );
};

export default LoginScreen;
