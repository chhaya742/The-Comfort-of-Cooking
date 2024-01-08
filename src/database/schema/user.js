const knex=require("../db_config");
knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('Name').notNullable();
    table.string('Email').unique().notNullable();
    table.string('Password').notNullable();
    table.string('Phone').notNullable();
    table.timestamps(false, true);
})
.then(() => console.log("table created"))
    .catch((err) => { console.log(err.sqlMessage);  })

module.exports=knex;    
    