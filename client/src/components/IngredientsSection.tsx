import { ingredientInfo } from '@/data/fragrance_details';
import { AlertCircle } from 'lucide-react';

export default function IngredientsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {ingredientInfo.title}
          </h2>
          <p className="text-lg text-gray-600">
            {ingredientInfo.description}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Allergen Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
            <div className="flex gap-4">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">Allergy Warning</h3>
                <p className="text-amber-800">
                  If you have known sensitivities or allergies, please check the allergen list below before using our products. If you experience an allergic reaction, stop use immediately and consult a healthcare professional.
                </p>
              </div>
            </div>
          </div>

          {/* Common Allergens */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Common Allergens Present</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ingredientInfo.commonAllergens.map((allergen, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors"
                >
                  <p className="font-medium text-gray-800">{allergen}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Present in our fragrances
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
            <p className="text-blue-800">
              {ingredientInfo.disclaimer}
            </p>
          </div>

          {/* Contact for More Info */}
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg text-center">
            <h4 className="font-semibold text-primary mb-2">Questions About Ingredients?</h4>
            <p className="text-gray-700 mb-4">
              Contact us for detailed information about the ingredients of a specific product.
            </p>
            <a
              href="https://wa.me/16045186863?text=Hello! I would like to know more about the ingredients of CS Fragrances products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
            >
              Contact Us via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
