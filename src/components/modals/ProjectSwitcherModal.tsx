import React from 'react';
import { Project } from '../../types';

interface ProjectSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (projectId: string) => void;
}

export const ProjectSwitcherModal: React.FC<ProjectSwitcherModalProps> = ({
  isOpen,
  onClose,
  projects,
  activeProjectId,
  onSelectProject
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0c]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#dde3ed] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-[#f8f9ff] border-b border-[#dde3ed] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
            <div>
              <span className="font-label-caps text-xs text-[#75777a] uppercase tracking-wider block">Jobsite Roster</span>
              <h3 className="font-headline-sm text-base text-[#070a0c]">Switch Active Workspace</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#e9eef8] hover:bg-[#dde3ed] flex items-center justify-center text-[#161c23]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Project List */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1">
          {projects.map((proj) => {
            const isSelected = proj.id === activeProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  onSelectProject(proj.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected 
                    ? 'border-[#775a19] bg-[#ffdea5]/15 shadow-sm' 
                    : 'border-[#dde3ed] bg-white hover:bg-[#f8f9ff]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#e9eef8]">
                  <img src={proj.imageUrl} alt={proj.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-code-data text-xs text-[#775a19] font-medium">{proj.code}</span>
                    {isSelected && (
                      <span className="font-label-caps text-[10px] bg-[#775a19] text-white px-2 py-0.5 rounded-full uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <h4 className="font-headline-sm text-sm text-[#070a0c] truncate font-medium">{proj.name}</h4>
                  <p className="font-body-sm text-xs text-[#44474a] truncate">{proj.statusTag}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f8f9ff] border-t border-[#dde3ed] text-center text-xs text-[#75777a]">
          Active session telemetry strictly isolated per PostgreSQL RLS policy
        </div>
      </div>
    </div>
  );
};
