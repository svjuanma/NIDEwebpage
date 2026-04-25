import { ResponsiveContainer, Bar, Tooltip, BarChart, XAxis, YAxis } from "recharts"
import { maleUser } from "../../assets"
import { femaleUser } from "../../assets"
import style from "./ProgressCell.module.css"
import { setStudent } from "./setStudent"


interface Person {
  id: number,
  name: string,
  progress: number,
  precision: number,
  gender: string,
  instructor?: boolean
  difficulty ?: string,
}

interface Props extends Person {
  isSelected: boolean
  setDifficulty ?: (newDIff: string) => void
  untrackedStudents ?: () => void
}

const sendNewDifficulty = async (id_student: number, difficulty: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/dash/instructor/cambiarDificultad`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({dificultad: difficulty, idEstudiante: id_student})
    });
    if (!response.ok) throw new Error('Error en en el envio de dificultad');
}
catch (e) {
  console.error(`Unexpected error: ${e}`);
}
}

export const ProgressCell = ({id, name, progress, precision, gender, instructor=false, difficulty, setDifficulty, isSelected, untrackedStudents}: Props ) => {
  const isInstructor = instructor ? "promedio de estudiantes" : "";
  const icon = gender.toLowerCase()=="female" ? femaleUser : maleUser;
  const progressData = [{category: "Progress", value: progress}];
  const precisionData = [{category: "Precision", value: precision}];
  const difficultyArr = ['facil', 'intermedio', 'dificil'];


  
  return(
    <div className={isSelected ?  style.selectedContainer : style.mainContainer } >
      <div className={style.outerContent}>
        <div className={style.innerContent}>
          <img src={icon} alt="User icon" width={48} height={48} />
          <h1 style={{fontSize:"1em", flex:1, minWidth:120}}>{name}</h1>
          <div style={{display:"flex", flexDirection:"column", flex:2}}>
            <div style={{display:"flex", flexDirection:"row", gap:20}}>
              <p>Progreso {isInstructor}</p>
              <p style={{color:"black"}}>{progress}%</p>
            </div>
            <ResponsiveContainer  width="100%" height={20}>
              <BarChart data={progressData} layout="vertical" margin={{top:0, bottom:0, left:0, right:0}}>
                <XAxis type="number" domain={[0,100]} hide/>
                <YAxis type="category" dataKey="category" hide/>
                <Tooltip cursor={{fill:"#d2d2d2", radius:10}}/>
                <Bar
                dataKey="value" 
                fill="#000" 
                radius={[10, 10, 10, 10]}
                background={{ fill: "#eee", radius: 10 }}
                animationDuration={1000}
                animationEasing="ease-in-out"
                />
              </BarChart>
            </ResponsiveContainer>

            <div style={{display:"flex", flexDirection:"row", gap:20}}>
              <p>Precisión {isInstructor}</p>
              <p style={{color:"black"}}>{precision}%</p>
            </div>
            <ResponsiveContainer  width="100%" height={20}>
              <BarChart data={precisionData} layout="vertical" margin={{top:0, bottom:0, left:0, right:0}}>
                <XAxis type="number" domain={[0,100]} hide/>
                <YAxis type="category" dataKey="category" hide/>
                <Tooltip cursor={{fill:"#d2d2d2", radius:10}}/>
                <Bar
                dataKey="value" 
                fill="#8e8c8c" 
                radius={[10, 10, 10, 10]}
                background={{ fill: "#eee", radius: 10 }}
                animationDuration={1000}
                animationEasing="ease-in-out"
                />
              </BarChart>
            </ResponsiveContainer>
            
          </div>
          {(isSelected && !isInstructor) && (
            <svg viewBox="0 0 100 100" width="48" height="48" style={{justifySelf:"center"}}>
            <g 
              className={style.btnRemove} 
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation(); 
                setStudent(id, null);
                untrackedStudents?.();
              }}
            >
              <circle className={style.svgBox} cx="50" cy="50" r="45" />
              <path 
                className={style.svgIcon} 
                d="M 25 50 L 75 50" 
                strokeWidth="12" 
                strokeLinecap="round" 
                fill="none" 
              />
            </g>
          </svg>
          )}
        </div>
        { (isSelected && !isInstructor) && (
          <div className={style.selectDifficulty} onClick={ e => e.stopPropagation()}>
            <p style={{maxWidth:"fit-content"}}>Selecciona dificultad</p>
            <div className={style.difficultyOpts}>
            {difficultyArr.map( (difficultyOpt: string, index) => (
              <div key={index} className={difficultyOpt == difficulty ? [style.selectedDifficultyCell, style.difficultyCell].join(' ') : style.difficultyCell} onClick={ () => {
                setDifficulty?.(difficultyOpt);
                sendNewDifficulty(id, difficultyOpt);
              }}>
                {difficultyOpt}
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>);
}