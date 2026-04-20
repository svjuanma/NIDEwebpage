import { Card, BarsGraphH, Gauge, LinearGraph, PieGraph, ProgressCell,  } from "../components/Dashboard/index"
import { users } from "../assets/index"

import dashboard from "./DashboardTutor.module.css"

const DashTutor = () => {
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
  TMR: 34,
  ejerciciosResueltos: 28,
};

const precisionGrupal = 82;


  return (
    <div className={dashboard.home}>
      <div className={dashboard.card}><Card title="Tiempo de respuesta" desc="Tiempo medio transcurrido por respuesta" value={`${metricasTotales.TMR}s.`} icon={users}/></div>
      <div className={dashboard.card}><Card title="Ejercicios resueltos" desc="Volumen total de ejercicios resueltos" value={String(metricasTotales.ejerciciosResueltos)} icon={users}/></div>
      <div className={dashboard.card}><h1>Precisión</h1><p>Promedio grupal de respuestas correctas</p> <Gauge value={precisionGrupal} /></div>
      <div className={dashboard.card}><h1>Ejercicios</h1><p>Volumen total resuelto</p><PieGraph data={datosPie} /> </div>
      <div className={[dashboard.card, dashboard.medium].join(' ')}><h1>Dominio General</h1><p>Promedio de aciertos por operación matemática</p><BarsGraphH graphs={promediosOperaciones.graphs}/></div>
      <div className={[dashboard.card, dashboard.medium].join(' ')}><h1>Evolución</h1><p>Progreso de calificaciones mensual</p><LinearGraph measureKey="mes" data={datosEvolucion} categories={materias}/></div>
      <div className={[dashboard.card, dashboard.large].join(' ')}>
      <div style={{padding: 5, display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
        <div style={{width:"fit-content"}}>
        <h1>Lista de Estudiantes</h1>
        <p>Progreso individual</p>
        </div>
      </div>
        {students.map((student, index) => {
        return <ProgressCell key={index} name={student.name} progress={student.progress} precision={student.precision} gender={student.gender}/>
        })}
      </div>
    </div>
  );
}

export default DashTutor