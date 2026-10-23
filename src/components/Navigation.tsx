import React from 'react';
import { ScreenId, UserRole } from '../types';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  forceShow?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate, userRole, forceShow }) => {
  const visibilityClass = forceShow ? 'fixed bottom-0 left-0 right-0 z-40' : 'fixed bottom-0 left-0 right-0 z-40 md:hidden';

  if (userRole === 'client') {
    return (
      <nav className={`${visibilityClass} pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#dde3ed] shadow-[0_-2px_12px_rgba(0,0,0,0.03)]`}>
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
          <button
            onClick={() => onNavigate('client-portal')}
            className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-2 py-1 transition-colors ${
              currentScreen === 'client-portal' ? 'text-[#070a0c] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="font-label-caps text-[10px] mt-1 uppercase tracking-wider">Overview</span>
          </button>

          <button
            onClick={() => onNavigate('workspace')}
            className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-2 py-1 transition-colors ${
              currentScreen === 'workspace' ? 'text-[#070a0c] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            <span className="font-label-caps text-[10px] mt-1 uppercase tracking-wider">Site Photos</span>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-2 py-1 transition-colors ${
              currentScreen === 'projects' ? 'text-[#070a0c] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">timeline</span>
            <span className="font-label-caps text-[10px] mt-1 uppercase tracking-wider">Milestones</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-2 py-1 transition-colors ${
              currentScreen === 'home' ? 'text-[#070a0c] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">folder_open</span>
            <span className="font-label-caps text-[10px] mt-1 uppercase tracking-wider">Documents</span>
          </button>
        </div>
      </nav>
    );
  }

  // Standard Supervisor Bottom Navigation
  return (
    <nav className={`${visibilityClass} pb-safe bg-[#f8f9ff]/90 backdrop-blur-xl border-t border-[#dde3ed] shadow-[0_-1px_8px_rgba(0,0,0,0.04)]`}>
      <div className="h-16 px-2 flex items-center justify-around max-w-lg mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
            currentScreen === 'home' ? 'text-[#775a19] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">grid_view</span>
          <span className="font-label-sm text-[11px] truncate mt-0.5">Home</span>
        </button>

        {/* 2. Projects */}
        <button
          onClick={() => onNavigate('projects')}
          className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
            currentScreen === 'projects' ? 'text-[#775a19] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">apartment</span>
          <span className="font-label-sm text-[11px] truncate mt-0.5">Projects</span>
        </button>

        {/* 3. Updates / Workspace */}
        <button
          onClick={() => onNavigate('workspace')}
          className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
            currentScreen === 'workspace' ? 'text-[#775a19] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">assignment_late</span>
          <span className="font-label-sm text-[11px] truncate mt-0.5">Updates</span>
        </button>

        {/* 4. Roster / Attendance */}
        <button
          onClick={() => onNavigate('attendance')}
          className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
            currentScreen === 'attendance' ? 'text-[#775a19] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">badge</span>
          <span className="font-label-sm text-[11px] truncate mt-0.5">Roster</span>
        </button>

        {/* 5. More / Client Portal */}
        <button
          onClick={() => onNavigate('client-portal')}
          className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
            currentScreen === 'client-portal' ? 'text-[#775a19] font-semibold' : 'text-[#44474a] hover:text-[#070a0c]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">settings_ethernet</span>
          <span className="font-label-sm text-[11px] truncate mt-0.5">Client</span>
        </button>
      </div>
    </nav>
  );
};
