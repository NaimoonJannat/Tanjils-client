import React from "react";

const AppointmentSection = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-16 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-700"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center text-white">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Schedule Your Appointment Today
          </h2>

          <p className="text-lg opacity-90 mb-8">
            Call directly to book a consultation with 
            <span className="font-semibold"> Dr. ASM Tanjilur Rahman</span>.
            Fast response and priority scheduling available.
          </p>

          <div className="space-y-4 mb-8">
            <a
              href="tel:01608058416"
              className="block text-xl font-semibold hover:text-blue-200 transition"
            >
              📞 01608 058 416
            </a>

            <a
              href="tel:017XXXXXXXX"
              className="block text-xl font-semibold hover:text-blue-200 transition"
            >
              📞 017XX XXX XXX
            </a>
          </div>

          <a
            href="tel:01608058416"
            className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Make an Appointment
          </a>
        </div>

        {/* RIGHT SIDE - ANIMATED PHONE */}
        <div className="flex justify-center md:justify-end">
          <div className="relative phone-container">
            
            {/* Phone Body */}
            <div className="w-64 h-[500px] bg-gray-900 rounded-[40px] p-4 shadow-2xl relative overflow-hidden">
              
              <div className="w-full h-full bg-white rounded-[30px] flex flex-col items-center justify-center relative">
                
                <h4 className="text-primary font-semibold mb-6">
                  Book Appointment
                </h4>

                <button className="phone-button bg-primary text-white px-6 py-3 rounded-full shadow-md">
                  Call Now
                </button>

                {/* Dial Pulse */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="dial-pulse w-40 h-40 bg-primary/20 rounded-full"></div>
                </div>

              </div>
            </div>

            {/* Animated Hand */}
            <div className="hand absolute bottom-10 right-2">
              👆
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;