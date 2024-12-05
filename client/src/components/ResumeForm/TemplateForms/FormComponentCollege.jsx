import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlus, faCode, faLink, faGraduationCap, faBriefcase, faTrophy, faProjectDiagram, faAddressCard, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import axios from '../../../utils/axiosConfig'
import { toast } from 'react-toastify'
import { ClipLoader } from "react-spinners"
import { roles } from "../../../assets/constants"

export default function AdvancedResumeForm() {
  const [template] = useState(3)
  const [role, setRole] = useState("");
  const [title, setTitle] = useState('Uttam')
  const [name, setName] = useState('Uttam')
  const [contact, setContact] = useState({
    phone: '+91-9820343055',
    email: 'tejaskjain2003@gmail.com',
    links: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/tejas-jain-1688a3234/'
      },
      {
        name: 'GitHub',
        url: 'https://github.com/TejasJain03'
      },
      {
        name: 'Portfolio',
        url: 'https://tejasjain03.netlify.app'
      }
    ]
  })
  const [address, setAddress] = useState('Sudharma Nilaya, Bangerabettu, Karkala Taluk, Mudar, Bajegoli, Udupi, Karnataka, 574122')
  const [profileImage, setProfileImage] = useState(null)
  const [summary, setSummary] = useState('Motivated Computer Science student with practical experience in full-stack development and a strong focus on MongoDB, MERN stack technologies, AI and Machine Learning. Proven ability to develop dynamic web applications, optimize databases, and enhance user experiences. Adept at collaborating on cross-functional teams to create scalable solutions. Committed to continuous learning and applying knowledge in real-world software development.')
  const [education, setEducation] = useState([
    {
      degree: 'Bachelor of Engineering – Computer Science & Engineering',
      duration: '2021 - Present',
      institution: 'Mangalore Institute of Technology & Engineering, Karnataka',
      score: 'CGPA: 8.8'
    },
    {
      degree: 'Junior College (12th)',
      duration: '2020 - 2021',
      institution: 'Royal College of Arts, Science and Commerce, Thane, Maharashtra',
      score: 'Percentage: 88%'
    },
    {
      degree: 'Secondary School (SSLC)',
      duration: '2018 - 2019',
      institution: 'N.L. Dalmia High School, Thane, Maharashtra',
      score: 'Percentage: 95%'
    }
  ])
  const [skills, setSkills] = useState({
    languages: ['Java', 'Python', 'JavaScript', 'C'],
    interface: ['HTML', 'CSS'],
    frameworks: ['React', 'Tailwind CSS', 'Express', 'Node.js'],
    database: ['MongoDB', 'SQL'],
    tools: ['Postman', 'Vercel', 'Netlify', 'Rapid API', 'Git', 'Github', 'Visual Studio Code']
  })
  const [internships, setInternships] = useState([
    {
      title: 'Front End Development Intern',
      duration: 'July 2023 - August 2023',
      description: 'Completed a 6-week internship focused on front-end development, building user-centric websites using HTML, CSS, and React.js. Worked on a project to create a clone website, implementing modern design principles and web standards. Enhanced skills in responsive design, web performance optimization, and dynamic content presentation.'
    },
    {
      title: 'Full Stack Development Intern',
      duration: 'November 2023 - December 2023',
      description: 'Completed a 4-week internship with Winco Software Solutions, gaining hands-on experience in both front-end and back-end development. Focused on payment integration using MongoDB for database management, implementing JWT authentication, and integrating email services for secure transactions.'
    }
  ])
  const [projects, setProjects] = useState([
    {
      title: 'MMC Website',
      duration: 'June 2024 - July 2024',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      description: 'Developed a fully responsive website for Mashariq Al Mithalia Company using HTML, CSS, and JavaScript. The site features GSAP animations for dynamic user interactions and is deployed with a custom domain. Focused on web performance and accessibility.'
    },
    {
      title: 'TEDxMITE Website',
      duration: 'September 2023 - December 2023',
      technologies: ['ReactJs', 'Tailwind CSS'],
      description: 'Built the TEDxMITE website using React.js and Tailwind CSS. Integrated animations, enhanced user interface and ensured the site was fully responsive across devices. Optimized performance for high-traffic events.'
    },
    {
      title: 'EventEase Website',
      duration: 'November 2023 - December 2023',
      technologies: ['ReactJs', 'Express', 'MongoDB', 'NodeJs'],
      description: 'Created the EventEase platform using MERN stack (MongoDB, Express, React, Node.js). Integrated secure payment systems, ticketing features, and event management tools. Used JWT authentication for robust security, enhancing the platform\'s functionality and user experience.'
    }
  ])
  const [achievements, setAchievements] = useState([
    'Coordinated a coding event titled \'CODE RELAY\' at the college, organized by the CSE department and CSI.',
    'Website Head for TEDxMITE, December 2023.',
    'Advanced to the finals in the 36-hour National-Level Hack to Future 2.0 Hackathon at SJEC.',
    'Secured 2nd place in UI-War, a 6-hour front-end hackathon, building a luxury watch e-commerce site (CSI, MITE).',
    'Secured 4th place in the CTF event by Crypton Club (MITE).'
  ])

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null)

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

  const handleContactChange = (field, value) => {
    setContact(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...contact.links]
    newLinks[index][field] = value
    setContact(prev => ({
      ...prev,
      links: newLinks
    }))
  }

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...achievements]
    newAchievements[index] = value
    setAchievements(newAchievements)
  }

  const addAchievement = () => {
    setAchievements([...achievements, ''])
  }

  const removeAchievement = (index) => {
    const newAchievements = achievements.filter((_, i) => i !== index)
    setAchievements(newAchievements)
  }

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects]
    if (field === 'technologies') {
      // Convert comma-separated string to array
      newProjects[index][field] = value.split(',').map(tech => tech.trim())
    } else {
      newProjects[index][field] = value
    }
    setProjects(newProjects)
  }

  const addProject = () => {
    if (projects.length < 3) {
      setProjects([...projects, { title: '', duration: '', technologies: [], description: '' }])
    }
  }

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index)
    setProjects(newProjects)
  }

  const handleInternshipChange = (index, field, value) => {
    const newInternships = [...internships]
    newInternships[index][field] = value
    setInternships(newInternships)
  }

  const addInternship = () => {
    setInternships([...internships, { title: '', duration: '', description: '' }])
  }

  const removeInternship = (index) => {
    const newInternships = internships.filter((_, i) => i !== index)
    setInternships(newInternships)
  }

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
  }

  const addEducation = () => {
    if (education.length < 3) {
      setEducation([...education, { degree: '', duration: '', institution: '', score: '' }])
    }
  }

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index)
    setEducation(newEducation)
  }

  const addLink = () => {
    if (contact.links.length < 4) {
      setContact(prev => ({
        ...prev,
        links: [...prev.links, { name: '', url: '' }]
      }))
    }
  }

  const removeLink = (index) => {
    if (contact.links.length > 1) {
      setContact(prev => ({
        ...prev,
        links: prev.links.filter((_, i) => i !== index)
      }))
    }
  }

  const handleSkillChange = (category, value) => {
    setSkills(prev => ({
      ...prev,
      [category]: value.split(',').map(skill => skill.trim())
    }))
  }

  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset form errors
    setFormErrors({});
    
    // Validate all required fields
    const errors = {};
    
    // Basic validations
    if (!name.trim()) errors.name = 'Name is required';
    if (!contact.phone.trim()) errors.phone = 'Phone is required';
    if (!contact.email.trim()) errors.email = 'Email is required';
    if (!address.trim()) errors.address = 'Address is required';
    if (!summary.trim()) errors.summary = 'Summary is required';
    
    // Validate first education entry
    if (education.length > 0) {
      const firstEdu = education[0];
      if (!firstEdu.degree?.trim()) errors.educationDegree = 'Degree is required';
      if (!firstEdu.duration?.trim()) errors.educationDuration = 'Duration is required';
      if (!firstEdu.institution?.trim()) errors.educationInstitution = 'Institution is required';
      if (!firstEdu.score?.trim()) errors.educationScore = 'Score is required';
    }
    
    // Validate skills
    if (skills.languages.length === 0) errors.skillsLanguages = 'At least one programming language is required';
    if (skills.frameworks.length === 0) errors.skillsFrameworks = 'At least one framework is required';
    if (skills.database.length === 0) errors.skillsDatabase = 'At least one database is required';
    if (skills.tools.length === 0) errors.skillsTools = 'At least one tool is required';
    
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to the first error
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // If validation passes, proceed with form submission
    setIsSubmitting(true);
    try {
      const formData = {
        template,
        role,
        name,
        contact,
        address,
        profilePicture: profileImage,
        summary,
        education,
        skills,
        internships,
        projects,
        achievements
      };
      const response = await axios.post('/resume/create-resume', formData);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error creating resume');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Advanced Resume Details</h1>
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

            {/* Title and Name Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setFormErrors(prev => ({ ...prev, name: '' }))
                  }}
                  placeholder="Enter your full name"
                  className={`mt-1 block w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
              </div>
            </div>

            {/* Profile Picture Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
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
                    <FontAwesomeIcon icon={faUser} className="h-full w-full text-gray-300" />
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

            {/* Contact Information Section */}
            <div>
              <label className="block text-md font-bold text-gray-700">
                <FontAwesomeIcon icon={faAddressCard} className="mr-2 text-indigo-500 " />
                Contact Information
              </label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={contact.phone}
                    onChange={(e) => {
                      handleContactChange('phone', e.target.value)
                      setFormErrors(prev => ({ ...prev, phone: '' }))
                    }}
                    placeholder="e.g., +91-9876543210"
                    className={`mt-1 block w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={contact.email}
                    onChange={(e) => {
                      handleContactChange('email', e.target.value)
                      setFormErrors(prev => ({ ...prev, email: '' }))
                    }}
                    placeholder="e.g., yourname@example.com"
                    className={`mt-1 block w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faLink} className="mr-2 text-indigo-500" />
                Links (Max 4)
              </label>
              {contact.links.map((link, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 flex-grow">
                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                      placeholder="Website Name"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      placeholder="URL"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-600 hover:text-red-800 border-red-500 border-2 rounded-md px-2 py-1"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {contact.links.length < 4 && (
                <button
                  type="button"
                  onClick={addLink}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 text-indigo-500" />
                  Add Link
                </button>
              )}
            </div>

            {/* Address Section */}
            <div>
              <label htmlFor="address" className="block text-sm font-bold text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value)
                  setFormErrors(prev => ({ ...prev, address: '' }))
                }}
                placeholder="Enter your complete address"
                className={`mt-1 block w-full border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {formErrors.address && <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>}
            </div>

            {/* Summary Section */}
            <div>
              <label htmlFor="summary" className="block text-sm font-bold text-gray-700">
                <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-indigo-500" />
                Summary (Max 100 words)
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value)
                  setFormErrors(prev => ({ ...prev, summary: '' }))
                }}
                placeholder="Write a brief summary about yourself and your key skills (Max 100 words)"
                rows={4}
                className={`mt-1 block w-full border ${formErrors.summary ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                maxLength={500} // Approximately 100 words
              />
              {formErrors.summary && <p className="mt-1 text-sm text-red-500">{formErrors.summary}</p>}
            </div>

            {/* Achievements Section */}
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2 text-indigo-500" />
                Achievements
              </label>
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleAchievementChange(index, e.target.value)}
                    placeholder="e.g., Won first place in national coding competition"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAchievement(index)}
                      className="ml-2 text-red-600 hover:text-red-800 border-red-500 border-2 rounded-md px-2 py-1"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addAchievement}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2 text-indigo-500" />
                Add Achievement
              </button>
            </div>

            {/* Projects Section */}
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-2 text-indigo-500" />
                Projects (Max 3)
              </label>
              {projects.map((project, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      placeholder="e.g., E-commerce Website"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                      type="text"
                      value={project.duration}
                      onChange={(e) => handleProjectChange(index, 'duration', e.target.value)}
                      placeholder="e.g., June 2024 - July 2024"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    value={project.technologies.join(', ')}
                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                    placeholder="e.g., React.js, Node.js, MongoDB (comma-separated)"
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    placeholder="Describe the project, its features, and your role in development"
                    rows={3}
                    className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    maxLength={250} // Approximately 50 words
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Project
                    </button>
                  )}
                </div>
              ))}
              {projects.length < 3 && (
                <button
                  type="button"
                  onClick={addProject}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 text-indigo-500" />
                  Add Project
                </button>
              )}
            </div>

            {/* Skills Section */}
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faCode} className="mr-2 text-indigo-500" />
                Skills
              </label>
              <div className="space-y-4">
                <div>
                  <label htmlFor="languages" className="block text-sm font-medium text-gray-700">Programming Languages</label>
                  <input
                    type="text"
                    id="languages"
                    value={skills.languages.join(', ')}
                    onChange={(e) => {
                      handleSkillChange('languages', e.target.value)
                      setFormErrors(prev => ({ ...prev, languages: '' }))
                    }}
                    placeholder="e.g., Java, Python, JavaScript, C (comma-separated)"
                    className={`mt-1 block w-full border ${formErrors.languages ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.languages && <p className="mt-1 text-sm text-red-500">{formErrors.languages}</p>}
                </div>
                <div>
                  <label htmlFor="interface" className="block text-sm font-medium text-gray-700">Interface Technologies</label>
                  <input
                    type="text"
                    id="interface"
                    value={skills.interface.join(', ')}
                    onChange={(e) => {
                      handleSkillChange('interface', e.target.value)
                      setFormErrors(prev => ({ ...prev, interface: '' }))
                    }}
                    placeholder="e.g., HTML, CSS (comma-separated)"
                    className={`mt-1 block w-full border ${formErrors.interface ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.interface && <p className="mt-1 text-sm text-red-500">{formErrors.interface}</p>}
                </div>
                <div>
                  <label htmlFor="frameworks" className="block text-sm font-medium text-gray-700">Frameworks</label>
                  <input
                    type="text"
                    id="frameworks"
                    value={skills.frameworks.join(', ')}
                    onChange={(e) => {
                      handleSkillChange('frameworks', e.target.value)
                      setFormErrors(prev => ({ ...prev, frameworks: '' }))
                    }}
                    placeholder="e.g., React, Express, Node.js (comma-separated)"
                    className={`mt-1 block w-full border ${formErrors.frameworks ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.frameworks && <p className="mt-1 text-sm text-red-500">{formErrors.frameworks}</p>}
                </div>
                <div>
                  <label htmlFor="database" className="block text-sm font-medium text-gray-700">Databases</label>
                  <input
                    type="text"
                    id="database"
                    value={skills.database.join(', ')}
                    onChange={(e) => {
                      handleSkillChange('database', e.target.value)
                      setFormErrors(prev => ({ ...prev, database: '' }))
                    }}
                    placeholder="e.g., MongoDB, SQL (comma-separated)"
                    className={`mt-1 block w-full border ${formErrors.database ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.database && <p className="mt-1 text-sm text-red-500">{formErrors.database}</p>}
                </div>
                <div>
                  <label htmlFor="tools" className="block text-sm font-medium text-gray-700">Tools</label>
                  <input
                    type="text"
                    id="tools"
                    value={skills.tools.join(', ')}
                    onChange={(e) => {
                      handleSkillChange('tools', e.target.value)
                      setFormErrors(prev => ({ ...prev, tools: '' }))
                    }}
                    placeholder="e.g., Git, VS Code, Postman (comma-separated)"
                    className={`mt-1 block w-full border ${formErrors.tools ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {formErrors.tools && <p className="mt-1 text-sm text-red-500">{formErrors.tools}</p>}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-indigo-500" />
                Education (Max 3)
              </label>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          handleEducationChange(index, 'degree', e.target.value)
                          setFormErrors(prev => ({ ...prev, educationDegree: '' }))
                        }}
                        placeholder="e.g., Bachelor of Engineering - Computer Science"
                        className={`block w-full border ${formErrors.educationDegree && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {index === 0 && formErrors.educationDegree && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.educationDegree}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={edu.duration}
                        onChange={(e) => {
                          handleEducationChange(index, 'duration', e.target.value)
                          setFormErrors(prev => ({ ...prev, educationDuration: '' }))
                        }}
                        placeholder="e.g., 2021 - Present"
                        className={`block w-full border ${formErrors.educationDuration && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {index === 0 && formErrors.educationDuration && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.educationDuration}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => {
                          handleEducationChange(index, 'institution', e.target.value)
                          setFormErrors(prev => ({ ...prev, educationInstitution: '' }))
                        }}
                        placeholder="e.g., University Name, Location"
                        className={`block w-full border ${formErrors.educationInstitution && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {index === 0 && formErrors.educationInstitution && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.educationInstitution}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                      <input
                        type="text"
                        value={edu.score}
                        onChange={(e) => {
                          handleEducationChange(index, 'score', e.target.value)
                          setFormErrors(prev => ({ ...prev, educationScore: '' }))
                        }}
                        placeholder="e.g., CGPA: 8.8 or Percentage: 88%"
                        className={`block w-full border ${formErrors.educationScore && index === 0 ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      />
                      {index === 0 && formErrors.educationScore && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.educationScore}</p>
                      )}
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="mt-4 text-red-600 hover:text-red-800 border-red-500 border-2 rounded-md px-2 py-1"
                    >
                      Remove Education
                    </button>
                  )}
                </div>
              ))}
              {education.length < 3 && (
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 text-indigo-500" />
                  Add Education
                </button>
              )}
            </div>

            {/* Internships Section */}
            <div>
              <label className="block text-md font-bold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-indigo-500" />
                Internships
              </label>
              {internships.map((internship, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={internship.title}
                        onChange={(e) => handleInternshipChange(index, 'title', e.target.value)}
                        placeholder="e.g., Front End Development Intern"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={internship.duration}
                        onChange={(e) => handleInternshipChange(index, 'duration', e.target.value)}
                        placeholder="e.g., July 2023 - August 2023"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={internship.description}
                        onChange={(e) => handleInternshipChange(index, 'description', e.target.value)}
                        placeholder="Describe your role, responsibilities, and achievements during the internship"
                        rows={2}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeInternship(index)}
                      className="mt-4 text-red-600 hover:text-red-800 border-red-500 border-2 rounded-md px-2 py-1"
                    >
                      Remove Internship
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addInternship}
                className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2 text-indigo-500" />
                Add Internship
              </button>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <ClipLoader size={20} color="#ffffff" />
                      <span className="ml-2">Creating Resume...</span>
                    </div>
                  ) : (
                    "Save Resume Details"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}