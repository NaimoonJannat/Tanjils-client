import React from "react";
import { useNavigate } from "react-router";


const TreatmentCard = ({ treatment }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/treatments/${treatment.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
    >
      {/* Background Image */}
      <img
        src={treatment.image}
        alt={treatment.title}
        className="w-full h-64 object-cover 
                   transform group-hover:scale-110 
                   transition duration-500 ease-in-out"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 
                      group-hover:bg-black/70 
                      transition duration-300" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-xl md:text-2xl font-medium text-center px-4">
          {treatment.title}
        </h3>
      </div>
    </div>
  );
};

export default TreatmentCard;