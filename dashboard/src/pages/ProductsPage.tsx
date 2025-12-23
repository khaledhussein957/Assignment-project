import React, { useState } from "react";
import { Plus, X, Image as ImageIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import type { Product } from "../lib/api";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProduct";
import ProductTable from "../components/ProductTable";
import { productSchema } from "../validations/product.validate";

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { data: products = [], isLoading } = useProducts();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: joiResolver(productSchema),
  });

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    reset();
    setImagePreviews([]);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("quantity", product.quantity);
    setValue("description", product.description);
    setValue("images", product.images || []);
    setImagePreviews(product.images || []);
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 3) return alert("Maximum 3 images allowed");

    (imagePreviews || []).forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    setValue("images", files);
  };

  const onSubmit = async (data: any) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("description", data.description);
    formDataToSend.append("price", data.price);
    formDataToSend.append("quantity", data.quantity);

    const imagesToAppend = data.images || [];
    if (imagesToAppend.length > 0) {
      imagesToAppend.forEach((file: File) =>
        formDataToSend.append("images", file)
      );
    }

    try {
      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          formData: formDataToSend,
        });
      } else {
        await createProductMutation.mutateAsync(formDataToSend);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-base-content/70 mt-1">
            Manage your product inventory
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <ProductTable
        products={products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onEdit={handleEdit}
        onDelete={(id) => deleteProductMutation.mutate(id)}
        isDeleting={deleteProductMutation.isPending}
      />

      {/* ADD/EDIT PRODUCT MODAL */}
      <input
        type="checkbox"
        className="modal-toggle"
        checked={showModal}
        onChange={() => {}}
      />

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-2xl">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span>Product Name</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="Enter product name"
                        className="input input-bordered"
                        {...field}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span>Price ($)</span>
                  </label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="input input-bordered"
                        {...field}
                      />
                    )}
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message as string}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span>Stock</span>
                  </label>
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        placeholder="0"
                        className="input input-bordered"
                        {...field}
                      />
                    )}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">
                      {errors.quantity.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-control flex flex-col gap-2">
                <label className="label">
                  <span>Description</span>
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      className="textarea textarea-bordered h-24 w-full"
                      placeholder="Enter product description"
                      {...field}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message as string}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Product Images
                  </span>
                  <span className="label-text-alt text-xs opacity-60">
                    Max 3 images
                  </span>
                </label>

                <div className="bg-base-200 rounded-xl p-4 border-2 border-dashed border-base-300 hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="file-input file-input-bordered file-input-primary w-full"
                    required={!editingProduct}
                  />
                  {editingProduct && (
                    <p className="text-xs text-base-content/60 mt-2 text-center">
                      Leave empty to keep current images
                    </p>
                  )}
                </div>

                {(imagePreviews || []).length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {(imagePreviews || []).map((preview, index) => (
                      <div key={index} className="avatar">
                        <div className="w-20 rounded-lg">
                          <img src={preview} alt={`Preview ${index + 1}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn"
                  disabled={
                    createProductMutation.isPending ||
                    updateProductMutation.isPending
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    createProductMutation.isPending ||
                    updateProductMutation.isPending
                  }
                >
                  {createProductMutation.isPending ||
                  updateProductMutation.isPending ? (
                    <span className="loading loading-spinner"></span>
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
