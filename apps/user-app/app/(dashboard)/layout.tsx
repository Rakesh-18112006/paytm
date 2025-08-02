'use client'
import React, { useState } from 'react';
import Sidebar from './../../components/Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Mobile header with hamburger button */}
        <header className="md:hidden bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;