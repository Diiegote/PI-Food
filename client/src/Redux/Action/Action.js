import { GET_ALL_TYPES, GET_CLEAR,GET_ORDER_CREATE,GET_ORDER_HSCORE, GET_ORDER_NAME, GET_RECIPES, GET_RECIPES_ID, GET_RECIPES_NAME, GET_TYPES } from "./actionTypes"
import axios from "axios"



export const getRecipes=()=>async (dispatch)=>{
let json= await axios("/recipes")
return dispatch(
  {type:GET_RECIPES,payload:json.data})
}


export const getRecipesId=(id)=>async (dispatch)=>{
  try {
     let json= await axios(`/recipes/${id}`)
     return dispatch(
       {type:GET_RECIPES_ID,payload:json.data})
     
     } catch (error) {
    alert(`el ID: ${id} no existe`)
  }
}


export const getRecipesName=(name)=>async(dispatch)=>{
  try {
    let json= await axios(`/recipes?name=${name}`)
   return dispatch(
      {type:GET_RECIPES_NAME,payload:json.data})
  } catch (error) {
    alert(`El nombre ${name} no existe`)
  }
}

export const getClear=()=>{
  return {
    type:GET_CLEAR,
    payload:[]
  }
}


export const getTypes=(payload)=>{
return {
  type:GET_TYPES, 
  payload,
}
}

export const getAllTypes=()=>async(dispatch)=>{
let json= await axios("/types")
return dispatch({
  type:GET_ALL_TYPES,
  payload:json.data
})
}

export function getOrderName(payload){
  return {
   type: GET_ORDER_NAME,
   payload,
 }
} 

export function getOrderHScore(payload){
  return {
    type:GET_ORDER_HSCORE,
    payload,
  }
}
export function getOrderCreate(payload){
  return {
    type: GET_ORDER_CREATE,
    payload,
  }
}
export const postRecipes = (payload)=>async ()=> {
 let json = await axios.post("/recipes",payload)
    return json
   }
