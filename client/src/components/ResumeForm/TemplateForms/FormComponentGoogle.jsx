/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faGraduationCap, faLaptopCode, faBriefcase, faProjectDiagram, faTrophy, faLanguage, faUser, faFileAlt, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { COMMON_TECHNOLOGIES, LANGUAGES, COMMON_SKILLS } from '../../../assets/constants'

const FormComponentGoogle = () => {
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [experience, setExperience] = useState([{ 
    company: '', 
    location: '', 
    jobTitle: '', 
    startDate: '', 
    endDate: '', 
    description: '' 
  }])
  const [education, setEducation] = useState([{ 
    school: '', 
    location: '', 
    degree: '', 
    startDate: '', 
    endDate: '' 
  }])
  const [projects, setProjects] = useState([{ 
    name: '', 
    technologies: [], 
    description: '',
    currentTechnology: '',
    isDropdownOpen: false,
    filteredTechnologies: [],
    isTechnologiesValid: true
  }]);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [isSkillsValid, setIsSkillsValid] = useState(true);
  const [awards, setAwards] = useState([])
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isLanguagesValid, setIsLanguagesValid] = useState(true);
  const [currentAward, setCurrentAward] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRefs = useRef([]);
  const skillDropdownRef = useRef(null);
  const languageInputRef = useRef(null);
  const languageDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      projects.forEach((project, index) => {
        if (dropdownRefs.current[index] && !dropdownRefs.current[index].contains(event.target)) {
          closeDropdown(index);
        }
      });
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target)) {
        setIsSkillDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [projects]);

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience]
    newExperience[index][field] = value
    setExperience(newExperience)
  }

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
  }

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  }

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setCurrentLanguage(value);
    const filtered = LANGUAGES.filter(lang => 
      lang.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLanguages(filtered);
    setIsLanguageDropdownOpen(true);
  };

  const addExperience = () => {
    if (experience.length < 2) {
      setExperience([...experience, { company: '', location: '', jobTitle: '', startDate: '', endDate: '', description: '' }])
    }
  }

  const removeExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index)
    setExperience(newExperience)
  }

  const addEducation = () => {
    if (education.length < 1) {
      setEducation([...education, { school: '', location: '', degree: '', startDate: '', endDate: '' }])
    }
  }

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index)
    setEducation(newEducation)
  }

  const addProject = () => {
    if (projects.length < 3) {
      setProjects([...projects, { 
        name: '', 
        technologies: [], 
        description: '',
        currentTechnology: '',
        isDropdownOpen: false,
        filteredTechnologies: [],
        isTechnologiesValid: true
      }]);
    }
  }

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index)
    setProjects(newProjects)
  }

  const addLanguage = (lang = currentLanguage) => {
    if (lang.trim() !== '' && !languages.includes(lang.trim())) {
      const newLanguages = [...languages, lang.trim()];
      setLanguages(newLanguages);
      setCurrentLanguage('');
      setFilteredLanguages([]);
      setIsLanguageDropdownOpen(false);
      setIsLanguagesValid(true);
      languageInputRef.current.focus();
    }
  };

  const removeLanguage = (index) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    setLanguages(newLanguages);
    setIsLanguagesValid(newLanguages.length > 0);
  };

  const addAward = () => {
    if (currentAward.trim() !== '') {
      setAwards([...awards, currentAward.trim()]);
      setCurrentAward('');
    }
  };

  const removeAward = (index) => {
    const newAwards = awards.filter((_, i) => i !== index);
    setAwards(newAwards);
  };

  const handleTechnologyChange = (e, index) => {
    const value = e.target.value;
    const newProjects = [...projects];
    newProjects[index].currentTechnology = value;
    newProjects[index].filteredTechnologies = COMMON_TECHNOLOGIES.filter(tech => 
      tech.toLowerCase().includes(value.toLowerCase())
    );
    newProjects[index].isDropdownOpen = true;
    setProjects(newProjects);
  };

  const addTechnology = (projectIndex, tech = null) => {
    const newProjects = [...projects];
    const technology = tech || newProjects[projectIndex].currentTechnology;
    if (technology.trim() !== '' && !newProjects[projectIndex].technologies.includes(technology.trim())) {
      newProjects[projectIndex].technologies.push(technology.trim());
      newProjects[projectIndex].currentTechnology = '';
      newProjects[projectIndex].filteredTechnologies = [];
      newProjects[projectIndex].isDropdownOpen = false;
      newProjects[projectIndex].isTechnologiesValid = true;
      setProjects(newProjects);
    }
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies.splice(techIndex, 1);
    newProjects[projectIndex].isTechnologiesValid = newProjects[projectIndex].technologies.length > 0;
    setProjects(newProjects);
  };

  const closeDropdown = (index) => {
    const newProjects = [...projects];
    newProjects[index].isDropdownOpen = false;
    setProjects(newProjects);
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setCurrentSkill(value);
    const filtered = COMMON_SKILLS.filter(skill => 
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
    setIsSkillDropdownOpen(true);
  };

  const addSkill = (skill = currentSkill) => {
    if (skill.trim() !== '' && !skills.includes(skill.trim())) {
      const newSkills = [...skills, skill.trim()];
      setSkills(newSkills);
      setCurrentSkill('');
      setFilteredSkills([]);
      setIsSkillDropdownOpen(false);
      setIsSkillsValid(true);
    }
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    setIsSkillsValid(newSkills.length > 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let firstInvalidProject = null;

    projects.forEach((project, index) => {
      if (project.technologies.length === 0) {
        isValid = false;
        project.isTechnologiesValid = false;
        if (!firstInvalidProject) firstInvalidProject = index;
      }
    });

    if (!isValid) {
      setProjects([...projects]); // Trigger re-render
      document.getElementById(`project-${firstInvalidProject}`).scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (skills.length === 0) {
      setIsSkillsValid(false);
      // Scroll to the skills section
      document.getElementById('skills-section').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (languages.length === 0) {
      setIsLanguagesValid(false);
      document.getElementById('languages-section').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Proceed with form submission
    console.log({ name, summary, experience, education, projects, skills, awards, languages });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Resume Details</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-indigo-500" />
                Name
              </h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Full Name"
                required
              />
            </div>

            {/* Summary Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faFileAlt} className="mr-2 text-indigo-500" />
                Summary
              </h2>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Brief summary of your professional profile"
                maxLength={200}
                required
              />
              <p className="mt-2 text-sm text-gray-500 text-right">
                {summary.length}/200 characters
              </p>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-indigo-500" />
                Experience
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`company-${index}`} className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        id={`company-${index}`}
                        placeholder='Ex: Accenture'
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        id={`location-${index}`}
                        placeholder='Ex: Bangalore, India'
                        value={exp.location}
                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`jobTitle-${index}`} className="block text-sm font-medium text-gray-700">Job Title</label>
                      <input
                        type="text"
                        id={`jobTitle-${index}`}
                        placeholder='Ex: Python Developer'
                        value={exp.jobTitle}
                        onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="text"
                        id={`startDate-${index}`}
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ex: Oct 2024"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="text"
                        id={`endDate-${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ex: Dec 2024 or Present"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id={`description-${index}`}
                      rows={3}
                      placeholder='Write about your responsibilities, achievements, and any other relevant information.'
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {experience.length < 2 && (
                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Experience
                </button>
              )}
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-indigo-500" />
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`school-${index}`} className="block text-sm font-medium text-gray-700">School Name</label>
                      <input
                        type="text"
                        id={`school-${index}`}
                        placeholder='Ex: Indian Institute of Technology'
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        id={`location-${index}`}
                        value={edu.location}
                        placeholder='Ex: Kolkata, India'
                        onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700">Degree</label>
                      <input
                        type="text"
                        id={`degree-${index}`}
                        placeholder='Ex: B.Tech in Computer Science'
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="text"
                        id={`startDate-${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ex: Aug 2020"
                        required
                      />
                    
                    </div>
                    <div>
                      <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="text"
                        id={`endDate-${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ex: Jun 2024 or Present"
                        required
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className={`mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  education.length >= 1
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
                disabled={education.length >= 1}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Education
              </button>
            </div>

            {/* Projects Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-2 text-indigo-500" />
                Projects
              </h2>
              {projects.map((project, index) => (
                <div key={index} id={`project-${index}`} className="mb-4 p-4 border border-gray-200 rounded-md">
                  <div>
                    <label htmlFor={`project-name-${index}`} className="block text-sm font-medium text-gray-700">Project Title</label>
                    <input
                      type="text"
                      id={`project-name-${index}`}
                      placeholder='Ex: Resume Builder'
                      value={project.name}
                      onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mt-4 relative" ref={el => dropdownRefs.current[index] = el}>
                    <label htmlFor={`project-technologies-${index}`} className="block text-sm font-medium text-gray-700">
                      Technologies
                      {!project.isTechnologiesValid && (
                        <span className="ml-2 text-sm text-red-600">
                          <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                          At least one technology is required
                        </span>
                      )}
                    </label>
                    <div className="flex mt-1">
                      <input
                        type="text"
                        id={`project-technologies-${index}`}
                        value={project.currentTechnology}
                        onChange={(e) => handleTechnologyChange(e, index)}
                        onFocus={() => handleProjectChange(index, 'isDropdownOpen', true)}
                        className={`block w-full border ${!project.isTechnologiesValid ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="Enter a technology"
                      />
                      <button
                        type="button"
                        onClick={() => addTechnology(index)}
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    {project.isDropdownOpen && project.filteredTechnologies.length > 0 && (
                      <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {project.filteredTechnologies.map((tech, techIndex) => (
                          <li
                            key={techIndex}
                            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100"
                            onClick={() => addTechnology(index, tech)}
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(index, techIndex)}
                            className="ml-3 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor={`project-description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id={`project-description-${index}`}
                      rows={3}
                      placeholder='Write about your project, its purpose, and any other relevant information.'
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeProject(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
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
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Project
                </button>
              )}
            </div>

            {/* Skills Section */}
            <div id="skills-section">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faLaptopCode} className="mr-2 text-indigo-500" />
                Skills
                {!isSkillsValid && (
                  <span className="ml-2 text-sm text-red-600">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                    At least one skill is required
                  </span>
                )}
              </h2>
              <div className="relative" ref={skillDropdownRef}>
                <div className="flex mt-1">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={handleSkillChange}
                    onFocus={() => setIsSkillDropdownOpen(true)}
                    className={`block w-full border ${!isSkillsValid ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Ex: JavaScript"
                  />
                  <button
                    type="button"
                    onClick={() => addSkill()}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                {isSkillDropdownOpen && filteredSkills.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {filteredSkills.map((skill, index) => (
                      <li
                        key={index}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Awards Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faTrophy} className="mr-2 text-indigo-500" />
                Awards
              </h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={currentAward}
                  onChange={(e) => setCurrentAward(e.target.value)}
                  className="flex-grow mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter an award or achievement"
                />
                <button
                  type="button"
                  onClick={addAward}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add
                </button>
              </div>
              {awards.length > 0 && (
                <div className="mt-4 space-y-2">
                  {awards.map((award, index) => (
                    <div key={index} className="flex items-center justify-between bg-white border border-gray-200 px-4 py-2 rounded-md shadow-sm">
                      <span className="text-sm text-gray-700">{award}</span>
                      <button
                        type="button"
                        onClick={() => removeAward(index)}
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Languages Section */}
            <div id="languages-section">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faLanguage} className="mr-2 text-indigo-500" />
                Languages
                {!isLanguagesValid && (
                  <span className="ml-2 text-sm text-red-600">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
                    At least one language is required
                  </span>
                )}
              </h2>
              <div className="relative" ref={languageDropdownRef}>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    ref={languageInputRef}
                    value={currentLanguage}
                    onChange={handleLanguageChange}
                    onFocus={() => setIsLanguageDropdownOpen(true)}
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    className={`flex-grow mt-1 block w-full border ${!isLanguagesValid ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter a language"
                  />
                  <button
                    type="button"
                    onClick={() => addLanguage()}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add
                  </button>
                </div>
                {isLanguageDropdownOpen && filteredLanguages.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {filteredLanguages.map((lang, index) => (
                      <li
                        key={index}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100"
                        onClick={() => addLanguage(lang)}
                      >
                        {lang}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {languages.map((language, index) => (
                  <div key={index} className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold bg-indigo-100 text-indigo-800">
                    {language}
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Resume Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormComponentGoogle