import apiClient from "./client";

export const getAllProducts = async () => {
  const response = await apiClient.get("/products/getAll");
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};
