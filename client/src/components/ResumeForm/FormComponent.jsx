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
} from "@fortawesome/free-solid-svg-icons";

const COMMON_SKILLS = [
  'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'PHP',
  'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js',
  'Express.js', 'Django', 'Flask', 'Spring Boot', 'MySQL',
  'PostgreSQL', 'MongoDB', 'Git', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'Google Cloud', 'Machine Learning', 'Data Analysis'
]

const FormComponent = () => {
  const [education, setEducation] = useState([
    { institution: "", degree: "", year: "" },
  ]);

  const [internship, setInternship] = useState({
    company: "",
    position: "",
    duration: "",
    description: "",
  });
  const [projects, setProjects] = useState([
    { name: "", description: "", technologies: "" },
  ]);
  const [courses, setCourses] = useState([
    { name: "", institution: "", year: "" },
  ]);

  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState('')
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleInternshipChange = (field, value) => {
    setInternship({ ...internship, [field]: value });
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
        { name: "", description: "", technologies: "" },
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (newSkill.trim() !== '') {
      const filtered = COMMON_SKILLS.filter(skill => 
        skill.toLowerCase().includes(newSkill.toLowerCase()) &&
        !skills.includes(skill)
      )
      setFilteredSkills(filtered)
      setIsDropdownOpen(filtered.length > 0)
    } else {
      setFilteredSkills([])
      setIsDropdownOpen(false)
    }
  }, [newSkill, skills])

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill('')
      setIsDropdownOpen(false)
    }
  }

  const handleRemoveSkill = (indexToRemove) => {
    setSkills(skills.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleSelectSkill = (skill) => {
    setNewSkill(skill)
    setIsDropdownOpen(false)
    inputRef.current?.focus()
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend or state management system
    if(skills.length!==0) {
      console.log({ education, skills, internship, projects, courses });
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
                        Year
                      </label>
                      <input
                        type="text"
                        id={`year-${index}`}
                        value={edu.year}
                        onChange={(e) =>
                          handleEducationChange(index, "year", e.target.value)
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
              {education.length < 2 && (
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add Education
                </button>
              )}
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon icon={faLaptopCode} className="mr-2 text-indigo-500" />
                Skills
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
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            </div>

            {/* Internship Experience Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="mr-2 text-indigo-500"
                />
                Internship Experience
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={internship.company}
                    onChange={(e) =>
                      handleInternshipChange("company", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={internship.position}
                    onChange={(e) =>
                      handleInternshipChange("position", e.target.value)
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  value={internship.duration}
                  onChange={(e) =>
                    handleInternshipChange("duration", e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={internship.description}
                  onChange={(e) =>
                    handleInternshipChange("description", e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
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
                        Technologies Used
                      </label>
                      <input
                        type="text"
                        id={`project-technologies-${index}`}
                        value={project.technologies}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "technologies",
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
            <div>
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
  );
};
export default FormComponent;
