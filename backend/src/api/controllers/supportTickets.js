// to change date format
const moment = require('moment');
//models
const SupportTicket = require('../models/supportTicket');
const SupportAgent = require('../models/supportAgent');
//validators
const { validateSupportTicketData } = require('../validations/supportTicketValidation')



// round robin to get name of Agent
const roundRobinAssignment = async () => {
    
    const supportAgents = await SupportAgent.find().exec();

    // handle no agent added
    if (supportAgents.length === 0) {
        throw new Error('No agent available');
    }

    // fetch all agent who haven't been assigned ticket even once
    const availableAgents = await SupportAgent.find({ lastAssigned: null }).sort('dateCreated').exec();

    
    if (availableAgents.length > 0) { // if new agent present
        
        const agentName = availableAgents[0].name;
        availableAgents[0].lastAssigned = new Date();
        await availableAgents[0].save();
        return agentName;
    } else { // every agent has been assigned a ticket once
        const allAgents = await SupportAgent.find().sort('lastAssigned').exec();
        const agentName = allAgents[0].name;
        allAgents[0].lastAssigned = new Date();
        await allAgents[0].save();
        return agentName;
    }
};

exports.createSupportTicket = async (req, res, next) => {
    try {
        const assignedTo = await roundRobinAssignment();

        const supportTicketData = {
            topic: req.body.topic,
            description: req.body.description,
            dateCreated: new Date(),
            severity: req.body.severity,
            type: req.body.type,
            assignedTo: assignedTo,
            status: "New",
            resolvedOn: req.body.resolvedOn,
        };

        // Validate support ticket data
        const validationErrors = validateSupportTicketData(supportTicketData);

        if (supportTicketData.resolvedOn) {
            supportTicketData.resolvedOn = moment.utc(supportTicketData.resolvedOn, "DD/MM/YYYY").toDate();
        }

        // Send error if data is invalid
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({
                errors: validationErrors,
            });
        }

        const supportTicket = new SupportTicket(supportTicketData);

        supportTicket
            .save()
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
        res.status(200).json({
            message: 'Created Support Ticket',
            createdTicket: supportTicket,
        });
    } catch (error) {
        if (error.message === 'No agent available') {
            return res.status(400).json({
                errors: {
                    message: 'No agent available to assign the ticket, please add an agent first',
                },
            });
        } else {
            console.error(error);
            res.status(500).json({
                error: {
                    message: 'Internal Server Error',
                },
            });
        }
    }
};

exports.getAllSupportTicket = async (req, res, next) => {
    try {
        // get page number and limit per page defult 1 page with 10 tickets
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // set filter query
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
        if (req.query.severity) filter.severity = req.query.severity;
        if (req.query.type) filter.type = req.query.type;

        // set sort query
        const sort = {};
        if (req.query.sortBy) {
            sort[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
        }

        // Database query with pagination, filtering, and sorting
        const supportTickets = await SupportTicket.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        res.status(200).json({
            message: 'Successfully fetched support tickets',
            supportTickets: supportTickets,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: {
                message: 'Internal Server Error',
            },
        });
    }
};

