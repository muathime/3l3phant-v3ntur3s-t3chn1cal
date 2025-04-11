import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const auth = async (email: string, password: string) => {
  const response = await apiClient.post("/auth", { email, password });
  return response.data;
};

export const fetchWantedList = async (token: any) => {
  const response = await apiClient.get("/wanted", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
