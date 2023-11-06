export function prepareDonutData(orders: any[]) {
  const cityTotals = orders.reduce((acc, order) => {
    if (acc[order.city]) {
      acc[order.city] += order.total;
    } else {
      acc[order.city] = order.total;
    }
    return acc;
  }, {});

  return Object.entries(cityTotals).map(([city, total]) => ({
    name: city,
    sales: total,
  }));
}
