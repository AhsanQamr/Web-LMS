const asyncHandler = require('express-async-handler')
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(email){
    const token =  jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '30d'})
    return token
}

const signup = asyncHandler(async(req,res) => {
    const {email,password} = await req.body
    if (!email || !password) {
        const data = {
            status: 400,
            message: 'Error: Please provide an email and password'
        }
        res.status(400).send(data)
        return
    }
    const admin = await Admin.findOne({email})
    if (admin){
        const data = {
            status: 400,
            message: 'Error: Admin already exists'
        }
        res.status(400).send(data)
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newAdmin = await Admin.create({
        email,
        password: hashedPassword
    })
    if (newAdmin){
        const data = {
            status: 201,
            _id: newAdmin._id,
            email: newAdmin.email,
            token: generateToken(newAdmin.email)
        }
        res.status(201).json(data)
    } else {
        const data = {
            status: 400,
            message: 'Error: Invalid admin data'
        }
        res.status(400).send(data)
    }
})

const login = asyncHandler(async(req,res) => {
    const {email,password} = await req.body
    if (!email || !password) {
        const data = {
            status: 400,
            message: 'Error: Please provide an email and password'
        }
        res.status(400).send(data)
        return
    }

    const admin = await Admin.findOne({email})
    if (!admin){
        const data = {
            status: 401,
            message: 'Error: Invalid email or password'
        }
        res.status(401).send(data)
        return
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)
    if (!passwordMatch){
        const data = {
            status: 401,
            message: 'Error: Invalid email or password'
        }
        res.status(401).send(data)
        return
    }

    const data = {
        status: 200,
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin.email)
    }
    res.status(200).json(data)
})


module.exports = {
    login,
    signup
}