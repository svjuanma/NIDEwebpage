import { useState, type ChangeEvent } from "react";
import { SearchStudentCell } from "./SearchStudentCell";
import style from './StudentsSearch.module.css';

const usersBD : Student[] = [
  { id: 1, name: 'Juan Manuel Pérez Velrázaiez', genre: 'Masculino' },
  { id: 2, name: 'Ana García', genre: 'Femenino'},
  { id: 3, name: 'Carlos López', genre: 'Masculino' },
  { id: 4, name: 'María Rodríguez', genre: 'Femenino' },
  { id: 5, name: 'Luis Fernández', genre: 'Masculino' }
];

interface Props {
  isOpen: boolean,
  onClose: () => void
}

interface Student {
  id: number,
  name: string,
  genre: string
}

export const StudentsSearch = ({ isOpen, onClose }: Props) => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<null | Student>(null);
  
  const closerHandler = () => {
    setSearch('');
    setSelectedStudent(null);
    onClose();
  }

  const inputChange = (change: ChangeEvent<HTMLInputElement>) => {
    setSearch(change.target.value);
  }
  
  const filteredUsers = usersBD.filter((student: Student) => {
    const lowerCaseUser = student.name.toLocaleLowerCase();
    const lowerCaseSearch = search.toLocaleLowerCase();
    return lowerCaseUser.includes(lowerCaseSearch);
  });


  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={closerHandler}> 
      <div className={style.mainCard} onClick={(e) => e.stopPropagation()}> 
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={inputChange}
          className={style.inputSearch}
        />
        
        {filteredUsers.length > 0 ? (
          <div className={style.resultsList}>
            {filteredUsers.map((student) => (
              <div key={student.id} onClick={(e) => {
                if (selectedStudent && selectedStudent.id === student.id) {
                  e.stopPropagation();
                  setSelectedStudent(null);
                } else {
                  setSelectedStudent(student)
                }
              }}>
                <SearchStudentCell name={student.name} genre={student.genre} />
                {selectedStudent!=null && (selectedStudent.id === student.id) ? (
                  <div className={style.acceptCard} >
                    <p>¿Confirmas que deseas agregar a tu grupo?</p>
                      <svg viewBox="0 0 500 80" width="100%" height="100%" >
  {/* Botón Rechazar (X) */}
  <g className={style.btnDecline} onClick={() => setSelectedStudent(null)}>
    <rect className={style.svgBox} x="0" y="0" width="235" height="80" rx="20"/>
    <path 
      className={style.svgIcon} 
      d="M 104.5 27 L 130.5 53 M 104.5 53 L 130.5 27" 
      strokeWidth="12" 
      strokeLinecap="round" 
      fill="none" 
    />
  </g>

  {/* Botón Aceptar (Check) */}
  <g className={style.btnAccept} transform="translate(235, 0)" onClick={() => console.log(student.id)}>
    <rect className={style.svgBox} x="30" y="0" width="235" height="80" rx="20" />
    <path 
      className={style.svgIcon} 
      d="M 130 40 L 143 53 L 165 25" 
      strokeWidth="12" 
      strokeLinecap="round" 
      fill="none" 
    />
  </g>
</svg>
                  </div>
                ) : (
                  null
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className={style.emptySearch}>No se han encontrado estudiantes</p>
        )}
        
      </div>
    </div>
  );
}