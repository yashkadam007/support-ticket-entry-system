// models
const SupportAgent = require('../models/supportAgent');
// validator
const { validateSupportAgentData } = require('../validations/supportAgentValidation');


exports.createSupportAgent = (req, res, next) =>{
    const supportAgentData ={
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        active: true,
        dateCreated: new Date(),
    };

    //validate support agent data
    const validationErrors = validateSupportAgentData(supportAgentData);

    //Send error if data is invalid
    if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
            errors: validationErrors,
        });
    }

    const supportAgent = new SupportAgent(supportAgentData);
    //Save to db
    supportAgent.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Created Support Agent',
            createdAgent: supportAgent,
        });
    })
    .catch(err => {
        if (err.code === 11000 && err.keyPattern.email) {
            // duplicate email
            return res.status(400).json({
                errors: {
                    email: 'Email must be unique',
                },
            });
        }
        if (err.code === 11000 && err.keyPattern.phone) {
            // duplicate phone
            return res.status(400).json({
                errors: {
                    phone: 'Phone must be unique',
                },
            });
        }
        console.log(err);
        res.status(500).json({
            error: {
                message: 'Internal Server Error',
            },
        });
    });
};

exports.getAllSupportAgent = async (req, res, next) => {
    try {
        const supportAgents = await SupportAgent.find().exec();

        res.status(200).json({
            message: 'Successfully fetched support Agentss',
            supportAgents: supportAgents,
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