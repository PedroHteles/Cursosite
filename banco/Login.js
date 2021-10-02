const Sequelize = require("sequelize");
const conection = require("./banco");


const login = conection.define('login',{
    user:{
        type: Sequelize.STRING,
        allowNull: false
    },

    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

login.sync({force: false}).then(() =>{
    console.log("Tabela criada!");
});

module.exports = login;