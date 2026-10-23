/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, UserRole, Project, FeedItem, CrewMember, StagedPhoto, DeviceMode } from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_FEED_ITEMS, 
  INITIAL_CREW, 
  INITIAL_STAGED_PHOTOS 
} from './data/mockData';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Toast } from './components/Toast';

import { HomeScreen } from './components/screens/HomeScreen';
import { AttendanceScreen } from './components/screens/AttendanceScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { WorkspaceScreen } from './components/screens/WorkspaceScreen';
import { ClientPortalScreen } from './components/screens/ClientPortalScreen';

import { DrawingModal } from './components/modals/DrawingModal';
import { CameraModal } from './components/modals/CameraModal';
import { QuickLogModal } from './components/modals/QuickLogModal';
import { ProjectSwitcherModal } from './components/modals/ProjectSwitcherModal';
import { PhotoLightboxModal } from './components/modals/PhotoLightboxModal';
import { NotificationsModal } from './components/modals/NotificationsModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [userRole, setUserRole] = useState<UserRole>('supervisor');
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('responsive');
  const [activeProjectId, setActiveProjectId] = useState<string>('PRJ-OMR-01');

  const handleDeviceModeChange = (mode: DeviceMode) => {
    setDeviceMode(mode);
    if (mode === 'mobile') {
      setIsDeviceFrame(true);
    } else {
      setIsDeviceFrame(false);
    }
  };

  // Dynamic application state
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED_ITEMS);
  const [crew, setCrew] = useState<CrewMember[]>(INITIAL_CREW);
  const [stagedPhotos, setStagedPhotos] = useState<StagedPhoto[]>(INITIAL_STAGED_PHOTOS);

  // Modals state
  const [isProjectSwitcherOpen, setIsProjectSwitcherOpen] = useState(false);
  const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isQuickLogModalOpen, setIsQuickLogModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{
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
  } | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  // Screen navigation helper
  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (screen === 'client-portal') {
      setUserRole('client');
    } else {
      setUserRole('supervisor');
    }
  };

  // Toggle user role helper
  const handleToggleRole = () => {
    if (userRole === 'supervisor') {
      setUserRole('client');
      setCurrentScreen('client-portal');
      showToast('Switched to Client Principal View (Dr. Meera Reddy · Aranya Villa)');
    } else {
      setUserRole('supervisor');
      setCurrentScreen('home');
      showToast('Switched to Site Supervisor View (Manoj V. · The Courtyard Residence)');
    }
  };

  // Crew status toggler
  const handleUpdateCrewStatus = (id: string, status: 'present' | 'halfday' | 'absent') => {
    setCrew(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const handleMarkAllPresent = () => {
    setCrew(prev => prev.map(m => ({ ...m, status: 'present' })));
  };

  // Photo staging & upload helpers
  const handleRemoveStagedPhoto = (id: string) => {
    setStagedPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleAddStagedPhoto = (photo: StagedPhoto) => {
    setStagedPhotos(prev => [photo, ...prev]);
  };

  const handleCapturePhoto = (photo: { 
    title: string; 
    imageUrl: string; 
    coordinates: string; 
    accuracy: string; 
    zone: string;
    cloudinaryUrl?: string;
    cloudinaryPublicId?: string;
    matchedSiteName?: string;
    isGeofenceVerified?: boolean;
  }) => {
    // Add to staged queue
    const newStaged: StagedPhoto = {
      id: `staged-${Date.now()}`,
      queueNumber: `#0${stagedPhotos.length + 1}`,
      title: photo.title,
      timestamp: 'Today Just Now',
      coordinates: photo.coordinates,
      accuracy: `GPS Locked (${photo.accuracy})`,
      imageUrl: photo.imageUrl,
      imageAlt: photo.title,
      cloudinaryUrl: photo.cloudinaryUrl,
      cloudinaryPublicId: photo.cloudinaryPublicId,
      matchedSiteName: photo.matchedSiteName,
      isGeofenceVerified: photo.isGeofenceVerified
    };
    setStagedPhotos(prev => [newStaged, ...prev]);

    // Also append to recent site feed
    const newFeedItem: FeedItem = {
      id: `feed-${Date.now()}`,
      gridZone: photo.zone,
      title: photo.title,
      coordinates: photo.coordinates,
      accuracy: photo.accuracy,
      loggedBy: 'Manoj V.',
      loggedRole: 'Lead Site Sup.',
      avatarChar: 'M',
      batchCode: `Batch #0${feedItems.length + 1}`,
      time: 'Just Now',
      status: 'verified',
      imageUrl: photo.cloudinaryUrl || photo.imageUrl,
      imageAlt: photo.title,
      cloudinaryUrl: photo.cloudinaryUrl,
      cloudinaryPublicId: photo.cloudinaryPublicId,
      matchedSiteName: photo.matchedSiteName,
      isGeofenceVerified: photo.isGeofenceVerified
    };
    setFeedItems(prev => [newFeedItem, ...prev]);

    const siteTag = photo.matchedSiteName ? ` [${photo.matchedSiteName}]` : '';
    if (photo.cloudinaryUrl) {
      showToast(`Photo stamped with site${siteTag} & uploaded to Cloudinary!`);
    } else {
      showToast(`Captured photo stamped with site${siteTag} added to queue.`);
    }
  };

  const handleUploadAllPhotos = (results: { id: string; cloudinaryUrl: string; publicId: string }[]) => {
    if (results.length > 0) {
      // Create new feed items for each uploaded result
      const newFeedEntries: FeedItem[] = results.map((res, index) => {
        const matchingStaged = stagedPhotos.find(p => p.id === res.id);
        return {
          id: `feed-cloudinary-${Date.now()}-${index}`,
          gridZone: 'Site Verification • Cloudinary Ingest',
          title: matchingStaged?.title || 'Cloudinary Ingested Asset',
          coordinates: matchingStaged?.coordinates || '12.9716° N, 80.2458° E',
          accuracy: matchingStaged?.accuracy || '±2.4m GPS Calibrated',
          loggedBy: 'Manoj V.',
          loggedRole: 'Lead Site Sup.',
          avatarChar: 'M',
          batchCode: `CDN #${index + 1}`,
          time: 'Just Now',
          status: 'verified',
          imageUrl: res.cloudinaryUrl,
          imageAlt: matchingStaged?.title || 'Jobsite photo',
          cloudinaryUrl: res.cloudinaryUrl,
          cloudinaryPublicId: res.publicId
        };
      });

      setFeedItems(prev => [...newFeedEntries, ...prev]);
    }
    // Clear staged queue
    setStagedPhotos([]);
  };

  const handleQuickLogSubmit = (entry: { type: string; title: string; notes: string; zone: string }) => {
    const newFeedItem: FeedItem = {
      id: `feed-${Date.now()}`,
      gridZone: entry.zone,
      title: entry.title,
      coordinates: '12.9716° N, 80.2458° E',
      accuracy: '±3m accuracy',
      loggedBy: 'Manoj V.',
      loggedRole: 'Lead Site Sup.',
      avatarChar: 'M',
      batchCode: `Batch #0${feedItems.length + 1}`,
      time: 'Just Now',
      status: 'synced',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeuYE3brtN3iG3ooCRYKg9Min9Z9QIfq-6AhORTgIXZpNuyGVM-sDHjVWTbAfKapWnlJFVAushTuRi9xxbnryRlVaA7FH51nSdBuYPn9guT7CZ-obTF8oABMrLohMR2Qn3kYb6-c_0WoFaBJ5gaOiWoEFofLSnts4Z_QHHtGRlT-Dfi6RJwYMxyxBbobSWbtx3z00Odxuvb64_mMj3wD4xDpowQ_cZimZTXB8LoWaslxecBk5NOgVs',
      imageAlt: entry.title,
      notes: entry.notes
    };
    setFeedItems(prev => [newFeedItem, ...prev]);
    showToast(`Registered Quick Log: "${entry.title}" (${entry.type})`);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f9] text-[#161c23] flex flex-col items-center">
      {/* Container Wrapper (Auto-Responsive, or Laptop/Tablet/Mobile Frame Simulation) */}
      <div 
        className={`w-full transition-all duration-300 min-h-screen flex flex-col bg-[#f8f9ff] ${
          deviceMode === 'mobile' || isDeviceFrame 
            ? 'max-w-[420px] my-4 rounded-[40px] shadow-2xl border-[8px] border-[#1e2124] overflow-hidden relative' 
            : deviceMode === 'tablet'
            ? 'max-w-[768px] my-4 rounded-[28px] shadow-2xl border-[6px] border-[#1e2124] overflow-hidden relative'
            : deviceMode === 'laptop'
            ? 'max-w-[1240px] my-4 rounded-2xl shadow-2xl border-[6px] border-[#1e2124] overflow-hidden relative'
            : 'w-full max-w-7xl mx-auto shadow-sm border-x border-[#dde3ed]'
        }`}
      >
        {/* Device frame simulated speaker / dynamic island if in device mode */}
        {(deviceMode === 'mobile' || isDeviceFrame) && (
          <div className="w-full bg-[#070a0c] pt-2 pb-1 flex justify-center items-center">
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-900/60 mr-2"></div>
              <div className="w-10 h-1 bg-neutral-800 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Global App Header */}
        <Header 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          userRole={userRole}
          onToggleRole={handleToggleRole}
          isDeviceFrame={isDeviceFrame}
          onToggleDeviceFrame={() => {
            const nextMode = isDeviceFrame ? 'responsive' : 'mobile';
            handleDeviceModeChange(nextMode);
          }}
          deviceMode={deviceMode}
          onChangeDeviceMode={handleDeviceModeChange}
          onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        />

        {/* Screen Content Render */}
        <main className="flex-1 w-full bg-[#f8f9ff]">
          {currentScreen === 'home' && (
            <HomeScreen 
              activeProject={activeProject}
              feedItems={feedItems}
              onNavigate={handleNavigate}
              onOpenProjectSwitcher={() => setIsProjectSwitcherOpen(true)}
              onOpenDrawingModal={() => setIsDrawingModalOpen(true)}
              onOpenCameraModal={() => setIsCameraModalOpen(true)}
              onOpenQuickLogModal={() => setIsQuickLogModalOpen(true)}
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'attendance' && (
            <AttendanceScreen 
              crew={crew}
              onUpdateCrewStatus={handleUpdateCrewStatus}
              onMarkAllPresent={handleMarkAllPresent}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'projects' && (
            <ProjectsScreen 
              projects={projects}
              onSelectProject={(id) => {
                setActiveProjectId(id);
              }}
              onNavigate={handleNavigate}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'workspace' && (
            <WorkspaceScreen 
              activeProject={activeProject}
              stagedPhotos={stagedPhotos}
              onRemoveStagedPhoto={handleRemoveStagedPhoto}
              onOpenProjectSwitcher={() => setIsProjectSwitcherOpen(true)}
              onOpenCameraModal={() => setIsCameraModalOpen(true)}
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onUploadAllPhotos={handleUploadAllPhotos}
              onShowToast={showToast}
              onAddStagedPhoto={handleAddStagedPhoto}
            />
          )}

          {currentScreen === 'client-portal' && (
            <ClientPortalScreen 
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Persistent Navigation Bar */}
        <Navigation 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          userRole={userRole}
          forceShow={deviceMode === 'mobile' || isDeviceFrame}
        />

        {/* Global Toast Notification */}
        <Toast 
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />

        {/* Modals */}
        <DrawingModal 
          isOpen={isDrawingModalOpen}
          onClose={() => setIsDrawingModalOpen(false)}
        />

        <CameraModal 
          isOpen={isCameraModalOpen}
          onClose={() => setIsCameraModalOpen(false)}
          onCapture={handleCapturePhoto}
        />

        <QuickLogModal 
          isOpen={isQuickLogModalOpen}
          onClose={() => setIsQuickLogModalOpen(false)}
          onSubmit={handleQuickLogSubmit}
        />

        <ProjectSwitcherModal 
          isOpen={isProjectSwitcherOpen}
          onClose={() => setIsProjectSwitcherOpen(false)}
          projects={projects}
          activeProjectId={activeProjectId}
          onSelectProject={(id) => {
            setActiveProjectId(id);
            const p = projects.find(item => item.id === id);
            showToast(`Switched active execution context to: ${p?.name}`);
          }}
        />

        <PhotoLightboxModal 
          isOpen={!!selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          photo={selectedPhoto}
        />

        <NotificationsModal 
          isOpen={isNotificationsModalOpen}
          onClose={() => setIsNotificationsModalOpen(false)}
        />
      </div>
    </div>
  );
}
