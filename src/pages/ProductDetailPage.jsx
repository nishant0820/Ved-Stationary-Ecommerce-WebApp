import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Truck, Shield } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fetch product details - NO AUTHENTICATION REQUIRED
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add to cart - AUTHENTICATION REQUIRED
  const handleAddToCart = async () => {
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .insert([{
          user_id: user.id,
          product_id: product.id,
          quantity: quantity
        }]);

      if (error) throw error;
      
      alert('Product added to cart successfully!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">Product not found</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-12 flex items-center justify-center">
            <div className="text-9xl">{product.image_url}</div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-2 font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews_count} reviews)</span>
            </div>

            <div className="text-4xl font-bold text-blue-600">
              ₹{product.price}
              <span className="text-xl text-gray-500 line-through ml-3">
                ₹{product.price + 100}
              </span>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">
              {product.description || 'High-quality stationary product perfect for students, professionals, and artists.'}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="bg-white border-2 border-gray-300 px-6 py-4 rounded-xl hover:border-red-500 hover:text-red-500 transition">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold">Free Delivery</div>
                  <div className="text-sm text-gray-600">2-3 days</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold">Secure Payment</div>
                  <div className="text-sm text-gray-600">100% safe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to add items to your cart and make purchases.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/login');
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowAuthModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
