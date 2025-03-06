import { addTicket,fetchAllTicket, ticketStatusUpdate, updateTicket } from "../services/TicketService";

export const getTicket = async () => {
  try {
    return await fetchAllTicket();
  } catch (error) {
    throw error;
  }
};
export const addTicketToDatabase = async (ticketData) => {
  try {
    return await addTicket(ticketData);
  } catch (error) {
    throw error;
  }
};
export const getTicketById = async (id) => {
  try {
    return await getTicket(id);
  } catch (error) {
    throw error;
  }
};
export const ticket = async (id,ticketData) => {
  try {
    return await updateTicket(id,ticketData);
  } catch (error) {
    throw error;
  }
};
//update status
export const ticketStatus = async (id, ticketData) => {
  try {
    return await ticketStatusUpdate(id, ticketData);
  } catch (error) {
    throw error;
  }
};