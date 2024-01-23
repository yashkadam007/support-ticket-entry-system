const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


//Routes
const agentRoutes = require('./api/routes/supportAgents');
const ticketRoutes = require('./api/routes/supportTickets');

// env variables
require('dotenv').config();
//DB connection
mongoose.connect("mongodb+srv://ricksanchezc181:" + process.env.MONGODB_PASS + "@cluster0.o9cmfgw.mongodb.net/?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Connected to MongoDB");
  })
  .catch(()=>{
    console.log("Couldn't connect to MongoDB");
})

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/support-agents', agentRoutes);
app.use('/api/support-tickets', ticketRoutes);

// error handling if route doesnt exist
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status =  404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;