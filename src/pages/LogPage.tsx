
import React from 'react';
import Layout from '../components/Layout';
import LogForm from '../components/LogForm';

const LogPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Log Activity</h1>
        <p className="text-gray-600 mt-1">Record your daily practice</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <LogForm />
      </div>
    </Layout>
  );
};

export default LogPage;
