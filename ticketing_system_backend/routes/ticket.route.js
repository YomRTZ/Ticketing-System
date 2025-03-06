const express = require('express');
const router = express.Router();
const {createTicket,getAllTicket,getTicketById,updateTicket,deleteTicket, updateTicketStatus} = require('../controllers/ticket.controller.js');

router.post('/create',createTicket);
router.get('/get',getAllTicket);
router.get('/get/:id', (req, res, next) => {
    console.log(`GET request received with ID: ${req.params.id}`);
    next();  
},getTicketById);

router.put('/update/:id',(req, res, next) => {
    console.log(`update request received with ID: ${req.params.id}`);
    next();  
},updateTicket);
router.put('/update/:id/status', (req, res, next) => {
    console.log(`PUT request received for lease ID: ${req.params.id}`);
    next();
}, updateTicketStatus);

router.delete('/delete:id',deleteTicket);

module.exports = router;
