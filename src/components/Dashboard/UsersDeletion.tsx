import { useEffect, useState, type ChangeEvent } from "react";
import { SearchCell } from "./SearchCell";
import style from './UsersDeletion.module.css';

interface Props {
  isOpen: boolean,
  onClose: () => void,
  untracked: boolean,
  setUntracked: ()=> void
}

interface User {
  id: number,
  name: string,
  gender: string,
  role: string,
}

export const UsersDeletion = ({ isOpen, onClose, untracked, setUntracked }: Props) => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<null | User>(null);
  const [activeUsers, setUnactiveUsers] = useState<User[]>([]);

useEffect(() => {
 const fetchActiveUsers = async () => {
  try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/dash/admin/usuariosAutorizados`);
        if(!response.ok) throw new Error(`Error obteniendo usuarios activos`);
        setUnactiveUsers(await response.json());
      } catch (e) {
        console.error(`Error: ${e}`);
      }
 }
 fetchActiveUsers();
},[untracked])
  
  const closerHandler = () => {
    setSearch('');
    setSelectedUser(null);
    onClose();
  }

  const inputChange = (change: ChangeEvent<HTMLInputElement>) => {
    setSearch(change.target.value);
  }

  const deleteUser = async (user : User) => {
    const users = activeUsers.filter((userDeleted) => userDeleted.id!=user.id );
    setUnactiveUsers(users);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dash/admin/eliminarUsuario`,{
        method:'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({userId:user.id})
      })
      if(!response.ok) throw new Error(`Error eliminando usuario`);
      else setUntracked();
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  }
  
  const filteredUsers = activeUsers.filter((user: User) => {
    const lowerCaseUser = user.name.toLocaleLowerCase();
    const lowerCaseSearch = search.toLocaleLowerCase();
    return lowerCaseUser.includes(lowerCaseSearch);
  });


  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={closerHandler}> 
      <div className={style.mainCard} onClick={(e) => e.stopPropagation()}>
        <h2>Eliminar usuarios</h2>
        <input
          id="search"
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
                <SearchCell name={user.name} gender={user.gender} role={user.role}/>
                
                {selectedUser != null && (selectedUser.id === user.id) ? (
                  <div className={style.acceptCard} >
                    <p>¿Confirmas que deseas eliminar a este usuario?</p>
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
                          deleteUser(user);
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
          <p className={style.emptySearch}>No se han encontrado usuarios</p>
        )}
        
      </div>
    </div>
  );
}