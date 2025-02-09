import React from 'react';
import { HelpCircle, Package, CreditCard, Truck, Mail, Flower2 } from 'lucide-react';

const ServiceBenefits = () => {
  const benefits = [
    {
      icon: HelpCircle,
      title: "Questions fréquemment posées",
    },
    {
      icon: Package,
      title: "Livraison gratuite dès 39€",
    },
    {
      icon: CreditCard,
      title: "Paiement securisé",
    },
    {
      icon: Truck,
      title: "Expédition sous 2 jours",
    },
    {
      icon: Mail,
      title: "Joignez notre service client",
    },
    {
      icon: Flower2,
      title: "Nos engagements qualités",
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className="flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-pink-50">
              <benefit.icon 
                className="w-6 h-6 text-gray-700"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-sm text-gray-700">
              {benefit.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBenefits;