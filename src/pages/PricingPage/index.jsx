import React from 'react';
import { pricingPlans } from '../../utils/constants';

const PricingPage = () => {
  return (
    <div className="w-full bg-gray-100 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Pricing Plans</h1>
        <p className="mt-4 text-lg text-gray-600">Choose the best plan that fits your needs.</p>
      </header>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </div>
  );
};

const PricingCard = ({ plan }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 text-center bg-gray-800 text-white">
        <h2 className="text-2xl font-semibold">{plan.title}</h2>
        <p className="mt-4 text-4xl font-bold">{plan.price}</p>
        <p className="mt-4 text-gray-300">{plan.description}</p>
      </div>
      <ul className="px-6 py-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center py-2 border-b last:border-b-0">
              <span className="mr-4 text-green-500">✔</span>
              <span>{feature}</span>
            </li>
          ))}
      </ul>
      <div className="px-6 py-4">
        <button className={`w-full py-2 rounded-md ${plan.buttonStyle}`}>{plan.buttonText}</button>
      </div>
    </div>
  );
};

export default PricingPage;
