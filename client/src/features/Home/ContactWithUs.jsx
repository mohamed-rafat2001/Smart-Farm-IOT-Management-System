import { motion } from 'framer-motion';
import HeroSection from '../../ui/HeroSection';
import contactImage from '../../assets/contact-image.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const inputStyles = `w-full bg-[#1b2127]/50 border border-stone-700/50 rounded-xl px-4 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-stone-600`;
const labelStyles = `text-sm font-medium text-stone-300 ml-1`;

function ContactWithUs() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-20"
    >
      <motion.div variants={itemVariants}>
        <HeroSection
          image={contactImage}
          bigText="Contact Us"
          smallText="We're here to help! Reach out to us with any questions, feedback, or support requests."
        />
      </motion.div>

      {/* Contact Content Section */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[2.5rem] border border-stone-700/50 bg-[#283039]/30 p-8 shadow-2xl sm:p-10"
            >
              <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-blue-600/5 blur-[100px]" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Get in Touch
                  </h2>
                  <p className="text-lg leading-relaxed text-stone-400">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className={labelStyles}>
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={inputStyles}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className={labelStyles}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={inputStyles}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className={labelStyles}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={inputStyles}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className={labelStyles}>
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        className={`${inputStyles} appearance-none pr-10`}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-stone-500">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className={labelStyles}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`${inputStyles} resize-none`}
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500 hover:shadow-blue-500/40"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="space-y-12 lg:pt-10">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Other Ways to Connect
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      title: 'Email Us',
                      info: 'support@agritech.com',
                      icon: (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                      color: 'blue',
                    },
                    {
                      title: 'Call Us',
                      info: '+1 (555) 123-4567',
                      icon: (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                      color: 'green',
                    },
                    {
                      title: 'Office',
                      info: '123 Tech Street, Suite 100, Innovation City',
                      icon: (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ),
                      color: 'orange',
                    },
                  ].map((item, i) => (
                    <div key={i} className="group flex items-start gap-6">
                      <div
                        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-${item.color}-500/10 text-${item.color}-500 transition-all duration-300 group-hover:bg-${item.color}-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-lg group-hover:shadow-${item.color}-500/20`}
                      >
                        {item.icon}
                      </div>
                      <div className="pt-1">
                        <h4 className="text-lg font-bold text-white transition-colors group-hover:text-blue-400">
                          {item.title}
                        </h4>
                        <p className="text-stone-400">{item.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white shadow-2xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <h3 className="relative z-10 mb-4 text-2xl font-bold">
                  Need Immediate Help?
                </h3>
                <p className="relative z-10 mb-6 leading-relaxed text-blue-100">
                  Check out our documentation or FAQ section for quick answers
                  to common questions.
                </p>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="relative z-10 flex items-center gap-2 rounded-xl border border-white/20 bg-white/20 px-6 py-3 font-semibold backdrop-blur-md transition-all hover:bg-white/30"
                >
                  Visit Help Center
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default ContactWithUs;
