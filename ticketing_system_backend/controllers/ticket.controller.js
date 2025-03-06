const Tickets = require('../models/ticket.model');
exports.createTicket = async (req, res) => {
  try {
      const {
        category,
        priority,
        startDate,
        endDate,
        status,
        description,
        adminId,
        clientId,
      } = req.body;  
      const ticket = new Tickets({
        category,
        priority,
        startDate,
        endDate,
        status,
        description,
        adminId,
        clientId,
      });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTicket = async (req, res) => {
  try {
    const ticket = await Tickets.find();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Tickets.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        category,
        priority,
        startDate,
        endDate,
        status,
        description,
        adminId,
        clientId,
    } = req.body;

    const ticket = await Tickets.findByIdAndUpdate(
      id,
      {
        category,
        priority,
        startDate,
        endDate,
        status,
        description,
        adminId,
        clientId,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Ticket
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Tickets.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//update ticket status
exports.updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;
    const ticket = await Tickets.findById(id);
    
    if (!ticket) {
      return res.status(404).json({ message: "ticket not found" });
    }
    const validStatuses = ["new", "approve", "rejected"]; 
    if (status && validStatuses.includes(status)) {
      ticket.status = status; 
    } else {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const updatedTicket = await ticket.save();

    res.status(200).json({
      message: "ticket status updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({
      message: error.message || "Error updating ticket status",
    });
  }
};