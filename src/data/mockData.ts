import { Project, FeedItem, CrewMember, StagedPhoto, SiteLogEntry } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ-OMR-01',
    code: 'PRJ-OMR-01',
    name: 'The Courtyard Residence',
    category: 'Residential Atelier',
    location: 'OMR, Chennai',
    statusTag: 'Execution · Phase 2 (Slab Casting)',
    statusFilter: 'construction',
    clientName: 'Mr. K. Narayanan',
    leadArchitect: 'Sivaram G.',
    supervisor: 'Manoj V.',
    supervisorInitials: 'MV',
    latestTelemetry: 'Oct 24 · 3 new GPS site photos',
    progressPercent: 68,
    photoCount: 48,
    phaseCode: 'CL-204',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjGnY-swRCiOqI5nh28O8udmLNTfpuHMFujwLQg_vezqC19LGOlgs4WPOSdbLpN9GrBQ-C5x48qGCclgPE_fsv58KRhDLNibnFTc-0TJwd0FY7uLc6ezE8NofxxJwWFWYN8JiCSdzrcb8k6MvoYmbSuZPaeYdMfa2wMOR02oemEgz4BoBBRbM7-IBsUmDcXCuoxZy7Eprflg7eYd0itB7rlHK2R05JhhVRC7iR6MD8OgI2iMQbs8im',
    imageAlt: 'Modern tropical courtyard residence in Chennai with exposed concrete, terracotta jali, reflection pond, lush ficus tree'
  },
  {
    id: 'PRJ-ECR-04',
    code: 'PRJ-ECR-04',
    name: 'Aranya Villa & Studio',
    category: 'Private Residence & Atelier',
    location: 'ECR, Chennai',
    statusTag: 'Interior Finishing',
    statusFilter: 'construction',
    clientName: 'Dr. Meera Reddy',
    leadArchitect: 'Gokul S.',
    supervisor: 'Murugan M.',
    supervisorInitials: 'MM',
    latestTelemetry: 'Oct 23 · Flooring inspection complete',
    progressPercent: 84,
    photoCount: 32,
    phaseCode: 'CL-188',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU-zLKtM3hnHV4mp8wN__6Iew3q6UD1Ezly1l_AKQD6W1NaduGAPqnl708-i5D4bMMpkv1PRZ-s7KbLUcz7TEXlPk_cnOWOW-zeDIP-FYUln_ViExhtgRe4NaPQtmvdd_3BjwAee3xAvetiEHC3Irapov93bw1rY_pOUnMYajaJCZSk0fge3P_wQC-WJ3tm_s8KMHQEILm7pHSbn_Ny1I3yLGZ54TVVDwjmB4a3Jljul4i-M3z3d_e',
    imageAlt: 'Modern coastal luxury villa with teak wood louvers, polished plaster walls, cantilevered canopy in ECR Chennai'
  },
  {
    id: 'PRJ-PNG-09',
    code: 'PRJ-PNG-09',
    name: 'Zenith Tech Park Pavilion',
    category: 'Commercial Campus',
    location: 'Perungudi, Chennai',
    statusTag: 'Structural Framing',
    statusFilter: 'construction',
    clientName: 'Zenith Corp',
    leadArchitect: 'Sivaram G.',
    supervisor: 'Vijay R.',
    supervisorInitials: 'VR',
    latestTelemetry: 'Oct 22 · Steel fabrication check',
    progressPercent: 42,
    photoCount: 61,
    phaseCode: 'CL-312',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYPOROcm3IPqb4bWeWPTHyIjXgA3kDEfHTzC_qaIqhlV8IBu-NtDm9NSclT6diEppgwknb60YG3i5eD0nWYi-Zckk2Glt6qfmYBqEBcvjRxP3Smc8RZC0sD1H45gzSoidcRaBQqYZGhlT55xC8vzIzAuwhkzpswA42VqLODBlDVaQCAtQIbSsrqQyFmVQsNsqtNyELq13z9gOhzCitAE4tHDtP4N6PWvWDkaNlNwJ1nSZeCAKm0K_H',
    imageAlt: 'Angular steel and glass technology park pavilion under construction in Perungudi Chennai with diagrid frames'
  },
  {
    id: 'PRJ-ALW-02',
    code: 'PRJ-ALW-02',
    name: 'Alwarpet Heritage Restoration',
    category: 'Conservation Atelier',
    location: 'Alwarpet, Chennai',
    statusTag: 'Phase 1 · Lime Plastering',
    statusFilter: 'construction',
    clientName: 'V. Sundaram Heritage Trust',
    leadArchitect: 'Gokul S.',
    supervisor: 'Manoj V.',
    supervisorInitials: 'MV',
    latestTelemetry: 'Oct 24 · Slaked lime test passed',
    progressPercent: 91,
    photoCount: 54,
    phaseCode: 'CL-110',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJFrLCXRTbn5Nl-5dEAX0yJNzOBPKHm2G2BqzswnH0iQWpd2OPgQT5NdBthwqoL5zLFlfJQPuBItCTW0qlBOC5m65jtqgQ1yWXGVeuHDESYP2bSkyPNS0shkqQWlGh9Dkr6it2xx8QIEbYoKfFMGeQfP6pFhDrDSFBmU6xt3KCaxGcn0d714kuE22HBMDlhzC-EkOJS92-DBknw75Rkl8j8imSFHgd8PePOkKCrItbLusk0vtIKKwf',
    imageAlt: 'Heritage lime plaster and terracotta restoration masonry'
  },
  {
    id: 'PRJ-KOD-05',
    code: 'PRJ-KOD-05',
    name: 'Kodaikanal Glass Pavilion',
    category: 'High Altitude Residence',
    location: 'Kodaikanal Hills',
    statusTag: 'Schematic Design Review',
    statusFilter: 'design',
    clientName: 'R. Ananth',
    leadArchitect: 'Sivaram G.',
    supervisor: 'Mohan G.',
    supervisorInitials: 'MG',
    latestTelemetry: 'Oct 21 · Topographic drone scan approved',
    progressPercent: 35,
    photoCount: 18,
    phaseCode: 'CL-050',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtVgP7ASaQn32uL0lu-GQ2O4OC14-kDM7IXmXzplmJ91LnV6pvbPNmJp6hE0YpuoVFCt5mvYNbnStTuJI7eQrPASScuJPE1OMSqUn2rH5Fc1-1ohozWJMpe8_0dodLuDClLCMouudKWMvWFDv5NEeqhtuha015SncCaIwPtjSFq68yWB-eTDdje9PqU5IpGMx9QlVRjfue-xcE0qKU_nugg5oMsiUpp8wJgMOFqtm99aFsJEfLUXZU',
    imageAlt: 'Glass pavilion and cantilevered structural woodwork'
  },
  {
    id: 'PRJ-PSG-03',
    code: 'PRJ-PSG-03',
    name: 'Poes Garden Atelier',
    category: 'Luxury Residential',
    location: 'Poes Garden, Chennai',
    statusTag: 'Permitting & Structural Engineering',
    statusFilter: 'design',
    clientName: 'S. Krishnan',
    leadArchitect: 'Gokul S.',
    supervisor: 'Murugan M.',
    supervisorInitials: 'MM',
    latestTelemetry: 'Oct 19 · Soil testing borehole #3 verified',
    progressPercent: 15,
    photoCount: 12,
    phaseCode: 'CL-088',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7cjN9bHcKJiyp9qd5Kb-mt7xNA02YGm1OB48m9j1WeDKV1bbvzJqnRZw0J-Z1sJXs9EXsMcQJVW4V-na8lylSM7RA-xpp9pVIwg85y0U8MmFz0a3ck6PW-4zYro1yC79bHjLS86sxsE16LCY1P8W7iBnsHspeVsAC26EQ085vpB2rOizDZF2TNyhFRSOuQduTlR-6UasT8uM0CjOeaOwUjkfFzW82fjYQunHCPBY0Z0-jHS6gF9l2',
    imageAlt: 'High-end stone finishes and architectural drafting'
  }
];

