const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.json('test is working');
}
//Register endpoint
const registerUser = async(req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName && !lastName) {
            return res.json({
                error: 'Name is required'
            })
        };
        //Check password
        if(!password) {
            return res.json({
                error: 'Password is required and should be at least 4 characters long'
            })
        };
        //Check email
        const exist = await User.findOne({ email })
        if(exist) {
            return res.json({
                error: 'Email is taken already',
            })
        };
        const hashedPassword = await hashPassword(password)
        //Create user in database
        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            password : hashedPassword,
        })
        return res.json(user)
    } catch(error) {
        console.log(error)
    }
}

//Login endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(411).json({
                error: 'No user found'
            })
        }
        //check if passwords match
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) 
                throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: 'Passwords do not match'
            })
        }
    }
    catch(error) {
        console.log(error)
    }

}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    } else {
        res.json(null);
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}