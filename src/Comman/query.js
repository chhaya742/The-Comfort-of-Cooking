
const knex = require("../database/db_config")


const findAll = async (tableName) => {
    const result = await knex.select('*').from(tableName)
    return result
}

const insert = async (tableName, userData) => {
    const result = await knex(tableName).insert(userData)
    return result
}

const getbyId = async (tableName, condition) => {
    const result = await knex.select('*').from(tableName).where(condition)
    return result

}

const search = async (tableName, searchTerm) => {
    const result = await knex.select('*').from(tableName).where('title', 'like', `%${searchTerm}%`);
    return result

}
const update = async (tableName, userData, id) => {
    const result = await knex.update(userData).from(tableName).where(id)
    return result

}


const Delete = async (tableName, id) => {
    const result = await knex(tableName).where(id).delete()
    return result

}

module.exports = { findAll, getbyId, insert, update, search, Delete }