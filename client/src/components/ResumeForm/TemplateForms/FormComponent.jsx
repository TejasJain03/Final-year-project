/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faGraduationCap,
  faLaptopCode,
  faBriefcase,
  faProjectDiagram,
  faBook,
  faTimes,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { COMMON_SKILLS, COMMON_TECHNOLOGIES } from "../../../assets/constants";

const FormComponent = () => {
  const [education, setEducation] = useState([
    { institution: "", degree: "", from_year: "", to_year: "" },
  ]);

  const [experiences, setExperiences] = useState([
    { company: "", position: "", duration: "", description: "" },
  ]);

  const [projects, setProjects] = useState([
    { name: "", description: "", technologies: [], newTechnology: "" },
  ]);
  const [courses, setCourses] = useState([
    { name: "", institution: "", year: "" },
  ]);

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const [filteredTechnologies, setFilteredTechnologies] = useState([]);
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const techInputRef = useRef(null);
  const techDropdownRef = useRef(null);

  const [formErrors, setFormErrors] = useState({});

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const addEducation = () => {
    if (education.length < 2) {
      setEducation([...education, { institution: "", degree: "", year: "" }]);
    }
  };

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  const addProject = () => {
    if (projects.length < 3) {
      setProjects([
        ...projects,
        { name: "", description: "", technologies: [], newTechnology: "" },
      ]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (newSkill.trim() !== "") {
      const filtered = COMMON_SKILLS.filter(
        (skill) =>
          skill.toLowerCase().includes(newSkill.toLowerCase()) &&
          !skills.includes(skill)
      );
      setFilteredSkills(filtered);
      setIsDropdownOpen(filtered.length > 0);
    } else {
      setFilteredSkills([]);
      setIsDropdownOpen(false);
    }
  }, [newSkill, skills]);

  const handleAddSkill = () => {
    if (
      newSkill.trim() !== "" &&
      !skills.includes(newSkill.trim()) &&
      skills.length < 10
    ) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSelectSkill = (skill) => {
    if (!skills.includes(skill) && skills.length < 10) {
      setSkills([...skills, skill]);
    }
    setNewSkill("");
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  const removeProject = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const addCourse = () => {
    if (courses.length < 3) {
      setCourses([...courses, { name: "", institution: "", year: "" }]);
    }
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const addExperience = () => {
    if (experiences.length < 2) {
      setExperiences([
        ...experiences,
        { company: "", position: "", duration: "", description: "" },
      ]);
    }
  };

  const removeExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const handleRemoveTechnology = (projectIndex, techIndex) => {
    const newProjects = [...projects];
    newProjects[projectIndex].technologies.splice(techIndex, 1);
    setProjects(newProjects);
  };

  const handleTechInputChange = (e, index) => {
    const newProjects = [...projects];
    newProjects[index].newTechnology = e.target.value;
    setProjects(newProjects);
    setCurrentProjectIndex(index);
  };

  const handleSelectTechnology = (tech, index) => {
    const newProjects = [...projects];
    if (!newProjects[index].technologies.includes(tech)) {
      newProjects[index].technologies.push(tech);
      newProjects[index].newTechnology = "";
      setProjects(newProjects);
    }
    setIsTechDropdownOpen(false);
    techInputRef.current?.focus();
  };

  const handleTechKeyPress = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tech = projects[index].newTechnology.trim();
      if (tech && !projects[index].technologies.includes(tech)) {
        handleSelectTechnology(tech, index);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        techDropdownRef.current &&
        !techDropdownRef.current.contains(event.target) &&
        techInputRef.current &&
        !techInputRef.current.contains(event.target)
      ) {
        setIsTechDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentProjectIndex !== null) {
      const currentProject = projects[currentProjectIndex];
      const newTechnology = currentProject.newTechnology.trim();
      if (newTechnology !== "") {
        const filtered = COMMON_TECHNOLOGIES.filter(
          (tech) =>
            tech.toLowerCase().includes(newTechnology.toLowerCase()) &&
            !currentProject.technologies.includes(tech)
        );
        setFilteredTechnologies(filtered);
        setIsTechDropdownOpen(filtered.length > 0);
      } else {
        setFilteredTechnologies([]);
        setIsTechDropdownOpen(false);
      }
    }
  }, [projects, currentProjectIndex]);

  const validateForm = () => {
    const errors = {};

    if (skills.length === 0) {
      errors.skills = "Please add at least one skill.";
    }

    projects.forEach((project, index) => {
      if (project.technologies.length === 0) {
        errors[`project${index}Technologies`] =
          "Please add at least one technology for this project.";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log({ education, skills, experiences, projects, courses });
      toast.success("Resume details submitted successfully!");
    } else {
      // Form is invalid, display error message
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Resume Details
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Education Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="mr-2 text-indigo-500"
                />
                Education
              </h2>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor={`institution-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Institution
                      </label>
                      <input
                        type="text"
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`degree-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Degree
                      </label>
                      <input
                        type="text"
                        id={`degree-${index}`}
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`year-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        From Year
                      </label>
                      <input
                        type="text"
                        id={`year-${index}`}
                        value={edu.from_year}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "from_year",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`year-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        To Year
                      </label>
                      <input
                        type="text"
                        id={`year-${index}`}
                        value={edu.to_year}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "to_year",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              {/* {education.length < 2 && (
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Education
                </button>
              )} */}
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faLaptopCode}
                  className="mr-2 text-indigo-500"
                />
                Skills ({skills.length}/10){" "}
                <span className="text-red-500 ml-2">*</span>
              </h2>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="relative flex-grow">
                    <input
                      ref={inputRef}
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsDropdownOpen(true)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter a skill"
                      disabled={skills.length >= 10}
                    />
                    {isDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                      >
                        {filteredSkills.map((skill, index) => (
                          <div
                            key={index}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100"
                            onClick={() => handleSelectSkill(skill)}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className={`ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                      skills.length >= 10
                        ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                        : "text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }`}
                    disabled={skills.length >= 10}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
              </div>
              {formErrors.skills && (
                <p className="mt-2 text-sm text-red-600">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-2"
                  />
                  {formErrors.skills}
                </p>
              )}
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="mr-2 text-indigo-500"
                />
                Experience
              </h2>
              {experiences.map((experience, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`company-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id={`company-${index}`}
                        value={experience.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`position-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Position
                      </label>
                      <input
                        type="text"
                        id={`position-${index}`}
                        value={experience.position}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor={`duration-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Duration
                    </label>
                    <input
                      type="text"
                      id={`duration-${index}`}
                      value={experience.duration}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor={`description-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`description-${index}`}
                      rows={3}
                      value={experience.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
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
              {experiences.length < 2 && (
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

            {/* Projects Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faProjectDiagram}
                  className="mr-2 text-indigo-500"
                />
                Projects
              </h2>
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`project-name-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Project Name
                      </label>
                      <input
                        type="text"
                        id={`project-name-${index}`}
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(index, "name", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`project-technologies-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Technologies Used{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          ref={
                            index === currentProjectIndex ? techInputRef : null
                          }
                          type="text"
                          id={`project-technologies-${index}`}
                          value={project.newTechnology}
                          onChange={(e) => handleTechInputChange(e, index)}
                          onKeyPress={(e) => handleTechKeyPress(e, index)}
                          onFocus={() => {
                            setIsTechDropdownOpen(true);
                            setCurrentProjectIndex(index);
                          }}
                          className={`mt-1 block w-full border ${
                            formErrors[`project${index}Technologies`]
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                          placeholder="Add a technology"
                        />
                        {isTechDropdownOpen &&
                          currentProjectIndex === index && (
                            <div
                              ref={techDropdownRef}
                              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                              {filteredTechnologies.map((tech, techIndex) => (
                                <div
                                  key={techIndex}
                                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100"
                                  onClick={() =>
                                    handleSelectTechnology(tech, index)
                                  }
                                >
                                  {tech}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveTechnology(index, techIndex)
                              }
                              className="ml-2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        ))}
                      </div>
                      {formErrors[`project${index}Technologies`] && (
                        <p className="mt-2 text-sm text-red-600">
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            className="mr-2"
                          />
                          {formErrors[`project${index}Technologies`]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor={`project-description-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id={`project-description-${index}`}
                      rows={3}
                      value={project.description}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
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

            {/* Courses and Workshops Section */}
            {/* <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faBook}
                  className="mr-2 text-indigo-500"
                />
                Courses and Workshops
              </h2>
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor={`course-name-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Course Name
                      </label>
                      <input
                        type="text"
                        id={`course-name-${index}`}
                        value={course.name}
                        onChange={(e) =>
                          handleCourseChange(index, "name", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`course-institution-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Institution
                      </label>
                      <input
                        type="text"
                        id={`course-institution-${index}`}
                        value={course.institution}
                        onChange={(e) =>
                          handleCourseChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`course-year-${index}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Year
                      </label>
                      <input
                        type="text"
                        id={`course-year-${index}`}
                        value={course.year}
                        onChange={(e) =>
                          handleCourseChange(index, "year", e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(index)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {courses.length < 3 && (
                <button
                  type="button"
                  onClick={addCourse}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Course/Workshop
                </button>
              )}
            </div> */}

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
  );
};
export default FormComponent;
