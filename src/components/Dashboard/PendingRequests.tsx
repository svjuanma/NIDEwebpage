import { useState, type ChangeEvent } from "react";
import { SearchStudentCell } from "./SearchStudentCell";
import style from './pendingRequests.module.css';

interface Props {
  isOpen: boolean,
  onClose: () => void
}

interface User {
  id: number,
  name: string,
  genre: string,
  role: string,
}

const usersBD : User[] = [
  { id: 1, name: 'Juan Manuel Pérez Velázquez', genre: 'Masculino', role: 'Administrador' },
  { id: 2, name: 'Ana García', genre: 'Femenino', role: 'Tutor'},
  { id: 3, name: 'Carlos López', genre: 'Masculino', role: 'Estudiante' },
  { id: 4, name: 'María Rodríguez', genre: 'Femenino', role: 'Instructor'},
  { id: 5, name: 'Luis Fernández', genre: 'Masculino', role: 'Estudiante' }
];

export const PendingRequests = ({ isOpen, onClose }: Props) => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  
  const closerHandler = () => {
    setSearch('');
    setSelectedUser(null);
    onClose();
  }

  const inputChange = (change: ChangeEvent<HTMLInputElement>) => {
    setSearch(change.target.value);
  }

  const acceptUser = (user : User) => {
    const unAuth = unauthorizedUsers.filter((unauthUser) => unauthUser.id!=user.id )
    setUnauthorizedUsers(unAuth);
    //!logica para post/update
  }

  const [unauthorizedUsers, setUnauthorizedUsers] = useState(usersBD);
  
  const filteredUsers = unauthorizedUsers.filter((user: User) => {
    const lowerCaseUser = user.name.toLocaleLowerCase();
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
            {filteredUsers.map((user) => (
              <div key={user.id} 
              style={{cursor:'pointer'}}
              onClick={() => {
                if (selectedUser && selectedUser.id === user.id) {
                  setSelectedUser(null);
                } else {
                  setSelectedUser(user);
                }
              }}>
                <SearchStudentCell name={user.name} genre={user.genre} />
                
                {selectedUser != null && (selectedUser.id === user.id) ? (
                  <div className={style.acceptCard} >
                    <p>¿Confirmas que deseas autorizar a este usuario?</p>
                        <svg viewBox="0 0 500 80" width="100%" height="100%" >
                        
                        <g className={style.btnDecline} 
                        style={{cursor:'pointer'}}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setSelectedUser(null);
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
                        transform="translate(235, 0)"
                        style={{cursor:'pointer'}}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          acceptUser(user);
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