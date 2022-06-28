const knex=require("knex")({
    client:"mysql",
    connection:{
        user:"root",
        password:"Satish@5688",
        database:"learn_3",
        host:'localhost'
    }
})

knex.schema.createTable('learning',(table)=>{
    table.increments('id')
    table.string("name")
    table.string("mail")
    table.string('password')
}).then(()=>{
    console.log("table created successfully");
}).catch((Error)=>{
    // console.log(Error.message);
})


module.exports=knex