import { type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col font-sans selection:bg-neon-green/30 selection:text-white">
      {/* Ambient background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-neon-green/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[-100px] w-80 h-80 bg-neon-red/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-100px] left-[20%] w-full h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>
      
      <Navbar />
      
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative z-10 w-full">
        <main className="flex-1 p-4 md:p-6 w-full">
          {children}
        </main>
        <Sidebar />
      </div>
    </div>
  );
};
