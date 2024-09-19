import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        // Perform logout action, e.g., clear user session or redirect
        console.log('User logged out');
        // Optionally redirect or update state
    };


    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Navbar Brand */}
                    <div className="text-xl font-bold">
                        <Link to="/" className="text-gray-800">
                            ResuMATCH
                        </Link>
                    </div>

                    {/* Links */}
                    <div className="flex items-center relative">
                        <Link to="/pricing" className="text-gray-600 hover:text-blue-500 mx-6 font-bold"> {/* Increased margin here */}
                            Pricing
                        </Link>

                        {/* User Image Placeholder */}
                        <div
                            className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
                            onMouseOver={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <img
                                src="https://via.placeholder.com/40" // Placeholder image
                                alt="User"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div
                                className="absolute right-0 top-10 md:top-8 md:left-20 mt-2 w-48 bg-white shadow-lg rounded-md z-10"
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
            </div>
        </nav>
    );
};

export default Navbar;


// todo tasks
// Redux js setup
// Auth frontend
// -form
// -google
// Add a loader after form submission
// Design database schema
// -user


// added login form, added loader, redirect page, navbar. footer