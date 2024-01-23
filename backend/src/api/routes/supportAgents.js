const express = require('express');
const router = express.Router();

router.post('/',(req, res, next) =>{
    res.status(200).json({
        message:'Handling post request to support agent'
    });
});

module.exports = router;