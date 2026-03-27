import apiClient from "./client";

export const getSellerInventory = async (token) => {
  const response = await apiClient.get("/seller/inventory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
