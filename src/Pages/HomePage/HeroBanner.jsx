import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    type: "profile",
    image: "doctor.jpg",
    profileImage: "dp.png" ,
    title: "Dr. ASM Tanjilur Rahman",
    subtitle: "Surgeon",
    description:
      "Specialist in advanced surgery with years of experience in minimally invasive procedures, patient-focused care, and modern surgical techniques.",
  },
  {
    id: 2,
    type: "image",
    image: "slide1.jpg",
    title: "Cutting Edge Technology",
    description:
      "We employ the latest minimally invasive and laparoscopic techniques for better outcomes.",
  },
  {
    id: 3,
    type: "image",
    image: "slide2.jpg",
    title: "Patient-Centered Care",
    description:
      "Every treatment plan is designed around comfort, safety, and recovery.",
  },
  {
    id: 4,
    type: "image",
    image: "slide3.jpg",
    title: "Trusted Surgical Expertise",
    description:
      "Years of experience with a strong commitment to excellence and precision.",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, []);

//   const goToSlide = (index) => setCurrent(index);
//   const prevSlide = () =>
//     setCurrent((current - 1 + slides.length) % slides.length);
//   const nextSlide = () =>
//     setCurrent((current + 1) % slides.length);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="w-full h-full bg-black/60 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                {slide.type === "profile" ? (
                  /* PROFILE SLIDE */
                  <div className="grid md:grid-cols-2 gap-8 items-center text-white">
                    <img
                      src={slide.profileImage}
                      alt="Doctor"
                      className="w-64 h-64 object-cover rounded-full border-4 border-white mx-auto md:mx-0"
                    />
                    <div>
                      <h1 className="text-3xl md:text-5xl font-bold">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl md:text-2xl text-secondary mt-2">
                        {slide.subtitle}
                      </h2>
                      <p className="mt-4 text-gray-200 max-w-xl">
                        {slide.description}
                      </p>
                      <button className="btn btn-primary mt-6">
                        Book Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  /* IMAGE SLIDES */
                  <div className="text-center text-white max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-gray-200">
                      {slide.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      {/* <button
        onClick={prevSlide}
        className="btn btn-circle absolute left-4 top-1/2 -translate-y-1/2 z-20
             opacity-0 group-hover:opacity-100
             transition-opacity duration-300
             active:scale-100 transform-none"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="btn btn-circle absolute right-4 top-1/2 -translate-y-1/2 z-20
             opacity-0 group-hover:opacity-100
             transition-opacity duration-300
             active:scale-100 transform-none"
      >
        ❯
      </button> */}

      {/* Dots */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
