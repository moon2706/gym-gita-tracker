
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useActivityContext, ActivityType } from '@/context/ActivityContext';
import { useToast } from '@/hooks/use-toast';
import ActivityTypeSelector from './ActivityTypeSelector';
import GymTypeSelector from './GymTypeSelector';
import SlokaInput from './SlokaInput';
import DatePicker from './DatePicker';
import NotesInput from './NotesInput';

const LogForm = () => {
  const { addActivity } = useActivityContext();
  const { toast } = useToast();
  const [activityType, setActivityType] = useState<ActivityType>('both');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [gymType, setGymType] = useState('');
  const [slokaNumber, setSlokaNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validations
    if (activityType === 'gym' || activityType === 'both') {
      if (!gymType) {
        toast({
          title: "Error",
          description: "Please select a gym type",
          variant: "destructive",
        });
        return;
      }
    }

    if (activityType === 'gita' || activityType === 'both') {
      if (!slokaNumber) {
        toast({
          title: "Error",
          description: "Please enter a sloka number",
          variant: "destructive",
        });
        return;
      }

      // Validate sloka number format (optional)
      if (!/^\d+(\.\d+)?$/.test(slokaNumber)) {
        toast({
          title: "Error",
          description: "Please enter a valid sloka number (e.g., 7 or 7.14)",
          variant: "destructive",
        });
        return;
      }
    }

    // Add the activity
    addActivity({
      date,
      activityType,
      gymType: activityType === 'gym' || activityType === 'both' ? gymType : undefined,
      slokaNumber: activityType === 'gita' || activityType === 'both' ? slokaNumber : undefined,
      notes,
    });

    // Show success message
    toast({
      title: "Activity Logged",
      description: "Your activity has been recorded successfully.",
    });

    // Reset form
    if (activityType === 'both') {
      setActivityType('both');
      setGymType('');
      setSlokaNumber('');
    } else if (activityType === 'gym') {
      setGymType('');
    } else {
      setSlokaNumber('');
    }
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <DatePicker date={date} setDate={setDate} />
      
      <ActivityTypeSelector 
        activityType={activityType} 
        setActivityType={setActivityType} 
      />
      
      {(activityType === 'gym' || activityType === 'both') && (
        <GymTypeSelector gymType={gymType} setGymType={setGymType} />
      )}

      {(activityType === 'gita' || activityType === 'both') && (
        <SlokaInput slokaNumber={slokaNumber} setSlokaNumber={setSlokaNumber} />
      )}

      <NotesInput notes={notes} setNotes={setNotes} />

      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          <Check size={18} className="mr-2" />
          Log Activity
        </button>
      </div>
    </form>
  );
};

export default LogForm;
