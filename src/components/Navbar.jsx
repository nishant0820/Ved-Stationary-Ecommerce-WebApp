import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-amber-50/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm border-b border-amber-100 dark:border-stone-800' : 'bg-amber-50 dark:bg-stone-950'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/logo.jpeg" alt="StarScrib" className="h-10 w-10 rounded-full object-cover mix-blend-multiply dark:mix-blend-normal dark:bg-white border-2 border-transparent dark:border-white shadow-sm" />
            </motion.div>
            <span className="font-bold text-xl text-primary">StarScrib</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <Link to="/products" className="text-foreground/80 hover:text-primary transition-colors">Products</Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">About</Link>
            {user && user.isAdmin && (
              <Link to="/admin" className="text-foreground/80 hover:text-primary transition-colors">Admin</Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Hi, {getUserDisplayName()}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" title="Login">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" title="Cart">
                <ShoppingCart className="h-5 w-5" />
                {user && totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {user && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-background border-t border-border"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/products" className="text-foreground/80 hover:text-primary transition-colors py-2" onClick={toggleMenu}>Products</Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors py-2" onClick={toggleMenu}>About</Link>
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/admin" className="text-foreground/80 hover:text-primary transition-colors py-2" onClick={toggleMenu}>Admin</Link>
                )}
                <div className="flex items-center justify-between py-2 border-t border-border pt-3 mt-2">
                  <span className="text-sm text-muted-foreground">Hi, {getUserDisplayName()}</span>
                  <Button variant="ghost" size="sm" onClick={() => { handleLogout(); toggleMenu(); }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login" className="text-foreground/80 hover:text-primary transition-colors py-2 border-t border-border pt-3 mt-2" onClick={toggleMenu}>Login</Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;