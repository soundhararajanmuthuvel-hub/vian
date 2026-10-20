export interface SiteGeofence {
  id: string;
  code: string;
  name: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
  radiusMeters: number;
}

export const REGISTERED_SITE_GEOFENCES: SiteGeofence[] = [
  {
    id: 'PRJ-OMR-01',
    code: 'PRJ-OMR-01',
    name: 'The Courtyard Residence',
    category: 'Residential Atelier',
    location: 'OMR, Chennai',
    lat: 12.9716,
    lng: 80.2458,
    radiusMeters: 400
  },
  {
    id: 'PRJ-ECR-04',
    code: 'PRJ-ECR-04',
    name: 'Aranya Villa & Studio',
    category: 'Private Residence & Atelier',
    location: 'ECR, Chennai',
    lat: 12.8398,
    lng: 80.2431,
    radiusMeters: 350
  },
  {
    id: 'PRJ-PNG-09',
    code: 'PRJ-PNG-09',
    name: 'Zenith Tech Park Pavilion',
    category: 'Commercial Campus',
    location: 'Perungudi, Chennai',
    lat: 12.9642,
    lng: 80.2415,
    radiusMeters: 500
  },
  {
    id: 'PRJ-ALW-02',
    code: 'PRJ-ALW-02',
    name: 'Alwarpet Heritage Restoration',
    category: 'Conservation Atelier',
    location: 'Alwarpet, Chennai',
    lat: 13.0334,
    lng: 80.2520,
    radiusMeters: 250
  },
  {
    id: 'PRJ-PSG-03',
    code: 'PRJ-PSG-03',
    name: 'Poes Garden Atelier',
    category: 'Luxury Residential',
    location: 'Poes Garden, Chennai',
    lat: 13.0478,
    lng: 80.2543,
    radiusMeters: 250
  },
  {
    id: 'PRJ-KOD-05',
    code: 'PRJ-KOD-05',
    name: 'Kodaikanal Glass Pavilion',
    category: 'High Altitude Residence',
    location: 'Kodaikanal Hills',
    lat: 10.2381,
    lng: 77.4892,
    radiusMeters: 600
  }
];

// Calculate distance using Haversine formula
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

export interface GpsComparisonResult {
  currentLat: number;
  currentLng: number;
  matchedSite: SiteGeofence;
  distanceMeters: number;
  distanceFormatted: string;
  isWithinGeofence: boolean;
  statusBadge: string;
  siteFullName: string;
  allSites: { site: SiteGeofence; distanceMeters: number }[];
}

export function compareGpsWithRegisteredSites(
  userLat: number,
  userLng: number
): GpsComparisonResult {
  const comparisons = REGISTERED_SITE_GEOFENCES.map((site) => {
    const dist = calculateHaversineDistance(userLat, userLng, site.lat, site.lng);
    return {
      site,
      distanceMeters: Math.round(dist)
    };
  }).sort((a, b) => a.distanceMeters - b.distanceMeters);

  const closest = comparisons[0];
  const isWithin = closest.distanceMeters <= closest.site.radiusMeters;

  let distanceFormatted = '';
  if (closest.distanceMeters < 1000) {
    distanceFormatted = `${closest.distanceMeters}m`;
  } else {
    distanceFormatted = `${(closest.distanceMeters / 1000).toFixed(1)}km`;
  }

  let statusBadge = '';
  if (isWithin) {
    statusBadge = `GEOFENCE VERIFIED (${distanceFormatted} from datum)`;
  } else if (closest.distanceMeters < 2000) {
    statusBadge = `PERIMETER ADJACENT (${distanceFormatted})`;
  } else {
    statusBadge = `OFF-SITE (${distanceFormatted} to ${closest.site.code})`;
  }

  return {
    currentLat: userLat,
    currentLng: userLng,
    matchedSite: closest.site,
    distanceMeters: closest.distanceMeters,
    distanceFormatted,
    isWithinGeofence: isWithin,
    statusBadge,
    siteFullName: `${closest.site.name}, ${closest.site.location}`,
    allSites: comparisons
  };
}

