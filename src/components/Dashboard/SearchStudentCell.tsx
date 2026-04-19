import { maleUser, femaleUser } from "../../assets/index";
import style from "./SearchStudentCell.module.css"

interface Student {
  name: string,
  genre: string
}

export const SearchStudentCell = ({ name, genre} : Student) => {
  const userGenre = genre == "Femenino" ?  femaleUser : maleUser;
  return (
    <div className={style.card}>
      <img src={userGenre} alt="User Icon"/>
      <strong className={style.name} >{name}</strong>
    </div>
  );
}