import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const About = () => {
  return (
    <div className="bg-ivory-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-48 pb-24 border-b border-forest-green/10 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/clean-textile.png")' }}></div>
        <div className="section-padding relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif text-forest-green mb-6">
              Our Journey
            </motion.h1>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-premium-gold mx-auto mb-8"></motion.div>
            <motion.p variants={fadeInUp} className="text-xl text-forest-green/80 font-sans leading-relaxed">
              We started RVO Fabric Essentials with a simple conviction: luxury and sustainability should go hand-in-hand. Today, we craft timeless pieces from upcycled materials, creating a beautiful legacy for tomorrow.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding py-32">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp} className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 border-4 border-premium-gold/30 z-20 m-6 rounded-xl pointer-events-none transition-all duration-700 group-hover:m-4"></div>
            <img src="https://images.unsplash.com/photo-1616875267332-9cbce24daaa2?auto=format&fit=crop&w=800&q=80" alt="Sustainable Fabrics" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-8">
             <h2 className="text-4xl font-serif text-forest-green">Crafting With Purpose</h2>
             <p className="text-lg text-forest-green/70 leading-relaxed font-sans mt-4">
                Born in the heart of Mumbai, RVO celebrates authentic Indian heritage blended deeply with modern minimalism. We collaborate directly with local artisans, salvaging thousands of pounds of premium textiles that would have otherwise ended up in landfills.
             </p>
             <p className="text-lg text-forest-green/70 leading-relaxed font-sans">
                By choosing RVO, you aren't just purchasing a bag—you're making a statement about the future of fashion. You are part of an eco-conscious movement that refuses to compromise on quality or aesthetics.
             </p>
             <div className="pt-4 flex items-center space-x-6">
               <div className="text-center">
                 <h4 className="text-4xl font-serif text-premium-gold">10K+</h4>
                 <p className="text-sm font-sans text-forest-green/60 uppercase tracking-widest mt-1">Items Upcycled</p>
               </div>
               <div className="w-px h-16 bg-forest-green/10"></div>
               <div className="text-center">
                 <h4 className="text-4xl font-serif text-premium-gold">100%</h4>
                 <p className="text-sm font-sans text-forest-green/60 uppercase tracking-widest mt-1">Handcrafted</p>
               </div>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="bg-forest-green text-ivory-white py-32 relative overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-premium-gold/10 rounded-full blur-3xl -top-48 -right-48 pointer-events-none"></div>
        <div className="section-padding relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-premium-gold mb-4">Get In Touch</h2>
            <div className="w-16 h-1 bg-ivory-white mx-auto"></div>
            <p className="mt-6 text-lg text-ivory-white/70 max-w-2xl mx-auto font-sans">Have a question about our materials, a bulk order inquiry, or just want to chat sustainability? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <div className="space-y-10">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-premium-gold text-2xl flex-shrink-0">
                    <FiMapPin />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-2">Our Studio</h3>
                    <p className="text-ivory-white/70 font-sans leading-relaxed">
                      142 Green Avenue, Kala Ghoda<br/>
                      Mumbai, MH 400001<br/>
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-premium-gold text-2xl flex-shrink-0">
                    <FiMail />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-2">Email Us</h3>
                    <p className="text-ivory-white/70 font-sans">hello@rvofabric.com</p>
                    <p className="text-ivory-white/70 font-sans">support@rvofabric.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-premium-gold text-2xl flex-shrink-0">
                    <FiPhone />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-2">Call Us</h3>
                    <p className="text-ivory-white/70 font-sans">+91 98765 43210</p>
                    <p className="text-ivory-white/50 text-sm font-sans mt-1">Mon-Fri, 10am - 6pm IST</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-serif mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-forest-green transition-all transform hover:-translate-y-1"><FiInstagram className="text-xl"/></a>
                    <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-forest-green transition-all transform hover:-translate-y-1"><FiFacebook className="text-xl"/></a>
                    <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-premium-gold hover:text-forest-green transition-all transform hover:-translate-y-1"><FiTwitter className="text-xl"/></a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <form className="bg-white p-10 rounded-2xl shadow-2xl relative">
                <div className="absolute inset-0 bg-transparent border border-forest-green/5 m-2 rounded-xl pointer-events-none"></div>
                <h3 className="text-3xl font-serif text-forest-green mb-8">Send a Message</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-sans font-medium text-forest-green/80 mb-2">Full Name</label>
                    <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-colors text-forest-green" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-forest-green/80 mb-2">Email Address</label>
                    <input type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-colors text-forest-green" placeholder="jane@example.com" required />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-forest-green/80 mb-2">Your Message</label>
                    <textarea rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-colors text-forest-green resize-none" placeholder="How can we help you today?" required></textarea>
                  </div>
                  <button type="submit" className="w-full premium-btn text-lg py-4 flex items-center justify-center space-x-2 group">
                    <span>Send Message</span>
                    <FiSend className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
