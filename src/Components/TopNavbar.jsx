import { FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const TopNavbar = () => {
  return (
    <div className="w-full bg-secondary text-primary text-sm h-8 flex items-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 w-full">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <FaFacebookF className="cursor-pointer hover:text-gray-200" />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-white" />
            <span>01608058416</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-white" />
            <span>info@drgolammustafa.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
