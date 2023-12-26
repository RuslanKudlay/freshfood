import axios from "axios";

export const sendLoginData = (logInUserModel) => {
  const response = axios.post('https://localhost:7115/user/login', logInUserModel);
  return response;
};