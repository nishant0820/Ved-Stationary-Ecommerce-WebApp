import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (

    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
          <div className="relative overflow-hidden pt-[56.25%]">
            <img 
              src={product.image} 
              alt={product.name}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {product.discount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 right-2 font-bold"
              >
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          
          <CardContent className="flex-grow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-2">{product.name}
              </h3>
            </div>
            <div className="flex items-center mb-2">
              <Badge variant="secondary" className="mr-2">
                {product.category}
              </Badge>
              {product.instock ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  In Stock
                </Badge>
              ) : (
                console.log("Product object:", product),


                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{product.description}</p>
            <div className="flex items-center">
              {product.discount > 0 ? (
                <>
                  <span className="text-lg font-bold text-primary">
                    ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ₹{product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-primary">₹{product.price.toFixed(2)}</span>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.instock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;