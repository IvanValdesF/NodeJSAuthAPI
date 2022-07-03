const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const pool = require('../db');
const jwtToken = require('../utils/jwt-helpers');
const User = require('../models/User')
const db = require('../db')

const getUsers = (req, res) => {
    return User.getAllUsers()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json({ err }));
}

const getUserById = (req, res) => {

    const { id } = req.params;
    return User.getUser(id)
        .then(data => { res.status(200).json(data); })
        .catch(err => res.status(400).json({ err }))
}

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)

    User.checkEmail(email).then(result => {
        if (result.length != 0) {
            return res.send('Email already registered');
        } else {
            User.addUser(name, email, hashedPassword)
                .then(res.status(201).json('user added succesfully'))
        }
    })
}



const deleteUser = (req, res) => {
    const { id } = req.params;
    User.getUser(id)
        .then(response => {
            if (response.length == 0) {
                return res.json('User not found');
            } else {
                User.deleteUser(id)
                    .then(res.status(201).json('user deleted succesfully'))
                    .catch(err => res.status(400).json({ err }))
            }
        })
}

const updateUser = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    User.getUser(id)
        .then(response => {
            if (response.length == 0) {
                return res.json('User not found');
            } else {
                User.updateUser(name, id)
                    .then(res.status(201).json('user updated succesfully'))
                    .catch(err => res.status(400).json({ err }))
            }
        })
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.checkEmail(email)

        if (user.length == 0) {
            return res.status(401).json('incorrect email')
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json('incorrect pass')
        }
        //jwt
        let tokens = jwtToken(user[0]);

        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        const response = [];
        response.push({
            email: user.email,
            name: user.name,
            id: user.id,
            isEmailConfirmed: user.isemailconfirmed,
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        }
        )
        res.json(response);
    } catch (err) {
        throw (err)
    }
}

const logout = async (req, res) => {
    try {
        
        
        res.clearCookie('refresh_token');
        return res.json('sesion cerrada');
    } catch (err) {
        throw (err)
    }
}

const refreshToken = (req, res) => {
    try {

        const refreshToken = req.cookies.refresh_token
        if (refreshToken === null) {
            return res.status(401).json("null refresh token")
        } else {
            jwt.verify(refreshToken, 'cadenasecretoR', (error, user) => {
                if (error) {
                    return res.status(403).json(error.message)
                } else {
                    let tokens = jwtToken(user);
                    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
                    res.json(tokens);
                }
            })
        }
    } catch (err) {
        throw (err)
    }
}

const clearRefreshToken = (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json('refres token deleted')
    } catch (error) {
        throw (error)
    }
}



module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    login,
    refreshToken,
    clearRefreshToken,
    logout
}

