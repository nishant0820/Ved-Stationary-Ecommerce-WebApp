import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, FileText, Users, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FileText className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              StarScrib - Your agreement with us
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-primary" />
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to StarScrib ("we," "our," or "us"). These Terms and Conditions ("Terms") 
                govern your use of our website and services. By accessing or using our website, you agree to be bound 
                by these Terms. If you disagree with any part of these terms, then you may not access our service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2 text-primary" />
                2. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  By creating an account, making a purchase, or using any of our services, you acknowledge that you have 
                  read, understood, and agree to be bound by these Terms and Conditions.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                  posting on our website. Your continued use of our services after any changes constitutes acceptance 
                  of the new Terms.
                </p>
              </div>
            </section>

            {/* Products and Services */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Products and Services
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  StarScrib offers a wide range of stationary items, office supplies, art materials, 
                  and graphic design services. All products are subject to availability.
                </p>
                <p>
                  We reserve the right to discontinue any product or service at any time without notice. Prices are 
                  subject to change without prior notice.
                </p>
                <p>
                  Product descriptions and images are provided for convenience only and may not be entirely accurate. 
                  We strive to ensure all information is correct but cannot guarantee absolute accuracy.
                </p>
              </div>
            </section>

            {/* Orders and Payment */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Orders and Payment
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong>Order Acceptance:</strong> All orders are subject to acceptance by us. We reserve the right 
                  to refuse or cancel any order for any reason at our sole discretion.
                </p>
                <p>
                  <strong>Payment:</strong> Payment must be made in full at the time of purchase. We accept various 
                  payment methods including credit cards, debit cards, and online payment gateways through Razorpay.
                </p>
                <p>
                  <strong>Pricing:</strong> All prices are listed in Indian Rupees (INR) and include applicable taxes 
                  unless otherwise stated. Shipping charges are additional and will be calculated at checkout.
                </p>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Shipping and Delivery
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  We aim to process and ship orders within 2-3 business days. Delivery times may vary based on location 
                  and shipping method selected.
                </p>
                <p>
                  Free shipping is available on orders above ₹500. Standard shipping charges apply to orders below this amount.
                </p>
                <p>
                  Risk of loss and title for items purchased pass to you upon delivery to the carrier. We are not 
                  responsible for lost or stolen packages after delivery confirmation.
                </p>
              </div>
            </section>

            {/* Returns and Refunds */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Returns and Refunds
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Returns are accepted within 7 days of delivery for unused items in original packaging. 
                  Custom or personalized items cannot be returned unless defective.
                </p>
                <p>
                  Refunds will be processed within 5-7 business days after we receive and inspect the returned items. 
                  Refunds will be issued to the original payment method.
                </p>
                <p>
                  Return shipping costs are the responsibility of the customer unless the return is due to our error 
                  or a defective product.
                </p>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-primary" />
                7. User Accounts
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  You are responsible for maintaining the confidentiality of your account credentials and for all 
                  activities that occur under your account.
                </p>
                <p>
                  You must provide accurate and complete information when creating an account and keep your information 
                  up to date.
                </p>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these Terms or engage in 
                  fraudulent activity.
                </p>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertCircle className="h-6 w-6 mr-2 text-primary" />
                8. Prohibited Uses
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>You may not use our website for any of the following prohibited purposes:</p>
                <ul className="list-disc pl-6 space-y-2 ml-4">
                  <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  In no case shall StarScrib, our directors, officers, employees, affiliates, agents, 
                  contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, 
                  or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
                </p>
                <p>
                  Our total liability to you for any damages, losses, and causes of action shall not exceed the amount 
                  paid by you for the specific product or service that gave rise to the claim.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <span className="text-gray-900 dark:text-white">gupta.nishant08042004@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <span className="text-gray-900 dark:text-white">+91 9899459288</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <span className="text-gray-900 dark:text-white">F-61/2A Subhash Vihar, Delhi, India</span>
                </div>
              </div>
            </section>

            {/* Agreement */}
            <section className="bg-blue-50 dark:bg-slate-700 rounded-lg p-6 border-l-4 border-primary">
              <p className="text-gray-900 dark:text-white font-medium">
                By using our website and services, you acknowledge that you have read and understood these Terms and 
                Conditions and agree to be bound by them.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
