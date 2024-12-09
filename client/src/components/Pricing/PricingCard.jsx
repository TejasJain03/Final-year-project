/* eslint-disable react/prop-types */
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"


export default function PricingCard({ plan }) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
        <div className="px-8 pt-8 pb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            The perfect plan for {plan.name === "Pro" ? "Professionals" : "Enterprises"}.
          </p>
          <p className="mt-8 mb-6">
            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              ₹{plan.price}
            </span>
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
          </p>
          <Link
            to={`/payment?plan=${plan.name.toLowerCase()}`}
            className="block w-full px-6 py-3 text-center text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Get {plan.name}
          </Link>
        </div>
        <div className="px-8 pt-6 pb-8 bg-gray-50 dark:bg-gray-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">What&apos;s included</h4>
          <ul className="space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5"
                  aria-hidden="true"
                />
                <span className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
            {plan.notIncluded.map((feature) => (
              <li key={feature} className="flex items-start text-gray-400 dark:text-gray-500">
                <FontAwesomeIcon
                  icon={faTimes}
                  className="flex-shrink-0 h-5 w-5 text-red-400 mt-0.5"
                  aria-hidden="true"
                />
                <span className="ml-3 text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}