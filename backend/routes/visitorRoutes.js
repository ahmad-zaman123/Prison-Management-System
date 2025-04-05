const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// GET all visitors
router.get('/', visitorController.getAllVisitors);

// GET a specific visitor by ID
router.get('/:id', visitorController.getVisitorById);

// CREATE a new visitor
router.post('/add', visitorController.createVisitor);

// UPDATE a visitor by ID
router.put('/update/:id', visitorController.updateVisitorById);

// DELETE a visitor by ID
router.delete('/delete/:id', visitorController.deleteVisitorById);

module.exports = router;