export const INITIAL_FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed-1',
    gridZone: 'Grid C3-C7 • Slab Rebar',
    title: 'Second-floor slab rebar tie verification',
    coordinates: '12.9716° N, 80.2458° E',
    accuracy: '±4m accuracy',
    loggedBy: 'Manoj V.',
    loggedRole: 'Lead Site Sup.',
    avatarChar: 'M',
    batchCode: 'Batch #04',
    time: '10:15 AM',
    status: 'verified',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeuYE3brtN3iG3ooCRYKg9Min9Z9QIfq-6AhORTgIXZpNuyGVM-sDHjVWTbAfKapWnlJFVAushTuRi9xxbnryRlVaA7FH51nSdBuYPn9guT7CZ-obTF8oABMrLohMR2Qn3kYb6-c_0WoFaBJ5gaOiWoEFofLSnts4Z_QHHtGRlT-Dfi6RJwYMxyxBbobSWbtx3z00Odxuvb64_mMj3wD4xDpowQ_cZimZTXB8LoWaslxecBk5NOgVs',
    imageAlt: 'Modern architectural construction site in Chennai India showing exposed steel rebars for second floor slab reinforcement under warm morning tropical sunlight, precision formwork and measuring tape visible, high-end editorial architectural photography style with clean concrete textures and golden lighting.'
  },
  {
    id: 'feed-2',
    gridZone: 'East Facade • Lightwell',
    title: 'Courtyard wire-cut brick mock-up sign-off',
    coordinates: '12.9714° N, 80.2459° E',
    accuracy: '±3m accuracy',
    loggedBy: 'Manoj V.',
    loggedRole: 'Lead Site Sup.',
    avatarChar: 'M',
    batchCode: 'Batch #03',
    time: '09:40 AM',
    status: 'synced',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJFrLCXRTbn5Nl-5dEAX0yJNzOBPKHm2G2BqzswnH0iQWpd2OPgQT5NdBthwqoL5zLFlfJQPuBItCTW0qlBOC5m65jtqgQ1yWXGVeuHDESYP2bSkyPNS0shkqQWlGh9Dkr6it2xx8QIEbYoKfFMGeQfP6pFhDrDSFBmU6xt3KCaxGcn0d714kuE22HBMDlhzC-EkOJS92-DBknw75Rkl8j8imSFHgd8PePOkKCrItbLusk0vtIKKwf',
    imageAlt: 'Architectural masonry detail of exposed terracotta wire-cut brickwork on an interior courtyard lightwell wall, clean horizontal raked mortar joints, warm ambient courtyard daylight filtered through structural pergolas, editorial architectural detailing in Scandinavian minimal aesthetic.'
  },
  {
    id: 'feed-3',
    gridZone: 'Zone B • Electrical MEP',
    title: 'HVAC sleeves & slab PVC conduit run checks',
    coordinates: '12.9719° N, 80.2452° E',
    accuracy: '±5m accuracy',
    loggedBy: 'Mohan G.',
    loggedRole: 'Assistant Sup.',
    avatarChar: 'G',
    batchCode: 'Batch #02',
    time: '08:55 AM',
    status: 'synced',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZjbRrmmK3B8UMbNBflBjEznn8BJxCyWGEXj_X1kj9dCsy-VVGbSjiuy5POncboxv5jR_BXGOHghLDc16u8J5ibJYDCgnmFZ-OCdCX4aLvY_v45bByDL13yYDOrHQwkdDb12-cbIaNXnMmaYZVoHbMfVz6tcBgquX5ImXTSWuk-HPdr8JQmZtPagh3mQSR_n0sN0cCv7nudWOiyqu1TEaHTUavqUJCYkbrQVIIfbtNDnUgrMh6ewG5',
    imageAlt: 'Building construction MEP electrical PVC conduit layout through concrete formwork before casting, precise spacing and junction boxes aligned strictly along architectural grids, natural outdoor jobsite light, professional construction engineering inspection documentation photo.'
  }
];

