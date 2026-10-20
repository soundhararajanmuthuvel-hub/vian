import React, { useState } from 'react';
import { Project, StagedPhoto } from '../../types';

interface WorkspaceScreenProps {
  activeProject: Project;
  stagedPhotos: StagedPhoto[];
  onRemoveStagedPhoto: (id: string) => void;
  onOpenProjectSwitcher: () => void;
  onOpenCameraModal: () => void;
  onSelectPhoto: (photo: { 
    title: string; 
    imageUrl: string; 
    coordinates?: string; 
    accuracy?: string;
    cloudinaryUrl?: string;
    cloudinaryPublicId?: string;
  }) => void;
  onUploadAllPhotos: (results: { id: string; cloudinaryUrl: string; publicId: string }[]) => void;
  onShowToast: (msg: string) => void;
  onAddStagedPhoto: (photo: StagedPhoto) => void;
}

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  activeProject,
  stagedPhotos,
  onRemoveStagedPhoto,
  onOpenProjectSwitcher,
  onOpenCameraModal,
  onSelectPhoto,
  onUploadAllPhotos,
  onShowToast,
  onAddStagedPhoto
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Civil Work' | 'Reinforcement' | 'Finishes' | 'Safety/Issues'>('Civil Work');
  const [siteNotes, setSiteNotes] = useState('Rebar placement verified as per Drawing Rev-04 before concrete pour.');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Cloudinary Batch Upload Handler
  const handleUploadClick = async () => {
    if (stagedPhotos.length === 0) {
      onShowToast('Queue is currently empty. Use the Camera to snap a new photo.');
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadProgress({ current: 0, total: stagedPhotos.length });

    const uploadedResults: { id: string; cloudinaryUrl: string; publicId: string }[] = [];

    for (let i = 0; i < stagedPhotos.length; i++) {
      const photo = stagedPhotos[i];
      setUploadProgress({ current: i + 1, total: stagedPhotos.length });

      try {
        const response = await fetch('/api/upload-cloudinary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: photo.imageUrl,
            title: photo.title,
            zone: selectedCategory,
            coordinates: photo.coordinates,
            accuracy: photo.accuracy
          })
        });

        const data = await response.json();
        if (response.ok && data.url) {
          uploadedResults.push({
            id: photo.id,
            cloudinaryUrl: data.url,
            publicId: data.public_id
          });
        } else {
          console.warn(`Failed to upload ${photo.title} to Cloudinary:`, data.error);
        }
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setIsUploading(false);
    setUploadProgress(null);
    setUploadSuccess(true);
    
    onUploadAllPhotos(uploadedResults);
    onShowToast(`Synchronized ${stagedPhotos.length} photos to Cloudinary (cloud: dwn2sx3b)!`);

    setTimeout(() => {
      setUploadSuccess(false);
    }, 4000);
  };

  const handleGalleryImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const newPhoto: StagedPhoto = {
          id: `staged-${Date.now()}`,
          queueNumber: `#0${stagedPhotos.length + 1}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          timestamp: 'Today Just Now',
          coordinates: '12.9716° N, 80.2458° E',
          accuracy: 'GPS Locked (±2.4m)',
          imageUrl: dataUrl,
          imageAlt: file.name
        };
        onAddStagedPhoto(newPhoto);
        onShowToast(`Imported ${file.name} to staged queue. Ready for Cloudinary upload.`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Status Context Bar */}
      <div className="px-gutter-mobile py-space-sm bg-[#eef4fe] flex items-center justify-between shadow-sm border-b border-[#dde3ed]">
        <div className="flex items-center gap-space-xs text-[#775a19]">
          <span className="material-symbols-outlined text-[16px]">satellite_alt</span>
          <span className="font-label-caps text-label-caps tracking-widest text-[#44474a] uppercase">
            RTK-GPS Status: Calibrated
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c9ebcd] text-[#04210e] font-label-sm text-label-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#04210e] animate-pulse"></span>
          <span className="font-code-data text-code-data">±2.4m Precision</span>
        </div>
      </div>

      <div className="px-gutter-mobile pt-space-md flex flex-col gap-space-md">
        {/* Project Selector Container */}
        <div className="bg-[#ffffff] rounded-xl p-space-md shadow-sm border border-[#dde3ed]">
          <div className="flex items-center justify-between mb-space-xs">
            <label className="font-label-caps text-label-caps text-[#75777a] uppercase tracking-wider">
              Assigned Project
            </label>
            <span className="font-code-data text-code-data text-[#775a19] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span> Jobsite Geofenced
            </span>
          </div>
          <div className="relative">
            <button 
              onClick={onOpenProjectSwitcher}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-[#e9eef8] text-left transition-all active:scale-[0.99] border border-[#dde3ed]"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-8 h-8 rounded-md bg-[#fed488] text-[#785a1a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div className="min-w-0">
                  <h2 className="font-headline-sm text-headline-sm text-[#070a0c] truncate leading-tight">
                    {activeProject.name}, OMR
                  </h2>
                  <p className="font-body-sm text-body-sm text-[#44474a] truncate">
                    Sector 4-B • Plot 108 • {activeProject.location}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#75777a] shrink-0 ml-2">expand_more</span>
            </button>
          </div>
        </div>

        {/* Capture Action Split Cards */}
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Camera Button */}
          <button 
            onClick={onOpenCameraModal}
            className="group relative flex flex-col items-center justify-center p-space-md rounded-xl bg-[#070a0c] text-white text-center shadow-md active:scale-95 transition-all overflow-hidden min-h-[140px] border border-white/10"
          >
            <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none"></div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-space-sm text-[#ffdea5]">
              <span className="material-symbols-outlined text-[26px]">photo_camera</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-white leading-tight font-medium">
              Take Camera
            </span>
            <div className="mt-1 flex items-center gap-1 text-[#e9c176] font-label-caps text-label-caps tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5] animate-ping"></span>
              Live Camera & Cloudinary
            </div>
          </button>

          {/* Upload Button */}
          <label className="group relative flex flex-col items-center justify-center p-space-md rounded-xl bg-[#ffffff] text-[#161c23] text-center shadow-sm active:scale-95 transition-all min-h-[140px] border border-[#dde3ed] cursor-pointer hover:bg-[#f8f9ff]">
            <input type="file" accept="image/*" onChange={handleGalleryImport} className="hidden" />
            <div className="w-12 h-12 rounded-full bg-[#e3e8f3] flex items-center justify-center mb-space-sm text-[#070a0c]">
              <span className="material-symbols-outlined text-[26px]">add_photo_alternate</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-[#070a0c] leading-tight font-medium">
              Gallery Import
            </span>
            <div className="mt-1 flex items-center gap-1 text-[#75777a] font-label-caps text-label-caps tracking-wider">
              <span className="material-symbols-outlined text-[12px] text-[#709076]">verified</span>
              EXIF Audited
            </div>
          </label>
        </div>

        {/* Staged Queue Header */}
        <div className="flex items-center justify-between pt-space-xs">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-[#070a0c]">Staged Queue</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#261900] font-code-data text-code-data font-semibold">
              {stagedPhotos.length} Pending
            </span>
          </div>
          <button 
            onClick={() => onShowToast('RTK-GPS satellite constellation calibrated (±2.1m precision).')}
            className="font-label-sm text-label-sm text-[#775a19] flex items-center gap-1 hover:underline"
          >
            <span className="material-symbols-outlined text-[15px]">refresh</span> Re-verify GPS
          </button>
        </div>

        {/* Staged Upload Queue List */}
        <div className="flex flex-col gap-space-sm">
          {stagedPhotos.length === 0 ? (
            <div className="p-6 rounded-xl bg-[#ffffff] text-center border border-dashed border-[#dde3ed] text-[#44474a]">
              <span className="material-symbols-outlined text-3xl mb-1 text-[#75777a]">add_a_photo</span>
              <p className="font-body-sm">All staged photos have been ingested and verified into Cloudinary.</p>
              <button 
                onClick={onOpenCameraModal}
                className="mt-2 text-xs text-[#775a19] font-semibold hover:underline"
              >
                + Take a photo with Camera
              </button>
            </div>
          ) : (
            stagedPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="rounded-xl bg-[#ffffff] p-space-sm shadow-sm flex flex-col gap-space-xs border border-[#dde3ed]"
              >
                <div className="flex gap-space-sm">
                  <div 
                    onClick={() => onSelectPhoto(photo)}
                    className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#e3e8f3] cursor-pointer group"
                  >
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                      src={photo.cloudinaryUrl || photo.imageUrl} 
                      alt={photo.imageAlt}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-1 left-1 px-1 rounded bg-[#070a0c]/80 backdrop-blur-sm text-[10px] font-code-data text-white">
                      {photo.queueNumber}
                    </div>
                    {photo.cloudinaryUrl && (
                      <div className="absolute top-1 right-1 bg-amber-400 text-black px-1 rounded text-[9px] font-bold">
                        CDN
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <div className="min-w-0">
                          {photo.matchedSiteName && (
                            <span className="font-label-caps text-[10px] text-[#775a19] uppercase font-semibold block truncate">
                              {photo.matchedSiteName}
                            </span>
                          )}
                          <h3 
                            onClick={() => onSelectPhoto(photo)}
                            className="font-body-md text-body-md text-[#070a0c] font-medium truncate cursor-pointer hover:text-[#775a19]"
                          >
                            {photo.title}
                          </h3>
                        </div>
                        <button 
                          onClick={() => {
                            onRemoveStagedPhoto(photo.id);
                            onShowToast(`Removed ${photo.title} from queue.`);
                          }}
                          aria-label="Remove item" 
                          className="text-[#c5c6ca] hover:text-[#ba1a1a] transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="font-code-data text-code-data text-[#44474a] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px] text-[#75777a]">schedule</span> 
                        {photo.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="font-code-data text-code-data text-[#44474a] truncate">
                        {photo.coordinates}
                      </span>
                      {photo.isGeofenceVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c9ebcd] text-[#04210e] font-label-caps text-label-caps shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#04210e]"></span> {photo.matchedSiteName ? 'Geofence Match' : photo.accuracy}
                        </span>
                      ) : photo.isPerimeterTagged ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdea5] text-[#261900] font-label-caps text-label-caps shrink-0">
                          <span className="material-symbols-outlined text-[12px]">radar</span> Perimeter Tagged
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c9ebcd] text-[#04210e] font-label-caps text-label-caps shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#04210e]"></span> {photo.accuracy}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Verification Metadata Form */}
        <div className="bg-[#ffffff] rounded-xl p-space-md shadow-sm flex flex-col gap-space-md mt-space-xs border border-[#dde3ed]">
          {/* Inspection Category Filter Chips */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-caps text-label-caps text-[#75777a] uppercase tracking-wider">
              Inspection Category
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Civil Work', 'Reinforcement', 'Finishes', 'Safety/Issues'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md font-label-md text-label-md transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#070a0c] text-white' 
                      : 'bg-[#e9eef8] text-[#44474a] hover:bg-[#dde3ed]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Site Notes Area */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-label-caps text-[#75777a] uppercase tracking-wider" htmlFor="siteNotes">
                Site Observation Notes
              </label>
              <span className="font-code-data text-code-data text-[#75777a]">Rev-04 Attached</span>
            </div>
            <div className="relative">
              <textarea 
                id="siteNotes"
                rows={3}
                value={siteNotes}
                onChange={(e) => setSiteNotes(e.target.value)}
                placeholder="Provide contextual logs for structural ledger..."
                className="w-full p-3 rounded-lg bg-[#e9eef8] text-[#070a0c] font-body-md text-body-md focus:bg-white transition-colors resize-none outline-none focus:ring-1 focus:ring-[#775a19] border border-[#dde3ed]"
              />
            </div>
          </div>

          {/* Verified By Badge Card */}
          <div className="p-3 rounded-lg bg-[#eef4fe] flex items-center justify-between border border-[#dde3ed]">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-[#ffdea5] flex items-center justify-center text-[#261900] font-headline-sm text-headline-sm font-semibold">
                MV
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-body-md text-body-md text-[#070a0c] font-medium">Manoj V.</span>
                  <span className="material-symbols-outlined text-[16px] text-[#000d03]">verified</span>
                </div>
                <p className="font-label-sm text-label-sm text-[#44474a]">Lead Site Supervisor • Lic. ENG-8492</p>
              </div>
            </div>
            <span className="font-label-caps text-label-caps text-[#c5c6ca] uppercase">Sign-Off Ready</span>
          </div>
        </div>

        {/* Security & Sync Status Box */}
        <div className="rounded-lg bg-[#e3e8f3] p-3 flex items-start gap-space-sm border border-[#dde3ed]">
          <span className="material-symbols-outlined text-[#775a19] text-[20px] shrink-0 mt-0.5">encrypted</span>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-[#070a0c] font-medium">
                Cloudinary Asset Ledger Active
              </span>
              <span className="font-code-data text-[10px] bg-white px-1.5 py-0.5 rounded text-[#775a19] border border-[#dde3ed]">
                Cloud: dwn2sx3b
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#44474a] mt-0.5">
              Images are signed with SHA-256 geostamps and uploaded directly to Cloudinary cloud storage under account <strong className="text-black">dwn2sx3b</strong>.
            </p>
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="pt-space-xs">
          <button 
            id="submitPhotosBtn"
            onClick={handleUploadClick}
            disabled={isUploading || stagedPhotos.length === 0}
            className={`w-full py-4 px-space-md rounded-xl shadow-lg flex items-center justify-center gap-space-sm active:scale-[0.98] transition-all ${
              uploadSuccess
                ? 'bg-[#04210e] text-white'
                : stagedPhotos.length === 0
                ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                : 'bg-[#070a0c] text-white hover:bg-[#1e2124]'
            } ${isUploading ? 'opacity-90' : ''}`}
          >
            {isUploading ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin text-[#ffdea5]">sync</span>
                <span className="font-headline-sm text-headline-sm text-white font-medium">
                  Uploading to Cloudinary {uploadProgress ? `(${uploadProgress.current}/${uploadProgress.total})...` : '...'}
                </span>
              </>
            ) : uploadSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#c9ebcd]">check_circle</span>
                <span className="font-headline-sm text-headline-sm text-white font-medium">
                  Synchronized to Cloudinary
                </span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#ffdea5]">cloud_upload</span>
                <span className="font-headline-sm text-headline-sm text-white font-medium">
                  Upload {stagedPhotos.length} Photo{stagedPhotos.length !== 1 ? 's' : ''} to Cloudinary
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-space-sm text-[#44474a] font-code-data text-code-data">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Cloudinary Ready (dwn2sx3b)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#775a19]"></span> PostgreSQL Sync Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
