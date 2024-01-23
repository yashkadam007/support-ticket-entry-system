const mongoose = require('mongoose');

const supportTicketSchema = mongoose.Schema({
    topic: String,
    description: String,
    dateCreated: Date,
    severity: String,
    type: String,
    assignedTo: String,
    status: String,
    resolvedOn: Date,
});

module.exports = mongoose.model('SupportTicket', supportTicketSchema);