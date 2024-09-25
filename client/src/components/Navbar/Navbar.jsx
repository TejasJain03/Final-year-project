import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State for mobile menu

  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ResuMATCH
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link to="/templates" className="text-gray-600 hover:text-blue-600">
            Templates
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-blue-600">
            Pricing
          </Link>
          <div className="user-icon relative">
            <div
              className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
              onMouseOver={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute left-0 top-8 mt-2 w-40 bg-white shadow-lg rounded-md z-10"
                onMouseOver={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <Link
                  to="/profile"
                  className="flex items-center p-2 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 w-full text-left text-red-700 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-start space-y-2 p-4">
            <Link
              to="/features"
              className="text-gray-600 hover:text-blue-600 w-full"
              onClick={() => setShowMobileMenu(false)}
            >
              Features
            </Link>
            <Link
              to="/templates"
              className="text-gray-600 hover:text-blue-600 w-full"
              onClick={() => setShowMobileMenu(false)}
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-blue-600 w-full"
              onClick={() => setShowMobileMenu(false)}
            >
              Pricing
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600 w-full"
              onClick={() => setShowMobileMenu(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-700 hover:text-red-600 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
