import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://localhost:8005", // Spring Boot backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosIns;
