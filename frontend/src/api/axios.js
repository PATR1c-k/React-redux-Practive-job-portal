import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // with Vite proxy setup, this points to http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
