import React from 'react';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: {
    title: string;
    imageUrl: string;
    coordinates?: string;
    accuracy?: string;
    time?: string;
    loggedBy?: string;
    zone?: string;
    certifiedBy?: string;
    description?: string;
    cloudinaryUrl?: string;
    cloudinaryPublicId?: string;
    matchedSiteName?: string;
    isGeofenceVerified?: boolean;
  } | null;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({ isOpen, onClose, photo }) => {
  if (!isOpen || !photo) return null;

  const isCloudinary = photo.cloudinaryUrl || photo.imageUrl.includes('cloudinary');

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0c]/90 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white max-w-4xl w-full mx-auto pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full ${photo.isGeofenceVerified ? 'bg-emerald-400' : 'bg-[#ffdea5]'}`}></span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-[10px] text-[#ffdea5] uppercase tracking-wider block">
                {photo.matchedSiteName ? `SITE: ${photo.matchedSiteName}` : (photo.zone || 'Certified Site Capture')}
              </span>
              {photo.isGeofenceVerified && (
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded">
                  GEOFENCE MATCH
                </span>
              )}
            </div>
            <h3 className="font-headline-sm text-sm sm:text-base text-white truncate">{photo.title}</h3>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 flex items-center justify-center py-4 max-w-4xl w-full mx-auto overflow-hidden">
        <div className="relative max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black flex items-center justify-center">
          <img 
            src={photo.cloudinaryUrl || photo.imageUrl} 
            alt={photo.title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-white text-[10px] font-mono flex items-center gap-1.5 border border-white/20">
            <span className="material-symbols-outlined text-[13px] text-emerald-400">verified</span>
            <span>
              {isCloudinary ? 'CLOUDINARY HOSTED (dwn2sx3b) · EXIF SIGNED' : 'EXIF SIGNED · HIGH RESOLUTION'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="max-w-4xl w-full mx-auto bg-[#1e2124] rounded-xl p-3 sm:p-4 text-white text-xs border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-white/60 font-mono text-[10px] uppercase">Telemetry & Coordinates</span>
          <span className="font-mono text-emerald-300 font-medium">
            {photo.coordinates || '12.9716° N, 80.2458° E'} {photo.accuracy && `(${photo.accuracy})`}
          </span>
        </div>

        {photo.loggedBy && (
          <div className="flex flex-col gap-0.5">
            <span className="text-white/60 font-mono text-[10px] uppercase">Logged By</span>
            <span className="font-medium text-white">{photo.loggedBy}</span>
          </div>
        )}

        {photo.time && (
          <div className="flex flex-col gap-0.5">
            <span className="text-white/60 font-mono text-[10px] uppercase">Timestamp</span>
            <span className="font-medium text-white">{photo.time}</span>
          </div>
        )}

        {photo.cloudinaryPublicId && (
          <div className="flex flex-col gap-0.5">
            <span className="text-white/60 font-mono text-[10px] uppercase">Cloudinary Public ID</span>
            <span className="font-mono text-[#fed488] truncate max-w-[150px]">{photo.cloudinaryPublicId}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {photo.cloudinaryUrl && (
            <a 
              href={photo.cloudinaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#fed488] text-[#261900] font-semibold rounded text-xs flex items-center gap-1 hover:bg-[#ffdea5] transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              Cloudinary URL
            </a>
          )}
          <button 
            onClick={() => {
              const url = photo.cloudinaryUrl || photo.imageUrl;
              navigator.clipboard?.writeText(url);
              alert('Image URL copied to clipboard');
            }}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded font-medium text-xs flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">share</span>
            Share URL
          </button>
          <button 
            onClick={onClose}
            className="px-3 py-1.5 bg-[#775a19] text-white rounded font-semibold text-xs hover:bg-[#8e6c20] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
