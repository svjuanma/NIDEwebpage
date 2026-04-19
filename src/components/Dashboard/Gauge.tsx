import { PieChart, Pie, ResponsiveContainer } from 'recharts';

interface Gauge {
  value: number,
  fill?: string,
}

export const Gauge = ({ value, fill="#52b788"}: Gauge) => {
  const data = [{ value: value, fill: fill }, { value: 100 - value, fill: "#eee" }];

  return (
    <div style={{minHeight:140}}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: -40, right: 0, bottom: -30, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
            startAngle={180}
            endAngle={0}
            paddingAngle={3}
            innerRadius="70%"
            outerRadius="90%"
            dataKey="value"
            stroke="none"
            cornerRadius={10}
            isAnimationActive={true}
          />

          <text
            x="50%"
            y="70%"
            textAnchor="middle" 
            dominantBaseline="middle" 
            style={{ 
              fontSize: '2.5rem',
              fontWeight: 'bold', 
              fill: '#111',
            }}
          >
            {`${value}%`}
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};