require("../database/schema/user");
const query = require("../comman/query");

const getRecipe = async (queryString) => {
    var data = await query.search('recipes', queryString);
    return data;
}

module.exports = {getRecipe}
