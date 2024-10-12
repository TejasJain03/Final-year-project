/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import template_One from '../../assets/templates/template1.jpg';
import { useEffect, useRef, useState } from 'react';

const templates = [
  { id: 1, name: 'Professional', image: template_One, description: 'A professional template suitable for various industries.' },
  // { id: 2, name: 'Creative', image: template_One },
  // { id: 3, name: 'Modern', image: template_One },
  // { id: 4, name: 'Simple', image: template_One },
  // { id: 5, name: 'Executive', image: template_One },
  // { id: 6, name: 'Tech', image: template_One },
]

const TemplateSelectionPage = () => {
  const navigate = useNavigate()

  const [previewImage, setPreviewImage] = useState(null)
  const previewRef = useRef(null)

  const handleMouseClick = (image) => {
    setPreviewImage(image)
  }

  const handleMouseLeave = () => {
    setPreviewImage(null)
  }

  const handleTemplateClick = (templateId) => {
    navigate(`/create-resume`)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target)) {
        setPreviewImage(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Choose Your Resume Template
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 p-2"
            >
              <img
                src={template.image}
                alt={`${template.name} Template`}
                className="block mx-auto w-auto h-64 object-cover cursor-pointer"
                onClick={() => handleMouseClick(template.image)}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{template.name}</h2>
                <p className="text-gray-600">{template.description}</p>
                <p className="mt-2 text-blue-600 cursor-pointer" onClick={() => handleTemplateClick(template.id)}>Choose this template</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl">
            <img
              ref={previewRef}
              src={previewImage}
              alt="Template Preview"
              className="w-full h-auto object-contain max-h-[80vh]"
            />
            {/* <button
              className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 focus:outline-none"
              onClick={handleMouseLeave}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelectionPage;