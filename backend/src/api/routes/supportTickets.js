const express = require('express');
const router = express.Router();

router.post('/',(req, res, next) =>{
    res.status(200).json({
        message:'Handling POST request to support ticket'
    });
});

router.get('/',(req, res, next) =>{
    res.status(200).json({
        message:'Handling GET request to support ticket'
    });
});

module.exports = router;