
import React from 'react';

interface NotesInputProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const NotesInput = ({ notes, setNotes }: NotesInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Notes (Optional)
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        placeholder="Add any thoughts or reflections..."
      />
    </div>
  );
};

export default NotesInput;
