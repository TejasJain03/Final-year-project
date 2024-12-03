/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import { PLANS } from "../../assets/constants"; // Import the plans from constants
import { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../utils/apiHandler";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan"); // Extract 'plan' from the URL query string
  const [key, setKey] = useState();
  const [isLoading, setIsLoading] = useState(false); // Loading state for the payment button
  const navigate = useNavigate();
  const selectedPlan = PLANS.find(
    (plan) => plan.name.toLowerCase() === planName?.toLowerCase()
  );

  const createOrder = async (amount) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/payment/create-order", {
        amount: amount,
      });

      const options = {
        key: key,
        amount: response.data.amount * 100,
        currency: response.data.currency,
        name: "Resume Builder",
        description: "Subscription payment",
        order_id: response.data.id,
        callback_url:
          "http://localhost:8081/api/v1/payment/paymentverification", // Your backend endpoint for verification
        theme: {
          color: "#399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.success", function (response) {
        navigate("/templates");
      });
      rzp1.on("payment.failed", function (response) {
        console.error(response);
        toast.error("Payment failed! Please try again.");
      });
      rzp1.open();
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      apiHandler(async () => {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get("/auth/check-auth");
      }, navigate)();
    };

    checkAuth();
    axios
      .get("/api/get-key")
      .then((response) => {
        setKey(response.data.key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Complete Your Purchase
      </h1>
      {selectedPlan ? (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Selected Plan: {selectedPlan.name}
          </h2>
          <p className="text-gray-700 text-lg mt-2">
            <span className="font-medium">Price: </span>
            <span className="text-green-600">
              ₹ {selectedPlan.price} / month
            </span>
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Features Included:
            </h3>
            <ul className="list-disc ml-5 mt-3 text-gray-700">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          {selectedPlan.notIncluded.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-red-600">
                Not Included:
              </h3>
              <ul className="list-disc ml-5 mt-3 text-gray-600">
                {selectedPlan.notIncluded.map((item, index) => (
                  <li key={index} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => createOrder(selectedPlan.price)}
              className={`${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none transition duration-300`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center text-lg mt-6">
          Plan not found. Please select a valid plan.
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
