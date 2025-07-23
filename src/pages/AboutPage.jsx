import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Heart, Star, Shield, Truck, Clock } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '5000+', label: 'Happy Customers', icon: Users },
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '10000+', label: 'Products Sold', icon: Star },
    { number: '99%', label: 'Customer Satisfaction', icon: Heart }
  ];

  const values = [
    {
      icon: Target,
      title: 'Quality First',
      description: 'We source only the finest stationery and art supplies to ensure you get the best value for your money.'
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: 'With over 15 years in business, we have built a reputation for reliability and excellence in customer service.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery to your doorstep. Most orders are processed and shipped within 24 hours.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our dedicated customer support team is available round the clock to assist you with any queries.'
    }
  ];

  const team = [
    {
      name: 'Nishant Gupta',
      role: 'Founder & CEO',
      description: 'Passionate about bringing quality stationery to everyone. Leading the company with vision and dedication.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Vedika Sharma',
      role: 'Head of Operations',
      description: 'Ensuring smooth operations and customer satisfaction. Expert in supply chain management.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Raj Patel',
      role: 'Creative Director',
      description: 'Bringing creativity to our product selection and marketing. Passionate about art and design.',
      image: '/api/placeholder/300/300'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-purple-600/10 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Ved Stationary & Graphics
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your trusted partner for all stationery and graphic design needs since 2009
            </p>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <line x1="10" y1="9" x2="8" y2="9"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  From Humble Beginnings to Industry Leader
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded in 2009 in the heart of Delhi, Ved Stationary & Graphics began as a small family business with a simple mission: to provide high-quality stationery and art supplies to students, professionals, and artists at affordable prices.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  What started as a single store in Subhash Vihar has now grown into a trusted name in the stationery industry, serving thousands of customers across India. Our commitment to quality, customer service, and innovation has been the driving force behind our success.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Today, we continue to evolve with the times, embracing digital transformation while maintaining our core values of quality and customer satisfaction.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Values</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and help us deliver exceptional service to our customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-primary/10 rounded-full p-4">
                      <IconComponent className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Meet Our Team</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Behind every great company are great people. Meet the passionate individuals who make Ved Stationary & Graphics what it is today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <Users className="h-16 w-16 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience the Ved Difference?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of satisfied customers who trust us for their stationery needs. 
              Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </motion.a>
              <motion.a
                href="tel:+919899459288"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
