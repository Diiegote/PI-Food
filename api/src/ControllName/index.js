require("dotenv").config()
const {allRecipes} = require("../ControllRecipe/index")


const getName =async (req,res) =>{
  const {name} = req.query;
  const dataApi = await allRecipes()
  if(name){
    const recipeName = await dataApi.filter(e =>e.name.toLowerCase().includes(name.toLowerCase()))
    recipeName.length ? res.send(recipeName) : res.status(404).send("No existe el Nombre")
  } else{
    res.send(dataApi)
  }

}

module.exports={getName}