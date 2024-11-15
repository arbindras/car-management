import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Set your API base URL

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (token) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
};
