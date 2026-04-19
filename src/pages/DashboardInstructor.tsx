import { useState } from "react"
import { Card, BarsGraphH, Gauge, LinearGraph, PieGraph, ProgressCell, StudentsSearch } from "../components/Dashboard/index"
import { users, searchLoupe } from "../assets/index"

import dashboard from "./DashboardInstructor.module.css"
const DashInstructor = () => {
const promediosOperaciones = {
  title: "Dominio",
  desc: "Aciertos por área",
  graphs: [
  { category: 'Suma', value: 92 },
  { category: 'Resta', value: 84 },
  { category: 'Multiplicación', value: 75 },
  { category: 'División', value: 60 },
]};

const datosEvolucion = [
  { mes: "Ene", suma: 65, resta: 50, multiplicacion: 30, division: 20 },
  { mes: "Feb", suma: 75, resta: 62, multiplicacion: 45, division: 35 },
  { mes: "Mar", suma: 82, resta: 75, multiplicacion: 58, division: 42 },
];

const datosPie = [
  { category: "suma", value: 450},
  { category: "resta", value: 320},
  { category: "multiplicacion", value: 150},
  { category: "division", value: 80},
]

const students = [
  {name: "Mateo García López", progress: 95, precision: 20, gender: "male"},
  {name: "Sofía Ramírez Silva", progress: 88, precision: 80, gender: "female"},
  {name: "Diego Hernández Cruz", progress: 72, precision: 90, gender: "male"},
  {name: "Valentina Reyes Ochoa", progress: 64, precision: 60, gender: "female"},
  {name: "Santiago Morales Ruiz", progress: 45, precision: 100, gender: "male"},
  {name: "Isabella Torres Castro", progress: 100, precision: 10, gender: "female"}
]

const materias = ["suma", "resta", "multiplicacion", "division"];

const metricasTotales = {
  estudiantes: 34,
  activos: 28,
  completitud: 76,
  alertas: 5
};

const precisionGrupal = 82;
const [searchBar, setSearchBar] = useState(false)

  return (
    <div className={dashboard.home}>
      <div className={dashboard.card}><Card title="Estudiantes Totales" desc="Alumnos inscritos" value={metricasTotales.estudiantes} icon={users}/></div>
      <div className={dashboard.card}><Card title="Activos" desc="Alumnos activos esta semana" value={metricasTotales.activos} icon={users}/></div>
      <div className={dashboard.card}><Card title="Avance General" desc="Porcentaje de completitud" value={metricasTotales.completitud} icon={users}/></div>
      <div className={dashboard.card}><Card title="Alertas" desc="Requieren atención" value={metricasTotales.alertas} icon={users}/></div>
      <div className={[dashboard.card, dashboard.medium].join(' ')}><h1>Dominio General</h1><p>Promedio de aciertos por operación matemática</p><BarsGraphH graphs={promediosOperaciones.graphs}/></div>
      <div className={[dashboard.card, dashboard.medium].join(' ')}><h1>Evolución</h1><p>Progreso de calificaciones mensual</p><LinearGraph measureKey="mes" data={datosEvolucion} categories={materias}/></div>
      <div className={[dashboard.card, dashboard.large].join(' ')}>
      <div style={{padding: 5, display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
        <div style={{width:"fit-content"}}>
        <h1>Lista de Estudiantes</h1>
        <p>Progreso individual</p>
        </div>
        <button className={dashboard.button} onClick={() => setSearchBar(true)}>
        <img src={searchLoupe} alt="Search Icon" width={32} height={32}/>
        <p style={{color: "#464646"}}>Agregar un estudiante</p>
        </button>
        <StudentsSearch isOpen={searchBar} onClose={() => setSearchBar(false)}/>
      </div>
        {students.map((student, index) => {
        return <ProgressCell key={index} name={student.name} progress={student.progress} precision={student.precision} gender={student.gender}/>
        })}
      </div>
      <div className={[dashboard.card,dashboard.tall].join(' ')}><h1>Ejercicios</h1><p>Volumen total resuelto</p><PieGraph data={datosPie} /> </div>
      <div className={dashboard.card}><h1>Precisión</h1><p>Promedio grupal de respuestas correctas</p> <Gauge value={precisionGrupal} /></div>
    </div>
  );
}

export default DashInstructor