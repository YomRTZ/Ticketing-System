const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Client', clientSchema);