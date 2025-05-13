
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, BookOpen, Home, Calendar, PieChart } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Log Activity', path: '/log', icon: BookOpen },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Stats', path: '/stats', icon: PieChart },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile navigation */}
      <div className="md:hidden bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
        <div className="grid grid-cols-4 py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center justify-center text-xs font-medium ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <IconComponent size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-64 bg-sidebar p-6 flex-col">
        <div className="flex items-center space-x-2 mb-10">
          <Dumbbell className="text-white" size={24} />
          <BookOpen className="text-white" size={24} />
          <h1 className="text-xl font-bold text-white">Gym+Gita</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-sidebar-accent text-white' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <IconComponent size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-sidebar-border/30">
          <div className="flex items-center space-x-3 text-sidebar-foreground">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">GG</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Gym+Gita</p>
              <p className="text-xs text-white/70">Track your progress</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 pb-16 md:pb-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
