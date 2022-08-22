const axios = require("axios");
const {Type} = require("../db")
// const {YOUR_API_KEY} = process.env


const getTypes = async(req,res)=>{
  try {
    const typesApi =  (await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=c4084f88df43462c8a74ebcf56dc459e&addRecipeInformation=true&number=100`)).data.results
  const dataApi= typesApi.map(e => e.diets).join().split(",").filter(e => e.length)
     dataApi.forEach(e => {
            Type.findOrCreate({
              where: { name: e }
            })
        })
        const typeDb = await Type.findAll()
       res.send(typeDb)

  } catch (error) {
    console.log(error)
  }
}

module.exports= {getTypes}




