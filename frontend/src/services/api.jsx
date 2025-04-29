// src/services/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:8002/api';

export const fetchWorkOrders = () => axios.get(`${API_BASE}/workorders/`);
export const createWorkOrder = (data) => axios.post(`${API_BASE}/workorders/`, data);
export const createEvent = (workOrderId, data) =>
    axios.post(`${API_BASE}/events/`, { ...data, work_order: workOrderId });
  
