
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useActivityContext } from '../context/ActivityContext';
import { Dumbbell, BookOpen } from 'lucide-react';

interface DayProps {
  date: Date;
  hasGym: boolean;
  hasGita: boolean;
}

const CalendarPage = () => {
  const { activities } = useActivityContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Find the first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Find the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    // Create activity lookup map
    const activityMap = new Map();
    activities.forEach(activity => {
      const activityDate = new Date(activity.date);
      const key = `${activityDate.getFullYear()}-${activityDate.getMonth()}-${activityDate.getDate()}`;
      
      if (!activityMap.has(key)) {
        activityMap.set(key, { hasGym: false, hasGita: false });
      }
      
      const current = activityMap.get(key);
      
      if (activity.activityType === 'gym' || activity.activityType === 'both') {
        current.hasGym = true;
      }
      
      if (activity.activityType === 'gita' || activity.activityType === 'both') {
        current.hasGita = true;
      }
    });

    // Create calendar days array
    const days: (DayProps | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const key = `${year}-${month}-${day}`;
      const activity = activityMap.get(key) || { hasGym: false, hasGita: false };
      
      days.push({
        date,
        hasGym: activity.hasGym,
        hasGita: activity.hasGita,
      });
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const monthYearString = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const days = getMonthData();

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const renderDay = (dayData: DayProps | null) => {
    if (!dayData) {
      return <div className="aspect-square"></div>;
    }

    const { date, hasGym, hasGita } = dayData;

    return (
      <div
        className={`aspect-square p-1 border border-gray-100 ${
          isToday(date) ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`text-xs font-medium ${
            isToday(date) ? 'text-primary' : 'text-gray-500'
          }`}>
            {date.getDate()}
          </div>
          
          <div className="flex-grow flex items-center justify-center">
            {hasGym && hasGita ? (
              <div className="flex flex-col items-center">
                <Dumbbell size={16} className="text-gym mb-1" />
                <BookOpen size={16} className="text-gita" />
              </div>
            ) : hasGym ? (
              <Dumbbell size={20} className="text-gym" />
            ) : hasGita ? (
              <BookOpen size={20} className="text-gita" />
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Activity Calendar</h1>
        <p className="text-gray-600 mt-1">Visualize your consistency</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={goToPreviousMonth}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
          <h2 className="text-xl font-semibold">{monthYearString}</h2>
          <button 
            onClick={goToNextMonth}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div key={index}>
              {renderDay(day)}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gym rounded-full mr-2"></div>
            <span className="text-sm">Gym</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gita rounded-full mr-2"></div>
            <span className="text-sm">Gita</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-gita to-gym rounded-full mr-2"></div>
            <span className="text-sm">Both</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
