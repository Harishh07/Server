//import sequelize
const Sequelize = require("sequelize");


//Object creation of type Sequelize with Dialect as MYSQL
const sequelize = new Sequelize("book-directory", "root", 'qwerty123', {
    dialect: "mysql",
    host: "localhost"

});

module.exports = sequelize;
