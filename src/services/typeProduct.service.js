import axios from "axios";

axios.defaults.baseURL = "https://localhost:7115";

export const deleteTypeProduct = (typeProductId) => {
  const response = axios.delete('/typeProduct/delete-typeProduct', {
    params: { typeProductId: typeProductId }
  });
  return response;
};

export const getListTypeProducts = () => {
  const response = axios.get('/typeProduct/getAll-typeProducts');
  return response;
}

export const createTypeProduct = (typeProduct) => {
  const response = axios.post('/typeProduct/add-typeProduct', typeProduct);
  return response;
}

export const updateTypeProduct = (editedTypeProduct) => {
  const response = axios.put('/typeProduct/update-typeProduct', editedTypeProduct);
  return response;
}