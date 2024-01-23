exports.validateSupportTicketData = (data) => {
    const errors = {};
    
    // validate topic
    if (!data.topic) {
        errors.topic = 'Topic cant be empty';
    }

    // validate severity
    severity = parseInt(data.severity); 
    if (isNaN(severity) || severity<1 || severity>3) {
        errors.severity = 'Severity should be a valid number between 1-3';
    }

    //validate type
    if (!data.type) {
        errors.type = 'Please provide a type';
    }

    // validate date
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(data.resolvedOn)) {
        errors.resolvedOn = 'Resolved on should be a valid date of format DD/MM/YYYY';
    }

    return errors;
};

