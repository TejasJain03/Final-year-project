import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import axios from '../../utils/axiosConfig'
import { ToastContainer, toast } from 'react-toastify'
import apiHandler from '../../utils/apiHandler'
import 'react-toastify/dist/ReactToastify.css'
import { PLANS } from '../../assets/constants'

export default function PaymentPage() {
  const [searchParams] = useSearchParams()
  const planName = searchParams.get('plan')
  const [key, setKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const selectedPlan = PLANS.find(
    (plan) => plan.name.toLowerCase() === planName?.toLowerCase()
  )

  const createOrder = async (amount) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/payment/create-order', { amount })

      const options = {
        key: key,
        amount: response.data.amount * 100,
        currency: response.data.currency,
        name: 'Resume Builder',
        description: 'Subscription payment',
        order_id: response.data.id,
        callback_url: `http://localhost:8081/api/v1/payment/paymentverification/${amount}`,
        theme: { color: '#6366f1' },
      }

      const rzp1 = new (window).Razorpay(options)
      rzp1.on('payment.success', () => navigate('/templates'))
      rzp1.on('payment.failed', () => toast.error('Payment failed! Please try again.'))
      rzp1.open()
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = () => {
      apiHandler(async () => {
        await axios.get('/auth/check-auth')
      }, navigate)()
    }

    checkAuth()
    axios.get('/api/get-key')
      .then((response) => setKey(response.data.key))
      .catch((err) => console.error(err))
  }, [navigate])

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-5xl mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Plan Not Found</h1>
          <p className="text-gray-600 mb-4">Please select a valid plan to continue.</p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            View Plans
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-extrabold mb-4">Complete Your Purchase</h2>
            <p className="text-xl mb-6">You&apos;re just one step away from unlocking premium features!</p>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 mr-2" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 mr-2" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
          <div className="md:w-2/3 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Selected Plan: {selectedPlan.name}</h3>
            <p className="text-3xl font-bold text-indigo-600 mb-8">₹ {selectedPlan.price} <span className="text-lg text-gray-500 font-normal">/month</span></p>
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">Features Included:</h4>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {selectedPlan.notIncluded.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Not Included:</h4>
                <ul className="space-y-2">
                  {selectedPlan.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-500">
                      <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => createOrder(selectedPlan.price)}
              disabled={isLoading}
              className={`w-full md:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} transition duration-300`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                  Proceed to Payment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}