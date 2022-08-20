import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {useParams } from "react-router-dom";
import { getRecipesId, getClear } from "../Redux/Action/Action";
import NavBar from "./NavBar";
import style from "./Detail.module.css"
import loader from "./cooking.gif"



export default function Detail() {
  const recipeId = useSelector(state => state.detail)
  const dispatch = useDispatch()
  const { id } = useParams()


  useEffect(() => {
    dispatch(getRecipesId(id))
    return (dispatch(getClear()))
  }, [dispatch, id])


  return (
    <div className={style.holeRecipe}>
      <div className={style.nav}><NavBar></NavBar></div>
      {
        recipeId.name ? (
          <div className={style.recipeDetail} key={recipeId.id}>
            <h2> {recipeId.name}</h2>
            <img src={recipeId.image} alt={recipeId.name}></img>
            <h3>Types: {recipeId.types[0] instanceof Object ? recipeId.types.map(e => e.name).join(", ") : recipeId.types[0] ? recipeId.types.join(", ") : "Sin Dietas"}</h3>
            <h4> HealtScore: {recipeId.healthscore}</h4>
            <h4>  DishTypes: {recipeId.dishTypes}</h4>
            <div className={style.sumDiv}><p> Summary: <br /> {recipeId.summary ? recipeId.summary.replace(/<[^>]+>/g, '') : "No existe"}</p> </div>
            <div className={style.stepDiv}> <ol>Steps:<br />
              {recipeId.steps instanceof Array ?
                recipeId.steps.map((st, stindex) => {
                  return (
                    <li key={stindex}
                      number={st.number}>
                      {st.step}
                    </li>

                  )
                }) : recipeId.steps ? recipeId.steps : "Sin Steps"}</ol></div>
          </div>

        ) : <div className={style.loader}><img src={loader} alt="CARGANDOOOO" /></div>
      }
    </div>
  )
}

