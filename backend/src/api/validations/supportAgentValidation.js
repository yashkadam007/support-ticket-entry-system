exports.validateSupportAgentData = (data) => {
    const errors = {};

    // validate name
    if (!data.name) {
        errors.name = 'Name cant be empty';
    }

    // validate email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.email = 'Email format not valid';
    }

    // validate phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
        errors.phone = 'Phone format not valid';
    }

    return errors;
};