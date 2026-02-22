import React from "react";

const AboutMe = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-16 overflow-hidden bg-white">
      
      {/* Background Accent Shape */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Image Section */}
        <div className="flex justify-center md:justify-start">
         {/* Image Section */}
{/* Image Section */}

<div className="flex justify-center md:justify-start">
  <div
    className="relative perspective-[1200px]"
    onMouseMove={(e) => {
      const card = e.currentTarget.querySelector(".tilt-card");
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }}
    onMouseLeave={(e) => {
      const card = e.currentTarget.querySelector(".tilt-card");
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }}
  >
    <div className="tilt-card transition-all duration-300 ease-out relative">
      
      {/* Rotated Gradient Background Layer (previous design restored) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-300 
                      rounded-[40px] rotate-3"></div>
      
      <img
        src="/dp.png"
        alt="Dr ASM Tanjilur Rahman"
        className="relative w-80 md:w-[420px] rounded-[40px] shadow-2xl 
                   object-cover border-8 border-white"
      />

      {/* Experience Badge (same as before) */}
      <div className="absolute -bottom-6 -right-6 bg-white shadow-xl 
                      rounded-2xl px-6 py-4 backdrop-blur-md">
        <h4 className="text-primary font-bold text-xl">15+ Years</h4>
        <p className="text-sm text-gray-500">Surgical Excellence</p>
      </div>

    </div>
  </div>
</div>
        </div>

        {/* Text Section */}
        <div className="relative">
          
          {/* Vertical Accent Line */}
          <div className="absolute -left-6 top-2 w-1 h-20 bg-primary rounded-full hidden md:block"></div>

          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            About <span className="text-black">Dr. ASM Tanjilur Rahman</span>
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            Dr. ASM Tanjilur Rahman is a highly accomplished surgeon 
            specializing in advanced laparoscopic and minimally invasive 
            procedures. With a deep commitment to precision, safety, and 
            patient-centered care, he has built a reputation for excellence 
            in complex gastrointestinal and general surgical treatments.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            Combining modern surgical techniques with compassionate 
            consultation, he ensures each patient receives a tailored 
            treatment plan designed for optimal recovery and long-term 
            wellness.
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-md border border-gray-100 shadow-md rounded-xl p-4">
              <h4 className="text-primary font-semibold">5000+</h4>
              <p className="text-sm text-gray-500">Successful Surgeries</p>
            </div>
            <div className="bg-white/60 backdrop-blur-md border border-gray-100 shadow-md rounded-xl p-4">
              <h4 className="text-primary font-semibold">Advanced</h4>
              <p className="text-sm text-gray-500">Minimally Invasive Care</p>
            </div>
          </div>

          <button className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Book Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;