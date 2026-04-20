import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const About = () => {
  return (
    <div className="bg-ivory-white min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 border-b border-forest-green/10 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/clean-textile.png")'
          }}
        ></div>

        <div className="section-padding relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-serif text-forest-green mb-6"
            >
              Our Journey
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="w-24 h-1 bg-premium-gold mx-auto mb-8"
            ></motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-forest-green/80 font-sans leading-relaxed"
            >
              We started RVO Fabric Essentials with a simple conviction:
              luxury and sustainability should go hand-in-hand. Today, we
              craft timeless pieces from upcycled materials, creating a
              beautiful legacy for tomorrow.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >

          {/* Image (NO CROPPING) */}
        <motion.div
  variants={fadeInUp}
  className="relative w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center p-2"
>
  {/* Border effect */}
  <div className="absolute inset-0 border-4 border-premium-gold/30 z-20 m-3 rounded-xl pointer-events-none transition-all duration-700 group-hover:m-1"></div>

  {/* Image */}
  <img
    src="/Product/about us.jpg"
    alt="Sustainable Fabrics"
    loading="lazy"
    className="w-full h-full max-h-[90vh] object-contain transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
  />
</motion.div>
          {/* Content */}
          <motion.div variants={fadeInUp} className="space-y-8">

            <h2 className="text-4xl font-serif text-forest-green">
              Crafting With Purpose
            </h2>

            <p className="text-lg text-forest-green/70 leading-relaxed font-sans mt-4">
              Born in the heart of Mumbai, RVO celebrates authentic Indian
              heritage blended deeply with modern minimalism. We collaborate
              directly with local artisans, salvaging thousands of pounds of
              premium textiles that would have otherwise ended up in landfills.
            </p>

            <p className="text-lg text-forest-green/70 leading-relaxed font-sans">
              By choosing RVO, you aren't just purchasing a bag—you're making
              a statement about the future of fashion. You are part of an
              eco-conscious movement that refuses to compromise on quality
              or aesthetics.
            </p>

            {/* Stats */}
            <div className="pt-4 flex items-center space-x-6">

              <div className="text-center">
                <h4 className="text-4xl font-serif text-premium-gold">10K+</h4>
                <p className="text-sm font-sans text-forest-green/60 uppercase tracking-widest mt-1">
                  Items Upcycled
                </p>
              </div>

              <div className="w-px h-16 bg-forest-green/10"></div>

              <div className="text-center">
                <h4 className="text-4xl font-serif text-premium-gold">100%</h4>
                <p className="text-sm font-sans text-forest-green/60 uppercase tracking-widest mt-1">
                  Handcrafted
                </p>
              </div>

            </div>

          </motion.div>

        </motion.div>
      </section>

    </div>
  );
};

export default About;