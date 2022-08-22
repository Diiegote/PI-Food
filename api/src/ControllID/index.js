const axios = require("axios");
// const {YOUR_API_KEY} = process.env
const {Recipe,Type} =require("../db")
// require("dotenv").config()

const getId = async (req,res)=>{
  let {id} = req.params;
  try {
    if(!id.includes("-")){
 const api = (await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=349da89437aa469fa7747b15547b184c`)).data
 const infoApi = {
   id:api.id,
   name:api.title,
   image:api.image,
   dishTypes : api.dishTypes.toString(),
   healthscore: api.healthScore,
   types : api.diets.map(e =>e),
   summary: api.summary,
  steps:api.analyzedInstructions[0]?.steps.map(e => {return {number:e.number,step:e.step}})
  }
  res.send(infoApi)
  } else{

           const recipeDb= await Recipe.findByPk(id,{
         include:{
           model:Type,
           attributes:["name"],
           through: {attributes:[]}
         }})
         res.send(recipeDb)
  }
  } catch{
  res.status(404).send(`El id: ${id}, no encontrado`)
}
}
module.exports={getId}