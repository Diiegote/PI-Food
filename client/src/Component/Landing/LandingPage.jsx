import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";


export default function LandingPage() {
  return (
    <div className={style.landing}>

      <div className={style.backgroundCard}>
        <div className={style.opac}>
          <div className={style.cardShadow}>
            <div className={style.landingCard}>
              <div className={style.content}> <h2 className={style.title}>Proyecto Food</h2>
                <p className={style.welcome}>Bienvenidos a mi Proyecto,<br />
                  encontraras varias ideas<br />
                  para comer<br />
                  o podras crear tus propias recetas</p>
              </div>
              <div className={style.btnLink}>
                <Link to="/home">

                  <div><button>Vamos ahí!</button></div>
                </Link>
              </div>
            </div>
          </div> </div>
      </div>
      <footer></footer>
    </div>
  )
  }