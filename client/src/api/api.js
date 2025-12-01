import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const fetchBugs = () => API.get('/bugs').then(r => r.data);
export const createBug = (payload) => API.post('/bugs', payload).then(r => r.data);
export const updateBug = (id, payload) => API.put(`/bugs/${id}`, payload).then(r => r.data);
export const deleteBug = (id) => API.delete(`/bugs/${id}`).then(r => r.data);
