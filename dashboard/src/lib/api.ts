import axiosInstance from "./axios.ts";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  images: string[];
}

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await axiosInstance.get("/api/products");

    const products = Array.isArray(response.data)
      ? response.data
      : response.data?.products || [];

    return products;
  },

  create: async (formData: FormData): Promise<Product> => {
    const { data } = await axiosInstance.post("/api/products", formData);
    return data;
  },

  update: async (id: string, formData: FormData): Promise<Product> => {
    const { data } = await axiosInstance.put(`/api/products/${id}`, formData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await axiosInstance.delete(`/api/products/${id}`);
    return data;
  },
};
