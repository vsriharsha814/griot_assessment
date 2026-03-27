import apiClient from "./client";

export const signupUser = async (payload) => {
  const response = await apiClient.post("/auth/signup", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
};
