import { Register } from "../components/Dashboard/index";
import style from "./RegisterPage.module.css"

import logo from "../assets/LOGO-NIDE.png"

export const RegisterPage = () => (
  <div className={style.registerPageWrapper}>
     <section className={style.imageNide}>
        <img src={logo} alt="NIDE" />
      </section>
      <Register />
  </div>
)