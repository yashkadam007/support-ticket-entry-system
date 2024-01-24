const express = require('express');
const router = express.Router();

const supportAgentController = require('../controllers/supportAgents');

router.post('/',supportAgentController.createSupportAgent);

router.get('/',supportAgentController.getAllSupportAgent);


module.exports = router;