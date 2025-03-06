const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
category: { type: String },
priority: { type: String },
startDate: { type: Date },
endDate: { type: Date },
status: { type: String },
description: { type: String },
});

module.exports = mongoose.model('Tickets', ticketSchema);