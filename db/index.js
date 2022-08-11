const { FLOAT } = require('sequelize')
const { INTEGER } = require('sequelize')
const { STRING } = require('sequelize')
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/shoes_db')


const Shoes = conn.define('shoe', {
    name: {
        type: STRING, 
        allowNull: false
    }, 
    size: {
        type: FLOAT
    }, 
    ownerId: {
        type: INTEGER
    }, 
    image: {
        type: STRING
    }, 
    description: {
        type: STRING
    }
})


const Owners = conn.define('owners', {
    name: {
        type: STRING, 
        allowNull: false
    }
})

Shoes.belongsTo(Owners)

module.exports = {
    conn,
    Shoes, 
    Owners
}