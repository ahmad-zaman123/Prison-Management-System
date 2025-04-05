const express = require('express');
const router = express.Router();
const JailorController = require('../controllers/JailorController');

router.route('/')
    .get(JailorController.getAllJailors)
    .post(JailorController.addJailor);

router.route('/:id')
    .get(JailorController.getById)
    .put(JailorController.updateJailor)
    .delete(JailorController.deleteJailor);

module.exports = router;
