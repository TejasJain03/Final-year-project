import { useState } from "react";
import axios from "../../../utils/axiosConfig";

export default function ResumeForm() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    contact: {
      phone: "",
      email: "",
      links: [{ name: "", url: "" }],
    },
    profilePicture: null, // Store as File object
    profilePicturePreview: "", // Preview URL
    summary: "",
    education: [{ degree: "", years: "", institution: "", details: "" }],
    skills: {
      languages: "",
      interface: "",
      frameworks: "",
      database: "",
      tools: "",
    },
    internships: [{ title: "", duration: "", description: "" }],
    projects: [{ title: "", duration: "", technologies: "", description: "" }],
    achievements: [""],
  });

  // Generic change handler
  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (section) {
        if (Array.isArray(prevData[section])) {
          const updatedArray = [...prevData[section]];
          updatedArray[index] = {
            ...updatedArray[index],
            [name]: value,
          };
          return { ...prevData, [section]: updatedArray };
        } else {
          return {
            ...prevData,
            [section]: { ...prevData[section], [name]: value },
          };
        }
      }
      return { ...prevData, [name]: value };
    });
  };

  const addItem = (section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], section === "achievements" ? "" : {}],
    }));
  };

  const removeItem = (section, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the file to Base64 and update the state
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: base64Image, // Store Base64 string
        }));
      };
      reader.readAsDataURL(file); // This will convert the file to a Base64 string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the payload, including the Base64 image string
      const data = {
        template: 3,
        ...formData,
      };

      const response = await axios.post("/resume/create-resume", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Resume created successfully:", response.data);
    } catch (err) {
      console.error("Error creating resume:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h1 className="text-3xl font-bold mb-6">Resume Form</h1>

      {/* Title and Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* Profile Picture */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {formData.profilePicture && (
          <div className="mt-4">
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.contact.phone}
          onChange={(e) => handleChange(e, "contact", 0)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.contact.email}
          onChange={(e) => handleChange(e, "contact", 0)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Links
        </label>
        {formData.contact.links.map((link, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              name="name"
              value={link.name}
              onChange={(e) => handleChange(e, "contact.links", index)}
              placeholder="Link Name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="url"
              name="url"
              value={link.url}
              onChange={(e) => handleChange(e, "contact.links", index)}
              placeholder="URL"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeItem("contact.links", index)}
              className="bg-red-500 text-white px-3 py-2 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem("contact.links")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Link
        </button>
      </div>

      {/* Education */}
      {formData.education.map((edu, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Degree</label>
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleChange(e, "education", index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label className="block text-sm font-medium text-gray-700">Years</label>
          <input
            type="text"
            name="years"
            value={edu.years}
            onChange={(e) => handleChange(e, "education", index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label className="block text-sm font-medium text-gray-700">Institution</label>
          <input
            type="text"
            name="institution"
            value={edu.institution}
            onChange={(e) => handleChange(e, "education", index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label className="block text-sm font-medium text-gray-700">Details</label>
          <textarea
            name="details"
            value={edu.details}
            onChange={(e) => handleChange(e, "education", index)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={() => removeItem("education", index)}
            className="bg-red-500 text-white px-3 py-2 rounded-md"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem("education")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Add Education
      </button>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md"
        >
          Submit Resume
        </button>
      </div>
    </form>
  );
}
