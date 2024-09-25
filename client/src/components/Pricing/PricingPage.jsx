import PricingCard from './PricingCard';

const PricingPage= () => {
  const plans = [
    {
      plan: 1,
      name: 'Pro',
      price: 9.99,
      features: [
        'Unlimited resume templates',
        'AI-powered content suggestions',
        'Export to PDF and Word',
        'Cover letter builder',
        '24/7 customer support',
      ],
      notIncluded: ['Custom domain'],
    },
    {
      plan: 2,
      name: 'Enterprise',
      price: 19.99,
      features: [
        'All Pro features',
        'Custom domain',
        'Team collaboration',
        'Analytics dashboard',
        'Priority support',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan to boost your career with our professional resume builder.
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {plans.map((plan) => (
            <PricingCard key={plan.plan} plan={plan}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;


