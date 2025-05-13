
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type ActivityType = 'gym' | 'gita' | 'both';

export interface LogEntry {
  id: string;
  date: string;
  activityType: ActivityType;
  gymType?: string;
  slokaNumber?: string;
  notes?: string;
}

interface ActivityContextType {
  activities: LogEntry[];
  addActivity: (activity: Omit<LogEntry, 'id'>) => void;
  getStreak: () => number;
  getGymCount: () => number;
  getGitaCount: () => number;
  getBothCount: () => number;
  getRecentActivities: (count: number) => LogEntry[];
  getLatestSlokaNumber: () => string | null;
  getGymTypeDistribution: () => Record<string, number>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
};

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<LogEntry[]>(() => {
    const savedActivities = localStorage.getItem('gym-gita-activities');
    return savedActivities ? JSON.parse(savedActivities) : [];
  });

  useEffect(() => {
    localStorage.setItem('gym-gita-activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity: Omit<LogEntry, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Date.now().toString(),
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const getStreak = () => {
    if (activities.length === 0) return 0;
    
    // Sort activities by date
    const sortedActivities = [...activities].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if there's an activity for today
    const todayActivity = sortedActivities.find(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);
      return activityDate.getTime() === currentDate.getTime();
    });
    
    if (!todayActivity) {
      // Check if there's an activity for yesterday to maintain streak
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const yesterdayActivity = sortedActivities.find(activity => {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === yesterday.getTime();
      });
      
      if (!yesterdayActivity) return 0;
      
      // Start counting from yesterday
      currentDate = yesterday;
    }
    
    // Count consecutive days
    while (true) {
      const hasActivityForDate = sortedActivities.some(activity => {
        const activityDate = new Date(activity.date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === currentDate.getTime();
      });
      
      if (!hasActivityForDate) break;
      
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const getGymCount = () => activities.filter(a => a.activityType === 'gym' || a.activityType === 'both').length;
  
  const getGitaCount = () => activities.filter(a => a.activityType === 'gita' || a.activityType === 'both').length;
  
  const getBothCount = () => activities.filter(a => a.activityType === 'both').length;

  const getRecentActivities = (count: number) => {
    return [...activities]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  };

  // Compare sloka numbers for finding the latest
  const compareSlokaNumbers = (a: string, b: string): number => {
    // Split by decimal point
    const [aMajor, aMinor = "0"] = a.split('.');
    const [bMajor, bMinor = "0"] = b.split('.');
    
    // Compare major numbers first
    const majorDiff = parseInt(aMajor) - parseInt(bMajor);
    if (majorDiff !== 0) {
      return majorDiff;
    }
    
    // If major numbers are the same, compare minor numbers
    return parseInt(aMinor) - parseInt(bMinor);
  };

  const getLatestSlokaNumber = (): string | null => {
    const gitaActivities = activities.filter(a => a.activityType === 'gita' || a.activityType === 'both');
    if (gitaActivities.length === 0) return null;
    
    const gitaActivitiesWithSloka = gitaActivities.filter(a => a.slokaNumber !== undefined);
    if (gitaActivitiesWithSloka.length === 0) return null;

    return gitaActivitiesWithSloka.reduce((latest, current) => {
      if (!latest) return current.slokaNumber!;
      if (!current.slokaNumber) return latest;
      
      return compareSlokaNumbers(current.slokaNumber, latest) > 0 ? current.slokaNumber : latest;
    }, "");
  };

  const getGymTypeDistribution = () => {
    const gymActivities = activities.filter(a => a.activityType === 'gym' || a.activityType === 'both');
    return gymActivities.reduce((acc, curr) => {
      const type = curr.gymType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        getStreak,
        getGymCount,
        getGitaCount,
        getBothCount,
        getRecentActivities,
        getLatestSlokaNumber,
        getGymTypeDistribution,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
