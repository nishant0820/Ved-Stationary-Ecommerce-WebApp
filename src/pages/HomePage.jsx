import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Truck, CreditCard, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import ProductRecommendations from '@/components/ProductRecommendations.jsx';
import LoadingSpinner from '@/components/ui/LoadingSpinner.jsx';
import { categories as allCategories, getAllProducts } from '@/data/products';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

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

const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className={cn("py-16 md:py-24", theme === 'dark' ? 'hero-pattern-dark' : 'hero-pattern')}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
              Quality Stationery for <span className="text-primary">Every Need</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
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
                className={cn("absolute -bottom-5 -left-5 p-4 rounded-lg shadow-lg", theme === 'dark' ? 'bg-slate-800' : 'bg-card')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center text-primary">
                  <span className="text-2xl font-bold mr-1">20%</span>
                  <span className="text-sm">OFF</span>
                </div>
                <p className="text-xs text-muted-foreground">On selected items</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const { theme } = useTheme();
  const features = [
    { icon: ShoppingBag, title: "Quality Products", description: "Curated selection of premium stationery" },
    { icon: Truck, title: "Fast Delivery", description: "Quick and reliable shipping nationwide" },
    { icon: CreditCard, title: "Secure Payments", description: "Safe transactions with Razorpay" },
    { icon: Clock, title: "24/7 Support", description: "Always here to help with your queries" },
  ];

  return (
    <section className={cn("py-16", theme === 'dark' ? 'bg-slate-900' : 'bg-background')}>
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col items-center text-center">
              <div className={cn("p-4 rounded-full mb-4", theme === 'dark' ? 'bg-primary/20' : 'bg-primary/10')}>
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedProductsSection = () => {
  const { theme } = useTheme();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allProducts = await getAllProducts();
        setFeaturedProducts(allProducts.slice(0, 4));
      } catch (err) {
        setError(err.message || "Failed to fetch products.");
        toast({
          title: "Error",
          description: "Could not load featured products. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [toast]);

  return (
    <section className={cn("py-16", theme === 'dark' ? 'bg-slate-800' : 'bg-muted/50')}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Discover our most popular stationery items loved by students and professionals alike.
          </motion.p>
        </div>
        {isLoading ? (
          <LoadingSpinner 
            size="lg" 
            text="Loading featured products..." 
            className="h-64"
          />
        ) : error ? (
          <div className="text-center text-destructive py-8">
            <p>{error}</p>
            <p>Please try refreshing the page.</p>
          </div>
        ) : featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <p className="text-center text-muted-foreground py-8">No featured products available at the moment.</p>
        )}
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
  );
};

const CategoriesSection = () => {
  const { theme } = useTheme();
  return (
    <section className={cn("py-16", theme === 'dark' ? 'bg-slate-900' : 'bg-background')}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Shop by Category
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
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
          {allCategories.map((category) => (
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
  );
};

const TestimonialSection = () => {
  const { theme } = useTheme();
  const testimonials = [
    { name: "Priya Sharma", role: "Art Student", text: "The quality of the art supplies I purchased from Ved Stationary is exceptional. The watercolor set has such vibrant colors, and the brushes are perfect for detailed work.", avatar: "https://images.unsplash.com/photo-1544212408-c711b7c19b92" },
    { name: "Rajesh Patel", role: "Business Owner", text: "I've been ordering office supplies for my business from Ved Stationary for over a year now. Their delivery is always prompt, and the products are of great quality. Highly recommended!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
    { name: "Arjun Mehta", role: "College Student", text: "The notebooks I bought are perfect for my college notes. The paper quality is excellent, and there's no ink bleeding. Plus, the online ordering process was super easy!", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79" },
  ];

  return (
    <section className={cn("py-16", theme === 'dark' ? 'bg-slate-800' : 'bg-muted/50')}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4 text-foreground"
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn("p-6 rounded-lg shadow-sm", theme === 'dark' ? 'bg-slate-700' : 'bg-card')}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    alt={`${testimonial.name} avatar`}
                    className="w-12 h-12 rounded-full"
                   src="https://images.unsplash.com/photo-1606121537863-3fdbe9f3e42a" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground/90">{testimonial.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  const { theme } = useTheme();
  return (
    <section className={cn("py-16", theme === 'dark' ? 'bg-primary/90' : 'bg-primary text-primary-foreground')}>
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
              className={cn(
                "flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2",
                theme === 'dark' 
                  ? 'text-gray-900 bg-slate-100 focus:ring-slate-400' 
                  : 'text-gray-900 bg-white focus:ring-primary-foreground'
              )}
              required
            />
            <Button type="submit" variant={theme === 'dark' ? 'default' : 'secondary'} size="lg" className={theme === 'dark' ? 'bg-slate-200 text-slate-900 hover:bg-slate-300' : ''}>
              Subscribe
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection />
      
      {/* AI-Powered Recommendations Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ProductRecommendations 
            title="Personalized for You"
            maxItems={4}
            showReasonBadges={true}
            className="py-0"
          />
        </div>
      </section>
      
      <CategoriesSection />
      <TestimonialSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;