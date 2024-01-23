const express = require('express');
const router = express.Router();

const supportTicketController = require('../controllers/supportTickets');

router.post('/',supportTicketController.createSupportTicket);

router.get('/',supportTicketController.getAllSupportTicket);

module.exports = router;