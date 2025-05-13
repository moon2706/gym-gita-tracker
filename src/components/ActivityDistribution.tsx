
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useActivityContext } from '../context/ActivityContext';

const COLORS = ['#0EA5E9', '#6E59A5', '#10B981'];

const ActivityDistribution = () => {
  const { getGymCount, getGitaCount, getBothCount } = useActivityContext();
  
  const gymOnly = getGymCount() - getBothCount();
  const gitaOnly = getGitaCount() - getBothCount();
  const both = getBothCount();

  const data = [
    { name: 'Gym Only', value: gymOnly },
    { name: 'Gita Only', value: gitaOnly },
    { name: 'Both', value: both },
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Activity Distribution</h2>
        <div className="flex items-center justify-center h-64 text-gray-400">
          <p>No activity data yet. Start logging!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Activity Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityDistribution;
