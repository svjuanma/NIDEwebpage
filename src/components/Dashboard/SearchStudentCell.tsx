import { maleUser, femaleUser } from "../../assets/index";
import style from "./SearchStudentCell.module.css"

interface Student {
  name: string,
  gender: string
}

export const SearchStudentCell = ({ name, gender} : Student) => {
  const userGenre = gender == "Femenino" ?  femaleUser : maleUser;
  return (
    <div className={style.card}>
      <img src={userGenre} alt="User Icon"/>
      <strong className={style.name} >{name}</strong>
    </div>
  );
}