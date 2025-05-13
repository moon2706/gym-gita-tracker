
import React from 'react';
import { Check } from 'lucide-react';

interface GymTypeSelectorProps {
  gymType: string;
  setGymType: (type: string) => void;
}

const GymTypeSelector = ({ gymType, setGymType }: GymTypeSelectorProps) => {
  const gymTypes = [
    'Strength Training',
    'Cardio',
    'CrossFit',
    'Yoga',
    'Calisthenics',
    'Swimming',
    'Running',
    'Other'
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Gym Type
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {gymTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`relative px-4 py-2 border ${
              gymType === type
                ? 'bg-gym/10 border-gym text-gym'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } rounded-md transition-colors text-sm`}
            onClick={() => setGymType(type)}
          >
            {gymType === type && (
              <Check size={14} className="absolute top-1 right-1" />
            )}
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GymTypeSelector;
