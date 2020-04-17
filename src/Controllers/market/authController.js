const User = require("../../Models/user");

exports.register = function(req, res) {
    const {email, password} = req.body;

    const user = new User({
        email: email,
        password: password
    });

   User.findByEmail(email).then( 
        (result) => {
            if(!result.length) {
                res.status(200).json({error: "Пользователь с данным email существует!"});
            }
            
            
        }, 
        (err) => {
            res.status(500).json("Извините, возникла ошибка при выполнении запроса!");
        }
    );
   
}

exports.login = function(req, res) {
    res.status(201).json({ message: "OK" });
}