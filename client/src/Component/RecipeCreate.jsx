import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes, postRecipes } from "../Redux/Action/Action";
import style from "./RecipeCreate.module.css"




function validate(input) {
  let errors = {}
  if (!input.name) errors.name = "Campo Obligatorio"
  if (!(/^[a-zA-Z-\s]+$/).test(input.name)) errors.name = "No puede contener numeros ni caracteres especiales"

  if (input.healthscore < 9) errors.healthscore = "El valor no puede ser menor a 9"
  if (input.healthscore < 0) errors.healthscore = "El valor no puede ser negativo"
  if (input.healthscore > 100) errors.healthscore = "El valor no puede ser mayor a 100"
  if (!input.healthscore) errors.healthscore = "Campo Obligatorio"

  if (!(/^[a-zA-Z-\s]+$/).test(input.dishTypes)) errors.dishTypes = "No puede contener numeros ni caracteres especiales"
  if (!input.dishTypes) errors.dishTypes = "Campo Obligatorio"

  if (input.types.length > 7) errors.types = "No puede contener mas de 7 dietas"

  if (input.summary.length < 30) errors.summary = "Mas de 30 caracteres"
  if (!input.summary) errors.summary = "Campo Obligatorio"

  if (input.steps.length < 10) errors.steps = "Mas de 10 caracteres"
  if (!input.steps) errors.steps = "Campo Obligatorio"
  return errors
}

export default function RecipeCreate() {
  const dispatch = useDispatch()
  const { allTypes, recipes } = useSelector(state => state)

  const history = useHistory()

  const [input, setInput] = useState({
    name: "",
    image: "",
    healthscore: "",
    dishTypes: "",
    summary: "",
    steps: "",
    types: []
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const allRecipe = recipes.map(e => e.name)
    if (!allRecipe.includes(e.target.value)) {

      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value
        })
      )
    }
  }
  function handleSelect(e) {
    if (!input.types.includes(e.target.value)) {
      setInput({
        ...input,
        types: [...input.types, e.target.value]
      })
      setErrors(
        validate({
          ...input,
          types: [...input.types, e.target.value]
        }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (
      errors.name ||
      errors.image ||
      errors.dishTypes ||
      errors.healthscore ||
      errors.summary ||
      errors.types ||
      !input.name
    ) {
      alert("Receta no creada, por favor completa los campos");
    } else {
      dispatch(postRecipes(input))
      alert("Receta creada")
      setInput({
        name: "",
        image: "",
        dishTypes: "",
        healthscore: "",
        summary: "",
        types: []
      })
      history.push("/home")
    }
  }
  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter(typ => typ !== e)
    })
    setErrors(
      validate({
        ...input,
        types: input.types.filter(typ => typ !== e)
      }))
  }


  useEffect(() => {
    dispatch(getAllTypes())
  }, [dispatch])

  return (
    <div className={style.holeForm}>

    <div><Link to="/home"><button className={style.refresh}>Volver</button></Link></div>

      <div className={style.formName}><h1>Formulario de creación</h1></div>

      <div className={style.formCard}>

        <form onSubmit={handleSubmit}>

          <div className={style.upperDiv}>
            <div className={style.div1}>
            <div>
              <label>Nombre: </label><input type="text" value={input.name} name="name" onChange={handleChange} /> 
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div>
              <label >Imagen(link):</label><input type="url" value={input.image} name="image" onChange={handleChange} />
            </div>

            <div>
              <label>Tipos de platos:</label><input type="string" value={input.dishTypes} name="dishTypes" onChange={handleChange} />
              {errors.dishTypes && <p>{errors.dishTypes}</p>}
            </div>
            </div>

            <div className={style.div2}>
              <div>
              <label> Resumen del plato:</label><input type="text" value={input.summary} name="summary" onChange={handleChange} />
              {errors.summary && <p>{errors.summary}</p>}
              </div>
            <div>
              <label> Puntuación de salud:</label><input type="number" value={input.healthscore} name="healthscore" onChange={handleChange} />
              {errors.healthscore && <p>{errors.healthscore}</p>}
              </div>
            <div>
              <label>Paso a paso:</label><input type="text" value={input.steps} name="steps" onChange={handleChange} />
              {errors.steps && <p>{errors.steps}</p>}
              </div>
               </div>
          </div>

          <div className={style.bottomDiv}>
            <div className={style.div3}>
            <select defaultValue="Seleccionar Dietas" onChange={e => handleSelect(e)}>
              <option disabled >Seleccionar Dietas</option>
              {allTypes.map((t, index) => (
                <option key={index} value={t.name}> {t.name}</option>))}
            </select>
            </div>
             </div>

          <div className={style.createBtn}>
            <button type='submit'>Crear Receta </button>
          </div>
        </form>

        <div className={style.typesForm}>
          {input.types.map((e, index) =>
            <div className={style.selectedDiet} key={index}>
              <p>{e}</p>
              <button onClick={() => handleDelete(e)}>x</button>
            </div>
          )}
          <div className={style.error}>
          {errors.types && <p>{errors.types}</p>}
          </div>
        </div>
      </div>
    </div>

  )
}