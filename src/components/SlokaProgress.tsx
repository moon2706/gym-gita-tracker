
import React from 'react';
import { BookOpen } from 'lucide-react';
import { useActivityContext } from '../context/ActivityContext';

const SlokaProgress = () => {
  const { getLatestSlokaNumber, getGitaCount } = useActivityContext();
  const latestSloka = getLatestSlokaNumber();
  const totalSlokas = 700; // Approximate number of shlokas in Bhagavad Gita
  const gitaCount = getGitaCount();

  // Convert string sloka to numeric value for progress calculation
  const calculateProgress = (slokaStr: string | null): number => {
    if (!slokaStr) return 0;
    
    // Split by decimal point
    const [major, minor = "0"] = slokaStr.split('.');
    
    // Calculate approximate position (simplified approach)
    // We treat chapter.verse as a decimal percentage of total progress
    const chapter = parseInt(major);
    const verseValue = parseInt(minor) / 100; // Convert minor part to a small decimal
    
    // Bhagavad Gita has 18 chapters, so each chapter is roughly 1/18th of progress
    const progress = (chapter + verseValue) / 18 * 100;
    
    return Math.min(progress, 100);
  };

  const progressPercentage = calculateProgress(latestSloka);
  
  // Get numeric chapter for display
  const currentChapter = latestSloka ? parseInt(latestSloka.split('.')[0]) : 0;
  const currentVerse = latestSloka ? (latestSloka.includes('.') ? latestSloka.split('.')[1] : '0') : '0';

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
          <p className="font-semibold">
            {latestSloka ? `${currentChapter}.${currentVerse}` : 'Not started'}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Chapters</p>
          <p className="font-semibold">{latestSloka ? `${currentChapter}/18` : '0/18'}</p>
        </div>
      </div>
    </div>
  );
};

export default SlokaProgress;
