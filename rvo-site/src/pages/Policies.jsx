import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Policies = () => {
  const [activeSection, setActiveSection] = useState('shipping');

  const policies = [
    {
      id: 'shipping',
      title: 'Shipping Policy',
      content: (
        <div className="space-y-4">
          <p>At RVO Fabric Essentials, we are committed to sustainable practices from production to delivery.</p>
          <ul className="list-disc pl-5 space-y-2 text-forest-green/80">
            <li><strong>Standard Shipping:</strong> Free on all orders over ₹999. Usually takes 5-7 business days within India.</li>
            <li><strong>Express Shipping:</strong> Available for ₹150. Delivered within 2-3 business days.</li>
            <li><strong>Packaging:</strong> All our items are shipped in 100% biodegradable and compostable mailers. We use absolutely zero single-use plastics.</li>
            <li><strong>Carbon Offset:</strong> We invest a percentage of every shipping cost into carbon-offset programs.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'returns',
      title: 'Return & Exchange Policy',
      content: (
        <div className="space-y-4">
          <p>We want you to love your eco-friendly gear. If you are not entirely satisfied, we offer a hassle-free return process.</p>
          <ul className="list-disc pl-5 space-y-2 text-forest-green/80">
            <li><strong>7-Day Returns:</strong> Items can be returned within 7 days of delivery for a full refund or exchange.</li>
            <li><strong>Condition:</strong> Products must be unused, unwashed, and in their original packaging with tags intact.</li>
            <li><strong>Process:</strong> Contact us at returns@rvofabric.com to initiate a return. We will arrange a reverse pickup.</li>
            <li><strong>Refunds:</strong> Processed within 5-7 working days after the returned item passes quality inspection.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      content: (
        <div className="space-y-4">
          <p>Your privacy and digital security are critically important to us.</p>
          <ul className="list-disc pl-5 space-y-2 text-forest-green/80">
            <li><strong>Data Collection:</strong> We only collect information necessary to fulfill your orders and improve your shopping experience (name, address, email).</li>
            <li><strong>Security:</strong> All payment transactions are encrypted using secure socket layer technology (SSL) via our payment gateway partners.</li>
            <li><strong>No Sharing:</strong> We do not sell, trade, or rent your personal identification information to others.</li>
            <li><strong>Cookies:</strong> We use minimal cookies strictly to retain your cart contents and session state.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'sustainability',
      title: 'Our Sustainability Pledge',
      content: (
        <div className="space-y-4">
          <p>RVO is built on a foundation of environmental responsibility.</p>
          <ul className="list-disc pl-5 space-y-2 text-forest-green/80">
            <li><strong>Upcycled Materials:</strong> We guarantee that at least 85% of every product is made from rescued textiles and upcycled materials.</li>
            <li><strong>Fair Wage:</strong> All our artisans are paid above-average living wages in safe, ethical working conditions.</li>
            <li><strong>Zero Waste:</strong> Our production floor operates on a zero-waste policy. Scraps are recycled into smaller accessories.</li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-ivory-white min-h-screen">
      {/* Spacer for fixed navbar */}
      <div className="h-32 md:h-40"></div>

      <div className="section-padding pt-0 pb-24 max-w-5xl mx-auto">
        <h1 className="text-5xl font-serif text-forest-green mb-6 text-center">Store Policies</h1>
        <p className="text-center text-forest-green/70 max-w-2xl mx-auto mb-16 text-lg">
          Transparent, ethical, and customer-first. Read through our operational guidelines below.
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-forest-green/5 p-4 sticky top-40">
              <nav className="flex flex-col space-y-2">
                {policies.map((policy) => (
                  <button
                    key={policy.id}
                    onClick={() => setActiveSection(policy.id)}
                    className={`text-left px-6 py-4 rounded-xl transition-all font-medium text-lg ${
                      activeSection === policy.id
                        ? 'bg-forest-green text-white shadow-md'
                        : 'text-forest-green/70 hover:bg-forest-green/5 hover:text-forest-green'
                    }`}
                  >
                    {policy.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow">
            <div className="bg-white rounded-2xl shadow-sm border border-forest-green/5 p-8 md:p-12 min-h-[400px]">
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  className={`transition-opacity duration-300 ${
                    activeSection === policy.id ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  <h2 className="text-3xl font-serif text-forest-green mb-8 pb-4 border-b border-forest-green/10">
                    {policy.title}
                  </h2>
                  <div className="text-lg leading-relaxed text-forest-green/90 font-sans">
                    {policy.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Policies;
