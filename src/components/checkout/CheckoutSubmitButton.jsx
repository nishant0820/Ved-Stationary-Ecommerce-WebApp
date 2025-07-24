import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { InlineSpinner } from '@/components/ui/LoadingSpinner.jsx';

const CheckoutSubmitButton = ({ isProcessing }) => {
  return (
    <Button 
      type="submit" 
      className="w-full" 
      size="lg"
      disabled={isProcessing}
    >
      {isProcessing ? (
        <>
          <InlineSpinner className="mr-2" />
          Processing...
        </>
      ) : (
        <>
          Complete Order
          <Check className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
};

export default CheckoutSubmitButton;