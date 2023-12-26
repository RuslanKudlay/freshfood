import axios from "axios";

axios.defaults.baseURL = "https://localhost:7115";

export const deleteRole = (roleId) => {
  const response = axios.delete('/role/delete-role', {
    params: { roleId: roleId }
  });
  return response;
};

export const getListRoles = () => {
  const response = axios.get('/role/getAll-roles');
  return response;
}

export const createRole = (role) => {
  const response = axios.post('/role/add-role', role);
  return response;
}

export const updateRole = (editedRole) => {
  const response = axios.put('/role/update-role', editedRole);
  return response;
}