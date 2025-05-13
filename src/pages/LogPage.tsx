
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useActivityContext, ActivityType } from '../context/ActivityContext';
import { Check, Dumbbell, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LogPage = () => {
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
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Log Activity</h1>
        <p className="text-gray-600 mt-1">Record your daily practice</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {(activityType === 'gym' || activityType === 'both') && (
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
          )}

          {(activityType === 'gita' || activityType === 'both') && (
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
          )}

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
      </div>
    </Layout>
  );
};

export default LogPage;
