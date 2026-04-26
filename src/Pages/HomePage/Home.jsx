import AboutMe from "./AboutMe";
import AppointmentSection from "./AppointmentSection";
import HeroBanner from "./HeroBanner";
import VideoSection from "./VideoSection";
import TreatmentSection from "./TreatmentSection";
import FacebookSection from "./FacebookSection";

const Home = () => {
    return (
        <div>
          <HeroBanner></HeroBanner>
          <AboutMe></AboutMe>
          <TreatmentSection></TreatmentSection>
          <VideoSection></VideoSection>
          <FacebookSection></FacebookSection>
          <AppointmentSection></AppointmentSection>
        </div>
    );
};

export default Home;