import axios from "axios";

axios.defaults.baseURL = "https://localhost:7115";

export const getStr = () => {
  const token = localStorage.getItem("token");
  const response = axios.get('/home/get', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};