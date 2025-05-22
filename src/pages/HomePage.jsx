
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Truck, CreditCard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { products, categories } from '@/data/products';

const HomePage = () => {
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Quality Stationery for <span className="text-primary">Every Need</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Discover our premium collection of stationery and art supplies. From notebooks to professional art tools, we have everything you need.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/products?category=art">
                    Explore Art Supplies
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <img  
                  alt="Collection of stationery items" 
                  className="rounded-lg shadow-xl"
                 src="https://images.unsplash.com/photo-1576602976047-174e57a47881" />
                
                <motion.div 
                  className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center text-primary">
                    <span className="text-2xl font-bold mr-1">20%</span>
                    <span className="text-sm">OFF</span>
                  </div>
                  <p className="text-xs text-gray-600">On selected items</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">Curated selection of premium stationery</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Quick and reliable shipping nationwide</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Safe transactions with Razorpay</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help with your queries</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Products
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Discover our most popular stationery items loved by students and professionals alike.
            </motion.p>
          </div>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Shop by Category
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Browse our wide range of products by category to find exactly what you need.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div 
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Link 
                  to={`/products?category=${category.id}`}
                  className="block h-64 relative rounded-lg overflow-hidden group"
                >
                  <img  
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                   src="https://images.unsplash.com/photo-1615988938302-bd2a5a7023bc" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-semibold mb-2">{category.name}</h3>
                      <span className="inline-flex items-center text-white text-sm">
                        Shop Now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What Our Customers Say
            </motion.h2>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img  
                    alt="Customer avatar" 
                    className="w-12 h-12 rounded-full"
                   src="https://images.unsplash.com/photo-1544212408-c711b7c19b92" />
                </div>
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Art Student</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The quality of the art supplies I purchased from Ved Stationary is exceptional. The watercolor set has such vibrant colors, and the brushes are perfect for detailed work."
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img  
                    alt="Customer avatar" 
                    className="w-12 h-12 rounded-full"
                   src="https://images.unsplash.com/photo-1544212408-c711b7c19b92" />
                </div>
                <div>
                  <h4 className="font-semibold">Rajesh Patel</h4>
                  <p className="text-sm text-gray-600">Business Owner</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I've been ordering office supplies for my business from Ved Stationary for over a year now. Their delivery is always prompt, and the products are of great quality. Highly recommended!"
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img  
                    alt="Customer avatar" 
                    className="w-12 h-12 rounded-full"
                   src="https://images.unsplash.com/photo-1544212408-c711b7c19b92" />
                </div>
                <div>
                  <h4 className="font-semibold">Arjun Mehta</h4>
                  <p className="text-sm text-gray-600">College Student</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The notebooks I bought are perfect for my college notes. The paper quality is excellent, and there's no ink bleeding. Plus, the online ordering process was super easy!"
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Stay Updated
            </motion.h2>
            <motion.p 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Subscribe to our newsletter for exclusive offers, new product announcements, and stationery tips.
            </motion.p>
            
            <motion.form 
              className="flex flex-col sm:flex-row gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" variant="secondary" size="lg">
                Subscribe
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
