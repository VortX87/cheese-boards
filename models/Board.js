const { db } = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Board = db.define('Board', {

    type: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.REAL
    },

})

module.exports = { Board };