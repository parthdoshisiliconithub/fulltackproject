const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Register 
const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        let existingUser
        existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists ! Login Please' })
        }
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)

        })

        const saveUser = await newUser.save();
        res.status(201).json(saveUser)

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}


//Login 

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({
            message: 'Invalid credentials'
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({ token, user })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
module.exports = { register, login }