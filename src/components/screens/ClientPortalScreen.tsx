import React from 'react';
import { CLIENT_SITE_JOURNAL, STUDIO_FIELD_LOGS } from '../../data/mockData';

interface ClientPortalScreenProps {
  onSelectPhoto: (photo: { title: string; imageUrl: string; zone?: string; time?: string; loggedBy?: string }) => void;
  onShowToast: (msg: string) => void;
}

export const ClientPortalScreen: React.FC<ClientPortalScreenProps> = ({
  onSelectPhoto,
  onShowToast
}) => {
  return (
    <div className="flex flex-col w-full px-margin-mobile pb-28">
      {/* Security & Verified Client Access Banner */}
      <div className="w-full bg-[#eef4fe] rounded-lg p-space-md mb-space-md shadow-sm border border-[#dde3ed]">
        <div className="flex items-center justify-between gap-space-xs mb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-[#aecfb2]"></span>
            <span className="font-label-caps text-label-caps uppercase text-[#304d37] tracking-wider">
              Client Vault Isolated
            </span>
          </div>
          <div className="flex items-center gap-space-xs text-[#44474a]">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span className="font-code-data text-code-data text-[11px]">RLS ENCRYPTED · READ-ONLY</span>
          </div>
        </div>

        <div className="mt-space-xs">
          <span className="font-label-caps text-label-caps text-[#775a19] uppercase tracking-widest block">
            Client Principal Access
          </span>
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-[#070a0c] mt-0.5">
            Welcome, Dr. Meera Reddy
          </h1>
          <p className="font-body-sm text-body-sm text-[#44474a] mt-1">
            Aranya Villa & Studio · Coastal Residence & Atelier
          </p>
        </div>

        {/* Architectural Project Metadata Strip */}
        <div className="grid grid-cols-2 gap-space-xs mt-space-md pt-space-xs">
          <div className="bg-[#ffffff] p-space-sm rounded border border-[#dde3ed]">
            <span className="font-label-caps text-label-caps text-[#44474a] uppercase block">Lead Architect</span>
            <span className="font-label-md text-label-md text-[#070a0c] font-medium mt-0.5 block truncate">
              Gokul S., AIA
            </span>
          </div>
          <div className="bg-[#ffffff] p-space-sm rounded border border-[#dde3ed]">
            <span className="font-label-caps text-label-caps text-[#44474a] uppercase block">Site Supervisor</span>
            <span className="font-label-md text-label-md text-[#070a0c] font-medium mt-0.5 block truncate">
              Murugan M.
            </span>
          </div>
        </div>
      </div>

      {/* Milestone & Progress Card */}
      <section className="w-full bg-[#ffffff] rounded-xl p-space-md mb-space-md shadow-sm border border-[#dde3ed]">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ffdea5] text-[#261900] rounded mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Phase CL-188
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-[#070a0c]">
              Interior Finishing & Teak Joinery
            </h2>
          </div>
          <div className="text-right">
            <span className="font-display-lg-mobile text-display-lg-mobile text-[#070a0c] font-light tracking-tight">
              84<span className="text-[#775a19] text-headline-sm font-normal">%</span>
            </span>
          </div>
        </div>

        {/* Precision Architectural Progress Gauge */}
        <div className="w-full mt-space-sm mb-space-md">
          <div className="w-full bg-[#e3e8f3] h-2 rounded-full overflow-hidden flex">
            <div className="bg-[#070a0c] h-full" style={{ width: '70%' }}></div>
            <div className="bg-[#775a19] h-full" style={{ width: '14%' }}></div>
            <div className="bg-[#dde3ed] h-full" style={{ width: '16%' }}></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-[#44474a]">
            <span className="font-code-data text-code-data text-[11px] uppercase tracking-wider">
              Site Execution · 84% Certified
            </span>
            <span className="font-code-data text-code-data text-[11px] text-[#775a19] font-medium">
              Target Handover: Dec 15, 2024
            </span>
          </div>
        </div>

        {/* Active Sub-milestone Focus */}
        <div className="bg-[#eef4fe] rounded-lg p-space-sm flex items-start gap-space-sm border border-[#dde3ed]">
          <div className="w-7 h-7 rounded-full bg-[#1e2124] text-white flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[16px]">architecture</span>
          </div>
          <div className="min-w-0">
            <span className="font-label-caps text-label-caps text-[#44474a] uppercase tracking-wider block">
              Active Field Milestone
            </span>
            <p className="font-body-md text-body-md text-[#161c23] font-medium truncate">
              Italian Marble Honing & Teak Pergola
            </p>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-[#775a19] text-[14px]">event_available</span>
              <span className="font-body-sm text-body-sm text-[#44474a]">
                Dry run completed · Polishing in progress
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Verified Site Photos Stream */}
      <section className="w-full mb-space-md">
        <div className="flex items-center justify-between mb-space-sm px-space-xs">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-[#070a0c]">Site Journal</h2>
            <span className="font-label-sm text-label-sm text-[#44474a]">Verified architectural captures</span>
          </div>
          <span className="inline-flex items-center gap-1 font-code-data text-code-data text-[#775a19]">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Client Approved
          </span>
        </div>

        {/* Photo 1: Primary Feature Card */}
        <div 
          onClick={() => onSelectPhoto({
            title: CLIENT_SITE_JOURNAL.feature.title,
            imageUrl: CLIENT_SITE_JOURNAL.feature.imageUrl,
            zone: CLIENT_SITE_JOURNAL.feature.zone,
            time: CLIENT_SITE_JOURNAL.feature.date,
            loggedBy: CLIENT_SITE_JOURNAL.feature.certifiedBy
          })}
          className="w-full bg-[#ffffff] rounded-xl overflow-hidden shadow-sm mb-space-sm border border-[#dde3ed] cursor-pointer group"
        >
          <div className="relative w-full h-56 bg-[#e9eef8] overflow-hidden">
            <img 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src={CLIENT_SITE_JOURNAL.feature.imageUrl} 
              alt={CLIENT_SITE_JOURNAL.feature.imageAlt}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#1e2124]/85 backdrop-blur-md px-2.5 py-1 rounded text-white flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-[#e9c176]">verified_user</span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider">
                Certified by {CLIENT_SITE_JOURNAL.feature.certifiedBy}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 bg-[#ffffff]/90 backdrop-blur-md px-2 py-0.5 rounded text-[#161c23] font-code-data text-code-data text-[11px]">
              HIGH-RES · 4K
            </div>
          </div>
          <div className="p-space-md">
            <div className="flex items-center justify-between text-[#44474a] mb-1">
              <span className="font-code-data text-code-data">{CLIENT_SITE_JOURNAL.feature.date}</span>
              <span className="font-label-caps text-label-caps text-[#775a19] uppercase">
                {CLIENT_SITE_JOURNAL.feature.zone}
              </span>
            </div>
            <h3 className="font-headline-sm text-label-md font-medium text-[#070a0c] mb-1">
              {CLIENT_SITE_JOURNAL.feature.title}
            </h3>
            <p className="font-body-sm text-body-sm text-[#44474a]">
              {CLIENT_SITE_JOURNAL.feature.description}
            </p>
          </div>
        </div>

        {/* Secondary Photos: 2-Card Grid */}
        <div className="grid grid-cols-2 gap-space-sm mb-space-sm">
          {CLIENT_SITE_JOURNAL.items.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectPhoto({
                title: item.title,
                imageUrl: item.imageUrl,
                zone: item.tag,
                time: item.date,
                loggedBy: 'Gokul S. (Lead Architect)'
              })}
              className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm flex flex-col border border-[#dde3ed] cursor-pointer group"
            >
              <div className="relative w-full h-36 bg-[#e9eef8] overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  src={item.imageUrl} 
                  alt={item.imageAlt}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#070a0c]/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-code-data text-[10px]">
                  {item.date}
                </div>
              </div>
              <div className="p-space-sm flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-label-caps text-label-caps text-[#44474a] uppercase block">
                    {item.tag}
                  </span>
                  <p className="font-label-md text-label-sm font-medium text-[#070a0c] mt-0.5 line-clamp-2">
                    {item.title}
                  </p>
                </div>
                <span className="font-code-data text-[11px] text-[#775a19] mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span> 
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Read-Only Action Trigger */}
        <div className="w-full bg-[#eef4fe] p-space-sm rounded-lg flex items-center justify-between text-[#070a0c] border border-[#dde3ed]">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[#775a19] text-[20px]">photo_library</span>
            <div>
              <span className="font-label-md text-label-md font-medium block">All Certified Site Media</span>
              <span className="font-body-sm text-body-sm text-[#44474a]">32 high-resolution site captures</span>
            </div>
          </div>
          <button 
            onClick={() => onShowToast('Client Gallery View: Loaded all 32 curated high-resolution captures for PRJ-ECR-04.')}
            className="px-3 py-1.5 bg-[#070a0c] text-white rounded text-label-sm font-label-sm flex items-center gap-1 active:scale-95 transition-transform"
          >
            Browse (32)
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Recent Work & Architectural Log Updates */}
      <section className="w-full bg-[#ffffff] rounded-xl p-space-md mb-space-md shadow-sm border border-[#dde3ed]">
        <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-[#dde3ed]">
          <h2 className="font-headline-sm text-headline-sm text-[#070a0c]">Studio Field Log</h2>
          <span className="px-2 py-0.5 bg-[#e9eef8] text-[#44474a] rounded font-code-data text-code-data text-[11px]">
            WEEK 43 SYNC
          </span>
        </div>
        <div className="space-y-space-md">
          {STUDIO_FIELD_LOGS.map((log, idx) => (
            <div key={log.id} className="flex gap-space-sm">
              <div className="flex flex-col items-center">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${idx === 0 ? 'bg-[#775a19]' : 'bg-[#070a0c]'}`}></div>
                {idx < STUDIO_FIELD_LOGS.length - 1 && (
                  <div className="w-0.5 h-full bg-[#e3e8f3] my-1"></div>
                )}
              </div>
              <div className="pb-space-xs min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-code-data text-code-data text-[#775a19] font-medium">{log.date}</span>
                  <span className="font-label-caps text-label-caps text-[#44474a] uppercase">{log.zone}</span>
                </div>
                <p className="font-body-md text-body-md text-[#161c23] mt-1">
                  {log.description}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 bg-[#eef4fe] px-2 py-0.5 rounded border border-[#dde3ed]">
                  <span className="material-symbols-outlined text-[12px] text-[#44474a]">draw</span>
                  <span className="font-label-caps text-[10px] text-[#44474a] tracking-wider">
                    Signed off by {log.signedBy} ({log.signedRole})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atelier Concierge & Direct Channel */}
      <section className="w-full bg-[#ffffff] rounded-xl p-space-md mb-space-md shadow-sm border border-[#dde3ed]">
        <div className="mb-space-sm">
          <span className="font-label-caps text-label-caps text-[#775a19] uppercase tracking-widest block">
            VIAN Atelier Concierge
          </span>
          <h2 className="font-headline-sm text-headline-sm text-[#070a0c] mt-0.5">Project Directory</h2>
        </div>
        <div className="flex items-center justify-between p-space-sm bg-[#eef4fe] rounded-lg mb-space-xs border border-[#dde3ed]">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-[#070a0c] text-white flex items-center justify-center font-headline-sm font-semibold">
              G
            </div>
            <div>
              <span className="font-label-md text-label-md font-medium text-[#070a0c] block">Gokul S.</span>
              <span className="font-body-sm text-body-sm text-[#44474a]">Principal Architect · Lead</span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            <button 
              onClick={() => onShowToast('Calling Gokul S. at VIAN Atelier (+91 44 4820 1000)...')}
              className="w-9 h-9 rounded-full bg-white text-[#070a0c] flex items-center justify-center shadow-sm active:scale-95 border border-[#dde3ed] hover:bg-[#e9eef8]"
              title="Call Studio"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
            </button>
            <button 
              onClick={() => onShowToast('Composing client dispatch email to gokul@vianarchitects.com...')}
              className="w-9 h-9 rounded-full bg-white text-[#070a0c] flex items-center justify-center shadow-sm active:scale-95 border border-[#dde3ed] hover:bg-[#e9eef8]"
              title="Email Team"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </button>
          </div>
        </div>
        <div className="p-space-sm bg-[#eef4fe] rounded-lg flex items-center justify-between border border-[#dde3ed]">
          <div>
            <span className="font-label-caps text-label-caps text-[#44474a] uppercase block">Project Atelier</span>
            <span className="font-body-md text-body-md text-[#070a0c] font-medium">
              VIAN Studio, Wallace Garden, Chennai
            </span>
          </div>
          <span className="material-symbols-outlined text-[#44474a] text-[20px]">apartment</span>
        </div>
      </section>

      {/* Security & Privacy Isolation Notice */}
      <footer className="w-full px-space-xs pt-space-xs text-center">
        <div className="inline-flex items-center justify-center gap-1.5 text-[#44474a] mb-1">
          <span className="material-symbols-outlined text-[16px] text-[#775a19]">shield_lock</span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-[#070a0c]">
            VIAN Vault · Security Protocol
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-[#44474a] max-w-sm mx-auto leading-relaxed">
          Client Vault: Read-Only encryption. Internal contractor rate sheets, vendor bids, and unapproved rough logs are isolated per VIAN Privacy Protocol.
        </p>
        <div className="mt-space-sm">
          <span className="font-code-data text-code-data text-[11px] text-[#75777a]">
            Session Hash: 8F2A-PRJ-ECR-04-MEERA · Rev. Oct 2024
          </span>
        </div>
      </footer>
    </div>
  );
};
