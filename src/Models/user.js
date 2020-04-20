module.exports = (connection, Sequelize) => {
    const User = connection.define("user", {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        }
        ,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                isEmail: true
            },
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate:{
                len: 5,
            }
        }
        ,
        authToken: {
            type: Sequelize.STRING,
        },
        refToken:{
            type: Sequelize.STRING,
        }
    });
    return User;
};
