const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/get-all-categories', categoryController.getAllCategory);

categoryRouter.post('/add-category', categoryController.addCategory);

module.exports = categoryRouter;