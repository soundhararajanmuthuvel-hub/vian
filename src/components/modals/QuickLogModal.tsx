import React, { useState } from 'react';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: { type: string; title: string; notes: string; zone: string }) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [logType, setLogType] = useState<'photo' | 'labor' | 'incident'>('photo');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [zone, setZone] = useState('Zone B • Electrical MEP');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      type: logType,
      title: title.trim(),
      notes: notes.trim(),
      zone
    });
    setTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0c]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#ffffff] rounded-t-2xl sm:rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#dde3ed] flex flex-col">
        {/* Header */}
        <div className="p-4 bg-[#1e2124] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#775a19] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">add_task</span>
            </div>
            <div>
              <span className="font-label-caps text-[10px] text-[#ffdea5] uppercase tracking-wider block">Station Direct</span>
              <h3 className="font-headline-sm text-base text-white">Quick Log Entry</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white">
          {/* Log Type Selector */}
          <div>
            <label className="font-label-caps text-xs text-[#75777a] uppercase tracking-wider block mb-1.5">
              Log Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLogType('photo')}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                  logType === 'photo'
                    ? 'bg-[#070a0c] text-white border-[#070a0c]'
                    : 'bg-[#f8f9ff] text-[#44474a] border-[#dde3ed] hover:bg-[#e9eef8]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                GPS Photo
              </button>
              <button
                type="button"
                onClick={() => setLogType('labor')}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                  logType === 'labor'
                    ? 'bg-[#070a0c] text-white border-[#070a0c]'
                    : 'bg-[#f8f9ff] text-[#44474a] border-[#dde3ed] hover:bg-[#e9eef8]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">group</span>
                Labor Headcount
              </button>
              <button
                type="button"
                onClick={() => setLogType('incident')}
                className={`py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                  logType === 'incident'
                    ? 'bg-[#070a0c] text-white border-[#070a0c]'
                    : 'bg-[#f8f9ff] text-[#44474a] border-[#dde3ed] hover:bg-[#e9eef8]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Site Incident
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-label-caps text-xs text-[#75777a] uppercase tracking-wider block mb-1">
              Inspection Title / Milestone
            </label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Column C3 pour inspection & alignment"
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dde3ed] rounded-lg text-sm text-[#070a0c] placeholder:text-[#75777a] focus:outline-none focus:border-[#775a19]"
            />
          </div>

          {/* Zone */}
          <div>
            <label className="font-label-caps text-xs text-[#75777a] uppercase tracking-wider block mb-1">
              Jobsite Grid Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dde3ed] rounded-lg text-sm text-[#070a0c] focus:outline-none focus:border-[#775a19]"
            >
              <option value="Grid C3-C7 • Slab Rebar">Grid C3-C7 • Slab Rebar</option>
              <option value="East Facade • Lightwell">East Facade • Lightwell</option>
              <option value="Zone B • Electrical MEP">Zone B • Electrical MEP</option>
              <option value="Central Courtyard • Foundation">Central Courtyard • Foundation</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="font-label-caps text-xs text-[#75777a] uppercase tracking-wider block mb-1">
              Observation Details
            </label>
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record structural variance, worker headcounts, or pour blockers..."
              className="w-full px-3 py-2 bg-[#f8f9ff] border border-[#dde3ed] rounded-lg text-sm text-[#070a0c] placeholder:text-[#75777a] focus:outline-none focus:border-[#775a19] resize-none"
            />
          </div>

          {/* GPS telemetry note */}
          <div className="p-2.5 rounded-lg bg-[#eef4fe] border border-[#dde3ed] flex items-center justify-between text-xs text-[#44474a]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#775a19]">pin_drop</span>
              <span className="font-mono">12.9716° N, 80.2458° E</span>
            </div>
            <span className="font-mono text-[#04210e] bg-[#c9ebcd] px-1.5 py-0.5 rounded text-[10px]">±3m GPS Lock</span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#dde3ed] rounded-lg text-xs font-medium text-[#44474a] hover:bg-[#f8f9ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#775a19] hover:bg-[#8e6c20] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
            >
              Create Site Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
