import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Data{
  category: string,
  value: number
}

interface PieGraph {
  data : Data[]
}
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

export const PieGraph = ({data} : PieGraph) => {
  const graph = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }))
  return (
  <div style={{minHeight: 180}}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
        data={graph}
        dataKey="value"
        nameKey="category"
        cornerRadius={10}
        outerRadius="90%"
        />
        <Legend iconType='circle'/>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>);
}