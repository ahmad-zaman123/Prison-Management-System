const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// GET all visits
router.get('/', visitController.getAllVisits);

// GET a specific visit by ID
router.get('/:id', visitController.getVisitById);

// CREATE a new visit
router.post('/add', visitController.createVisit);

// UPDATE a visit by ID
router.put('/update/:id', visitController.updateVisitById);

// DELETE a visit by ID
router.delete('/delete/:id', visitController.deleteVisitById);

module.exports = router;
