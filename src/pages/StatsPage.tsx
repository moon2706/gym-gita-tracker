
import React from 'react';
import Layout from '../components/Layout';
import { useActivityContext } from '../context/ActivityContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend 
} from 'recharts';

const StatsPage = () => {
  const { activities } = useActivityContext();

  // Count activities by month
  const getMonthlyData = () => {
    const monthlyData: Record<string, {
      month: string;
      gym: number;
      gita: number;
      both: number;
      total: number;
    }> = {};
    
    activities.forEach(activity => {
      const date = new Date(activity.date);
      const monthYear = date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = {
          month: monthYear,
          gym: 0,
          gita: 0,
          both: 0,
          total: 0
        };
      }
      
      if (activity.activityType === 'gym') {
        monthlyData[monthYear].gym += 1;
      } else if (activity.activityType === 'gita') {
        monthlyData[monthYear].gita += 1;
      } else if (activity.activityType === 'both') {
        monthlyData[monthYear].both += 1;
      }
      
      monthlyData[monthYear].total += 1;
    });
    
    return Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });
  };
  
  // Get gym type distribution data
  const getGymTypeData = () => {
    const gymActivities = activities.filter(
      a => a.activityType === 'gym' || a.activityType === 'both'
    );
    
    const typeCount: Record<string, number> = {};
    
    gymActivities.forEach(activity => {
      const type = activity.gymType || 'Other';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    
    return Object.entries(typeCount).map(([name, value]) => ({
      name,
      value
    }));
  };
  
  const monthlyData = getMonthlyData();
  const gymTypeData = getGymTypeData();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-gray-600 mt-1">Detailed analysis of your activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Activity</h2>
          {monthlyData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="gym" stroke="#0EA5E9" />
                  <Line type="monotone" dataKey="gita" stroke="#6E59A5" />
                  <Line type="monotone" dataKey="both" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>No activity data available yet</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Gym Types Breakdown</h2>
          {gymTypeData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gymTypeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0EA5E9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <p>No gym data available yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-20 md:mb-0">
        <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Total Activities</p>
            <p className="text-3xl font-bold">{activities.length}</p>
          </div>
          
          <div className="bg-gym/10 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Gym Sessions</p>
            <p className="text-3xl font-bold text-gym">
              {activities.filter(a => a.activityType === 'gym' || a.activityType === 'both').length}
            </p>
          </div>
          
          <div className="bg-gita/10 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Gita Sessions</p>
            <p className="text-3xl font-bold text-gita">
              {activities.filter(a => a.activityType === 'gita' || a.activityType === 'both').length}
            </p>
          </div>
          
          <div className="bg-success/10 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Perfect Days</p>
            <p className="text-3xl font-bold text-success">
              {activities.filter(a => a.activityType === 'both').length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatsPage;
