import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const ViewOrderDialog = ({ isOpen, onOpenChange, selectedOrder, onUpdateStatus, getStatusBadgeVariant }) => {
  if (!selectedOrder) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
          <DialogDescription>
            Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Customer Information</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                <p><span className="font-medium">Phone:</span> {selectedOrder.customerPhone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                <p>PIN: {selectedOrder.shippingAddress.pincode}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Order Items</h3>
            <div className="bg-gray-50 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedOrder.items.map((item) => {
                    const price = item.discount > 0
                      ? item.price * (1 - item.discount / 100)
                      : item.price;

                    return (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">
                          ₹{price.toFixed(2)}
                          {item.discount > 0 && (
                            <span className="text-xs text-gray-500 line-through ml-1">
                              ₹{item.price.toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">₹{(price * item.quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Order Status</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span>Current Status:</span>
                  <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium">Update Status:</p>
                  <div className="flex flex-wrap gap-2">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={selectedOrder.status === status ? (status === 'cancelled' ? 'destructive' : 'default') : 'outline'}
                        onClick={() => onUpdateStatus(selectedOrder.id, status)}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Payment Information</h3>
              <div className="bg-gray-50 p-3 rounded-md">
                <p><span className="font-medium">Method:</span> {selectedOrder.paymentMethod}</p>
                <p><span className="font-medium">Payment ID:</span> {selectedOrder.paymentId}</p>

                <div className="border-t mt-3 pt-3">
                  <div className="flex justify-between mb-1">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Shipping:</span>
                    <span>{selectedOrder.shipping === 0 ? 'Free' : `₹${selectedOrder.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Tax:</span>
                    <span>₹{selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>₹{selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrderDialog;