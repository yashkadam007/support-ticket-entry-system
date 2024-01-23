const mongoose = require('mongoose');

const supportAgentSchema = mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: true,
    },
    phone:{
        type: String,
        unique: true,
    },
    description: String,
    active: Boolean,
    dateCreated: Date,
    lastAssigned:{
        type:Date,
        default:null,
    },
});

module.exports = mongoose.model('SupportAgent', supportAgentSchema);