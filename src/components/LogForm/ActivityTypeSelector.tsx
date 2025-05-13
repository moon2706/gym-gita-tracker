
import React from 'react';
import { Dumbbell, BookOpen } from 'lucide-react';
import { ActivityType } from '@/context/ActivityContext';

interface ActivityTypeSelectorProps {
  activityType: ActivityType;
  setActivityType: (type: ActivityType) => void;
}

const ActivityTypeSelector = ({
  activityType,
  setActivityType,
}: ActivityTypeSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Activity Type
      </label>
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          className={`flex items-center justify-center px-4 py-3 border ${
            activityType === 'gym'
              ? 'bg-gym/10 border-gym text-gym'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          } rounded-md transition-colors`}
          onClick={() => setActivityType('gym')}
        >
          <Dumbbell size={18} className="mr-2" />
          Gym Only
        </button>
        <button
          type="button"
          className={`flex items-center justify-center px-4 py-3 border ${
            activityType === 'gita'
              ? 'bg-gita/10 border-gita text-gita'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          } rounded-md transition-colors`}
          onClick={() => setActivityType('gita')}
        >
          <BookOpen size={18} className="mr-2" />
          Gita Only
        </button>
        <button
          type="button"
          className={`flex items-center justify-center px-4 py-3 border ${
            activityType === 'both'
              ? 'bg-gradient-to-r from-gita/10 to-gym/10 border-primary text-primary'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          } rounded-md transition-colors`}
          onClick={() => setActivityType('both')}
        >
          <div className="flex">
            <Dumbbell size={18} className="mr-1" />
            <BookOpen size={18} />
          </div>
          <span className="ml-2">Both</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityTypeSelector;
