import React, { Component } from "react";
import { getTicket,  } from "../repository/TicketRepository";
import { ticketStatusUpdate } from "../services/TicketService";
class Tickets extends Component{
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      error: '',
    };
  }
  fetchTickets = async () => {
    try {
      const data = await getTicket();
      const ticketsWithStatus = data.map(ticket => ({
        ...ticket,
        status: ticket.status || "New", 
      }));
      this.setState({ tickets: ticketsWithStatus });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };
  createTicketStatus = async (ticketId, newStatus) => {
    try {
      await ticketStatusUpdate(ticketId, newStatus);
    } catch (error) {
      throw new Error("Failed to create or update ticket status.");
    }
  };
  handleStatusChange = async (ticketId, newStatus) => {
    try {
      await this.createTicketStatus(ticketId, newStatus);
      this.setState(prevState => ({
        tickets: prevState.tickets.map(ticket =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      }));
    } catch (error) {
      this.setState({ error: "Failed to update ticket status." });
    }
  };
  componentDidMount() {
    this.fetchTickets();
  }
  render() {
    const { tickets, error } = this.state;
    if (error) {
      return <div className="text-red-500 text-center mt-6">Error: {error}</div>;
    }

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-xl mb-6">
          <h2 className="text-3xl font-semibold text-center text-purple-600 mb-4">kabi Project Management</h2>
          <h3 className="text-xl font-medium text-center text-gray-600 mb-6">Tickets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No tickets available.</div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    Ticket ID: <span className="text-purple-600">{ticket._id}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Category:</strong> {ticket.category} | <strong>Priority:</strong> {ticket.priority}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Description:</strong> {ticket.description}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Start Date:</strong> {new Date(ticket.startDate).toLocaleDateString()} |{" "}
                    <strong>End Date:</strong> {new Date(ticket.endDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Admin ID:</strong> {ticket.adminId}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Client ID:</strong> {ticket.clientId}
                  </div>
                  <div className="mb-2">
                    <strong>Status:</strong>
                    <select
                      value={ticket.status}
                      onChange={(e) => this.handleStatusChange(ticket._id, e.target.value)}
                      className="ml-2 p-2 border rounded"
                    >
                      <option value="New">New</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Tickets;
