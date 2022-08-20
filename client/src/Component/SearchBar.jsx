import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipesName } from '../Redux/Action/Action';
import style from "./SearchBar.module.css"


export default function SearchBar(props) {

  const dispatch = useDispatch()
  const [name, setRecipes] = useState("");
  const { setCurrentPage } = props
  
  function handleSearch(e) {
    setRecipes(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getRecipesName(name))
    setRecipes("")
    setCurrentPage(1)
  }
  return (
    <div className={style.searchDiv}>
      <input
        type="text" className={style.srcIn}
        placeholder='Buscar...'
       value={name} onChange={(e) => handleSearch(e)}
      />
      <button className={style.srcBtn} type="Submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  )
}