import React from "react";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const isGameScreen = location.pathname === "/game";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>
        {`
          :root {
            --primary-navy: #0F172A;
            --secondary-navy: #1E293B;
            --accent-gold: #F59E0B;
            --accent-gold-dark: #D97706;
            --player-red: #EF4444;
            --player-blue: #3B82F6;
            --text-primary: #F8FAFC;
            --text-secondary: #CBD5E1;
            --surface: #334155;
            --surface-light: #475569;
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .game-card {
            background: linear-gradient(135deg, rgba(51, 65, 85, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.1);
          }
          
          .game-button {
            background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
          }
          
          .game-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(245, 158, 11, 0.4);
          }
          
          .grid-cell {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(148, 163, 184, 0.2);
            background: rgba(51, 65, 85, 0.3);
          }
          
          .grid-cell:hover {
            background: rgba(51, 65, 85, 0.6);
            transform: scale(1.05);
          }
          
          .pattern-icon {
            filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
          }
        `}
      </style>
      
      {!isGameScreen && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-400 rounded-full opacity-5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-400 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-red-400 rounded-full opacity-5 blur-3xl animate-pulse delay-2000"></div>
        </div>
      )}
      
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}