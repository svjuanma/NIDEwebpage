import { useState, useEffect, useMemo } from "react";
import { Card, BarsGraphH, Gauge, LinearGraph, PieGraph, ProgressCell, Register } from "../components/Dashboard/index";
import { maleUser, users } from "../assets/index";
import dashboard from "./DashboardTutor.module.css";
import { useAuth } from "../context/AuthContext";

interface Statistics {
  correctAnswers: number;
  questions: number;
  operation: string;
  time: number;
  month: string;
}

interface Student {
  id: number;
  name: string;
  gender: string;
  difficulty: string;
  completedNPCs: number;
  history: Statistics[];
  progress: number;
  precision: number;
  totalTime: number;
  avgTime: number;
}

const DashTutor = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [untrackedStudents, setUntrackedStudents] = useState(false);
  const [useRegister, setUseRegister] = useState(false);

  const operations = ['suma', 'resta', 'multiplicacion', 'division'];
  const { userId } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/dash/tutor`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ id_tutor: userId })
        }); 
        
        if (!response.ok) throw new Error("Response error");
        
        const { getStudents, npcs } = await response.json();

        // await new Promise(resolve => setTimeout(resolve, 1000));
        // const { getStudents, npcs } = test;
        //?
        const formattedStudents: Student[] = getStudents.map((student: any) => {
          const precision = student.history.length === 0 ? 0 : Math.round(
            student.history.reduce((acc: number, stat: Statistics) => acc + ((stat.correctAnswers * 100) / stat.questions), 0) / student.history.length
          );
          
          const progress = npcs === 0 ? 0 : Math.round((student.completedNPCs / npcs) * 100);
          const totalTime = student.history.reduce((timeAcc: number, attemp: any) => timeAcc += attemp.time, 0);
          const avgTime = student.history.length === 0 ? 0 : Math.round(totalTime / student.history.length);
          return { ...student, precision, progress, totalTime, avgTime };
        });

        setStudents(formattedStudents);
      } catch (error) {
        console.error(`Error while fetching: ${error}`);
      }
    };
    
    fetchStudents();
    setUntrackedStudents(false);
  }, [untrackedStudents]);

  const targetData = selectedStudent ? [selectedStudent] : students;  
  const metricasTarjetas = useMemo(() => {
    let tiempoJuego = targetData.reduce((timeAcc, student) => timeAcc += student.totalTime, 0);
    let tiempoMedioResp = 0;
    let totalPreguntas = 0;

    targetData.forEach(student => {
      student.history.forEach(attemp => {
        totalPreguntas += attemp.questions;
      });
    });

    if (totalPreguntas > 0) {
      tiempoMedioResp = Math.round(tiempoJuego / totalPreguntas);
    }

    return { tiempoJuego, tiempoMedioResp };
  }, [targetData]);

  const timeFormatted = useMemo(() => {
    let time, hours, minutes, seconds
    time = metricasTarjetas.tiempoJuego;
    hours = Math.trunc(time / 3600);
    time -= hours * 3600;
    minutes = Math.trunc(time / 60);
    seconds = time - minutes * 60;
    return `${hours}h. ${minutes}m. ${seconds}s.`;
  }, [metricasTarjetas.tiempoJuego]);

  const dominioGeneralDatos = useMemo(() => {
    return operations.map((operacion) => {
      const intentos = targetData.flatMap(s => s.history).filter(a => a.operation === operacion);
      if (intentos.length === 0) return { category: operacion, value: 0 };
      
      const sumaAccuracy = intentos.reduce((acc, attemp) => acc + ((attemp.correctAnswers * 100) / attemp.questions), 0);
      return { category: operacion, value: Math.round(sumaAccuracy / intentos.length) };
    });
  }, [targetData]);

  const evolucionMensualDatos = useMemo(() => {
    const todosLosIntentos = targetData.flatMap(s => s.history);
    
    const agrupado = todosLosIntentos.reduce((acc, attempt) => {
      const month = attempt.month; 
      const operacion = attempt.operation.toLowerCase() as 'suma' | 'resta' | 'multiplicacion' | 'division'; 
      const accuracy = (attempt.correctAnswers * 100) / attempt.questions;

      if (!acc[month]) {
        acc[month] = { suma: { t: 0, c: 0 }, resta: { t: 0, c: 0 }, multiplicacion: { t: 0, c: 0 }, division: { t: 0, c: 0 } };
      }
      if(acc[month][operacion]) {
        acc[month][operacion].t += accuracy;
        acc[month][operacion].c += 1;
      }
      return acc;
    }, {} as Record<string, any>); 

    return Object.entries(agrupado).map(([month, datos]) => {
      const calcProm = (d: { t: number, c: number }) => d.c === 0 ? 0 : Math.round(d.t / d.c);
      return {
        month: month,
        suma: calcProm(datos.suma),
        resta: calcProm(datos.resta),
        multiplicacion: calcProm(datos.multiplicacion),
        division: calcProm(datos.division),
      };
    });
  }, [targetData]);

  const ejerciciosResueltosDatos = useMemo(() => {
    return operations.map((operacion) => {
      const total = targetData
        .flatMap(s => s.history)
        .filter(a => a.operation === operacion)
        .reduce((acc, a) => acc + a.questions, 0);
      return { category: operacion.toLowerCase(), value: total };
    });
  }, [targetData]);

  const precisionCalculada = useMemo(() => {
    if (targetData.length === 0) return 0;
    const sumPrecisions = targetData.reduce((acc, student) => acc + student.precision, 0);
    return Math.round(sumPrecisions / targetData.length);
  }, [targetData]);


  return (
    <div className={dashboard.home} onClick={() => setSelectedStudent(null)}>
      
      <div className={dashboard.card}>
        <Card title="Tiempo de respuesta" desc={`Tiempo medio por respuesta del ${selectedStudent ? 'estudiante' : 'grupo'}`} value={`${metricasTarjetas.tiempoMedioResp}s.`} icon={users}/>
      </div>
      
      <div className={dashboard.card}>
        <Card title="Tiempo de juego" desc={`Tiempo total del ${selectedStudent ? 'estudiante' : 'grupo'}`} value={timeFormatted} icon={users}/>
      </div>

      <div className={dashboard.card}>
        <h1>Precisión</h1>
        <p>Promedio de respuestas correctas del {selectedStudent ? 'estudiante' : 'grupo'}</p> 
        <Gauge value={precisionCalculada} />
      </div>

      <div className={dashboard.card}>
        <h1>Ejercicios</h1>
        <p>Volumen total resuelto por {selectedStudent ? 'estudiante' : 'grupo'}</p>
        <PieGraph data={ejerciciosResueltosDatos} /> 
      </div>

      <div className={[dashboard.card, dashboard.medium].join(' ')}>
        <h1>Dominio General</h1>
        <p>Promedio de aciertos por operación matemática del {selectedStudent ? 'estudiante' : 'grupo'}</p>
        <BarsGraphH graphs={dominioGeneralDatos}/>
      </div>

      <div className={[dashboard.card, dashboard.medium].join(' ')}>
        <h1>Evolución</h1>
        <p>Progreso de calificaciones mensual del {selectedStudent ? 'estudiante' : 'grupo'}</p>
        <LinearGraph measureKey="month" data={evolucionMensualDatos} categories={operations}/>
      </div>

      <div className={[dashboard.card, dashboard.large].join(' ')}>
        <div style={{padding: 5, display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"fit-content"}}>
            <h1>Lista de Estudiantes</h1>
            <p>Progreso individual</p>
          </div>
          <button className={dashboard.button} onClick={() => setUseRegister(true)} style={{cursor:'pointer'}}>
            <img src={maleUser} alt="Search Icon" width={32} height={32}/>
            <p style={{color: "#464646"}}>Agregar un estudiante</p>
          </button>
        </div>
          { useRegister && (
            <Register allowStudent={true} onClose={()=>setUseRegister(false)}/>
          )}
        
        {students.map((student: Student) => {
          return (
            <div key={student.id} onClick={(e) => {
              e.stopPropagation();
              if (selectedStudent && selectedStudent.id === student.id) {
                setSelectedStudent(null);
              } else {
                setSelectedStudent(student);
              }
            }}>
              <ProgressCell 
                id={student.id} 
                name={student.name}
                progress={student.progress} 
                precision={student.precision} 
                gender={student.gender}
                tutor={true}
                isSelected={selectedStudent?.id === student.id}
                difficulty={student.difficulty}
                setUntracked={() => setUntrackedStudents(true)}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DashTutor;