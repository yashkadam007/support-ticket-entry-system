const express = require('express');
const router = express.Router();

const supportAgentController = require('../controllers/supportAgents');

router.post('/',supportAgentController.createSupportAgent);

module.exports = router;