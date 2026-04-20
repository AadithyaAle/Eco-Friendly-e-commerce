import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "Are your products 100% sustainable?",
      answer: "Yes, we exclusively use upcycled materials, end-of-roll fabrics, and eco-friendly practices to ensure a minimal environmental footprint."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 4-6 business days. Express shipping options are also available at checkout for faster delivery."
    },
    {
      question: "Do you accept returns or exchanges?",
      answer: "We offer a 7-day easy return policy for all unused products in their original packaging. Just contact our support team."
    },
    {
      question: "How do I care for my upcycled bag?",
      answer: "Spot clean with mild soap and cold water. We highly recommend air-drying in the shade to preserve the fabric's integrity."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship all across India. We are working hard to expand our logistics to support international shipping soon!"
    },
    {
      question: "Can I cancel my order after placing it?",
      answer: "You can cancel your order within 24 hours of placing it. Once the order has been processed and shipped, we cannot cancel it, but you may initiate a return after receiving it."
    }
  ];

  return (
    <div className="bg-ivory-white min-h-screen">
      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-32"></div>
      
      <div className="section-padding pb-24 pt-0">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-forest-green mb-4">Frequently Asked Questions</h1>
            <p className="text-forest-green/70 text-lg">Everything you need to know about our products, shipping, and policies.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-forest-green/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button 
                  className="w-full flex justify-between items-center p-6 text-left font-medium text-forest-green hover:text-premium-gold transition-colors focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-xl font-serif">{faq.question}</span>
                  <FiChevronDown className={`text-2xl transition-transform duration-300 flex-shrink-0 ml-4 ${openFaq === index ? 'rotate-180 text-premium-gold' : 'text-forest-green/50'}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-forest-green/80 leading-relaxed text-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-forest-green/5 p-8 rounded-2xl border border-forest-green/10">
            <h3 className="text-2xl font-serif text-forest-green mb-3">Still have questions?</h3>
            <p className="text-forest-green/70 mb-6">We're here to help! Send us a message and we'll get back to you shortly.</p>
            <a href="/contact" className="premium-btn inline-block">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
