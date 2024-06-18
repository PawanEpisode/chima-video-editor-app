import React from 'react';
import { featuresData } from '../../utils/constants';

const FeaturesPage = () => {
  return (
    <div className=" bg-gray-100 p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">Our Features</h1>
        <p className="mt-4 text-lg text-gray-600">Explore the powerful features our platform offers.</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </main>
    </div>
  );
};

const FeatureCard = ({ feature }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h2>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export default FeaturesPage