export const INITIAL_CREW: CrewMember[] = [
  {
    id: 'muthaiya',
    name: 'Muthaiya M.',
    role: 'Office & Site Coordinator',
    time: '08:15 AM',
    initials: 'MM',
    status: 'present'
  },
  {
    id: 'vijay',
    name: 'Vijay R.',
    role: 'Site Supervisor',
    time: '08:30 AM',
    initials: 'VR',
    status: 'present'
  },
  {
    id: 'mohan',
    name: 'Mohan G.',
    role: 'Site Supervisor',
    time: '08:45 AM',
    initials: 'MG',
    status: 'present'
  },
  {
    id: 'murugan',
    name: 'Murugan M.',
    role: 'Site Supervisor',
    time: '08:50 AM',
    initials: 'MM',
    status: 'present'
  },
  {
    id: 'masonry',
    name: 'Mason Team Alpha',
    role: 'Full Squad • Civil Subcontract',
    time: '08:00 AM',
    initials: 'MA',
    status: 'present',
    workerCount: 6,
    note: 'Verified by Manoj V.'
  },
  {
    id: 'carpentry',
    name: 'Carpentry Subcontractor',
    role: 'Sub-contract Crew #09',
    time: '08:20 AM',
    initials: 'CS',
    status: 'halfday',
    workerCount: 4,
    note: 'Split Shift (2 Pres / 2 Abs)',
    isSubcontractor: true
  }
];

