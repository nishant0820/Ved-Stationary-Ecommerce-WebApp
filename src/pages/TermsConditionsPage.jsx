import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Users, AlertCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { cn } from '@/lib/utils';

const TermsConditionsPage = () => {
  const { theme } = useTheme();

  return (
    <div className={cn("min-h-screen", theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50')}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms and Conditions</h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className={cn("max-w-4xl mx-auto", theme === 'dark' ? 'bg-slate-800' : 'bg-white')}>
            <div className="p-8 rounded-lg shadow-lg">
              
              {/* Introduction */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to Ved Stationary and Graphics ("we," "our," or "us"). These Terms and Conditions ("Terms") 
                  govern your use of our website and services. By accessing or using our website, you agree to be bound 
                  by these Terms. If you disagree with any part of these terms, then you may not access our service.
                </p>
              </motion.section>

              {/* Acceptance of Terms */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-semibold text-foreground">2. Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
              </motion.section>

              {/* Products and Services */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Products and Services</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Ved Stationary and Graphics offers a wide range of stationary items, office supplies, art materials, 
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
              </motion.section>

              {/* Orders and Payment */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Orders and Payment</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
              </motion.section>

              {/* Shipping and Delivery */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Shipping and Delivery</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
              </motion.section>

              {/* Returns and Refunds */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Returns and Refunds</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
              </motion.section>

              {/* User Accounts */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-semibold text-foreground">7. User Accounts</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
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
              </motion.section>

              {/* Prohibited Uses */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                  <h2 className="text-2xl font-semibold text-foreground">8. Prohibited Uses</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>You may not use our website for any of the following prohibited purposes:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                  </ul>
                </div>
              </motion.section>

              {/* Limitation of Liability */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In no case shall Ved Stationary and Graphics, our directors, officers, employees, affiliates, agents, 
                    contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, 
                    or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
                  </p>
                  <p>
                    Our total liability to you for any damages, losses, and causes of action shall not exceed the amount 
                    paid by you for the specific product or service that gave rise to the claim.
                  </p>
                </div>
              </motion.section>

              {/* Contact Information */}
              <motion.section 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Address:</strong> F-61/2A Subhash Vihar</p>
                    <p><strong>Phone:</strong> +91 9899459288</p>
                    <p><strong>Email:</strong> gupta.nishant08042004@gmail.com</p>
                  </div>
                </div>
              </motion.section>

              {/* Agreement */}
              <motion.div 
                className={cn("p-6 rounded-lg border-l-4 border-primary", theme === 'dark' ? 'bg-slate-700' : 'bg-blue-50')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <p className="text-foreground font-medium">
                  By using our website and services, you acknowledge that you have read and understood these Terms and 
                  Conditions and agree to be bound by them.
                </p>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
