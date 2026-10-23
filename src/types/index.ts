export type ScreenId = 'home' | 'projects' | 'workspace' | 'attendance' | 'client-portal' | 'more';

export type UserRole = 'supervisor' | 'client' | 'architect';

export type DeviceMode = 'responsive' | 'mobile' | 'tablet' | 'laptop';

export interface Project {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  statusTag: string;
  statusFilter: 'construction' | 'design' | 'completed';
  clientName: string;
  leadArchitect: string;
  supervisor: string;
  supervisorInitials: string;
  latestTelemetry: string;
  progressPercent: number;
  photoCount: number;
  imageUrl: string;
  imageAlt: string;
  phaseCode: string;
}

export interface FeedItem {
  id: string;
  gridZone: string;
  title: string;
  coordinates: string;
  accuracy: string;
  loggedBy: string;
  loggedRole: string;
  avatarChar: string;
  batchCode: string;
  time: string;
  status: 'verified' | 'synced';
  imageUrl: string;
  imageAlt: string;
  notes?: string;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  matchedSiteName?: string;
  isGeofenceVerified?: boolean;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  time: string;
  initials: string;
  status: 'present' | 'halfday' | 'absent';
  workerCount?: number;
  note?: string;
  isSubcontractor?: boolean;
}

export interface StagedPhoto {
  id: string;
  queueNumber: string;
  title: string;
  timestamp: string;
  coordinates: string;
  accuracy: string;
  imageUrl: string;
  imageAlt: string;
  isPerimeterTagged?: boolean;
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;
  matchedSiteName?: string;
  isGeofenceVerified?: boolean;
}

export interface SiteLogEntry {
  id: string;
  date: string;
  zone: string;
  description: string;
  signedBy: string;
  signedRole: string;
}
