const axios = require("axios");
require("dotenv").config()
 const {YOUR_API_KEY} = process.env
const {Recipe,Type} =require("../db")



const recipesApi = async () =>{
  try {
  const recipes = (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)).data.results
  const dataApi= await recipes.map(e =>({
     id : e.id,
    name: e.title,
    image:e.image, 
    dishTypes : e.dishTypes.toString(),
     healthscore: e.healthScore,
     types : e.diets.map(e =>e).join(", ")
  }))

  return dataApi
  } catch (error) {
    console.log(error)
  }
}

const dataBRecipe = async () =>{
      return await Recipe.findAll({
        include : {
          model: Type,
          attributes: ["name"],
          through:{
            attributes : [],
          },
        }
      })
    }

    
    const allRecipes = async ()=>{
      const infoApi= await recipesApi();
      const infoDb= await dataBRecipe();
      const dbjoin=infoDb.map(e =>{
        return {
          id:e.id,
          name:e.name,
          image:e.image,
          types:e.types !== [""] ?e.types.map(e=>e.name).join(", ") :"Sin Tipos",
          dishTypes : e.dishTypes,
            healthscore: e.healthScore,

        }
      })
  
    return infoApi.concat(dbjoin)
      
    }
    
    module.exports= {allRecipes}
