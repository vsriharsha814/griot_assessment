import apiClient from "./client";

export const getAllProducts = async () => {
  const response = await apiClient.get("/products/getAll");
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

export const createProduct = async (payload, token) => {
  const response = await apiClient.post("/products/create", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = async (productId, payload, token) => {
  const response = await apiClient.put(`/products/update/${productId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
