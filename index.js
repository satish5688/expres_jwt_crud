const knex = require("./db_connection")
const express = require("express")
const app = express()
const { createtoken, verifyToken } = require("./jwt")



app.use(express.json())



app.post("/signup", async (req, res) => {
    const data = await knex("learning").where({ mail: req.body.mail })
    if (data.length == 0) {
        await knex("learning").insert(req.body)
        res.send("your data has been inserted to the database.")
    } else {
        res.send("alerdy exsit")
    }
})



app.get('/login', async (req, res) => {
    const data = await knex('learning').where({ mail: req.body.mail, password: req.body.password })
    // console.log(data);
    if (data.length ==1) {
        const token = await createtoken(data[0])
        res.cookie('jay', token)
        res.send("your are log in sucessfully")
    } else {

        res.send("mail or password is incorrect")
    }
})



app.put("/update",verifyToken, async (req, res) => {
    const updated = await knex("learning").where({id : req.present[0].id}).update({name:req.body.name || req.present[0].name,mail:req.body.mail || req.present[0].mail,password:req.body.password || req.present[0].passwor})
    res.send("updated")
})

app.get('/read', verifyToken,async (req, res) => {
    const a = await knex('learning').where({ id: req.present[0].id })
    res.json(a[0])

})

app.delete('/delete', verifyToken,async (req, res) => {
    const a = await knex('learning')
        .where({ mail: req.present[0].mail })
        .del()
    res.send("deleted")
})




app.listen(3000, () => {
    console.log("connected..");
})