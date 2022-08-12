const { Board } = require('./Board')
const { Cheese } = require('./Cheese')
const { User } = require('./User')

User.hasMany(Board)
Board.belongsTo(User)
Cheese.belongsToMany(Board, { through: 'Board-Cheese', as: 'Mixed_Cheese' })
Board.belongsToMany(Cheese, { through: 'Board-Cheese', as: 'Mixed_Cheese' })


module.exports = { Board, Cheese, User }