import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCrown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from a backend or state management system
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    profilePic: "https://storage.googleapis.com/pod_public/1300/177863.jpg",
    premiumPlan: "Pro", // Set to null or empty string to show the pricing button
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={user.profilePic} alt={user.name} />
        </div>
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Profile</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{user.name}</h1>
          <div className="space-y-4">
            <p className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-indigo-500" />
              {user.email}
            </p>
            <p className="flex items-center text-gray-600">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-indigo-500" />
              {user.phone}
            </p>
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
      <div className="mt-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Overview</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Resume Statistics</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total Resumes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">3</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">July 1, 2023</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Downloads</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">24</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
