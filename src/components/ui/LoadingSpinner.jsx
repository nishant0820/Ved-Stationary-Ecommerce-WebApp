import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  className = '',
  showText = true,
  fullScreen = false 
}) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinnerContent = (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen ? "min-h-screen" : "py-8",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={cn(
          "text-primary",
          sizeClasses[size]
        )}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      
      {showText && (
        <motion.p
          className={cn(
            "text-muted-foreground font-medium",
            textSizeClasses[size]
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/80',
        "backdrop-blur-sm"
      )}>
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

// Inline spinner for buttons and small spaces
export const InlineSpinner = ({ size = 'sm', className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className={cn("text-current", className)}
    >
      <Loader2 className={cn(
        size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
      )} />
    </motion.div>
  );
};

// Page-level loading component
export const PageLoader = ({ text = 'Loading page...' }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <LoadingSpinner 
        size="lg" 
        text={text}
        className="min-h-[50vh]"
      />
    </div>
  );
};

// Product grid loading skeleton
export const ProductGridLoader = ({ count = 8 }) => {
  const { theme } = useTheme();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "rounded-lg h-80 animate-pulse",
            theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
