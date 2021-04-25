const express = require('express');
const {check} = require('express-validator');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');

authRouter.post('/signup',[
    check('firstName').not().isEmpty().withMessage('You first name is required'),
    check('lastName').not().isEmpty().withMessage('You last name is required'),
    check('username').not().isEmpty().withMessage('You user name is required'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().withMessage('You password is required'),
], validate, authController.signup);

authRouter.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, authController.login);

authRouter.post("/socialLogin", authController.socialLogin);

module.exports = authRouter;