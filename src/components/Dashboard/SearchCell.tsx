import { maleUser, femaleUser } from "../../assets/index";
import style from "./SearchCell.module.css"

interface Student {
  name: string,
  gender: string
  role?: string
}

export const SearchCell = ({ name, gender, role} : Student) => {
  const userGenre = gender == "Femenino" ?  femaleUser : maleUser;
  return (
    <div className={style.card}>
      <img src={userGenre} alt="User Icon"/>
      <strong className={style.name} >{name}</strong>
      <p>{role}</p>
    </div>
  );
}