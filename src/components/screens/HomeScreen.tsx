import React from 'react';
import { Project, FeedItem, ScreenId } from '../../types';

interface HomeScreenProps {
  activeProject: Project;
  feedItems: FeedItem[];
  onNavigate: (screen: ScreenId) => void;
  onOpenProjectSwitcher: () => void;
  onOpenDrawingModal: () => void;
  onOpenCameraModal: () => void;
  onOpenQuickLogModal: () => void;
  onSelectPhoto: (photo: FeedItem) => void;
  onShowToast: (message: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeProject,
  feedItems,
  onNavigate,
  onOpenProjectSwitcher,
  onOpenDrawingModal,
  onOpenCameraModal,
  onOpenQuickLogModal,
  onSelectPhoto,
  onShowToast
}) => {
  return (
    <div className="flex flex-col w-full pb-28">
      <div className="w-full max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8 lg:p-6">
        {/* Left Column (Actions & Context on Laptop / Tablet) */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-space-sm">
          {/* Greeting & Supervisor Identification Header */}
          <section className="px-gutter-mobile lg:px-0 pt-space-sm pb-space-xs">
        <div className="flex items-start justify-between gap-space-xs">
          <div className="min-w-0">
            <span className="font-label-caps text-label-caps text-[#44474a] uppercase tracking-widest block">
              Thursday, Oct 24, 2024
            </span>
            <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-[#070a0c] tracking-tight font-medium mt-0.5 truncate">
              Good morning, Manoj V.
            </h1>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-[#c9ebcd] text-[#04210e] rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#04210e] animate-pulse"></span>
            <span className="font-label-sm text-label-sm font-medium">On-Site</span>
          </div>
        </div>

        {/* Active Assigned Project Switcher */}
        <div className="mt-space-sm">
          <label className="block font-label-caps text-label-caps text-[#44474a] uppercase tracking-wider mb-1">
            Current Jobsite Execution
          </label>
          <div className="relative bg-[#ffffff] rounded-lg p-3 shadow-sm flex items-center justify-between border border-[#dde3ed]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded bg-[#ffdea5] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#5d4201] text-[18px]">domain</span>
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-label-md text-label-md text-[#070a0c] font-medium truncate">
                  {activeProject.name}, {activeProject.location.split(',')[0]}
                </span>
                <div className="flex items-center gap-1.5 text-[#44474a] font-body-sm text-body-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
                  <span className="truncate">{activeProject.statusTag}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onOpenProjectSwitcher}
              aria-label="Switch project" 
              className="w-8 h-8 rounded flex items-center justify-center text-[#44474a] hover:text-[#070a0c] hover:bg-[#eef4fe] transition-colors shrink-0" 
              id="projectSelectBtn"
            >
              <span className="material-symbols-outlined text-[20px]">unfold_more</span>
            </button>
          </div>
        </div>

        {/* Micro Met & Operational Sync Status Bar */}
        <div className="mt-2.5 flex items-center justify-between gap-space-xs bg-[#eef4fe] px-3 py-2 rounded-lg border border-[#dde3ed]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#775a19] text-[16px] shrink-0">cloud</span>
            <span className="font-code-data text-code-data text-[#44474a] truncate">
              31°C • 74% Humid • Clear Casting Cond.
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="material-symbols-outlined text-[#709076] text-[14px]">cloud_done</span>
            <span className="font-label-sm text-label-sm text-[#709076] font-medium">Synced</span>
          </div>
        </div>
      </section>

      {/* 4 Primary Rapid-Action Touch Cards (2x2 Grid) */}
      <section className="px-gutter-mobile">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-caps text-label-caps text-[#44474a] uppercase tracking-wider">
            Site Workflows • Station Direct
          </span>
          <span className="font-code-data text-code-data text-[#775a19]">4 Modules Active</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* 1. GPS Photo Capture */}
          <button 
            onClick={() => {
              onShowToast('Acquiring high-precision GPS coordinate lock (±3m)...');
              onOpenCameraModal();
            }}
            className="group flex flex-col justify-between text-left p-3.5 min-h-[135px] rounded-lg bg-[#ffffff] shadow-sm hover:shadow-md transition-all active:scale-[0.98] relative overflow-hidden border border-[#dde3ed]"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#fed488]/20 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded bg-[#070a0c] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
              <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-[#fed488] text-[#785a1a] font-semibold">
                12 today
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-1">
                <span className="font-headline-sm text-headline-sm text-[#070a0c] font-medium tracking-tight">GPS Photo</span>
                <span className="material-symbols-outlined text-[#775a19] text-[16px]">location_on</span>
              </div>
              <p className="font-body-sm text-body-sm text-[#44474a] mt-0.5 line-clamp-2">
                Tag & log verified progress geo-stamped
              </p>
            </div>
          </button>

          {/* 2. Attendance & Crew Roster */}
          <button 
            onClick={() => {
              onShowToast('Navigating to Attendance Crew Roster (18/20 verified)...');
              onNavigate('attendance');
            }}
            className="group flex flex-col justify-between text-left p-3.5 min-h-[135px] rounded-lg bg-[#ffffff] shadow-sm hover:shadow-md transition-all active:scale-[0.98] relative overflow-hidden border border-[#dde3ed]"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#c9ebcd]/30 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded bg-[#e3e8f3] text-[#070a0c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              </div>
              <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-[#c9ebcd] text-[#04210e] font-semibold">
                08:45 AM
              </span>
            </div>
            <div className="mt-3">
              <span className="font-headline-sm text-headline-sm text-[#070a0c] font-medium tracking-tight block">
                Attendance
              </span>
              <p className="font-body-sm text-body-sm text-[#44474a] mt-0.5 line-clamp-2">
                Crew punch-in • 18 of 20 verified
              </p>
            </div>
          </button>

          {/* 3. Noqu Architectural Node */}
          <button 
            onClick={() => {
              onShowToast('Noqu structural module waiting on structural engineer stamp (Rev-03 in queue).');
            }}
            className="group flex flex-col justify-between text-left p-3.5 min-h-[135px] rounded-lg bg-[#eef4fe] shadow-sm transition-all active:scale-[0.98] relative overflow-hidden border border-[#dde3ed]"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded bg-[#dde3ed] text-[#44474a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">deployed_code</span>
              </div>
              <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-[#dde3ed] text-[#44474a] font-medium">
                Standby
              </span>
            </div>
            <div className="mt-3">
              <span className="font-headline-sm text-headline-sm text-[#070a0c] font-medium tracking-tight block">
                Noqu Node
              </span>
              <p className="font-body-sm text-body-sm text-[#44474a] mt-0.5 line-clamp-2">
                Awaiting structural confirmation sync
              </p>
            </div>
          </button>

          {/* 4. Work Updates & Logs */}
          <button 
            onClick={() => {
              onShowToast('Opening daily work update logger...');
              onOpenQuickLogModal();
            }}
            className="group flex flex-col justify-between text-left p-3.5 min-h-[135px] rounded-lg bg-[#ffffff] shadow-sm hover:shadow-md transition-all active:scale-[0.98] relative overflow-hidden border border-[#dde3ed]"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#ffdea5]/30 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 rounded bg-[#e3e8f3] text-[#070a0c] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">assignment_add</span>
              </div>
              <span className="font-label-caps text-label-caps px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#5d4201] font-semibold">
                Draft
              </span>
            </div>
            <div className="mt-3">
              <span className="font-headline-sm text-headline-sm text-[#070a0c] font-medium tracking-tight block">
                Work Updates
              </span>
              <p className="font-body-sm text-body-sm text-[#44474a] mt-0.5 line-clamp-2">
                Daily log, pour blockers & milestone notes
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Site Metrics Quick Strip (Drawing Alignment) */}
      <section className="px-gutter-mobile mt-space-md">
        <button 
          onClick={onOpenDrawingModal}
          className="w-full text-left p-3 bg-[#ffffff] rounded-lg shadow-sm flex items-center justify-between border border-[#dde3ed] hover:bg-[#f8f9ff] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e9c176]/30 flex items-center justify-center text-[#775a19]">
              <span className="material-symbols-outlined text-[20px]">architecture</span>
            </div>
            <div>
              <span className="font-label-caps text-label-caps text-[#44474a] uppercase block">Drawing Alignment</span>
              <span className="font-body-md text-body-md text-[#070a0c] font-medium">Sheet A-204 (Rev. 3) in effect</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#44474a] text-[20px]">arrow_forward</span>
        </button>
      </section>
    </div>

    {/* Right Column (Live Feed & Field Logs on Laptop / Tablet) */}
    <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-space-sm mt-space-md lg:mt-0">
      {/* Recent Site Feed & Geo-Verification */}
      <section className="px-gutter-mobile lg:px-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm text-[#070a0c] font-medium tracking-tight">Recent Site Feed</span>
            <span className="w-2 h-2 rounded-full bg-[#775a19]"></span>
          </div>
          <button 
            onClick={() => onNavigate('workspace')}
            className="font-label-sm text-label-sm text-[#775a19] font-medium hover:underline flex items-center gap-0.5"
          >
            View All ({feedItems.length})
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Feed Items Stack */}
        <div className="flex flex-col gap-2.5">
          {feedItems.map((item) => (
            <article 
              key={item.id} 
              onClick={() => onSelectPhoto(item)}
              className="p-3 bg-[#ffffff] rounded-lg shadow-sm flex flex-col gap-2.5 border border-[#dde3ed] cursor-pointer hover:border-[#775a19] transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e3e8f3]">
                  <img 
                    className="w-full h-full object-cover" 
                    src={item.imageUrl} 
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-[#070a0c]/80 backdrop-blur-sm text-white font-code-data text-[10px] leading-tight">
                    {item.time}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-label-caps text-label-caps px-1.5 py-0.5 bg-[#e3e8f3] text-[#44474a] rounded truncate max-w-[170px]">
                      {item.gridZone}
                    </span>
                    <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-[#709076] font-semibold shrink-0">
                      <span className="material-symbols-outlined text-[12px]">
                        {item.status === 'verified' ? 'verified' : 'cloud_done'}
                      </span>
                      {item.status === 'verified' ? 'Verified' : 'Synced'}
                    </span>
                  </div>
                  {item.matchedSiteName && (
                    <span className="font-label-caps text-[10px] text-[#775a19] uppercase font-semibold block truncate mt-0.5">
                      {item.matchedSiteName}
                    </span>
                  )}
                  <p className="font-body-md text-body-md text-[#070a0c] font-medium mt-0.5 truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[#44474a] font-code-data text-code-data truncate">
                    <span className="material-symbols-outlined text-[#775a19] text-[14px] shrink-0">pin_drop</span>
                    <span className="truncate">{item.coordinates} • {item.accuracy}</span>
                  </div>
                </div>
              </div>

              {/* Meta Stamp Row */}
              <div className="pt-2 flex items-center justify-between text-[#44474a] font-body-sm text-body-sm bg-[#eef4fe] px-2.5 py-1.5 rounded">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-[#070a0c] text-white flex items-center justify-center text-[9px] font-bold">
                    {item.avatarChar}
                  </div>
                  <span className="truncate">Logged by {item.loggedBy} ({item.loggedRole})</span>
                </div>
                <span className="font-code-data text-code-data text-[#775a19] shrink-0">{item.batchCode}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  </div>

      {/* Interactive Quick-Action Floating Button Area */}
      <aside className="sticky bottom-20 z-30 px-gutter-mobile mt-space-lg w-full max-w-lg lg:max-w-md mx-auto">
        <div className="relative flex items-center justify-between bg-[#070a0c] text-white rounded-xl px-4 py-3 shadow-xl border border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#775a19] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">add_task</span>
            </div>
            <div className="min-w-0">
              <span className="font-headline-sm text-headline-sm tracking-tight font-medium text-white block truncate">
                Quick Log Entry
              </span>
              <span className="font-label-sm text-label-sm text-[#86888c] block truncate">
                Photo, labor headcount or incident
              </span>
            </div>
          </div>
          <button 
            onClick={onOpenQuickLogModal}
            className="shrink-0 ml-2 px-3.5 py-2 bg-[#775a19] text-white rounded-lg font-label-md text-label-md font-semibold hover:bg-[#fed488] hover:text-[#785a1a] transition-colors flex items-center gap-1 shadow-sm active:scale-95" 
            id="quickLogBtn"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
