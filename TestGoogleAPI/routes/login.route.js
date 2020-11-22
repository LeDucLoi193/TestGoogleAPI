const express = require('express');
const router = express.Router();
// const todoController = require('../controllers/todo.controller');
const loginController = require('../controllers/login.controller');

router.post('/', loginController.login);
router.post('/sign-up', loginController.signUp);

module.exports = router;