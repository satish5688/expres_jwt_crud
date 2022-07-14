const knex = require("./db_connection")
const jwt = require('jsonwebtoken')


const createtoken = ({ id }) => {
    return jwt.sign(id, "54e6uhjgtr567t8uoijhgfrt6t")

}

const verifyToken = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split('=')[1]
        const varify = jwt.verify(token, "54e6uhjgtr567t8uoijhgfrt6t")
        const search = await knex('learning').where({ id: varify })
        req.present = search
        next()
    } else{
        res.send("token expired")
    }

}



module.exports = { createtoken, verifyToken }