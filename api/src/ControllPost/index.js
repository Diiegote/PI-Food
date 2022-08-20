const {Recipe,Type}= require("../db")


const recipePost = async (req,res)=>{
  const {name,image,dishTypes,healthscore,types,summary,steps}= req.body;
  try {
    if(!name) return res.json({info:"Nombre obligatorio"})
    const existe= await Recipe.findOne({where:{name:name}})
    if(existe) return res.json({info:"La Receta ya existe"})
  
    const recipe =await Recipe.create({name,image,dishTypes,healthscore,summary,steps})
   await Promise.all(types.map(async e =>{
              await recipe.addType([  
                    (await Type.findOrCreate({
                      where : {
                        name : e
                      }
                     }))[0].dataValues.id
                  ])
                }))
        
    const relacionTablas=await Recipe.findOne({where:{name:name},
      include:{model:Type,attributes:["name"],through :{attributes:[],}}})
    res.json({info:"Recipe Creada"})
    return relacionTablas
    
  } catch (error) {
    res.status(404).json({info:"Recipe no creada"})
  }
}
module.exports={recipePost}