import { useState } from "react"
import { Card, BarsGraphH, Gauge, LinearGraph, PieGraph, ProgressCell, PendingRequests } from "../components/Dashboard/index"
import { users } from "../assets/index"

import dashboard from "./DashboardAdmin.module.css"
const DashAdmin = () => {
// const promediosOperaciones = {
//   title: "Dominio",
//   desc: "Aciertos por área",
//   graphs: [
//   { category: 'Suma', value: 92 },
//   { category: 'Resta', value: 84 },
//   { category: 'Multiplicación', value: 75 },
//   { category: 'División', value: 60 },
// ]};

// const datosEvolucion = [
//   { mes: "Ene", suma: 65, resta: 50, multiplicacion: 30, division: 20 },
//   { mes: "Feb", suma: 75, resta: 62, multiplicacion: 45, division: 35 },
//   { mes: "Mar", suma: 82, resta: 75, multiplicacion: 58, division: 42 },
// ];

// const datosPie = [
//   { category: "suma", value: 450},
//   { category: "resta", value: 320},
//   { category: "multiplicacion", value: 150},
//   { category: "division", value: 80},
// ]

const instructors = [
  {name: "Mateo García López", progress: 95, precision: 20, gender: "male"},
  {name: "Sofía Ramírez Silva", progress: 88, precision: 80, gender: "female"},
  {name: "Diego Hernández Cruz", progress: 72, precision: 90, gender: "male"},
  {name: "Valentina Reyes Ochoa", progress: 64, precision: 60, gender: "female"},
  {name: "Santiago Morales Ruiz", progress: 45, precision: 100, gender: "male"},
  {name: "Isabella Torres Castro", progress: 100, precision: 10, gender: "female"}
]

// const materias = ["suma", "resta", "multiplicacion", "division"];

const metricasTotales = {
  instructores: 34,
  tutores: 28,
  estudiantes: 76,
  solicitudes: 5
};

// const precisionGrupal = 82;
const [pendingReq, setPendingReq] = useState(false)

  return (
    <div className={dashboard.home}>
      <div className={dashboard.card}><Card title="Instructores" desc="Total de instructores activos" value={String(metricasTotales.instructores)} icon={users}/></div>
      <div className={dashboard.card}><Card title="Tutores" desc="Total de tutores activos" value={String(metricasTotales.tutores)} icon={users}/></div>
      <div className={dashboard.card}><Card title="Estudiantes" desc="Total de estudiantes activos" value={String(metricasTotales.estudiantes)} icon={users}/></div>
      <div className={[dashboard.card, dashboard.interactive].join(' ')} 
      onClick={() => setPendingReq(true)}
      ><Card title="Solicitudes pendientes" desc="Total de solicitudes no aceptadas" value={String(metricasTotales.solicitudes)} icon={users}/></div>
      {/* <div className={[dashboard.card, dashboard.medium].join(' ')}><h1>Dominio General</h1><p>Promedio de aciertos por operación matemática</p><BarsGraphH graphs={promediosOperaciones.graphs}/></div> */}
      {/* <div className={[dashboard.card, dashboard.medium].join(' ')}><h1>Evolución</h1><p>Progreso de calificaciones mensual</p><LinearGraph measureKey="mes" data={datosEvolucion} categories={materias}/></div> */}
      <div className={[dashboard.card, dashboard.large].join(' ')}>
      <div style={{padding: 5, display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
        <div style={{width:"fit-content"}}>
        <h1>Lista de Instructores</h1>
        <p>Progreso individual</p>
        </div>
        <PendingRequests isOpen={pendingReq} onClose={() => setPendingReq(false)}/>
      </div>
        {instructors.map((student, index) => {
        return <ProgressCell key={index} name={student.name} progress={student.progress} precision={student.precision} instructor={true} gender={student.gender}/>
        })}
      </div>
      {/* <div className={[dashboard.card,dashboard.tall].join(' ')}><h1>Ejercicios</h1><p>Volumen total resuelto</p><PieGraph data={datosPie} /> </div> */}
      {/* <div className={dashboard.card}><h1>Precisión</h1><p>Promedio grupal de respuestas correctas</p> <Gauge value={precisionGrupal} /></div> */}
    </div>
  );
}

export default DashAdmin