const connection = require("../config/db");


const User = function(user) {
    this.email = user.email;
    this.password = user.password;
}  

User.register = function(newUser, result) {
    
}

User.findById = function(userId, result) {

}

User.findByEmail = async function(email) {
    const [rows,field] = await connection.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    return rows;
}

module.exports = User;