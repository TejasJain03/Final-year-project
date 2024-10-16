import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faCrown,
  faArrowRight,
  faBriefcase,
  faMapMarkerAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { COUNTRIES } from "../../assets/constants";
import axios from "../../utils/axiosConfig";
import apiHandler from "../../utils/apiHandler";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const navigate = useNavigate();
  const userInfo = {
    userName: "Jane Doe",
    email: "jane.doe@example.com",
    profileImage:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    premiumPlan: "Pro",
    info: {
      domain: "Software Developer",
      linkedin: "https://www.linkedin.com/in/janedoe",
      github: "https://github.com/janedoe",
      phoneNumber: "+1 (555) 123-4567",
      city: "San Francisco",
      state: "California",
      country: "United States",
    },
  };
  const [user, setUser] = useState(userInfo);
  const [countries] = useState(Object.keys(COUNTRIES));
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      // Remove non-numeric characters and update state
      const numericValue = value.replace(/\D/g, '');
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(()=>{
    apiHandler(async ()=>{
      const response = await axios.get('/user/get-user');
      if(response.data.success) {
        const {user} = response.data;
        setUser(user);
        setFormData(user.info);
        toast.success(response.data.message);
      }
    }, navigate)();
  }, []);

  const updateUserApi = async () => {
    const response = await axios.put('/user/update-user', formData);
    if(response.data.success) {
      const {userInfo} = response.data;
      setUser(prevUser => ({
        ...prevUser,
        info: userInfo
      }));
      setFormData(userInfo);
      toast.success(response.data.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    apiHandler(updateUserApi, navigate)();
    setIsModalOpen(false);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      state: "",
      city: "",
    }));
    setStates(Object.keys(COUNTRIES[selectedCountry].states));
    setCities([]); // Reset city dropdown
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({ ...prev, state: selectedState, city: "" }));
    setCities(COUNTRIES[formData.country].states[selectedState]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-full w-auto object-cover md:w-48"
            src={user.profileImage}
            alt={user.userName}
          />
        </div>
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Profile
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.userName}</h1>
          <p className="text-xl text-gray-600 mb-4 flex items-center">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="mr-2 text-indigo-500"
            />
            {user.info.domain===""? "Not mentioned": user.info.domain}
          </p>
          <div className="space-y-4">
            <a
              href={`mailto:${user.email}`}
              className="flex items-center text-gray-600"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-indigo-500"
              />
              {user.email}
            </a>
            {/* yet to update in models and controllers and UI */}
            {user.premiumPlan ? (
              <div className="flex items-center text-green-600">
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                <span className="font-semibold">{user.premiumPlan} Plan</span>
              </div>
            ) : (
              <Link
                to="/pricing"
                className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
              >
                <span className="flex items-center">
                  Upgrade to Premium
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            My Information
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
            Edit Details
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-indigo-500"
                  />
                  {user.info.city || user.info.state || user.info.country
                    ? `${user.info.city}, ${user.info.state}, ${user.info.country}`
                    : "Not mentioned"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 flex items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="mr-2 text-indigo-500"
                  />
                  {user.info.phoneNumber ? user.info.phoneNumber : "Not mentioned"}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">GitHub</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.info.github ? (
                    <a
                      href={user.info.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-900"
                    >
                      <FontAwesomeIcon icon={faGithub} className="mr-2" />
                      {user.info.github.split("//")[1]}
                    </a>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <FontAwesomeIcon icon={faGithub} className="mr-2" />
                      Not mentioned
                    </span>
                  )}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user.info.linkedin ? (
                    <a
                      href={user.info.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-900"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                      {user.info.linkedin.split("//")[1]}
                    </a>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
                      Not mentioned
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Resume Overview Section */}
      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resume Overview
        </h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Resume Statistics
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Total Resumes
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  3
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  July 1, 2023
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  24
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Edit Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Contact Details
              </h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    htmlFor="domain"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Domain
                  </label>
                  <input
                    type="text"
                    name="domain"
                    id="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleCountryChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value={user.info.country}>
                      {user.info.country}
                    </option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <select
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled={!formData.country}
                  >
                    <option value={user.info.state}>
                      {user.info.state}
                    </option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <select
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled={!formData.state}
                  >
                    <option value={user.info.city}>
                      {user.info.city}
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    id="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
