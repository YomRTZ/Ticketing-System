import axios from 'axios';
import { API_URL } from '../commons/Constant';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export const fetchAllTicket = async () => {
  try {
    const response = await api.get(`${API_URL}/ticket/get`);
    console.log(`${API_URL}/ticket/get`);
    console.log(response);
    if (!response.data) throw new Error('Failed to fetch tickets');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch tickets');
  }
};
//add
export const addTicket = async (ticketData) => {
  try {
    const response = await api.post(`${API_URL}/ticket/create`,ticketData);
    console.log(`${API_URL}/ticket/create`);
    console.log(response);
    if (!response.data) throw new Error('Failed to add ticket');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to add ticket');
  }
};
export const getTicket = async (id) => {
  try {
    const response = await api.get(`${API_URL}/ticket/get/${id}`);
    console.log(`${API_URL}/ticket/get/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to get Ticket');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to get Ticket');
  }
};
// update
export const updateTicket = async (id,ticketData) => {
  try {
    const response = await api.put(`${API_URL}/ticket/update/${id}`,ticketData);
    console.log(`${API_URL}/ticket/update/${id}`);
    console.log(response);
    if (!response.data) throw new Error('Failed to update Ticket');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Failed to update Ticket');
  }
};
// update status
export const ticketStatusUpdate = async (id, ticketData) => {
  try {
    const response = await axios.put(`${API_URL}/leaseAgreement/update/${id}/status`, ticketData);
    console.log("Update response:", response);
    if (!response.data) throw new Error('Failed to update ticket');
    return response.data;
  } catch (error) {
    console.error("Update error:", error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to update ticket');
  }
};