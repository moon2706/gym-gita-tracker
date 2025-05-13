
import React from 'react';

interface SlokaInputProps {
  slokaNumber: string;
  setSlokaNumber: (value: string) => void;
}

const SlokaInput = ({ slokaNumber, setSlokaNumber }: SlokaInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Sloka Number
      </label>
      <input
        type="text"
        value={slokaNumber}
        onChange={(e) => setSlokaNumber(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        placeholder="Enter sloka number (e.g., 7 or 7.14)"
      />
    </div>
  );
};

export default SlokaInput;
