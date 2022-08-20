import React from "react";
//import { SearchBar } from "../SearchBar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
 import style from "../Component/NavBar.module.css" 
import { getRecipes } from "../Redux/Action/Action";

export default function NavBar() {
 const dispatch = useDispatch()


  function handleRefresh() {
    dispatch(getRecipes())
  }

  return (

    <div  className={style.navDiv}>
      <Link to="/home">
        <button className={style.navBtn1} onClick={()=>handleRefresh()}>Recargar Recipes
        </button>
      </Link>

      <Link to="/createrecipes">
        <button className={style.navBtn2}>Crear Recipes
        </button>
      </Link>
      
    </div>

  )
}