import { productApi } from "../lib/api";
import type { Product } from "../lib/api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, FormData>({
    mutationFn: productApi.create,
    onSuccess: () => {
      // Invalidate and refetch the list of products after a successful create
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: string; formData: FormData }>({
    mutationFn: ({ id, formData }) => productApi.update(id, formData),
    onSuccess: () => {
      // Invalidate and refetch the list of products after a successful update
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: productApi.delete,
    onSuccess: () => {
      // Invalidate and refetch the list of products after a successful delete
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
