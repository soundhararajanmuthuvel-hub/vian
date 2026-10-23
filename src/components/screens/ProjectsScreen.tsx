import React, { useState, useMemo } from 'react';
import { Project, ScreenId } from '../../types';

interface ProjectsScreenProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  projects,
  onSelectProject,
  onNavigate,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'construction' | 'design' | 'completed'>('all');
  const [showAuditModal, setShowAuditModal] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === 'all' || p.statusFilter === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q || 
        p.name.toLowerCase().includes(q) || 
        p.clientName.toLowerCase().includes(q) || 
        p.code.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [projects, filter, searchQuery]);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Architectural Drafting Subheader */}
      <div className="w-full bg-[#eef4fe] border-b border-[#dde3ed] shadow-sm">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-6 pt-space-md pb-space-sm flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-[#775a19]"></span>
              <span className="font-label-caps text-label-caps text-[#775a19] uppercase tracking-widest">
                Portfolio Matrix
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-space-xs py-0.5 rounded bg-[#e9eef8] text-[#44474a]">
              <span className="material-symbols-outlined text-[14px] text-[#775a19]">verified_user</span>
              <span className="font-code-data text-code-data">DB-RLS ACTIVE</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h1 className="font-headline-xl-mobile md:text-2xl text-headline-xl-mobile text-[#070a0c] tracking-tight font-semibold">
              Active Architectural Projects
            </h1>
            <span className="font-label-sm text-label-sm text-[#44474a] font-medium">
              {projects.length} Total
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-[#44474a]">
            Centralized dossier and isolated workspace routing for principal architects and site leads.
          </p>
        </div>
      </div>

      {/* Search & Filter Area */}
      <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-6 py-space-md flex flex-col gap-space-sm bg-[#f8f9ff]">
        {/* Search Bar with Machined Detail */}
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#75777a]">search</span>
          <input 
            type="text"
            id="project-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search project name, client, or site code..."
            className="w-full pl-9 pr-10 py-2.5 bg-[#ffffff] rounded font-body-sm text-body-sm text-[#161c23] placeholder:text-[#75777a] focus:outline-none focus:bg-[#eef4fe] border border-[#dde3ed] transition-all"
          />
          {searchQuery ? (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#75777a] hover:text-[#070a0c]"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          ) : (
            <button aria-label="Filters" className="absolute right-3 text-[#75777a] hover:text-[#070a0c] transition-colors">
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </button>
          )}
        </div>

        {/* Filter Pills Horizontal Strip */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
          <button 
            onClick={() => setFilter('all')}
            className={`shrink-0 px-3 py-1.5 rounded font-label-sm text-label-sm shadow-sm transition-all flex items-center gap-1.5 ${
              filter === 'all' 
                ? 'bg-[#070a0c] text-white' 
                : 'bg-[#e9eef8] text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span>All Projects</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 font-code-data text-[10px]">
              {projects.length}
            </span>
          </button>

          <button 
            onClick={() => setFilter('construction')}
            className={`shrink-0 px-3 py-1.5 rounded font-label-sm text-label-sm transition-all flex items-center gap-1.5 ${
              filter === 'construction' 
                ? 'bg-[#070a0c] text-white' 
                : 'bg-[#e9eef8] text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span>Under Construction</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#dde3ed] font-code-data text-[10px]">
              {projects.filter(p => p.statusFilter === 'construction').length}
            </span>
          </button>

          <button 
            onClick={() => setFilter('design')}
            className={`shrink-0 px-3 py-1.5 rounded font-label-sm text-label-sm transition-all flex items-center gap-1.5 ${
              filter === 'design' 
                ? 'bg-[#070a0c] text-white' 
                : 'bg-[#e9eef8] text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span>Design Phase</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#dde3ed] font-code-data text-[10px]">
              {projects.filter(p => p.statusFilter === 'design').length}
            </span>
          </button>

          <button 
            onClick={() => setFilter('completed')}
            className={`shrink-0 px-3 py-1.5 rounded font-label-sm text-label-sm transition-all flex items-center gap-1.5 ${
              filter === 'completed' 
                ? 'bg-[#070a0c] text-white' 
                : 'bg-[#e9eef8] text-[#44474a] hover:text-[#070a0c]'
            }`}
          >
            <span>Completed</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#dde3ed] font-code-data text-[10px]">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Interactive Project Cards Section (Responsive Grid for Mobile, Tablet, and Laptop) */}
      <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-space-lg">
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center border border-[#dde3ed] text-[#44474a]">
            <span className="material-symbols-outlined text-3xl mb-2 text-[#75777a]">search_off</span>
            <p className="font-body-md">No architectural projects match "{searchQuery}"</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="flex flex-col bg-[#ffffff] rounded-xl shadow-sm overflow-hidden transition-all duration-300 border border-[#dde3ed]"
            >
              {/* Media Header & Key Project Badge */}
              <div className="relative w-full h-44 bg-[#e9eef8] overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src={project.imageUrl} 
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a0c]/85 via-[#070a0c]/25 to-transparent"></div>
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ffffff]/90 backdrop-blur-md shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
                  <span className="font-code-data text-code-data text-[#070a0c] font-medium tracking-tight">
                    {project.code}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-[#1e2124] text-white font-label-caps text-label-caps tracking-widest uppercase">
                  <span className="material-symbols-outlined text-[12px] text-[#fed488]">lock</span>
                  <span>Isolated</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-[#ffdea5] font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-white leading-tight">
                      {project.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 text-white bg-[#070a0c]/50 px-2 py-0.5 rounded backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                    <span className="font-label-sm text-label-sm">{project.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Architectural Details Body */}
              <div className="p-space-md flex flex-col gap-space-sm bg-[#ffffff]">
                {/* Status & Client Identification */}
                <div className="flex items-center justify-between gap-space-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fed488]/30 text-[#785a1a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
                    <span className="font-label-sm text-label-sm font-medium">
                      {project.statusTag}
                    </span>
                  </div>
                  <span className="font-code-data text-code-data text-[#44474a] font-medium">
                    {project.phaseCode}
                  </span>
                </div>

                {/* Metric Grid Spec */}
                <div className="grid grid-cols-2 gap-space-xs pt-1">
                  <div className="p-2.5 rounded bg-[#eef4fe] flex flex-col border border-[#dde3ed]">
                    <span className="font-label-caps text-label-caps text-[#44474a] uppercase">Client Entity</span>
                    <span className="font-body-sm text-body-sm text-[#070a0c] font-medium truncate">
                      {project.clientName}
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-[#eef4fe] flex flex-col border border-[#dde3ed]">
                    <span className="font-label-caps text-label-caps text-[#44474a] uppercase">Lead Architect</span>
                    <span className="font-body-sm text-body-sm text-[#070a0c] font-medium truncate">
                      {project.leadArchitect}
                    </span>
                  </div>
                </div>

                {/* Site Supervisor & Telemetry */}
                <div className="flex items-center justify-between py-1.5 px-2.5 rounded bg-[#ffffff] shadow-sm border border-[#dde3ed]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#1e2124] flex items-center justify-center text-white font-label-caps text-[10px]">
                      {project.supervisorInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-[#44474a] uppercase">Site Supervisor</span>
                      <span className="font-body-sm text-body-sm text-[#161c23] font-medium leading-none">
                        {project.supervisor}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-label-caps text-[10px] text-[#775a19] uppercase font-semibold">Latest Telemetry</span>
                    <span className="font-code-data text-[11px] text-[#44474a] truncate">
                      {project.latestTelemetry}
                    </span>
                  </div>
                </div>

                {/* Drawing Progress Bar */}
                <div className="flex flex-col gap-1 pt-1">
                  <div className="flex justify-between items-center text-[#44474a] font-label-caps text-label-caps uppercase">
                    <span>Milestone Completion</span>
                    <span className="font-code-data text-[#070a0c] font-semibold">{project.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e9eef8] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#775a19] rounded-full transition-all duration-500" 
                      style={{ width: `${project.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Quick Architectural Actions Strip */}
                <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
                  <button 
                    onClick={() => {
                      onSelectProject(project.id);
                      onNavigate('workspace');
                      onShowToast(`Opened workspace for ${project.name}`);
                    }}
                    className="py-2.5 px-1 rounded bg-[#070a0c] text-white font-label-sm text-label-sm font-medium flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#fed488]">space_dashboard</span>
                    <span className="truncate">Workspace</span>
                  </button>
                  <button 
                    onClick={() => {
                      onSelectProject(project.id);
                      if (project.id === 'PRJ-ECR-04') {
                        onNavigate('client-portal');
                        onShowToast('Viewing client gallery for Aranya Villa');
                      } else {
                        onNavigate('workspace');
                        onShowToast(`Viewing photos (${project.photoCount}) for ${project.name}`);
                      }
                    }}
                    className="py-2.5 px-1 rounded bg-[#e9eef8] hover:bg-[#dde3ed] text-[#070a0c] font-label-sm text-label-sm font-medium flex items-center justify-center gap-1 transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                    <span className="truncate">Photos ({project.photoCount})</span>
                  </button>
                  <button 
                    onClick={() => {
                      onSelectProject(project.id);
                      onNavigate('home');
                      onShowToast(`Loaded recent updates for ${project.name}`);
                    }}
                    className="py-2.5 px-1 rounded bg-[#e9eef8] hover:bg-[#dde3ed] text-[#070a0c] font-label-sm text-label-sm font-medium flex items-center justify-center gap-1 transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[15px]">history</span>
                    <span className="truncate">Updates</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Client Isolation Security Notice */}
      <div className="px-margin-mobile mb-space-lg">
        <div className="p-space-md rounded-xl bg-[#ffffff] shadow-sm flex flex-col gap-space-xs relative overflow-hidden border border-[#dde3ed]">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#775a19]/5 flex items-center justify-center pointer-events-none">
            <span className="material-symbols-outlined text-[48px] text-[#775a19]/30">shield</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <div className="w-7 h-7 rounded bg-[#775a19]/15 flex items-center justify-center text-[#775a19] shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-[#775a19] uppercase tracking-wider">Multi-Tenant Vault</span>
              <span className="font-headline-sm text-label-md text-[#070a0c] font-semibold">Client Isolation Security Notice</span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-[#44474a] leading-relaxed pt-1">
            <strong className="text-[#161c23] font-semibold">Role Security:</strong> Read-Only Client Portal enforces isolated PostgreSQL query filtering. Clients only view permitted project galleries and approved milestones. Internal drawings, pricing markups, and contractor logs remain studio confidential.
          </p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#775a19]"></span>
              <span className="font-code-data text-[11px] text-[#44474a]">PostgreSQL RLS · Tenant Scoped</span>
            </div>
            <button 
              onClick={() => setShowAuditModal(true)}
              className="text-[#775a19] font-label-caps text-label-caps tracking-wider uppercase hover:underline flex items-center gap-0.5"
            >
              <span>Audit Policy</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Policy Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-[#070a0c]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-[#dde3ed] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-headline-sm text-base text-[#070a0c] font-medium">PostgreSQL RLS Audit Policy</h3>
              <button onClick={() => setShowAuditModal(false)} className="text-[#44474a] p-1">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="font-mono text-xs bg-[#eef4fe] p-3 rounded-lg text-[#161c23] space-y-1 overflow-x-auto">
              <div className="text-emerald-700 font-bold">CREATE POLICY client_isolation_policy ON projects</div>
              <div>FOR SELECT USING (</div>
              <div>&nbsp;&nbsp;tenant_id = auth.current_tenant_id()</div>
              <div>&nbsp;&nbsp;AND client_role = 'read_only_principal'</div>
              <div>);</div>
              <div className="text-[#75777a] pt-1">-- Enforced cryptographically on all queries.</div>
            </div>
            <p className="text-xs text-[#44474a]">
              All architectural dossiers are strictly scoped. Unverified clients cannot access contractor wage sheets, internal RFIs, or CAD DWG exports.
            </p>
            <button 
              onClick={() => setShowAuditModal(false)}
              className="mt-2 py-2 bg-[#070a0c] text-white rounded-lg text-xs font-semibold"
            >
              Acknowledge Policy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
