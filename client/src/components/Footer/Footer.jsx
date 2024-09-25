import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ResumeBuilder</h3>
              <p className="text-gray-400">Create professional resumes in minutes.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="#features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link to="#templates" className="text-gray-400 hover:text-white">Templates</Link></li>
                <li><Link to="#pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">support@resumebuilder.com</p>
              <p className="text-gray-400">1-800-RESUME</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 ResumeBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
