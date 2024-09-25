/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PricingCard = ({ plan }) => {
    return (
        <div
            key={plan.name}
            className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
        >
            <div className="flex flex-col items-center p-6">
                <h3 className="text-xl font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-500">
                    The perfect plan for {plan.name === "Pro" ? "Professionals" : "Enterprises"}.
                </p>
                <p className="my-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                        ${plan.price}
                    </span>
                    <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <Link
                    to={`/payment?plan=${plan.name.toLowerCase()}`}
                    className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md mx-auto"
                >
                    <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                    <span className="relative px-6 py-3 transition-all ease-out bg-white rounded-md group-hover:bg-opacity-0 duration-400">
                        <span className="relative text-black">Get {plan.name}</span>
                    </span>
                </Link>
            </div>
            <div className="pt-6 pb-8 px-6 flex flex-col items-center">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                    What's included
                </h4>
                <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                            <FontAwesomeIcon
                                icon={faCheck}
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                aria-hidden="true"
                            />
                            <span className="text-sm text-gray-500">{feature}</span>
                        </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="flex-shrink-0 h-5 w-5 text-red-500"
                                aria-hidden="true"
                            />
                            <span className="text-sm text-gray-500">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PricingCard;
