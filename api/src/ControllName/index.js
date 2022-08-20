require("dotenv").config()
const {allRecipes} = require("../ControllRecipe/index")


// const getName = (req,res) =>{
//   const {name} = req.query;
//   const dataApi = await allRecipes()
//   if(name){
//     const recipeName = await dataApi.filter(e =>e.name.toLowerCase().includes(name.toLowerCase()))
//     recipeName.length ? res.send(recipeName) : res.status(404).send("No existe el Nombre")
//   } else{
//     res.send(dataApi)
//   }

// }
async function getName (req, res){
  const name = req.query.name
  let foods = await allRecipes();
  if (name){
      let recipeName = await foods.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
      recipeName.length ?
      res.status(200).send(recipeName):
      res.status(404).send('Not Found')
  }else{
      res.status(200).send(foods)
  }
}

module.exports={getName}