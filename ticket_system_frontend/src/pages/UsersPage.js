import React, { Component } from "react";
import { getTicket } from "../repository/TicketRepository";

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      error: '',
    };
  }

  fetchTickets = async () => {
    const { uid } = this.props;
    try {
      const data = await getTicket();
      const clientTicket = data.filter(ticket => ticket?.clientId?.uid === uid);
      this.setState({ tickets: clientTicket });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  componentDidMount() {
    this.fetchTickets();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.uid !== this.props.uid) {
      this.fetchTickets();
    }
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
                  <div className="text-sm text-gray-600">
                    <strong>Client ID:</strong> {ticket.clientId}
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

export default UsersPage;
