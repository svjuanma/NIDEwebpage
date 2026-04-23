import { useState, type ChangeEvent } from "react";
import { SearchStudentCell } from "./SearchStudentCell";
import style from './StudentsSearch.module.css';

interface Props {
  isOpen: boolean,
  onClose: () => void
}

interface Student {
  id: number,
  name: string,
  genre: string,
  upToAdd : boolean
}

const usersBD : Student[] = [
  { id: 1, name: 'Juan Manuel Pérez Velázquez', genre: 'Masculino', upToAdd: false },
  { id: 2, name: 'Ana García', genre: 'Femenino', upToAdd: true},
  { id: 3, name: 'Carlos López', genre: 'Masculino', upToAdd: false },
  { id: 4, name: 'María Rodríguez', genre: 'Femenino', upToAdd: true},
  { id: 5, name: 'Luis Fernández', genre: 'Masculino', upToAdd: false }
];

export const StudentsSearch = ({ isOpen, onClose }: Props) => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<null | Student>(null);
  const [addedStudent, setAddedStudent] = useState<boolean | null>(null);
  
  const closerHandler = () => {
    setSearch('');
    setSelectedStudent(null);
    setAddedStudent(null); 
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

  const addStudent = (student : Student) => {
    student.upToAdd ? setAddedStudent(true) : setAddedStudent(false);
    console.log(student.id);
    //! LOGICA DE CONSULTA BD
  }

  if (!isOpen) return null;

  return (
    <div className={style.overlay} style={{cursor:'pointer'}} onClick={closerHandler}> 
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
              <div key={student.id} onClick={() => {
                if (selectedStudent && selectedStudent.id === student.id) {
                  setSelectedStudent(null);
                  setAddedStudent(null); 
                } else {
                  setSelectedStudent(student);
                  setAddedStudent(null); 
                }
              }}>
                <SearchStudentCell name={student.name} genre={student.genre} />
                
                {selectedStudent != null && (selectedStudent.id === student.id) ? (
                  <div className={style.acceptCard} >
                    {addedStudent === null ? (
                      <>
                        <p>¿Confirmas que deseas agregar a tu grupo?</p>
                        <svg viewBox="0 0 500 80" width="100%" height="100%" >
                        
                        <g className={style.btnDecline} 
                        style={{cursor:'pointer'}} 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setSelectedStudent(null);
                          setAddedStudent(null);
                        }}>
                          <rect className={style.svgBox} x="0" y="0" width="235" height="80" rx="20"/>
                          <path 
                            className={style.svgIcon} 
                            d="M 104.5 27 L 130.5 53 M 104.5 53 L 130.5 27" 
                            strokeWidth="12" 
                            strokeLinecap="round" 
                            fill="none" 
                          />
                        </g>

                        <g className={style.btnAccept} 
                        style={{cursor:'pointer'}}
                        transform="translate(235, 0)" 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          addStudent(student);
                        }}>
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
                      </>
                    ) : (
                      <>
                      {addedStudent ? (
                        <p>¡Estudiante agregado exitosamente!</p>
                      ) : (
                        <p>El estudiante ya fue asignado con otro instructor</p>
                      )}
                      </>
                    )}
                  </div>
                ) : null}
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