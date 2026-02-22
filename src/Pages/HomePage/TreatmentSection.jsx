import React, { useEffect, useState } from "react";
import axios from "axios";
import TreatmentCard from "./TreatmentCard";

const TreatmentSection = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchTreatments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/treatments");

      if (Array.isArray(res.data)) {
        setTreatments(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setTreatments([]);
      }
    } catch (error) {
      console.error(error);
      setTreatments([]);
    }
  };

  fetchTreatments();
}, []); 

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Center Of Excellence
          </h2>
          <p className="text-secondary max-w-3xl mx-auto">
            Our physicians specialize in specific areas of orthopedic and
            neurosurgical care.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-white">Loading treatments...</div>
        )}

        {/* Grid */}
        <div className="grid gap-6 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4">
          {treatments.map((treatment) => (
            <TreatmentCard
              key={treatment._id}
              treatment={treatment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;