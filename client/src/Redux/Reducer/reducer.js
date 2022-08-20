import { GET_ALL_TYPES, GET_CLEAR, GET_ORDER_CREATE, GET_ORDER_HSCORE, GET_ORDER_NAME, GET_RECIPES, GET_RECIPES_ID, GET_RECIPES_NAME, GET_TYPES } from "../Action/actionTypes"




const initialState={
 recipes:[],
 allRecipes:[],
 allTypes:[],
 detail:{}
}

export const rootReducer=(state=initialState,action)=>{
  switch (action.type) {
      case GET_RECIPES:
        return {
          ...state,
          recipes: action.payload,
          allRecipes:action.payload
        }
        case GET_RECIPES_ID:
          return {
            ...state,
            detail: action.payload
          }
          case GET_RECIPES_NAME:
            return {
              ...state,
                recipes: action.payload
            }
            case GET_CLEAR:
              return {
                ...state,
                detail: action.payload
              }
             
              case GET_TYPES:
                const types=state.allRecipes
                const filterByTypes= action.payload === "all" ? types
                : types.filter(e =>{
                    if(typeof(e.types === "string")) return e.types.includes(action.payload)})
                return{
                  ...state,
                  recipes: filterByTypes
                }


                  case GET_ALL_TYPES:
                 return {
                   ...state,
                   allTypes:  action.payload
                   }

                 case GET_ORDER_NAME:
                   let order = action.payload === "A-Z" ? 
                  state.recipes.sort(function(a,b){
                   if(a.name.toLowerCase() > b.name.toLowerCase() ) return 1
                   if(b.name.toLowerCase() > a.name.toLowerCase()) return -1
                   return 0
                   }) 
                  : state.recipes.sort(function(a,b){
                   if(a.name.toLowerCase() > b.name.toLowerCase() ) return -1
                  if(b.name.toLowerCase() > a.name.toLowerCase()) return 1
                   return 0
                  })
               return {
               ...state,
               recipes: order
             }

             case GET_ORDER_HSCORE:
              let orderScore = action.payload === "Min-Max" ?
              state.recipes.sort((a,b)=>{
                if(a.healthscore > b.healthscore) return 1
                if(b.healthscore > a.healthscore) return -1
                return 0
              })
              : state.recipes.sort((a,b)=>{
                if(a.healthscore > b.healthscore)return -1
                if(b.healthscore > a.healthscore) return 1
                return 0
              })
              return {
                ...state,
                recipes: orderScore
              }
              case GET_ORDER_CREATE:
                 const allCreate = state.allRecipes;
               const created_Filter = action.payload === 'Created' ? allCreate.filter(e=> typeof e.id=== "string")
               : allCreate.filter(e=> typeof e.id=== "number")
            return{
                ...state,
                recipes: action.payload === "All" ? state.allRecipes : created_Filter
            }
    
  
    default:
      return {...state}
    
  }
} 