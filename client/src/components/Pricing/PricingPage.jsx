import { useState } from "react";
import PricingCard from "./PricingCard";
import { PLANS } from "../../assets/constants";

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 animate-gradient-x">
              Choose Your Plan
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to boost your career with our professional
            resume builder.
          </p>
        </div>

        <div className="mt-16 space-y-8 sm:mt-20 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-8 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.plan}
              plan={plan}
              isHovered={hoveredPlan === plan.plan}
              onMouseEnter={() => setHoveredPlan(plan.plan)}
              onMouseLeave={() => setHoveredPlan(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
