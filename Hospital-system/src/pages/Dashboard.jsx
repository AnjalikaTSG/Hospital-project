import 'react'
import LogoImg from '../assets/logo.png'
import docImg from '../assets/doctor.png'
import nurImg from '../assets/nurse.png'
import pharImg from '../assets/phar.png'
import patImg from '../assets/patient.png'
import labImg from '../assets/lab.png'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="dashImage bg-cover bg-no-repeat bg-center min-h-screen flex-col md:flex-row items-start justify-start px-4">
        <div className='flex bg-blue-500 h-1/4'>
            <div className='justify-left ml-5'>
                <img src={LogoImg} alt="hospital" className="w-10 h-10 mt-3.5" />
            </div>
            <div className="flex items-center justify-center">
                <h1 className="text-xl font-semibold text-white text-center ml-10">Patient checkup management system - Base Hospital - Avissawella</h1>
            </div>
            <div className="relative w-64 ml-25 mt-2.5">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
                >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
                </svg>

                <input
                type="text"
                className="pl-10 pr-4 py-2 bg-blue-300 hover:bg-blue-400 text-white font-semibold rounded-full w-full focus:outline-none"
                placeholder="Search"
                />
            </div>
            <div>
                <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white mt-2 ml-35">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                    >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                    </svg>
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white mt-1.5">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-9 h-9 ml-2"
                    >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    </svg>
                </button>
            </div>
        </div>

        <div className="flex flex-grow">
  {/* Sidebar */}
  <div className="w-64 bg-blue-400 flex flex-col divide-y divide-blue-300 text-white" style={{ height: 'calc(100vh - 56px)' }}>
    {[
      { label: 'Home', path: '/dashboard' },
      { label: 'Patient Registration & Book Issuance', path: '/personalDetails' },
      { label: 'Patient Records' },
      { label: 'Reports & Alerts' },
      { label: 'Departments/Clinics' },
      { label: 'Other' },
    ].map((item, index) => (
      <div
        key={index}
        className="flex-1 flex items-center justify-start px-4 hover:bg-blue-600 active:bg-blue-300"
        style={{ height: 'calc(100% / 6)' }} // Ensures each item takes up 1/6th of the remaining space
      >
        {item.path ? (
          <Link to={item.path} className="w-full">
            {item.label}
          </Link>
        ) : (
          <span>{item.label}</span>
        )}
      </div>
    ))}
  </div>


            <div>
                <div className="flex justify-center mt-15 space-x-6 ml-22">
                    <button className="w-60 h-50 bg-blue-100 border border-black px-4 py-4 text-sm text-black uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600 text-center">
                        <img src={docImg} alt="Doctor" className="w-15 h-15 block mx-auto mb-1" />
                            Doctor
                        <p>54</p>
                    </button>
                    <button className="w-60 h-50 bg-blue-100 border border-black px-4 py-4 text-sm text-black uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600 text-center ml-10">
                        <img src={nurImg} alt="Doctor" className="w-22 h-22 block mx-auto mb-1" />
                            Nurses
                        <p>152</p>
                    </button>
                    <button className="w-60 h-50 bg-blue-100 border border-black px-4 py-4 text-sm text-black uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600 text-center ml-10">
                        <img src={pharImg} alt="Doctor" className="w-15 h-17 block mx-auto mb-1" />
                            Pharmacists
                        <p>50</p>
                    </button>
                </div>
                <div className="flex justify-center mt-20 space-x-6 ml-22">
                <button className="w-60 h-50 bg-blue-100 border border-black px-4 py-4 text-sm text-black uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600 text-center">
                        <img src={patImg} alt="Doctor" className="w-15 h-15 block mx-auto mb-1" />
                            Patients
                        <p>2542</p>
                    </button>
                    <button className="w-60 h-50 bg-blue-100 border border-black px-4 py-4 text-sm text-black uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600 text-center ml-10">
                        <img src={labImg} alt="Doctor" className="w-15 h-15 block mx-auto mb-1" />
                            Labortorsts
                        <p>42</p>
                    </button>
                    <button className="w-60 h-50 bg-blue-100 border border-black px-4 py-4 text-sm text-black uppercase font-medium rounded-lg cursor-pointer hover:bg-blue-600 text-center ml-10">
                        <img src={docImg} alt="Doctor" className="w-15 h-15 block mx-auto mb-1" />
                            Extra
                        <p>230</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
