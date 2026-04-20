import { ResponsiveContainer, Bar, Tooltip, BarChart, XAxis, YAxis } from "recharts"
import { maleUser } from "../../assets"
import { femaleUser } from "../../assets"
import style from "./ProgressCell.module.css"

interface Person {
  name: string,
  progress: number,
  precision: number,
  gender: string,
  instructor?: boolean
}

export const ProgressCell = ({name, progress, precision, gender, instructor=false}: Person) => {
  const isInstructor = instructor ? "promedio de estudiantes" : "";
  const icon = gender.toLowerCase()=="female" ? femaleUser : maleUser;
  const progressData = [{category: "Progress", value: progress}];
  const precisionData = [{category: "Precision", value: precision}];

  return(
    <div className={style.mainContainer}>
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
    </div>);
}