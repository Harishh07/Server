//Imports
const Sequelize = require("sequelize");
const sequelize = require("../src/db/dbconnect");

//Schema of the Database
const Book = sequelize.define("book",
{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
        
});

module.exports = Book;