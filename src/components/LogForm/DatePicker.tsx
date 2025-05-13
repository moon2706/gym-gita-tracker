
import React from 'react';

interface DatePickerProps {
  date: string;
  setDate: (date: string) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        max={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
};

export default DatePicker;
