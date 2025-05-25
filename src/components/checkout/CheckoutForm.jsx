import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Truck, CreditCard } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext.jsx';
import { cn } from '@/lib/utils';

const CheckoutForm = ({ formData, handleChange, errors }) => {
  const { theme } = useTheme();

  const sectionClasses = cn(
    "rounded-lg shadow-sm p-6 mb-6",
    theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-card text-gray-900'
  );
  const inputClasses = (hasError) => cn(
    theme === 'dark' ? 'bg-slate-700 border-slate-600 placeholder:text-slate-400 text-slate-50' : 'bg-white',
    hasError ? 'border-red-500' : (theme === 'dark' ? 'border-slate-600' : 'border-gray-300')
  );
  const labelClasses = cn(theme === 'dark' ? 'text-slate-300' : 'text-gray-700');

  return (
    <>
      <div className={sectionClasses}>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className={labelClasses}>Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses(errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email" className={labelClasses}>Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses(errors.email)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone" className={labelClasses}>Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses(errors.phone)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div className={sectionClasses}>
        <div className="flex items-center mb-4">
          <Truck className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-semibold text-foreground">Shipping Address</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="address" className={labelClasses}>Street Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClasses(errors.address)}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && <p id="address-error" className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className={labelClasses}>City</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClasses(errors.city)}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "city-error" : undefined}
              />
              {errors.city && <p id="city-error" className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <Label htmlFor="state" className={labelClasses}>State</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={inputClasses(errors.state)}
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? "state-error" : undefined}
              />
              {errors.state && <p id="state-error" className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <Label htmlFor="pincode" className={labelClasses}>Pincode</Label>
              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className={inputClasses(errors.pincode)}
                aria-invalid={!!errors.pincode}
                aria-describedby={errors.pincode ? "pincode-error" : undefined}
              />
              {errors.pincode && <p id="pincode-error" className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className={sectionClasses}>
        <div className="flex items-center mb-4">
          <CreditCard className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-xl font-semibold text-foreground">Payment Method</h2>
        </div>
        <div className="space-y-4">
          <div className={cn(
            "flex items-center p-4 border rounded-md",
            theme === 'dark' ? 'bg-primary/10 border-primary/30' : 'bg-primary/5 border-primary/20'
          )}>
            <input
              type="radio"
              id="razorpay"
              name="paymentMethod"
              value="razorpay"
              checked={formData.paymentMethod === 'razorpay'}
              onChange={handleChange}
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <label htmlFor="razorpay" className="ml-2 flex items-center text-foreground">
              <span className="font-medium">Razorpay</span>
              <img  src="https://razorpay.com/favicon.png" alt="Razorpay Logo" className="h-6 ml-2" />
            </label>
          </div>
          <div className={cn(
            "flex items-center p-4 border rounded-md opacity-50 cursor-not-allowed",
            theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
          )}>
            <input
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              disabled
              className="h-4 w-4"
            />
            <label htmlFor="cod" className="ml-2 text-muted-foreground">
              <span className="font-medium">Cash on Delivery</span>
              <span className="text-xs ml-2">(Currently unavailable)</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;