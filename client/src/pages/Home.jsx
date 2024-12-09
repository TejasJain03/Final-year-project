/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faEdit,
  faEnvelope,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import template1 from "../assets/templates/template1.jpg";
import resumeCollage from "../assets/templates/resume-collage.jpg";
import axios from '../utils/axiosConfig';
import apiHandler from '../utils/apiHandler';
import { toast } from "react-toastify";

export default function LandingPage() {
  const navigate = useNavigate();
  const templates = [
    template1,
  ];

  const checkAuth = () => {
    apiHandler(async()=>{
      const response = await axios.get('/auth/check-auth');
      if(response.data.success) {
        toast.success(response.data.message);
      }
    }, navigate)();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-20">
          <div
            className="landing-pic absolute inset-0 z-0"
            style={{
              backgroundImage:
                'url("https://wallpaperaccess.com/full/3851200.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "0.2",
            }}
          ></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Create Your Perfect Resume
              </h1>
              <p className="text-xl mb-8">
                Stand out from the crowd with a professionally designed resume
                in minutes.
              </p>
              <Link
                to="/build"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="text-blue-600 h-12 w-12 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Professional Templates
                </h3>
                <p className="text-gray-600">
                  Choose from a variety of ATS-friendly templates designed by
                  experts.
                </p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-blue-600 h-12 w-12 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Easy Customization
                </h3>
                <p className="text-gray-600">
                  Personalize your resume with our intuitive drag-and-drop
                  editor.
                </p>
              </div>
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-blue-600 h-12 w-12 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Email Delivery</h3>
                <p className="text-gray-600">
                  Receive your professionally crafted resume directly in your email inbox.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section id="templates" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Templates
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {templates.map((i, index) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  <div style={{ height: "300px" }}>
                    <img
                      src={i}
                      alt={`Template ${i}`}
                      className="h-full w-auto mx-auto"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">Professional</h3>
                    <p className="text-gray-600 mb-4">
                      A professional template suitable for various industries.
                    </p>
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
                <div style={{ height: "300px" }} className="flex items-center justify-center bg-gray-100">
                  <img src={resumeCollage} alt="resume collage" className="h-full w-auto mx-auto"/>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">More Templates</h3>
                  <p className="text-gray-600 mb-4">
                    Explore our full collection of professional resume templates.
                  </p>
                  <Link
                    to="/templates"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    View All Templates
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of job seekers who have successfully received their professionally crafted resumes and landed their dream jobs.
            </p>
            <button
              onClick={checkAuth}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
            >
              Sign Up Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
