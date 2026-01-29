import React from 'react';

const Navbar2 = () => {
    return (
       <div className="w-full bg-gray-900 bg-opacity-60 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Doctor Logo"
            className="w-10 h-10"
          />

          <div>
            <h1 className="text-2xl font-bold">
              Dr ASM Tanjilur Rahman
            </h1>
            <p className="text-sm text-red-400 uppercase tracking-wide">
              Surgeon
            </p>
          </div>
        </div>

        {/* Menu Links */}
        <ul className="flex gap-8 font-medium text-lg">
          <li className="hover:text-secondary cursor-pointer">Home</li>
          <li className="hover:text-secondary cursor-pointer">About</li>
          <li className="hover:text-secondary cursor-pointer">Service</li>
          <li className="hover:text-secondary cursor-pointer">
            Appointments
          </li>
        </ul>
      </div>
    </div>
    );
};

export default Navbar2;