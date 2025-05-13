
import React from 'react';
import { BookOpen } from 'lucide-react';
import { useActivityContext } from '../context/ActivityContext';

const SlokaProgress = () => {
  const { getLatestSlokaNumber, getGitaCount } = useActivityContext();
  const latestSloka = getLatestSlokaNumber();
  const totalSlokas = 700; // Approximate number of shlokas in Bhagavad Gita
  const gitaCount = getGitaCount();

  const progressPercentage = latestSloka ? Math.min((latestSloka / totalSlokas) * 100, 100) : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Gita Progress</h2>
          <p className="text-sm text-gray-500 mt-1">Tracking your spiritual journey</p>
        </div>
        <div className="rounded-full bg-primary/10 p-3">
          <BookOpen size={22} className="text-primary" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="text-gray-500">Total Sessions</p>
          <p className="font-semibold">{gitaCount}</p>
        </div>
        <div>
          <p className="text-gray-500">Current Sloka</p>
          <p className="font-semibold">{latestSloka || 'Not started'}</p>
        </div>
        <div>
          <p className="text-gray-500">Remaining</p>
          <p className="font-semibold">{latestSloka ? totalSlokas - latestSloka : totalSlokas}</p>
        </div>
      </div>
    </div>
  );
};

export default SlokaProgress;
