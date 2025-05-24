import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AdminStatsCards from '@/components/admin/AdminStatsCards.jsx';
import OrderTable from '@/components/admin/OrderTable.jsx';
import ViewOrderDialog from '@/components/admin/ViewOrderDialog.jsx';
import DeleteOrderDialog from '@/components/admin/DeleteOrderDialog.jsx';
import { getAllProducts } from '@/data/products'; 
import { getAllOrders, updateOrderStatusSupabase, deleteOrderSupabase } from '@/data/orders';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await getAllOrders();
        const fetchedProducts = await getAllProducts();
        setOrders(fetchedOrders || []);
        setProducts(fetchedProducts || []);
      } catch (error) {
        toast({ title: "Error fetching data", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const filteredOrders = useMemo(() => 
    orders.filter(order =>
      order.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customer_name && order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.customer_email && order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [orders, searchQuery]);

  const dashboardStats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const totalCustomers = new Set(orders.map(order => order.customer_id)).size;
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const revenueThisWeek = orders
      .filter(o => new Date(o.created_at) > oneWeekAgo)
      .reduce((sum, o) => sum + o.total, 0);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const ordersThisMonth = orders.filter(o => new Date(o.created_at) > oneMonthAgo).length;
    
    return {
      totalOrders,
      pendingOrders,
      totalRevenue,
      revenueThisWeek,
      totalProducts: products.length,
      productsInStock: products.filter(p => p.in_stock).length,
      totalCustomers,
      ordersThisMonth,
    };
  }, [orders, products]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const updatedOrder = await updateOrderStatusSupabase(orderId, status);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? updatedOrder : order
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
        description: error.message || "Failed to update order status.",
        variant: "destructive",
      });
    }
  };

  const confirmDeleteOrder = (order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    try {
      await deleteOrderSupabase(orderToDelete.id);
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
        description: error.message || "Failed to delete order.",
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

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading dashboard data...</div>;
  }

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
            orders={filteredOrders.map(o => ({
              ...o, 
              customerName: o.customer_name, 
              customerEmail: o.customer_email,
              createdAt: o.created_at
            }))}
            onViewOrder={handleViewOrder}
            onConfirmDeleteOrder={confirmDeleteOrder}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
        </TabsContent>

        <TabsContent value="products">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Product Management ({products.length})</h2>
            <p className="text-gray-600">
              Product management coming soon.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Management ({dashboardStats.totalCustomers})</h2>
            <p className="text-gray-600">
              Customer management coming soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {selectedOrder && (
        <ViewOrderDialog
          isOpen={isViewDialogOpen}
          onOpenChange={setIsViewDialogOpen}
          selectedOrder={{
            ...selectedOrder,
            customerName: selectedOrder.customer_name,
            customerEmail: selectedOrder.customer_email,
            customerPhone: selectedOrder.customer_phone,
            shippingAddress: selectedOrder.shipping_address,
            paymentId: selectedOrder.payment_id,
            paymentMethod: selectedOrder.payment_method,
            createdAt: selectedOrder.created_at,
            items: selectedOrder.order_items || [] 
          }}
          onUpdateStatus={handleUpdateStatus}
          getStatusBadgeVariant={getStatusBadgeVariant}
        />
      )}

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