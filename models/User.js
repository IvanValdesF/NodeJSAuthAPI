
const db = require('../db');



//CREATE USER
const addUser = (name,email,password) =>{
    return db.none("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)",[name,email,password])
}

//GET ALL USERS
const getAllUsers = () => {
    return db.any("SELECT * FROM users")
}

const getUser = (id) => {
    return db.any("SELECT * FROM users WHERE id = $1",id)
}

const checkEmail = (email) =>{
    return db.any("SELECT * FROM users WHERE email = $1",email)
}

const deleteUser = (id) =>{
    return db.none("DELETE FROM users WHERE id = $1",id)
}


const updateUser = (name,id) => {
    return db.none("UPDATE users SET name = $1 WHERE id = $2",[name,id])
}

const checkPass = (password) =>{
    db.any("SELECT s FROM users s WHERE s.password = $1",password)
}




const addToAuth = "INSERT INTO authUsers (email) VALUES ($1)"
const removeFromAuth = "DELETE FROM authUsers WHERE email = $1"
const checkAuthEmail = "SELECT * FROM authUsers WHERE email = $1";

module.exports = {
    addToAuth,
    removeFromAuth,
    checkAuthEmail,

    addUser,
    getAllUsers,
    getUser,
    checkEmail,
    deleteUser,
    updateUser,
    checkPass
}