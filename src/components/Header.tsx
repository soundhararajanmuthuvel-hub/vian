import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onToggleRole,
  isDeviceFrame,
  onToggleDeviceFrame,
  onOpenNotifications
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  // If in Workspace screen, show the Back button variant from Screen 4
  const isWorkspace = currentScreen === 'workspace';
  const isClientPortal = currentScreen === 'client-portal';

  return (
    <>
      {/* Top Demo Bar / Screen Switcher Pills for convenience */}
      <div className="bg-[#070a0c] text-white text-xs px-3 py-1.5 flex items-center justify-between gap-2 border-b border-white/10 z-50 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-mono text-[10px] text-[#fed488] font-semibold tracking-wider uppercase">VIAN STUDIO</span>
          <span className="text-white/40">|</span>
        </div>

        {/* 5 Fast Screen Switchers */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onNavigate('home')}
            className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              currentScreen === 'home' ? 'bg-[#775a19] text-white font-medium' : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Home</span>
          </button>
          <button
            onClick={() => onNavigate('attendance')}
            className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              currentScreen === 'attendance' ? 'bg-[#775a19] text-white font-medium' : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Attendance</span>
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              currentScreen === 'projects' ? 'bg-[#775a19] text-white font-medium' : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Projects</span>
          </button>
          <button
            onClick={() => onNavigate('workspace')}
            className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              currentScreen === 'workspace' ? 'bg-[#775a19] text-white font-medium' : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Workspace</span>
          </button>
          <button
            onClick={() => onNavigate('client-portal')}
            className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors flex items-center gap-1 ${
              currentScreen === 'client-portal' ? 'bg-[#775a19] text-white font-medium' : 'text-white/70 hover:text-white'
            }`}
          >
            <span>Client Portal</span>
          </button>
        </div>

        {/* Right tools: Device Frame & Role switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleDeviceFrame}
            className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border transition-colors ${
              isDeviceFrame ? 'bg-white/20 border-white/40 text-white' : 'bg-transparent border-white/20 text-white/70 hover:text-white'
            }`}
            title="Toggle mobile device frame container"
          >
            <span className="material-symbols-outlined text-[13px]">devices</span>
            <span>{isDeviceFrame ? 'Device' : 'Full'}</span>
          </button>

          <button
            onClick={onToggleRole}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-[#1e2124] border border-[#ffdea5]/40 text-[#ffdea5] hover:bg-white/10"
            title="Switch between Site Supervisor & Client Principal views"
          >
            <span className="material-symbols-outlined text-[13px]">switch_account</span>
            <span className="truncate max-w-[80px]">
              {userRole === 'supervisor' ? 'Manoj (Sup)' : 'Dr. Meera'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#dde3ed] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          {/* Workspace Variant Header */}
          {isWorkspace ? (
            <div className="flex items-center gap-2 min-w-0">
              <button 
                onClick={() => onNavigate('home')}
                className="w-10 h-10 -ml-1 flex items-center justify-center text-[#161c23] hover:text-[#775a19] transition-colors rounded-lg hover:bg-[#e9eef8]"
                aria-label="Go back to Home"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>
              <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-label-caps text-[#775a19] tracking-widest uppercase">
                  VIAN • Specification
                </span>
                <h1 className="font-headline-sm text-headline-sm text-[#070a0c] font-medium tracking-tight truncate">
                  Project Workspace
                </h1>
              </div>
            </div>
          ) : isClientPortal ? (
            /* Client Portal Variant Header */
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-[#070a0c] text-white flex items-center justify-center font-headline-sm font-semibold tracking-wider shrink-0 rounded">
                V
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-caps text-label-caps uppercase tracking-widest text-[#161c23] font-semibold">VIAN</span>
                  <span className="w-1 h-1 rounded-full bg-[#775a19]"></span>
                  <span className="font-code-data text-code-data text-[#44474a] truncate">PRJ-ECR-04</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-headline-sm text-sm font-medium text-[#161c23] truncate">Aranya Villa & Studio</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176]"></span>
                  <span className="font-label-caps text-label-caps text-[#775a19] uppercase tracking-wider">Client Portal · Read-Only</span>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Supervisor Header */
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded bg-[#1e2124] flex items-center justify-center shrink-0">
                <span className="text-[#fed488] font-headline-sm text-lg font-semibold tracking-wider">V</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm font-semibold tracking-tight text-[#070a0c] uppercase truncate">VIAN</span>
                  <span className="font-label-caps text-label-caps text-[#775a19] tracking-widest">ERP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#775a19] shrink-0"></span>
                  <span className="font-label-caps text-label-caps text-[#44474a] truncate uppercase">Project Alpha • Lead Arch</span>
                </div>
              </div>
            </div>
          )}

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 shrink-0">
            {isClientPortal ? (
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:flex flex-col">
                  <span className="font-label-sm text-xs text-[#161c23] font-medium">Dr. Meera Reddy</span>
                  <span className="font-label-caps text-[10px] text-[#44474a]">Client Principal</span>
                </div>
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="w-8 h-8 rounded-full bg-[#070a0c] flex items-center justify-center hover:opacity-90 transition-opacity"
                  title="Dr. Meera Reddy (Client)"
                >
                  <span className="material-symbols-outlined text-white text-[18px]">person</span>
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={onOpenNotifications}
                  aria-label="Notifications" 
                  className="relative w-10 h-10 flex items-center justify-center text-[#44474a] hover:text-[#070a0c] transition-colors rounded-full hover:bg-[#e9eef8]"
                >
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#775a19]"></span>
                </button>
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className="w-8 h-8 rounded-full bg-[#070a0c] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                  title="Manoj V. (Lead Site Supervisor)"
                >
                  <span className="material-symbols-outlined text-white text-[18px]">person</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dropdown Role Menu */}
        {showRoleMenu && (
          <div className="absolute right-4 top-16 mt-1 w-60 bg-white rounded-xl shadow-xl border border-[#dde3ed] p-2 z-50 animate-in fade-in">
            <div className="p-2 border-b border-[#dde3ed]">
              <span className="font-label-caps text-[10px] text-[#75777a] uppercase">Active User Session</span>
              <p className="font-body-md text-sm font-semibold text-[#070a0c]">
                {userRole === 'supervisor' ? 'Manoj V.' : 'Dr. Meera Reddy'}
              </p>
              <p className="text-xs text-[#75777a]">
                {userRole === 'supervisor' ? 'Lead Site Supervisor • Lic. ENG-8492' : 'Client Principal • Aranya Villa'}
              </p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  onToggleRole();
                  setShowRoleMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#161c23] hover:bg-[#f8f9ff] rounded-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-[#775a19]">sync</span>
                <span>Switch to {userRole === 'supervisor' ? 'Client Portal (Dr. Meera)' : 'Site Supervisor (Manoj V.)'}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
