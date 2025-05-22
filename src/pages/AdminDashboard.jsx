import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AdminStatsCards from '@/components/admin/AdminStatsCards.jsx';
import OrderTable from '@/components/admin/OrderTable.jsx';
import ViewOrderDialog from '@/components/admin/ViewOrderDialog.jsx';
import DeleteOrderDialog from '@/components/admin/DeleteOrderDialog.jsx';
import { products as allProducts } from '@/data/products';
import { getOrders, updateOrderStatus } from '@/data/orders';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(getOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const filteredOrders = useMemo(() => 
    orders.filter(order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    ), [orders, searchQuery]);

  const dashboardStats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const totalCustomers = new Set(orders.map(order => order.customerId)).size;
    const revenueThisWeek = orders
      .filter(o => new Date(o.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .reduce((sum, o) => sum + o.total, 0);
    const ordersThisMonth = orders.filter(o => new Date(o.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
    
    return {
      totalOrders,
      pendingOrders,
      totalRevenue,
      revenueThisWeek,
      totalProducts: allProducts.length,
      productsInStock: allProducts.filter(p => p.inStock).length,
      totalCustomers,
      ordersThisMonth,
    };
  }, [orders]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = (orderId, status) => {
    try {
      const updatedOrder = updateOrderStatus(orderId, status);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      );
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(updatedOrder);
      }
      toast({
        title: "Status Updated",
        description: `Order ${orderId} status changed to ${status}.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteOrder = (order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteOrder = () => {
    if (!orderToDelete) return;
    try {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete.id));
      toast({
        title: "Order Deleted",
        description: `Order ${orderToDelete.id} has been deleted.`,
        duration: 3000,
      });
      setIsDeleteDialogOpen(false);
      setOrderToDelete(null);
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: "Failed to delete order.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'outline';
      case 'processing': return 'secondary';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <AdminStatsCards stats={dashboardStats} />

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Order Management</h2>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <OrderTable
            orders={filteredOrders}
            onViewOrder={handleViewOrder}
            onConfirmDeleteOrder={confirmDeleteOrder}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
        </TabsContent>

        <TabsContent value="products">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
            <p className="text-gray-600">
              This section is under development. You will be able to manage products here soon.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
            <p className="text-gray-600">
              This section is under development. You will be able to manage customers here soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <ViewOrderDialog
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedOrder={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
        getStatusBadgeVariant={getStatusBadgeVariant}
      />

      <DeleteOrderDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        orderToDelete={orderToDelete}
        onDeleteOrder={handleDeleteOrder}
      />
    </div>
  );
};

export default AdminDashboard;