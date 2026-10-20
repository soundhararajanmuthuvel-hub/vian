import React, { useState } from 'react';

interface DrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawingModal: React.FC<DrawingModalProps> = ({ isOpen, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeLayer, setActiveLayer] = useState<'all' | 'structural' | 'mep' | 'masonry'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0c]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-[#ffffff] rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-[#dde3ed]">
        {/* Header */}
        <div className="p-4 bg-[#1e2124] text-white flex items-center justify-between border-b border-[#30343a]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded bg-[#775a19] text-white flex items-center justify-center font-bold text-sm shrink-0">
              <span className="material-symbols-outlined text-[20px]">architecture</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-xs text-[#fed488] tracking-widest uppercase">Drawing Alignment</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/90">REV-03</span>
              </div>
              <h3 className="font-headline-sm text-base text-white truncate">Sheet A-204: Second Floor Slab & Beam Tie Schedule</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2 bg-[#f8f9ff] border-b border-[#dde3ed] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setActiveLayer('all')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${activeLayer === 'all' ? 'bg-[#070a0c] text-white' : 'bg-white text-[#44474a] hover:bg-[#e9eef8]'}`}
            >
              All Layers
            </button>
            <button 
              onClick={() => setActiveLayer('structural')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${activeLayer === 'structural' ? 'bg-[#070a0c] text-white' : 'bg-white text-[#44474a] hover:bg-[#e9eef8]'}`}
            >
              Slab Rebar
            </button>
            <button 
              onClick={() => setActiveLayer('mep')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${activeLayer === 'mep' ? 'bg-[#070a0c] text-white' : 'bg-white text-[#44474a] hover:bg-[#e9eef8]'}`}
            >
              MEP Sleeves
            </button>
            <button 
              onClick={() => setActiveLayer('masonry')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${activeLayer === 'masonry' ? 'bg-[#070a0c] text-white' : 'bg-white text-[#44474a] hover:bg-[#e9eef8]'}`}
            >
              Wall Layout
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 20))}
              className="p-1 rounded bg-white border border-[#dde3ed] hover:bg-[#e9eef8] text-[#44474a]"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="font-mono text-[11px] text-[#44474a] w-10 text-center">{zoomLevel}%</span>
            <button 
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 20))}
              className="p-1 rounded bg-white border border-[#dde3ed] hover:bg-[#e9eef8] text-[#44474a]"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>

        {/* CAD Canvas */}
        <div className="flex-1 bg-[#0b1016] p-4 overflow-auto min-h-[300px] flex items-center justify-center relative select-none">
          {/* Simulated Blueprint Graphics */}
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
            className="w-[540px] h-[340px] border border-cyan-800/60 bg-[#0e1620] relative rounded p-4 text-cyan-400 font-mono text-[10px] shadow-2xl transition-transform duration-200"
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e3a5f_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Title block */}
            <div className="absolute bottom-2 right-2 border border-cyan-500/50 bg-[#0b1016]/90 p-2 rounded text-[9px] flex flex-col gap-0.5 leading-tight text-right">
              <span className="text-amber-400 font-bold">VIAN ARCHITECTS ATELIER</span>
              <span>PRJ-OMR-01 • The Courtyard Residence</span>
              <span>SHEET: A-204 (REV. 03) • SCALE 1:50</span>
              <span className="text-emerald-400">STATUS: APPROVED FOR CASTING</span>
            </div>

            {/* Architectural drawings SVG representation */}
            <svg className="w-full h-full" viewBox="0 0 500 300">
              {/* Outer boundary */}
              <rect x="30" y="20" width="440" height="240" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 2" opacity="0.8" />
              
              {/* Structural Grid lines */}
              <line x1="120" y1="20" x2="120" y2="260" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="250" y1="20" x2="250" y2="260" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="380" y1="20" x2="380" y2="260" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
              
              <line x1="30" y1="100" x2="470" y2="100" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="30" y1="180" x2="470" y2="180" stroke="#0284c7" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Column Markers */}
              <rect x="114" y="94" width="12" height="12" fill="#38bdf8" />
              <text x="132" y="104" fill="#38bdf8" fontSize="9">C3 (400x400)</text>

              <rect x="244" y="94" width="12" height="12" fill="#38bdf8" />
              <text x="262" y="104" fill="#38bdf8" fontSize="9">C4 (Beam TB-1)</text>

              <rect x="374" y="94" width="12" height="12" fill="#38bdf8" />
              <text x="392" y="104" fill="#38bdf8" fontSize="9">C7 (Courtyard)</text>

              {/* Rebar Tie representation */}
              {(activeLayer === 'all' || activeLayer === 'structural') && (
                <g stroke="#f59e0b" strokeWidth="1.2">
                  <path d="M 60 40 L 440 40 M 60 70 L 440 70 M 60 130 L 440 130 M 60 160 L 440 160 M 60 210 L 440 210" opacity="0.6" strokeDasharray="2 2" />
                  <text x="65" y="60" fill="#f59e0b" fontSize="8">#T12 @ 150 c/c Main Rebar</text>
                  <text x="65" y="150" fill="#f59e0b" fontSize="8">2L-10dia Stirrups Verified</text>
                </g>
              )}

              {/* MEP Sleeves */}
              {(activeLayer === 'all' || activeLayer === 'mep') && (
                <g fill="#10b981" stroke="#10b981">
                  <circle cx="180" cy="100" r="5" fill="none" strokeWidth="1.5" />
                  <circle cx="320" cy="140" r="6" fill="none" strokeWidth="1.5" />
                  <text x="175" y="88" fontSize="8">PVC 75Ø</text>
                  <text x="315" y="128" fontSize="8">HVAC SL-02</text>
                </g>
              )}

              {/* Courtyard Void */}
              <rect x="270" y="110" width="90" height="70" fill="#04210e" stroke="#10b981" strokeWidth="1" />
              <text x="285" y="150" fill="#a7f3d0" fontSize="9">COURTYARD VOID</text>
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#f8f9ff] border-t border-[#dde3ed] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#44474a]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#775a19]"></span>
            <span>Digital seal by Principal Architect Sivaram G. (Oct 22, 2024)</span>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#070a0c] text-white text-xs font-semibold rounded-lg hover:bg-[#1e2124] transition-colors"
          >
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
};
