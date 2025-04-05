const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Route for user registration
router.post("/register", usersController.register);

// Route for user login
router.post("/login", usersController.login);

router.delete("/deleteUser",usersController.deleteUser)

module.exports = router;
