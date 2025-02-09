import React from 'react';
import { Instagram, Youtube, Facebook} from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Nos engagements",
      links: [
        "Qui sommes-nous ?",
        "Nos producteurs engagés",
        "Notre démarche pour l'humain, le climat et la biodiversité",
        "Nos boutiques ateliers",
        "Recrutement"
      ]
    },
    {
      title: "Nos services",
      links: [
        "Contactez-nous",
        "Boutique - Accès points et malveillants",
        "Frais de port",
        "Paiement sécurisé",
        "Mentions légales et cookies",
        "Conditions générales de vente",
        "Charte des données personnelles",
        "Programme parrainage",
        "Carte cadeau Bio Et Bien Etre",
        "Plan du site"
      ]
    },
    {
      title: "Nos conseils",
      links: [
        "FAQ",
        "Vos bilans beauté",
        "Exculsivité web",
        "L'article du jour"
      ]
    }
  ];

  return (
    <footer className="bg-[#faf5f0] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-gray-800">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Payment Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="w-5 h-5" />
              </a>
            
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">Tous les paiements sont sécurisés</p>
              <div className="flex space-x-2">
                <img src="../public/docs/img/visa.svg" alt="Visa" className="h-6" />
                <img src="../public/docs/img/mastercard.svg" alt="Mastercard" className="h-6" />
                <img src="../public/docs/img/paypal.svg" alt="Other payment" className="h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Leaf */}
      
      </div>
    </footer>
  );
};

export default Footer;