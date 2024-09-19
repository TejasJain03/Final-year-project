const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row justify-between">
                    {/* Left Section */}
                    <div className="flex flex-col space-y-2 mb-4 sm:mb-0">
                        <h3 className="font-semibold text-lg">Links</h3>
                        <a href="#about" className="text-gray-400 hover:text-white">About Us</a>
                        <a href="#terms" className="text-gray-400 hover:text-white">Terms and Conditions</a>
                        <a href="#privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-semibold text-lg">Contact</h3>
                        <a href="tel:+8088969743" className="text-gray-400 hover:text-white">Phone: +91 80889 69743</a>
                        <a href="mailto:19516uttam@gmail.com" className="text-gray-400 hover:text-white">Email: 19516uttam@gmail.com</a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Contribution of MATTU. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
