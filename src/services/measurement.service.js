import axios from "axios";

axios.defaults.baseURL = "https://localhost:7115";

export const deleteMeasurement = (measurementId) => {
  const response = axios.delete('/measurement/delete-measurement', {
    params: { measurementId: measurementId }
  });
  return response;
};

export const getListMeasurements = () => {
  const response = axios.get('/measurement/getAll-measurements');
  return response;
}

export const createMeasurement = (measurement) => {
  const response = axios.post('/measurement/add-measurement', measurement);
  return response;
}

export const updateMeasurement = (editedMeasurement) => {
  const response = axios.put('/measurement/update-measurement', editedMeasurement);
  return response;
}