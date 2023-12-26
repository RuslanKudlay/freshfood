import axios from "axios";

axios.defaults.baseURL = "https://localhost:7115";

export const getAllListProducts = () => {
    const response = axios.get('/product/get-products');
    return response;
}