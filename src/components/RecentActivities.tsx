
import React from 'react';
import { useActivityContext } from '../context/ActivityContext';
import { Dumbbell, BookOpen } from 'lucide-react';

const RecentActivities = () => {
  const { getRecentActivities } = useActivityContext();
  const activities = getRecentActivities(5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'gym':
        return <Dumbbell size={18} className="text-gym" />;
      case 'gita':
        return <BookOpen size={18} className="text-gita" />;
      case 'both':
        return (
          <div className="flex">
            <Dumbbell size={18} className="text-gym mr-1" />
            <BookOpen size={18} className="text-gita" />
          </div>
        );
      default:
        return null;
    }
  };

  const getActivityDetail = (activity: any) => {
    const parts = [];
    
    if (activity.gymType && (activity.activityType === 'gym' || activity.activityType === 'both')) {
      parts.push(`${activity.gymType} workout`);
    }
    
    if (activity.slokaNumber && (activity.activityType === 'gita' || activity.activityType === 'both')) {
      parts.push(`Sloka ${activity.slokaNumber}`);
    }
    
    return parts.join(' & ');
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="flex items-center justify-center h-40 text-gray-400">
          <p>No activities logged yet. Start your journey!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center border-b pb-3 last:border-0">
            <div className="bg-gray-100 rounded-full p-2 mr-4">
              {getActivityIcon(activity.activityType)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{getActivityDetail(activity)}</p>
              <p className="text-sm text-gray-500 line-clamp-1">
                {activity.notes || "No notes added"}
              </p>
            </div>
            <div className="text-sm text-gray-500 ml-2">
              {formatDate(activity.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
