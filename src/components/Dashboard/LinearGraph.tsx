import { ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from "recharts";


interface Data {
  [key: string]: string | number; 
}

interface Graph {
  measureKey: string;
  data: Data[];
  categories: string[];
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4"];

export const LinearGraph = ({ measureKey, data, categories }: Graph) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} /> 
        
        <XAxis dataKey={measureKey} axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fill: '#666', fontSize: 12 }} />
        
        <Tooltip />
        <Legend iconType="circle" />
        {categories.map((category, index) => {
          return (
            <Line 
              key={category} 
              type="linear" 
              dataKey={category} 
              stroke={COLORS[index % COLORS.length]} /* Toma un color cíclico del arreglo */
              strokeWidth={2} 
              dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} 
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};