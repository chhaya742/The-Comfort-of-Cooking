const {dotenv}=require("dotenv").config();
knex=require("knex")({
    client:"mysql",
    connection:{
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DB
    }
});
module.exports=knex


