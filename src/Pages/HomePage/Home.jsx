import AboutMe from "./AboutMe";
import AppointmentSection from "./AppointmentSection";
import HeroBanner from "./HeroBanner";
import TreatmentSection from "./TreatmentSection";

const Home = () => {
    return (
        <div>
          <HeroBanner></HeroBanner>
          <AboutMe></AboutMe>
          <TreatmentSection></TreatmentSection>
          <AppointmentSection></AppointmentSection>
        </div>
    );
};

export default Home;