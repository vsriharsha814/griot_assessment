import apiClient from "./client";

const normalizeProductsResponse = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const getAllProducts = async () => {
  const response = await apiClient.get("/products/getAll");
  return normalizeProductsResponse(response.data);
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

export const deleteProduct = async (productId, token) => {
  const response = await apiClient.delete(`/products/delete/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const placeBid = async (productId, payload) => {
  const response = await apiClient.post(`/products/${productId}/place-bid`, payload);
  return response.data;
};

export const getBidHistory = async (productId) => {
  const response = await apiClient.get(`/products/${productId}/bid-history`);
  return response.data;
};
