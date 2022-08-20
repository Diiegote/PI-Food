import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllTypes, getOrderCreate, getOrderHScore, getOrderName, getRecipes, getTypes } from '../Redux/Action/Action'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import  style from  "./Home.module.css"
import NavBar from './NavBar'
import loader from "./cooking.gif"


const Home = () => {
  const dispatch = useDispatch()
  const recipes = useSelector(state => state.recipes)
  const Types = useSelector(state => state.allTypes)
  
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const indexOfLastRecipes = currentPage * recipesPerPage;
  const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  
  const currentRecipes = recipes.slice(
    indexOfFirstRecipes,
    indexOfLastRecipes
    );
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    useEffect(() => {
      dispatch(getAllTypes());
    }, [dispatch])
    
    useEffect(() => {
      dispatch(getRecipes())
    }, [dispatch])
    
    
    function handleFilterByType(e) {
      dispatch(getTypes(e.target.value))
      setCurrentPage(1)
    }
    
    const [order, setOrder] = useState('');
    function handleOrderAZ(e) {
      dispatch(getOrderName(e.target.value))
      setCurrentPage(1)
      setOrder(`Ordenado ${e.target.value}`)
  }

  const [orderHScore, setOrderHScore] = useState('')
  function handleOrderHScore(e) {
    dispatch(getOrderHScore(e.target.value))
    setCurrentPage(1)
    setOrderHScore(`OrdenScore ${e.target.value}`)
  }

  function handleFilterCreate(e) {
    dispatch(getOrderCreate(e.target.value))
    setCurrentPage(1)

  }


  return (
    <div className={style.holeHome}>
      <div className={style.navDiv}>
        <NavBar />
      </div>
      <div>
        <div className={style.nameDiv}> <SearchBar setCurrentPage={setCurrentPage} /></div>
        <div>
          <div className={style.selectorsdiv}>
            <select className={style.selectors1} defaultValue="OrdenAlfabetico" onChange={e => handleOrderAZ(e)}>
              <option disabled >OrdenAlfabetico</option>
              <option value='A-Z'>A-Z</option>
              <option value='Z-A'>Z-A</option>
            </select>
            <select className={style.selectors2} defaultValue="AllTypes" onChange={e => handleFilterByType(e)}>
              <option disabled value='AllTypes'>Todos los tipos</option>
              {Types.map(t => (

                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
            <select className={style.selectors1} defaultValue="Ordenado por p.salud" onChange={e => handleOrderHScore(e)}>
              <option disabled >Ordenado por p.salud</option>
              <option value='Max-Min'>Max-Min</option>
              <option value='Min-Max'>Min-Max</option>
            </select>
            <select className={style.selectors2} defaultValue="Api o Creados" onChange={(e) => handleFilterCreate(e)}>
              <option disabled>Api o Creados</option>
              <option value="All">Todos</option>
              <option value="Created">Creados</option>
              <option value="Api">Api</option>
            </select>
          </div>
          <div>
            <Paginado
              recipesPerPage={recipesPerPage}
              recipes={recipes.length}
              paginado={paginado}
              paginaActual={currentPage}
            />
            <div className={style.CardsContainer}>
              {
                currentRecipes.length ?
                  currentRecipes.map(e => {
                    return (
                      <div key={e.id}>
                        <Card
                          Name={e.name}
                          Image={e.image}
                          Types={e.types instanceof Array ? e.types.map(e => e.name).join(', ') : e.types ? e.types : "Sin Dietas"}
                          Id={e.id}
                          DishTypes={e.dishTypes}
                        />
                      </div>
                    )
                  }) : <div className={style.loader}><img src={loader} alt="CARGANDOOOO" /></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;