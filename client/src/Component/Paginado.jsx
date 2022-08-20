import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({ recipesPerPage, recipes, paginado, paginaActual }) {

  const pageNumbers = []

  for (let i = 0; i < Math.ceil(recipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return (

    <div className={style.container}>
      <ul className={style.btnList}>
        <button className={style.currentbtn}>{paginaActual}</button>
        {pageNumbers &&
          pageNumbers.map(number => (
            <div key={number}>
              <button className={style.btn} onClick={() => paginado(number)}>{number}</button>
            </div>
          ))}
      </ul>
    </div>

  )
}
