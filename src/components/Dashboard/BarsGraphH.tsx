import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Data {
  category : string,
  value : number
}

interface Graph {
  barColor? : string,
  graphs : Data[]
}

export const BarsGraphH = ({barColor='#52b788', graphs} : Graph) => (
  <div style={{ minHeight:200 }}>
    <ResponsiveContainer>
      <BarChart 
        layout="vertical"
        data={graphs} 
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="12%"
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis 
        dataKey="category" 
        type="category" 
        width={100}
        tick={{ fontSize: 14, fill: "#64748b", fontWeight: 500 }}
        axisLine={false}
        tickLine={false}
        />
        <Tooltip cursor={{fill:"#d2d2d2", radius:10}} />
        <Bar 
          dataKey="value" 
          fill={barColor} 
          radius={[0, 10, 10, 0]}
          background={{ fill: "#eee", radius: 10 }}
          animationDuration={1000}
          animationEasing="ease-in-out"
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);