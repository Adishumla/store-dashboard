export function prepareDonutData(orders: any[]) {
  const cityTotals = orders.reduce((acc, order) => {
    const city = order.city.toLowerCase();
    if (acc[city]) {
      acc[city] += order.total;
    } else {
      acc[city] = order.total;
    }
    return acc;
  }, {});

  return Object.entries(cityTotals).map(([city, total]) => ({
    name: city,
    sales: total,
  }));
}
