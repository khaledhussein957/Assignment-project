export const getStockStatusBadge = (stock: number) => {
  if (stock === 0) return { text: "Out of Stock", class: "badge-error" };
  if (stock < 5) return { text: "Low Stock", class: "badge-warning" };
  return { text: "In Stock", class: "badge-success" };
};
