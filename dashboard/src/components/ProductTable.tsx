import type { Product } from "../lib/api";
import { Pencil, Trash2 } from "lucide-react";
import { getStockStatusBadge } from "../lib/utils";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  isDeleting: boolean;
}

function ProductTable({
  products,
  onEdit,
  onDelete,
  isDeleting,
}: ProductTableProps) {
  const productList = Array.isArray(products) ? products : [];

  if (productList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base-content/70">No products found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Stock Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => {
            const status = getStockStatusBadge(product.quantity);
            const images = product.images || [];

            return (
              <tr key={product.id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-xl">
                      {images[0] ? (
                        <img src={images[0]} alt={product.name} />
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </div>
                  </div>
                  {images.length > 1 && (
                    <span className="ml-2 text-xs text-base-content/70">
                      +{images.length - 1} more
                    </span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity} units</td>
                <td>
                  <div className={`badge ${status.class}`}>{status.text}</div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => onDelete(product.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
