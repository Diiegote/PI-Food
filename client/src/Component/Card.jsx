import React from "react"
import { Link } from "react-router-dom"
import style from "./Card.module.css"


export default function Card({ Name, Image, Types,DishTypes,Id }) {
  return (

    <Link to={`/recipes/${Id}`}><div className={style.card} style={{ backgroundImage: `url("${Image}")` }}>
      <div className={style.cardContent}>
        <h3 className={style.cardName}>Name: {Name}</h3>
        <div className={style.contCard}>
          <h4 className={style.cardDish}>DishTypes: {DishTypes}</h4>
          <h5 className={style.cardTypes}>Types: {Types ? Types : "Sin Dietas"}</h5>
        </div>
      </div>
    </div></Link>
  )
}