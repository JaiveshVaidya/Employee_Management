import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
});

export const getEmployees = (skip = 0, limit = 10, search = '') => {
  return api.get(`/employees/?skip=${skip}&limit=${limit}&search=${search}`);
};

export const createEmployee = (employeeData) => {
  return api.post('/employees/', employeeData);
};

export const updateEmployee = (id, employeeData) => {
  return api.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
  return api.delete(`/employees/${id}`);
};

export default api;
