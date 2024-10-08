/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import template_One from '../../assets/templates/template1.jpg';

const templates = [
  { id: 1, name: 'Professional', image: template_One },
  { id: 2, name: 'Creative', image: template_One },
  { id: 3, name: 'Modern', image: template_One },
  { id: 4, name: 'Simple', image: template_One },
  { id: 5, name: 'Executive', image: template_One },
  { id: 6, name: 'Tech', image: template_One },
]

const TemplateSelectionPage = () => {
  const navigate = useNavigate()

  const handleTemplateClick = (templateId) => {
    navigate(`/create-resume`)
  }

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
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer p-2"
              onClick={() => handleTemplateClick(template.id)}
            >
              <img
                src={template.image}
                alt={`${template.name} Template`}
                className="block mx-auto w-auto h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{template.name}</h2>
                <p className="mt-2 text-gray-600">Click to use this template</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplateSelectionPage;