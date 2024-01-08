const axios = require("axios");
const recipeModel = require('../Model/recipe')
const messages = require("../Comman/messages");
const statusCode = require("../Comman/statusCode");
const { Resp, response } = require("../Comman/response");

const getRecipe = async (req, res) => {

  try {

    const querySearch = req.body.querySearch;
    // console.log(querySearch);
    const config = {
      method: 'get',
      url: `https://api.spoonacular.com/recipes/complexSearch`,
      params: {
        query: querySearch,
        maxFat: 25,
        number: 2,
        apiKey: process.env.API_KEY,
      },
    };

    const response = await axios(config);
    res.send({ status: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

const getPDP = async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).send({ status: false, error: 'Recipe ID is missing in the request body.' });
    }

    const config = {
      method: 'get',
      url: 'https://api.spoonacular.com/recipes/informationBulk',
      params: {
        ids: id,
        includeNutrition: false, // Corrected parameter name
        maxFat: 25,
        number: 2,
      },
      headers: {
        'apiKey': process.env.API_KEY, // Corrected parameter name
      },
    };

    const response = await axios(config);
    res.send({ status: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = getPDP;


const getrRecipeLocal = async (req, res) => {
  const querySearch = req.body.querySearch || "";
  recipeModel.getRecipe(querySearch).then((result) => {
    let results={
      results:result
    }
    Resp(response(true, statusCode.Created, messages.register, results), res)
  }).catch((error) => {
    console.error(error);
    res.status(500).send({ status: false, error: error.message });
  })
}
module.exports = { getRecipe, getrRecipeLocal ,getPDP};
