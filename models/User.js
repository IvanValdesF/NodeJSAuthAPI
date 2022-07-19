
const config = require('../db');
const sql = require('mssql')

//GET ALL USERS
async function getAllUsers(){
    try{
        const pool = await sql.connect(config);
        let res = await pool.request().query("SELECT * FROM [user]");
        console.log(res.recordset)
        return res.recordset;
    }catch(error){
        console.log('error:' + error)
    }
}

//CREATE USER
async function addUser(name,email,password,phone){
    try{
        const pool = await sql.connect(config);
    await pool.request()
    .input("name",name)
    .input("email",email)
    .input("password",password)
    .input("phone",phone)
    .query("INSERT INTO [user] (userName,email,password,phoneNumber) VALUES (@name,@email,@password,@phone)")
    }catch(err){
        console.log(err)
    }
}

async function checkEmail(email){
    try{
        const pool = await sql.connect(config);
        let res = await pool.request()
        .input("email",email)
        .query("SELECT * FROM [user] WHERE email = @email");
        return res.recordset;
    }catch(error){
        console.log('error:' + error)
    }
    
}

async function getUser(id){
    try{
        const pool = await sql.connect(config);
        let res = await pool.request()
        .input("id",id)
        .query("SELECT * FROM [user] WHERE userID = @id");
        return res.recordset;
    }catch(error){
        console.log('error:' + error)
    }

}


async function deleteUser(id){
    try{
        const pool = await sql.connect(config);
        let res = await pool.request()
        .input("id",id)
        .query("DELETE FROM [user] WHERE userID = @id");
        return res.recordset;
    }catch(error){
        console.log('error:' + error)
    }
}

async function updateUser(name,id){
    try{
        const pool = await sql.connect(config);
        let res = await pool.request()
        .input("name",name)
        .input("id",id)
        .query("UPDATE [user] SET userName = @name WHERE userID = @id");
        return res.recordset;
    }catch(error){
        console.log('error:' + error)
    }
    
}

module.exports = {
    getAllUsers,
    addUser,
    checkEmail,
    getUser,
    deleteUser,
    updateUser,
}
