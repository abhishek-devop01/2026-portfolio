import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://two026-portfolio-1.onrender.com",
    withCredentials: true,
});

export default instance;