export const INITIAL_STAGED_PHOTOS: StagedPhoto[] = [
  {
    id: 'staged-1',
    queueNumber: '#01',
    title: 'Foundation Beam Reinforcement',
    timestamp: 'Today 10:42 AM',
    coordinates: '12.9716° N, 80.2458° E',
    accuracy: 'GPS Locked (±3m)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYJKvtJBLI2xv1jaNaTGo72uPhM0VGPVZpFPWFDcgVgLM1QbZDi0PelBlI7YE2rIQoWacoLOzjTKK0kuI43MshC673uce5ciAv0tNadMrPWZZGj8ag2nivBN7jOmQKpgB1zoG5h5IeLxprkEVn_JpYi-yeWDgtRpSzspwAlbfwsspBq51E-IfWF_1BeU1kIY7fTbntamR2PnMYqE5vRZTUhyRvxS11boJZsc-1eUnh36y0Xp0YtJnA',
    imageAlt: 'Architectural foundation beam reinforcement steel rebar grid detailed close-up shot on construction site in Chennai, daylight, sharp industrial architectural photography'
  },
  {
    id: 'staged-2',
    queueNumber: '#02',
    title: 'First-Floor Slab Curing Area',
    timestamp: 'Today 10:45 AM',
    coordinates: '12.9718° N, 80.2455° E',
    accuracy: 'GPS Locked (±4m)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGZl4Uh3RSeKlkDAGLaWmKn8vWeagUynriemMmA5bzwOcdb4NaCJV1Lfcv1rJ4xCn4ywKSjilnAGe1bctS0tyiZIOsZU88QPbwI5bd7LMTAPn8_ZDBJqDtbMipBAViOMVQBQ08L2OS6zud7GzmhI5QsA6wsy8GwoUncqlhCH-mSwB6kCjodrlp8RPMdWNVU5rQ7mCJqHIJHtFVIiUdMDfK3yL4W0oP83kRCUfGvSO1peUF0nKVEzQn',
    imageAlt: 'First-floor residential concrete slab wet curing area with ponding water and burlap covers, architectural inspection perspective under natural morning sunlight'
  },
  {
    id: 'staged-3',
    queueNumber: '#03',
    title: 'Material Delivery Batch (Cement)',
    timestamp: 'Today 10:48 AM',
    coordinates: 'Gate 2 Bay Access',
    accuracy: 'Perimeter Tagged',
    isPerimeterTagged: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqmUDhgZcKb2cfyaMngT2keWzzd0ik-2e8FXNilH44jKxPXzyh3JLqmfs6oWLVQyJPI4Hm3wVy89SS28ETmjwBXB_t3uokxlGOVbf3uUiLUBEQZ060dpYZjLTx71eEQsRv7wiaDoa7JaWoa-nESiZVaXbvAUObB0K6cdTYrzTOnm2gAVzTpbszrGL4SbuTRto9IKC0zvGW1AlINZu4H2kKGF0u92DGBDgJepqcCjdFT_x5cLkR-KFn',
    imageAlt: 'Stacked Portland cement bags delivery on wooden pallets sheltered on jobsite, construction materials arrival audit, clear lighting'
  }
];

