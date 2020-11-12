const express = require('express');
const router = express.Router();
// const todoController = require('../controllers/todo.controller');
const loginController = require('../controllers/login.controller');

router.post('/', loginController.add);

module.exports = router;