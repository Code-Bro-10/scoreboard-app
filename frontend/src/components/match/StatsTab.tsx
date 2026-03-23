import { motion } from 'framer-motion';
import type { Match } from '../../data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatsTabProps {
  match: Match;
}

export const StatsTab = ({ match }: StatsTabProps) => {
  const data = [
    { over: 1, runs: 8, target: 10 },
    { over: 2, runs: 15, target: 20 },
    { over: 3, runs: 22, target: 30 },
    { over: 4, runs: 38, target: 40 },
    { over: 5, runs: 45, target: 50 },
    { over: 6, runs: 56, target: 60 },
    { over: 7, runs: 62, target: 70 },
    { over: 8, runs: 70, target: 80 },
    { over: 9, runs: 84, target: 90 },
    { over: 10, runs: 95, target: 100 },
    { over: 11, runs: 102, target: 110 },
    { over: 12, runs: 118, target: 120 },
    { over: 13, runs: 130, target: 130 },
    { over: 14, runs: 142, target: 140 },
    { over: 15, runs: 148, target: 150 },
    { over: 16, runs: 156, target: 160 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div className="glass-card p-6 rounded-xl border border-white/5 h-[400px]">
        <h4 className="text-gray-200 font-medium mb-4">Run Rate Comparison</h4>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="over" 
              stroke="rgba(255,255,255,0.5)" 
              fontSize={12} 
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)" 
              fontSize={12} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="runs" 
              name={`${match.team1.shortName} Runs`} 
              stroke="#39ff14" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#39ff14' }} 
              activeDot={{ r: 6 }} 
            />
            {match.target && (
              <Line 
                type="monotone" 
                dataKey="target" 
                name="Target Par Score" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Run Rate', value: match.crr?.toFixed(2) || '-', highlight: false },
          { label: 'Required Run Rate', value: match.req?.toFixed(2) || '-', highlight: true },
          { label: 'Highest Partnership', value: '78 (39)', highlight: false },
          { label: 'Win Predictor', value: 'IND 68%', highlight: false },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
            <span className="text-xs text-gray-500 mb-1">{stat.label}</span>
            <span className={`text-xl font-bold ${stat.highlight ? 'text-neon-red' : 'text-white'}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
