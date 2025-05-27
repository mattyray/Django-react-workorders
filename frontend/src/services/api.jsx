import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL; // ✅ Fix the variable name

export const fetchWorkOrders = () => axios.get(`${API_BASE}workorders/`);
export const createWorkOrder = (data) => axios.post(`${API_BASE}workorders/`, data);
export const createEvent = (workOrderId, data) =>
  axios.post(`${API_BASE}events/`, { ...data, work_order: workOrderId });
