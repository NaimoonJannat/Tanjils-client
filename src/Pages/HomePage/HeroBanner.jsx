import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    type: "profile",
    image: "doctor.jpg",
    profileImage: "dp.png",
    title: "Dr. ASM Tanjilur Rahman",
    subtitle: "FCPS (Surgery) | FMAS (India) | Laparoscopic & Laser Surgeon",
    description:
      "Assistant Professor of Surgery at Faridpur Medical College with fellowship training in laparoscopic colorectal & hernia surgery. Expert in laser, advanced laparoscopic, and cancer surgeries, providing patient-centered, minimally invasive care.",
  },
  {
    id: 2,
    type: "image",
    image: "slide1.jpg",
    title: "Advanced Laparoscopic Surgery",
    description:
      "Specialized in gall bladder, appendix, and hernia surgeries (male & female) using modern minimally invasive techniques for faster recovery and less pain.",
  },
  {
    id: 3,
    type: "image",
    image: "slide2.jpg",
    title: "Laser Treatment Expertise",
    description:
      "Expert care for piles, anal fissure, and anal fistula with state-of-the-art laser technology, ensuring precise treatment and improved patient comfort.",
  },
  {
    id: 4,
    type: "image",
    image: "slide3.jpg",
    title: "Comprehensive Cancer Surgery",
    description:
      "Providing advanced surgical care for breast, abdominal, colon, and rectal cancers with focus on safety, precision, and optimal long-term outcomes.",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] md:h-[95vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background */}
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient overlay */}
            <div className="w-full h-full bg-gradient-to-b from-black/60 to-black/30 flex items-center">
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                {slide.type === "profile" ? (
                  <div className="grid md:grid-cols-2 gap-8 items-center text-white">
                    {/* Profile Image */}
                    <img
                      src={slide.profileImage}
                      alt="Doctor"
                      className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-2xl mx-auto md:mx-0 animate-fadeIn"
                    />

                    {/* Text */}
                    <div className="text-center md:text-left space-y-4 animate-fadeSlideUp">
                      <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
                      <h2 className="text-xl md:text-2xl text-secondary">{slide.subtitle}</h2>
                      <p className="text-gray-200 max-w-lg">{slide.description}</p>
                      <button className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center text-white max-w-3xl mx-auto space-y-4 animate-fadeSlideUp">
                    <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
                    <p className="text-gray-200">{slide.description}</p>
                    <button className="bg-primary text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Optional Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              idx === current ? "bg-primary scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}