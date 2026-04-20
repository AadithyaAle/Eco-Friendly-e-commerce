import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-ivory-white min-h-screen">
      {/* Spacer for fixed navbar */}
      <div className="h-24 md:h-32"></div>
      
      <div className="section-padding pb-24 pt-0">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-forest-green mb-4">Get in Touch</h1>
            <p className="text-forest-green/70 text-lg max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about our upcycled products, shipping, or anything else, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-forest-green/10 shadow-sm">
                <h3 className="text-2xl font-serif text-forest-green mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-forest-green/5 flex items-center justify-center flex-shrink-0 text-premium-gold text-xl">
                      <FiMail />
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-green mb-1">Email Us</h4>
                      <p className="text-forest-green/70">support@rvofabric.com</p>
                      <p className="text-forest-green/70">hello@rvofabric.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-forest-green/5 flex items-center justify-center flex-shrink-0 text-premium-gold text-xl">
                      <FiPhone />
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-green mb-1">Call Us</h4>
                      <p className="text-forest-green/70">+91 98765 43210</p>
                      <p className="text-forest-green/70">Mon-Fri, 9am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-forest-green/5 flex items-center justify-center flex-shrink-0 text-premium-gold text-xl">
                      <FiMapPin />
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-green mb-1">Visit Us</h4>
                      <p className="text-forest-green/70">123 Green Avenue, Sector 4<br />Eco Park District<br />Mumbai, MH 400001<br />India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-2xl border border-forest-green/10 shadow-sm">
                <h3 className="text-2xl font-serif text-forest-green mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-forest-green mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-forest-green mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-forest-green mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold focus:outline-none transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-forest-green mb-2">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-premium-gold focus:ring-1 focus:ring-premium-gold focus:outline-none transition-colors resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`premium-btn flex items-center justify-center space-x-2 w-full md:w-auto px-8 py-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    {!isSubmitting && <FiSend />}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
