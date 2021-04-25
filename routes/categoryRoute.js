const express = require('express');
var passport = require('passport');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/get-all-categories', passport.authenticate('jwt', { session: false}) , categoryController.getAllCategory);

categoryRouter.post('/add-category', passport.authenticate('jwt', { session: false}), categoryController.addCategory);

module.exports = categoryRouter;