export const CLIENT_SITE_JOURNAL = {
  feature: {
    title: 'Courtyard lightwell and double-height ceiling cladding',
    zone: 'Zone A · Courtyard',
    date: 'Oct 23, 2024 · 11:42 AM',
    certifiedBy: 'Gokul S.',
    description: 'Structural glulam ribs anchored to fair-faced concrete. Natural illumination calibrated to solar azimuth for passive thermal cooling.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtVgP7ASaQn32uL0lu-GQ2O4OC14-kDM7IXmXzplmJ91LnV6pvbPNmJp6hE0YpuoVFCt5mvYNbnStTuJI7eQrPASScuJPE1OMSqUn2rH5Fc1-1ohozWJMpe8_0dodLuDClLCMouudKWMvWFDv5NEeqhtuha015SncCaIwPtjSFq68yWB-eTDdje9PqU5IpGMx9QlVRjfue-xcE0qKU_nugg5oMsiUpp8wJgMOFqtm99aFsJEfLUXZU',
    imageAlt: 'Modern architectural coastal villa interior with dramatic double-height courtyard lightwell, raw concrete finishes, warm fluted teak ceiling cladding'
  },
  items: [
    {
      id: 'journal-2',
      tag: 'Balcony Terrace',
      title: 'Custom teak louvers & ocean-facing balcony joinery',
      date: 'Oct 21',
      status: 'Inspected',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUdRjjmmK-VUrMNItNwZ3Ijh7xeBgI4osikkGNk2NbqXjuZqecHpKGFfg7jxT-XRiB4VbPU6qbjrxNdRNkFq6AKbwfLTtXIQ-RjqpVqMOW2SnlrJLJ6Jeb6NjOxrFRk9VkvhHECjR6_pci2I3EVD92s7S8578jX4bw8eUhZYzuuQ_F9R8GMGpRiUxKrXUlgOavRUN3jE0aqGTSbziIl8moI4Behplbwfp7E-7OFqblLBEtX_ZiLUYC',
      imageAlt: 'Close up architectural detail of custom Burma teak pivoting louvers on ocean-facing balcony'
    },
    {
      id: 'journal-3',
      tag: 'Master Suite',
      title: 'Master bathroom travertine stone dry-lay inspection',
      date: 'Oct 19',
      status: 'Approved',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7cjN9bHcKJiyp9qd5Kb-mt7xNA02YGm1OB48m9j1WeDKV1bbvzJqnRZw0J-Z1sJXs9EXsMcQJVW4V-na8lylSM7RA-xpp9pVIwg85y0U8MmFz0a3ck6PW-4zYro1yC79bHjLS86sxsE16LCY1P8W7iBnsHspeVsAC26EQ085vpB2rOizDZF2TNyhFRSOuQduTlR-6UasT8uM0CjOeaOwUjkfFzW82fjYQunHCPBY0Z0-jHS6gF9l2',
      imageAlt: 'Architectural stone masonry inspection of bookmatched Italian Roman travertine slabs dry-laid on bathroom floor'
    }
  ]
};

export const STUDIO_FIELD_LOGS: SiteLogEntry[] = [
  {
    id: 'log-1',
    date: 'Oct 23, 2024',
    zone: 'Atelier Level',
    description: 'Second coat primer finished in upper atelier; acoustic insulation battens completed.',
    signedBy: 'Gokul S.',
    signedRole: 'Lead Architect'
  },
  {
    id: 'log-2',
    date: 'Oct 20, 2024',
    zone: 'Facade Envelope',
    description: 'Glazing panels inspected and weather-sealed against coastal winds along eastern boundary.',
    signedBy: 'Murugan M.',
    signedRole: 'Site Supervisor'
  }
];
