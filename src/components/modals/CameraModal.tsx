import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  compareGpsWithRegisteredSites, 
  stampCanvasWithSiteData, 
  REGISTERED_SITE_GEOFENCES 
} from '../../utils/gpsComparison';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (newPhoto: { 
    title: string; 
    imageUrl: string; 
    coordinates: string; 
    accuracy: string; 
    zone: string;
    cloudinaryUrl?: string;
    cloudinaryPublicId?: string;
    matchedSiteName?: string;
    isGeofenceVerified?: boolean;
  }) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const [photoTitle, setPhotoTitle] = useState('Foundation Slab Pour Inspection');
  const [zone, setZone] = useState('Grid C3-C7 • Slab Rebar');
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState(false);
  
  // Real camera state
  const [cameraMode, setCameraMode] = useState<'live' | 'sample'>('live');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  // GPS Coordinates (Default: The Courtyard Residence, OMR)
  const [currentLat, setCurrentLat] = useState<number>(12.9716);
  const [currentLng, setCurrentLng] = useState<number>(80.2458);
  const [gpsAccuracy, setGpsAccuracy] = useState('±2.4m');
  const [activeLocationPreset, setActiveLocationPreset] = useState<string>('PRJ-OMR-01');
  const [stampOnPhoto, setStampOnPhoto] = useState(true);

  // Cloudinary Direct Upload Toggle
  const [uploadToCloudinaryNow, setUploadToCloudinaryNow] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // High-res jobsite inspection angles for simulated backup
  const sampleImages = [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeuYE3brtN3iG3ooCRYKg9Min9Z9QIfq-6AhORTgIXZpNuyGVM-sDHjVWTbAfKapWnlJFVAushTuRi9xxbnryRlVaA7FH51nSdBuYPn9guT7CZ-obTF8oABMrLohMR2Qn3kYb6-c_0WoFaBJ5gaOiWoEFofLSnts4Z_QHHtGRlT-Dfi6RJwYMxyxBbobSWbtx3z00Odxuvb64_mMj3wD4xDpowQ_cZimZTXB8LoWaslxecBk5NOgVs',
      defaultTitle: 'Second-floor slab rebar tie verification'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJFrLCXRTbn5Nl-5dEAX0yJNzOBPKHm2G2BqzswnH0iQWpd2OPgQT5NdBthwqoL5zLFlfJQPuBItCTW0qlBOC5m65jtqgQ1yWXGVeuHDESYP2bSkyPNS0shkqQWlGh9Dkr6it2xx8QIEbYoKfFMGeQfP6pFhDrDSFBmU6xt3KCaxGcn0d714kuE22HBMDlhzC-EkOJS92-DBknw75Rkl8j8imSFHgd8PePOkKCrItbLusk0vtIKKwf',
      defaultTitle: 'Courtyard wire-cut brick mock-up sign-off'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYJKvtJBLI2xv1jaNaTGo72uPhM0VGPVZpFPWFDcgVgLM1QbZDi0PelBlI7YE2rIQoWacoLOzjTKK0kuI43MshC673uce5ciAv0tNadMrPWZZGj8ag2nivBN7jOmQKpgB1zoG5h5IeLxprkEVn_JpYi-yeWDgtRpSzspwAlbfwsspBq51E-IfWF_1BeU1kIY7fTbntamR2PnMYqE5vRZTUhyRvxS11boJZsc-1eUnh36y0Xp0YtJnA',
      defaultTitle: 'Foundation Beam Reinforcement Grid'
    }
  ];
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);

  // Live GPS comparison against all registered architectural sites
  const gpsComparison = useMemo(() => {
    return compareGpsWithRegisteredSites(currentLat, currentLng);
  }, [currentLat, currentLng]);

  // Read Real Device Geolocation
  const fetchDeviceGps = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLat(pos.coords.latitude);
          setCurrentLng(pos.coords.longitude);
          setGpsAccuracy(`±${Math.round(pos.coords.accuracy)}m`);
          setActiveLocationPreset('device');
        },
        (err) => {
          console.warn('Geolocation read error:', err);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    }
  };

  useEffect(() => {
    fetchDeviceGps();
  }, []);

  // Initialize and stop Live Camera
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    if (cameraMode === 'live') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, cameraMode, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.warn('Video play error:', e));
      }
      setHasCameraPermission(true);
    } catch (err: any) {
      console.warn('Could not access live camera:', err);
      setHasCameraPermission(false);
      setCameraError(err.message || 'Camera permission denied or camera device unavailable');
      setCameraMode('sample');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  if (!isOpen) return null;

  // Stamping and Uploading workflow
  const processAndUploadPhoto = async (sourceImage: HTMLImageElement | HTMLVideoElement, title: string) => {
    setIsCapturing(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const canvas = canvasRef.current || document.createElement('canvas');
    const width = ('videoWidth' in sourceImage ? sourceImage.videoWidth : sourceImage.naturalWidth) || 1280;
    const height = ('videoHeight' in sourceImage ? sourceImage.videoHeight : sourceImage.naturalHeight) || 960;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw raw image frame
    ctx.drawImage(sourceImage, 0, 0, width, height);

    // Burn high-precision architectural site watermark directly into the photo canvas
    let finalDataUrl = canvas.toDataURL('image/jpeg', 0.92);
    if (stampOnPhoto) {
      finalDataUrl = stampCanvasWithSiteData(canvas, gpsComparison, {
        photoTitle: title,
        zone,
        inspectorName: 'MANOJ V. (LIC. ENG-8492)',
        accuracy: gpsAccuracy
      });
    }

    let cloudinaryUrl: string | undefined = undefined;
    let cloudinaryPublicId: string | undefined = undefined;

    if (uploadToCloudinaryNow) {
      setUploadStatus('uploading');
      setUploadMessage(`Streaming stamped photo (${gpsComparison.matchedSite.name}) to Cloudinary...`);

      try {
        const response = await fetch('/api/upload-cloudinary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: finalDataUrl,
            title,
            zone,
            coordinates: `${currentLat.toFixed(4)}° N, ${currentLng.toFixed(4)}° E`,
            accuracy: gpsAccuracy,
            siteName: gpsComparison.matchedSite.name
          })
        });

        const data = await response.json();
        if (response.ok && data.url) {
          cloudinaryUrl = data.url;
          cloudinaryPublicId = data.public_id;
          finalDataUrl = data.url;
          setUploadStatus('success');
          setUploadMessage(`Uploaded to Cloudinary (Public ID: ${data.public_id})`);
        } else {
          console.warn('Cloudinary upload warning:', data.error);
          setUploadStatus('error');
          setUploadMessage(data.error || 'Cloudinary upload failed, saved to local ledger');
        }
      } catch (err: any) {
        console.error('Upload fetch failed:', err);
        setUploadStatus('error');
        setUploadMessage(err.message || 'Network error connecting to Cloudinary API');
      }
    }

    setTimeout(() => {
      setIsCapturing(false);
      onCapture({
        title,
        imageUrl: finalDataUrl,
        coordinates: `${currentLat.toFixed(4)}° N, ${currentLng.toFixed(4)}° E`,
        accuracy: gpsAccuracy,
        zone,
        cloudinaryUrl,
        cloudinaryPublicId,
        matchedSiteName: gpsComparison.matchedSite.name,
        isGeofenceVerified: gpsComparison.isWithinGeofence
      });
      stopCamera();
      onClose();
    }, uploadToCloudinaryNow ? 1100 : 350);
  };

  // Trigger shutter capture from live video feed
  const handleCaptureLive = () => {
    const video = videoRef.current;
    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      processAndUploadPhoto(video, photoTitle.trim() || 'Jobsite Live Capture');
      return;
    }

    // Fallback to sample image
    const sample = sampleImages[selectedSampleIndex];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => processAndUploadPhoto(img, photoTitle.trim() || sample.defaultTitle);
    img.src = sample.url;
  };

  // Capture from sample preset
  const handleCaptureSample = () => {
    const sample = sampleImages[selectedSampleIndex];
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => processAndUploadPhoto(img, photoTitle.trim() || sample.defaultTitle);
    img.src = sample.url;
  };

  // Upload custom file / native mobile camera photo
  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        const img = new Image();
        img.onload = () => processAndUploadPhoto(img, photoTitle.trim() || file.name.replace(/\.[^/.]+$/, ""));
        img.src = resultUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070a0c]/95 backdrop-blur-md flex flex-col justify-between animate-in fade-in select-none">
      {/* Hidden canvas for video frame extraction and watermark stamping */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Shutter flash animation */}
      {flash && <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-150"></div>}

      {/* Top Telemetry & GPS Comparison Header */}
      <div className="px-4 pt-safe pt-2.5 pb-2 flex flex-col gap-1.5 text-white border-b border-white/10 z-10 bg-black/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-2.5 h-2.5 rounded-full ${gpsComparison.isWithinGeofence ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-300 truncate">
                GPS: {currentLat.toFixed(4)}° N, {currentLng.toFixed(4)}° E ({gpsAccuracy})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
              gpsComparison.isWithinGeofence 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              {gpsComparison.isWithinGeofence ? '✓ GEOFENCE MATCH' : `CLOSEST: ${gpsComparison.distanceFormatted}`}
            </span>
            <button 
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Live Detected Site Comparison Banner */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-white/10 border border-white/15 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-amber-400 text-[16px] shrink-0">domain_verification</span>
            <span className="font-label-caps text-[10px] text-white/70 uppercase">Detected Site:</span>
            <span className="font-headline-sm text-sm text-white font-semibold truncate">
              {gpsComparison.matchedSite.name}
            </span>
            <span className="text-[10px] text-amber-300 bg-black/40 px-1 rounded font-mono shrink-0">
              {gpsComparison.distanceFormatted} away
            </span>
          </div>

          <span className="font-code-data text-[10px] text-emerald-300 shrink-0">
            Will Stamp on Photo
          </span>
        </div>
      </div>

      {/* GPS Site Geofence Comparator Toolbar */}
      <div className="px-4 py-1.5 bg-black/80 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs z-10">
        <span className="text-[10px] font-mono text-white/50 uppercase shrink-0">Compare Site:</span>
        
        {/* Device GPS button */}
        <button
          onClick={fetchDeviceGps}
          className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 ${
            activeLocationPreset === 'device' 
              ? 'bg-emerald-400 text-black font-semibold' 
              : 'bg-white/15 text-white hover:bg-white/25'
          }`}
          title="Use actual device GPS coordinates"
        >
          <span className="material-symbols-outlined text-[13px]">my_location</span>
          Live Device GPS
        </button>

        {/* Preset Sites for Instant Comparison */}
        {REGISTERED_SITE_GEOFENCES.map((site) => (
          <button
            key={site.id}
            onClick={() => {
              setCurrentLat(site.lat);
              setCurrentLng(site.lng);
              setActiveLocationPreset(site.id);
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors shrink-0 ${
              activeLocationPreset === site.id 
                ? 'bg-amber-400 text-black font-semibold' 
                : 'bg-white/15 text-white/80 hover:bg-white/25'
            }`}
          >
            {site.name.replace('The ', '').split(' ')[0]} ({site.location.split(',')[0]})
          </button>
        ))}
      </div>

      {/* Viewfinder Main Stage */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-3 overflow-hidden">
        <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl bg-black flex items-center justify-center">
          {/* Live Video Feed Mode */}
          {cameraMode === 'live' ? (
            <>
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
              {cameraError && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center text-white z-20">
                  <span className="material-symbols-outlined text-4xl text-amber-400 mb-2">videocam_off</span>
                  <p className="text-sm font-medium mb-1">Live Camera Unavailable</p>
                  <p className="text-xs text-white/70 mb-4">{cameraError}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-amber-400 text-black font-semibold text-xs rounded-lg"
                    >
                      Use Phone Camera
                    </button>
                    <button
                      onClick={() => setCameraMode('sample')}
                      className="px-3 py-1.5 bg-white/20 text-white text-xs rounded-lg"
                    >
                      Use Sample Feeds
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Sample Angle Mode */
            <img 
              src={sampleImages[selectedSampleIndex].url}
              alt="Viewfinder feed"
              className="w-full h-full object-cover opacity-90 transition-all duration-300"
            />
          )}

          {/* Viewfinder Rule of Thirds Grid overlay */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/20">
            <div className="border-r border-b border-white/15"></div>
            <div className="border-r border-b border-white/15"></div>
            <div className="border-b border-white/15"></div>
            <div className="border-r border-b border-white/15"></div>
            <div className="border-r border-b border-white/15"></div>
            <div className="border-b border-white/15"></div>
            <div className="border-r border-b border-white/15"></div>
            <div className="border-r border-b border-white/15"></div>
            <div></div>
          </div>

          {/* Center Crosshair Target */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 border border-white/60 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Top Stamp HUD: Detected Site Name directly inside viewfinder */}
          <div className="absolute top-3 left-3 right-3 bg-black/75 backdrop-blur-md px-3 py-2 rounded-lg text-white font-mono flex items-center justify-between border border-white/20">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`w-2 h-2 rounded-full ${gpsComparison.isWithinGeofence ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <div className="min-w-0">
                <span className="font-headline-sm text-xs font-bold text-white block truncate uppercase tracking-tight">
                  {gpsComparison.matchedSite.name}
                </span>
                <span className="text-[10px] text-white/70 block truncate">
                  {gpsComparison.matchedSite.location} • {gpsComparison.statusBadge}
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-bold shrink-0">
              AUTOLOCK
            </span>
          </div>

          {/* Bottom Live Watermark Preview Banner (Simulates the baked stamp) */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#070a0c]/90 backdrop-blur-md p-2.5 border-t-2 border-[#c5a059] flex items-center justify-between text-white text-[10px] font-mono">
            <div className="min-w-0">
              <span className="text-amber-300 font-bold block truncate uppercase">
                {gpsComparison.matchedSite.name.toUpperCase()} · {gpsComparison.matchedSite.location.toUpperCase()}
              </span>
              <span className="text-white/70 truncate block">
                {currentLat.toFixed(4)}° N, {currentLng.toFixed(4)}° E | {zone}
              </span>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[#c9ebcd] font-bold block">VIAN ERP STAMP</span>
              <span className="text-white/50">MANOJ V. SIGNED</span>
            </div>
          </div>
        </div>

        {/* Upload status message feedback */}
        {uploadStatus !== 'idle' && (
          <div className={`mt-2 max-w-sm w-full px-3 py-1.5 rounded-lg text-xs font-mono flex items-center justify-center gap-2 border ${
            uploadStatus === 'uploading'
              ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 animate-pulse'
              : uploadStatus === 'success'
              ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40'
              : 'bg-red-500/20 text-red-300 border-red-500/40'
          }`}>
            <span className="material-symbols-outlined text-[16px]">
              {uploadStatus === 'uploading' ? 'sync' : uploadStatus === 'success' ? 'check_circle' : 'warning'}
            </span>
            <span className="truncate">{uploadMessage}</span>
          </div>
        )}

        {/* Lens / Preset selector */}
        <div className="mt-2 flex items-center justify-between max-w-sm w-full text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setCameraMode('live');
                startCamera();
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 ${
                cameraMode === 'live' ? 'bg-amber-400 text-black font-semibold' : 'bg-white/15 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">videocam</span>
              Live Feed
            </button>
            <button
              onClick={() => setCameraMode('sample')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 ${
                cameraMode === 'sample' ? 'bg-amber-400 text-black font-semibold' : 'bg-white/15 text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">photo_library</span>
              Samples
            </button>
          </div>

          <label className="flex items-center gap-1 text-[11px] text-white/90 cursor-pointer">
            <input 
              type="checkbox"
              checked={stampOnPhoto}
              onChange={(e) => setStampOnPhoto(e.target.checked)}
              className="accent-amber-400 rounded"
            />
            <span>Burn Site Name in Photo</span>
          </label>
        </div>
      </div>

      {/* Bottom Controls Area */}
      <div className="px-4 pb-safe pb-4 pt-2.5 bg-black/85 backdrop-blur-xl border-t border-white/10 z-10">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {/* Title and Zone inputs */}
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={photoTitle}
              onChange={(e) => setPhotoTitle(e.target.value)}
              placeholder="Inspection observation note..."
              className="flex-1 bg-white/15 text-white placeholder-white/50 text-xs px-3 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-amber-400"
            />
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="bg-white/15 text-white text-xs px-2.5 py-2 rounded-lg border border-white/20 focus:outline-none focus:border-amber-400"
            >
              <option value="Grid C3-C7 • Slab Rebar" className="bg-[#1e2124]">Grid C3-C7 Rebar</option>
              <option value="East Facade • Lightwell" className="bg-[#1e2124]">East Facade</option>
              <option value="Zone B • Electrical MEP" className="bg-[#1e2124]">Zone B Electrical</option>
              <option value="Courtyard • Masonry" className="bg-[#1e2124]">Courtyard Masonry</option>
            </select>
          </div>

          {/* Cloudinary Direct Upload Option */}
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs text-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox"
                checked={uploadToCloudinaryNow}
                onChange={(e) => setUploadToCloudinaryNow(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 accent-amber-400 cursor-pointer"
              />
              <span className="font-medium text-[11px]">
                Upload Stamped Photo to Cloudinary (Cloud: <strong className="text-[#fed488]">dwn2sx3b</strong>)
              </span>
            </label>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              AUTO-SIGN
            </span>
          </div>

          {/* Shutter Bar */}
          <div className="flex items-center justify-around pt-1">
            {/* Flip Camera Button */}
            <button 
              onClick={() => {
                if (cameraMode === 'live') {
                  setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
                } else {
                  setSelectedSampleIndex(prev => (prev + 1) % sampleImages.length);
                }
              }}
              className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
              title="Flip Camera / Next Angle"
            >
              <span className="material-symbols-outlined text-[20px]">flip_camera_android</span>
            </button>

            {/* Main Shutter Button */}
            <button 
              onClick={() => {
                if (cameraMode === 'live') {
                  handleCaptureLive();
                } else {
                  handleCaptureSample();
                }
              }}
              disabled={isCapturing}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-amber-400 text-black shadow-2xl active:scale-95 transition-all ${
                isCapturing ? 'opacity-80 scale-95' : 'hover:bg-amber-300'
              }`}
              title="Capture, Compare GPS, Stamp Site Name & Upload"
            >
              {isCapturing ? (
                <span className="material-symbols-outlined text-[28px] animate-spin">sync</span>
              ) : (
                <span className="material-symbols-outlined text-[30px]">photo_camera</span>
              )}
            </button>

            {/* Native Mobile Camera Button */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
              title="Open Phone Camera / File"
            >
              <span className="material-symbols-outlined text-[20px]">upload_file</span>
            </button>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handleCustomFileUpload} 
              className="hidden" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
