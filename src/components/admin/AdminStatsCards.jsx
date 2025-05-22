import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminStatsCards = ({ stats }) => {
  const { totalOrders, pendingOrders, totalRevenue, revenueThisWeek, totalProducts, productsInStock, totalCustomers, ordersThisMonth } = stats;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1 },
    }),
  };

  const statCards = [
    { title: 'Total Orders', value: totalOrders, Icon: Package, subtext: `+${pendingOrders} pending` },
    { title: 'Total Revenue', value: `₹${totalRevenue.toFixed(2)}`, Icon: DollarSign, subtext: `+₹${revenueThisWeek.toFixed(2)} this week` },
    { title: 'Products', value: totalProducts, Icon: ShoppingCart, subtext: `${productsInStock} in stock` },
    { title: 'Customers', value: totalCustomers, Icon: Users, subtext: `${ordersThisMonth} orders this month` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <motion.div
          key={card.title}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.subtext}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminStatsCards;