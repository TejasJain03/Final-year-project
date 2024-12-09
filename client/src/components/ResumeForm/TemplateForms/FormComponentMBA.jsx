import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faGraduationCap,
  faCode,
  faBriefcase,
  faCertificate,
  faHeart,
  faProjectDiagram,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { roles } from "../../../assets/constants";

export default function FormComponentMBA() {
  const navigate = useNavigate();
  const [name, setName] = useState("Venkataramana Shettigar");
  const [mobile, setMobile] = useState("+91-9008162519");
  const [email, setEmail] = useState("19516uttam@gmail.com");
  const [linkedin, setLinkedin] = useState(
    "https://www.linkedin.com/in/venkataramana-shettigar"
  );
  const [address, setAddress] = useState(
    "Golidadi House, Sangabettu Village, Siddakatte Post, Bantwal Taluk, DK District, Karnataka, India, 574237"
  );
  const [summary, setSummary] = useState(
    "As a fresher to the professional world, I am enthusiastic about securing a growth-oriented position within a renowned organization. I am eager to contribute my hard work and skills towards the improvement and success of the organization. My focus lies on finding an entry-level opportunity in the Finance field, where I can effectively apply the extensive knowledge that have acquired during my MBA studies."
  );
  const [education, setEducation] = useState([
    {
      degree: "Master of Business Administration",
      duration: "2022-2024",
      institution: "Moodliar Engineering College, Moodbidri",
      details: "CGPA: 8.33",
    },
    {
      degree: "Bachelor of Commerce",
      duration: "2019-2022",
      institution: "Moodliar College, Moodbidri",
      details: "CGPA: 7.33",
    },
    {
      degree: "Pre-University",
      duration: "2017-2019",
      institution: "Govt Pre-University College, Siddakatte",
      details: "Percentage: 91.33%",
    },
    {
      degree: "Secondary School",
      duration: "2015-2017",
      institution: "Govt High School, Siddakatte",
      details: "Percentage: 88.16%",
    },
  ]);
  const [references, setReferences] = useState([
    {
      name: "Dr. M.S. Hiremath",
      designation: "Professor and Head, Department of Commerce",
      email: "ms.hiremath@mec.ac.in",
      phone: "+91-9482000000",
    },
    {
      name: "Dr. M.S. Hiremath",
      designation: "Professor and Head, Department of Commerce",
      email: "ms.hiremath@mec.ac.in",
      phone: "+91-9482000000",
    },
  ]);
  const [skills, setSkills] = useState([
    "Leadership",
    "Teamwork",
    "Communication",
    "Problem Solving",
    "Adaptability",
    "Time Management",
  ]);
  const [computerSkills, setComputerSkills] = useState([
    "MS Excel",
    "MS Word",
    "Tally",
    "MS PowerPoint",
  ]);
  const [certifications, setCertifications] = useState([
    "Business Analytics with Excel - Simplilearn",
    "AI & Industry 4.0 - MITE Workshop",
    "Digital Marketing Basics - GL Academy",
    "Logistics Management - GL Academy",
  ]);
  const [interests, setInterests] = useState([
    "Drawing",
    "Cooking",
    "Playing Chende",
  ]);
  const [workExperience, setWorkExperience] = useState([
    {
      companyName: "CDYMAX (India) Pharma Pvt. Ltd.",
      duration: "2023-2024",
      role: "Intern",
      description:
        "I am a fresher to the professional world, I am enthusiastic about securing a growth-oriented position within a renowned organization. I am eager to contribute my hard work and skills towards the improvement and success of the organization. My focus lies on finding an entry-level opportunity in the Finance field, where I can effectively apply the extensive knowledge that have acquired during my MBA studies.",
    },
  ]);
  const [projects, setProjects] = useState([
    {
      title: "Enhancing Healthcare Services in Rural Areas",
      description:
        "Led a project aimed at improving primary healthcare centers (PHCs) in Dakshina Kannada. Responsibilities included gathering and analyzing data on current PHC operations, identifying areas for improvement, and developing strategies to enhance healthcare services. Presented findings and recommendations to stakeholders and local health authorities.",
    },
    {
      title: "Evaluating Arbitrage Opportunities in Global Currencies",
      description:
        "Explored arbitrage opportunities in the Indian foreign exchange market by analyzing currency price discrepancies across different platforms. Monitored currency prices, performed statistical analyses to identify arbitrage opportunities, and prepared reports on findings and strategies.",
    },
  ]);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [volunteerWork, setVolunteerWork] = useState(
    "During 1st Semester of MBA with guidance of the mentor me and my team conduct the “Plastic Awareness Campaign” at Kallamudkur Village. It was the one-week campaign. Our main intention is to give the awareness about Plastic usage and minimize the usage of plastic by some suggestion. I learn team coordination as leader, Pre-Plans for success of campaign, convenience village people to reduce the usage of plastic, handle the different kind of behavior of people. I am NSS volunteer."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");

  const handleAddItem = (setter, initialValue) => {
    setter((prev) => [...prev, initialValue]);
  };

  const handleRemoveItem = (setter, index) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (setter, index, value, field) => {
    setter((prev) =>
      prev.map((item, i) =>
        i === index ? (field ? { ...item, [field]: value } : value) : item
      )
    );
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setProfileImage(base64);
      } catch (error) {
        console.error("Error converting image to base64:", error);
        toast.error("Error processing image. Please try again.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = {
      template: 4,
      role,
      name,
      phone1: mobile,
      email,
      linkedin,
      address,
      profileSummary: summary,
      profilePicture: profileImage,
      education,
      keySkills: skills,
      computerSkills,
      certifications,
      hobbies: interests,
      internship: workExperience,
      projects,
      volunteerWork,
      references,
    };
    
    try {
      const response = await axiosInstance.post("/resume/create-resume", formData);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
      if (err.response.data.status === "logout") {
        localStorage.removeItem("authToken");
        navigate("/auth/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Advanced Resume Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Role Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Role
              </h2>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Select a role</option>
                {roles.map((roleOption, index) => (
                  <option key={index} value={roleOption}>
                    {roleOption}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="Enter your LinkedIn profile URL"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <p className='text-sm'>The file size must be less than 100KB</p>
                <div className="mt-1 flex items-center">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="h-full w-full text-gray-300"
                      />
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleProfilePictureChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Summary */}
            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700"
              >
                Summary
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                placeholder="Enter a brief summary about yourself"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="mr-2 text-indigo-500"
                />
                Education
              </label>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleItemChange(
                          setEducation,
                          index,
                          e.target.value,
                          "degree"
                        )
                      }
                      placeholder="Enter degree/qualification"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                    <input
                      type="text"
                      value={edu.duration}
                      onChange={(e) =>
                        handleItemChange(
                          setEducation,
                          index,
                          e.target.value,
                          "duration"
                        )
                      }
                      placeholder="Enter duration (e.g., 2019-2023)"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleItemChange(
                        setEducation,
                        index,
                        e.target.value,
                        "institution"
                      )
                    }
                    placeholder="Enter institution name"
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <input
                    type="text"
                    value={edu.details}
                    onChange={(e) =>
                      handleItemChange(
                        setEducation,
                        index,
                        e.target.value,
                        "details"
                      )
                    }
                    placeholder="Enter additional details (e.g., CGPA: 8.33)"
                    rows={3}
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setEducation, index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Education
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleAddItem(setEducation, {
                    degree: "",
                    duration: "",
                    institution: "",
                    details: "",
                  })
                }
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Education
              </button>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faCode}
                  className="mr-2 text-indigo-500"
                />
                Skills
              </label>
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      handleItemChange(setSkills, index, e.target.value)
                    }
                    placeholder="Enter a skill"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setSkills, index)}
                      className="ml-2 text-red-600 hover:text-red-800 border border-red-600 rounded-md px-2 py-1"
                    >
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setSkills, "")}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Skill
              </button>
            </div>

            {/* Computer Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faCode}
                  className="mr-2 text-indigo-500"
                />
                Computer Skills
              </label>
              {computerSkills.map((skill, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      handleItemChange(setComputerSkills, index, e.target.value)
                    }
                    placeholder="Enter a computer skill"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setComputerSkills, index)}
                      className="ml-2 text-red-600 hover:text-red-800 border border-red-600 rounded-md px-2 py-1"
                    >
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setComputerSkills, "")}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Computer Skill
              </button>
            </div>

            {/* Certifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faCertificate}
                  className="mr-2 text-indigo-500"
                />
                Certifications
              </label>
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) =>
                      handleItemChange(setCertifications, index, e.target.value)
                    }
                    placeholder="Enter a certification"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setCertifications, index)}
                      className="ml-2 text-red-600 hover:text-red-800 border border-red-600 rounded-md px-2 py-1"
                    >
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setCertifications, "")}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Certification
              </button>
            </div>

            {/* Interests/Hobbies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="mr-2 text-indigo-500"
                />
                Interests/Hobbies
              </label>
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={interest}
                    onChange={(e) =>
                      handleItemChange(setInterests, index, e.target.value)
                    }
                    placeholder="Enter an interest or hobby"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setInterests, index)}
                      className="ml-2 text-red-600 hover:text-red-800 border border-red-600 rounded-md px-2 py-1"
                    >
                      {/* <FontAwesomeIcon icon={faTrash} /> */}
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setInterests, "")}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Interest/Hobby
              </button>
            </div>

            {/* Work Experience/Internships */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="mr-2 text-indigo-500"
                />
                Work Experience/Internships
              </label>
              {workExperience.map((exp, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={exp.companyName}
                      onChange={(e) =>
                        handleItemChange(
                          setWorkExperience,
                          index,
                          e.target.value,
                          "companyName"
                        )
                      }
                      placeholder="Enter company name"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        handleItemChange(
                          setWorkExperience,
                          index,
                          e.target.value,
                          "duration"
                        )
                      }
                      placeholder="Enter duration"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) =>
                      handleItemChange(
                        setWorkExperience,
                        index,
                        e.target.value,
                        "role"
                      )
                    }
                    placeholder="Enter role"
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleItemChange(
                        setWorkExperience,
                        index,
                        e.target.value,
                        "description"
                      )
                    }
                    placeholder="Enter description"
                    rows={3}
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setWorkExperience, index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleAddItem(setWorkExperience, {
                    companyName: "",
                    duration: "",
                    role: "",
                    description: "",
                  })
                }
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Work Experience
              </button>
            </div>

            {/* Completed Projects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon
                  icon={faProjectDiagram}
                  className="mr-2 text-indigo-500"
                />
                Completed Projects
              </label>
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      handleItemChange(
                        setProjects,
                        index,
                        e.target.value,
                        "title"
                      )
                    }
                    placeholder="Enter project title"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleItemChange(
                        setProjects,
                        index,
                        e.target.value,
                        "description"
                      )
                    }
                    placeholder="Enter project description"
                    rows={3}
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setProjects, index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Project
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  handleAddItem(setProjects, { title: "", description: "" })
                }
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Project
              </button>
            </div>

            {/* Volunteer Work */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volunteer Work
              </label>
              <textarea
                value={volunteerWork}
                onChange={(e) => setVolunteerWork(e.target.value)}
                placeholder="Describe your volunteer work"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* References */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                References
              </label>
              {references.map((ref, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={ref.name}
                      onChange={(e) =>
                        handleItemChange(
                          setReferences,
                          index,
                          e.target.value,
                          "name"
                        )
                      }
                      placeholder="Enter reference name"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                    <input
                      type="text"
                      value={ref.designation}
                      onChange={(e) =>
                        handleItemChange(
                          setReferences,
                          index,
                          e.target.value,
                          "designation"
                        )
                      }
                      placeholder="Enter designation"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                    <input
                      type="email"
                      value={ref.email}
                      onChange={(e) =>
                        handleItemChange(
                          setReferences,
                          index,
                          e.target.value,
                          "email"
                        )
                      }
                      placeholder="Enter email"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                    <input
                      type="tel"
                      value={ref.phone}
                      onChange={(e) =>
                        handleItemChange(
                          setReferences,
                          index,
                          e.target.value,
                          "phone"
                        )
                      }
                      placeholder="Enter phone number"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(setReferences, index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Reference
                    </button>
                  )}
                </div>
              ))}
              {references.length < 2 && (
                <button
                  type="button"
                  onClick={() =>
                    handleAddItem(setReferences, {
                      name: "",
                      designation: "",
                      email: "",
                      phone: "",
                    })
                  }
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Reference
                </button>
              )}
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`ml-3 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? (
                    <>
                      <ClipLoader
                        size={20}
                        color={"#ffffff"}
                        className="mr-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    'Save Resume Details'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
