
import React from 'react';
import Layout from '../components/Layout';
import StreakCard from '../components/StreakCard';
import ActivityDistribution from '../components/ActivityDistribution';
import GymTypeChart from '../components/GymTypeChart';
import SlokaProgress from '../components/SlokaProgress';
import RecentActivities from '../components/RecentActivities';
import { useActivityContext } from '../context/ActivityContext';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const Index = () => {
  const { activities } = useActivityContext();
  const hasActivities = activities.length > 0;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Track your Gym+Gita progress</p>
      </div>

      {!hasActivities && (
        <div className="bg-accent p-6 rounded-xl mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Welcome to Gym+Gita Tracker!</h2>
          <p className="text-gray-600 mb-4">
            Start by logging your first activity to begin tracking your fitness and spiritual journey.
          </p>
          <Link 
            to="/log" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
          >
            <PlusCircle size={18} className="mr-2" />
            Log Your First Activity
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StreakCard />
        <SlokaProgress />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ActivityDistribution />
        <GymTypeChart />
      </div>

      <div className="mb-20 md:mb-0">
        <RecentActivities />
      </div>
    </Layout>
  );
};

export default Index;