// Stamping tool: Burns high-end architectural title-block overlay directly into the image canvas
export function stampCanvasWithSiteData(
  canvas: HTMLCanvasElement,
  result: GpsComparisonResult,
  metadata: {
    photoTitle: string;
    zone: string;
    inspectorName?: string;
    accuracy?: string;
  }
): string {
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas.toDataURL('image/jpeg', 0.92);

  const width = canvas.width;
  const height = canvas.height;

  // Proportional banner height (around 16% of image height, min 100px)
  const bannerHeight = Math.max(105, Math.round(height * 0.16));
  const bannerY = height - bannerHeight;

  // Save current canvas state
  ctx.save();

  // Dark architectural obsidian overlay with subtle gradient
  const gradient = ctx.createLinearGradient(0, bannerY, 0, height);
  gradient.addColorStop(0, 'rgba(7, 10, 12, 0.90)');
  gradient.addColorStop(1, 'rgba(7, 10, 12, 0.98)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, bannerY, width, bannerHeight);

  // Top brass hairline divider
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = Math.max(2, Math.round(width * 0.003));
  ctx.beginPath();
  ctx.moveTo(0, bannerY);
  ctx.lineTo(width, bannerY);
  ctx.stroke();

  // Padding
  const padX = Math.round(width * 0.035);
  const padY = bannerY + Math.round(bannerHeight * 0.22);
  const scale = width / 1000; // responsive font scalar

  // Left Section: Detected Site Name & Geofence
  // 1. Tag line: SITE IDENTIFICATION & GEOFENCE STATUS
  ctx.fillStyle = result.isWithinGeofence ? '#c9ebcd' : '#ffdea5';
  ctx.font = `600 ${Math.max(11, Math.round(13 * scale))}px Inter, sans-serif`;
  ctx.fillText(
    `● ${result.statusBadge.toUpperCase()}`,
    padX,
    padY
  );

  // 2. Main Site Name Header (PROMINENT TITLE)
  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${Math.max(18, Math.round(24 * scale))}px Outfit, Inter, sans-serif`;
  const siteTitle = `${result.matchedSite.name.toUpperCase()} · ${result.matchedSite.location.toUpperCase()}`;
  ctx.fillText(siteTitle, padX, padY + Math.round(26 * scale));

  // 3. Coordinate telemetry + Zone line
  ctx.fillStyle = '#c5c6ca';
  ctx.font = `500 ${Math.max(11, Math.round(13 * scale))}px Inter, monospace`;
  const coordsFormatted = `${result.currentLat.toFixed(4)}° N, ${result.currentLng.toFixed(4)}° E`;
  const telemetry = `${coordsFormatted} (${metadata.accuracy || '±2.4m'}) | ${metadata.zone} | ${metadata.photoTitle}`;
  ctx.fillText(telemetry, padX, padY + Math.round(48 * scale));

  // Right Section: VIAN ERP Monogram & Digital Timestamp Stamp
  const rightX = width - padX;
  ctx.textAlign = 'right';

  // Digital Signature
  ctx.fillStyle = '#fed488';
  ctx.font = `600 ${Math.max(12, Math.round(14 * scale))}px Inter, sans-serif`;
  ctx.fillText(
    `VIAN ERP · ${result.matchedSite.code}`,
    rightX,
    padY
  );

  // Timestamp
  ctx.fillStyle = '#ffffff';
  ctx.font = `500 ${Math.max(11, Math.round(13 * scale))}px Inter, monospace`;
  const now = new Date();
  const timeStr = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  ctx.fillText(timeStr, rightX, padY + Math.round(24 * scale));

  // Inspector Seal
  ctx.fillStyle = '#86888c';
  ctx.font = `400 ${Math.max(10, Math.round(12 * scale))}px Inter, sans-serif`;
  ctx.fillText(
    `SIGNED: ${metadata.inspectorName || 'MANOJ V. (LIC. ENG-8492)'}`,
    rightX,
    padY + Math.round(46 * scale)
  );

  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.92);
}
