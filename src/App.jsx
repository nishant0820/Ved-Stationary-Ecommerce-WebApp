import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderSuccessPage from '@/pages/OrderSuccessPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AuthProtectedRoute from '@/components/AuthProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route 
            path="products/:id" 
            element={
              <AuthProtectedRoute>
                <ProductDetailPage />
              </AuthProtectedRoute>
            } 
          />
          <Route 
            path="cart" 
            element={
              <AuthProtectedRoute>
                <CartPage />
              </AuthProtectedRoute>
            } 
          />
          <Route 
            path="checkout" 
            element={
              <AuthProtectedRoute>
                <CheckoutPage />
              </AuthProtectedRoute>
            } 
          />
          <Route 
            path="order-success" 
            element={
              <AuthProtectedRoute>
                <OrderSuccessPage />
              </AuthProtectedRoute>
            } 
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route 
            path="admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;