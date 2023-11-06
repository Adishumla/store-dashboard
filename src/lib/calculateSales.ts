const getOrdersBetweenDates = (
  startDate: string,
  endDate: string,
  orders: any
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const filteredOrders = orders.docs.filter((order: any) => {
    const orderDate = new Date(order.orderDate);
    return orderDate >= start && orderDate <= end;
  });

  return filteredOrders;
};

export default getOrdersBetweenDates;
