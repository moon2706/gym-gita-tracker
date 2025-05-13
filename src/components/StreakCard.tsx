
import React from 'react';
import { Flame } from 'lucide-react';
import { useActivityContext } from '../context/ActivityContext';

const StreakCard = () => {
  const { getStreak } = useActivityContext();
  const streak = getStreak();

  return (
    <div className="streak-card rounded-xl p-6 shadow-lg text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Current Streak</h2>
          <p className="text-4xl font-bold mt-2">{streak} days</p>
        </div>
        <div className="rounded-full bg-white/25 p-4">
          <Flame 
            size={28} 
            className={`text-orange-500 ${streak > 0 ? 'animate-pulse-success' : ''}`} 
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-white/80">
          {streak === 0
            ? "Start your streak today!"
            : streak === 1
            ? "Great start! Keep the momentum."
            : streak < 7
            ? "Building consistency! Keep going."
            : streak < 30
            ? "Impressive discipline! You're on fire!"
            : "Amazing dedication! You're unstoppable!"}
        </p>
      </div>
    </div>
  );
};

export default StreakCard;
