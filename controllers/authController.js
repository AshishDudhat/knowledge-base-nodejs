
const userModel = require('../models/userModel');
const authCtr = {};

authCtr.signup = async (req, res) => {
    try {
        const { email } = req.body;
        req.body['type'] = "local";
        // Make sure this account doesn't already exist
        const user = await userModel.findOne({ email });

        if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account.'});

        const newUser = new userModel({ ...req.body });
        let user_ = await newUser.save();
        delete user_.password;
        res.status(200).json({jwt_token: user_.generateJWT(), user: user_});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({success: false, message: error.message});
    }
}

authCtr.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) return res.status(401).json({msg: 'Invalid user!'});

        //validate password
        if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid email or password'});
        delete user.password;
        // Login successful, write token, and send back user
        res.status(200).json({jwt_token: user.generateJWT(), user: user});
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: error.message})
    }
}

authCtr.socialLogin = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await userModel.findOne({ email });
        if(!user) {
            let data = {
                email: req.body.email,
                username: req.body.name,
                type: req.body.provider,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
            const newUser = new userModel({ ...data });
            let user_ = await newUser.save();
            res.status(200).json({jwt_token: user_.generateJWT(), user: user_});
        } else {
            res.status(200).json({jwt_token: user.generateJWT(), user: user});
        }
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: error.message})
    }
}

module.exports = authCtr;