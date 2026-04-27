//! cambiar fetch
import { useEffect, useState } from "react"
import { Card, PieGraph, ProgressCell, PendingRequests, UsersDeletion } from "../components/Dashboard/index"
import { users } from "../assets/index"
import dashboard from "./DashboardAdmin.module.css"

interface Instructors {
  name: string,
  groupProgress: number,
  groupPrecision: number,
  gender: string
}

interface AdminStatistics {
  adminsNum: number,
  tutorsNum: number,
  studentsNum: number,
  requestsNum: number,
  instructors: Instructors[]
}

const DashAdmin = () => {
  const [pendingReq, setPendingReq] = useState(false);
  const [deleteUsers, setDeleteUsers] = useState(false);
  const [data, setData] = useState<AdminStatistics>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/dash/admin`);
        if(!response.ok) throw new Error('Error al obtener información de usuarios');
        
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.error(`Error: `, e);
      }
    };
    
    fetchUsers();
  }, [pendingReq, deleteUsers]);



  if (!data) {
    return (
      <div className={dashboard.home} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  const dataPie = [
    {category: 'Administradores', value: data.adminsNum},
    {category: 'Instructores', value: data.instructors.length},
    {category: 'Estudiantes', value: data.studentsNum},
    {category: 'Tutores', value: data.tutorsNum},
  ];

  const totalUsers = data.adminsNum + data.studentsNum + data.tutorsNum + data.instructors.length;

  return (
    <div className={dashboard.home}>

      <div 
        className={[dashboard.card, dashboard.interactive].join(' ')} 
        onClick={() => setDeleteUsers(true)}
        style={{cursor:'pointer'}}
      >
        <Card title="Eliminar usuarios" desc="Total usuarios activos en el sistema" value={String(totalUsers)} icon={users}/>
      </div>
      <UsersDeletion isOpen={deleteUsers} onClose={() => setDeleteUsers(false)}/>
      

      <div className={dashboard.card}>
        <h1>Usuarios</h1>
        <p>Distribución de roles de usuarios en el sistema</p>
        <PieGraph data={dataPie} /> 
      </div>
      
      <div 
        className={[dashboard.card, dashboard.interactive].join(' ')} 
        onClick={() => setPendingReq(true)}
        style={{cursor:'pointer'}}
      >
        <Card title="Solicitudes pendientes" desc="Total de solicitudes no aceptadas" value={String(data.requestsNum)} icon={users}/>
      </div>
      <PendingRequests isOpen={pendingReq} onClose={() => setPendingReq(false)}/>
      
      <div className={[dashboard.card, dashboard.large].join(' ')}>
        <div style={{padding: 5, display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"fit-content"}}>
            <h1>Lista de Instructores</h1>
            <p>Progreso individual</p>
          </div>
        </div>
        
        {data.instructors.map((instructor, index) => (
          <ProgressCell 
            key={index} 
            name={instructor.name} 
            progress={instructor.groupProgress} 
            precision={instructor.groupPrecision} 
            instructor={true} 
            gender={instructor.gender}
          />
        ))}
      </div>
    </div>
  );
}

export default DashAdmin;