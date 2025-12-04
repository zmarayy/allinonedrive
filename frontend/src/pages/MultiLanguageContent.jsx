import React, { useState } from 'react';
import { getStoredPackage } from '../utils/codeAccess';
import { PACKAGE_TYPES } from '../utils/packageAccess';
import BottomNavbar from '../components/BottomNavbar';
import PdfPreviewCard from '../components/PdfPreviewCard';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ps', name: 'Pashto', flag: '🇦🇫' },
  { code: 'prs', name: 'Dari', flag: '🇦🇫' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰' },
];

// Multi-language content structure
// Note: Each day has ONE PDF that contains all 4 languages (English, Pashto, Dari, Urdu)
// All language options point to the same PDF file for each day
const MULTI_LANGUAGE_CONTENT = {
  1: {
    pdfs: {
      // All languages point to the same PDF (contains all 4 languages in one document)
      en: [
        {
          title: 'Day 1 - Multi-Language Summary',
          description: 'Day 1 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          downloadPath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          fileSize: '211 KB',
        },
      ],
      ps: [
        {
          title: 'Day 1 - Multi-Language Summary',
          description: 'Day 1 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          downloadPath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          fileSize: '211 KB',
        },
      ],
      prs: [
        {
          title: 'Day 1 - Multi-Language Summary',
          description: 'Day 1 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          downloadPath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          fileSize: '211 KB',
        },
      ],
      ur: [
        {
          title: 'Day 1 - Multi-Language Summary',
          description: 'Day 1 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          downloadPath: '/course-materials/multi-language/day 1 EXAM NOTES ALLERTNESS AND ATTITUDE.pdf',
          fileSize: '211 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Introduction - Who The Highway Code is for (Rules H1 to H3)',
          description: 'Who The Highway Code is for, how it is worded, consequences of not following the rules, self-driving vehicles and the hierarchy of road users',
          youtubeVideoId: 'plBDx890hN4',
        },
        {
          title: 'Rules for Pedestrians (Rules 1 to 35)',
          description: 'PDF notes covering rules for pedestrians',
          youtubeVideoId: 'lvO12abEQ8I',
        },
        {
          title: 'Rules about Animals (Rules 47 to 58)',
          description: 'PDF notes about animals on the road',
          youtubeVideoId: 'Lo-70wgI_Jk',
        },
        {
          title: 'Rules for Cyclists (Rules 59 to 82)',
          description: 'PDF notes covering rules for cyclists',
          youtubeVideoId: 'MGA7K8GzABQ',
        },
        {
          title: 'Rules for Drivers and Motorcyclists (Rules 89 to 102)',
          description: 'Vehicle condition, fitness to drive, alcohol and drugs, what to do before setting off, vehicle towing and loading, seat belts and child restraints',
          youtubeVideoId: 'B9HAtcdwZEc',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 1 - Exam Preparation Video',
          description: 'Day 1 exam preparation content in English language',
          youtubeVideoId: 'xTm0KNYfWWk',
        },
      ],
      ps: [
        {
          title: 'Day 1 - Pashto Video',
          description: 'Day 1 course content in Pashto language',
          youtubeVideoId: 'mN-_301XkyU',
        },
      ],
      prs: [
        {
          title: 'Day 1 - Dari Video',
          description: 'Day 1 course content in Dari language',
          youtubeVideoId: 'WNXhnCznmIA',
        },
      ],
      ur: [
        {
          title: 'Day 1 - Urdu Video',
          description: 'Day 1 course content in Urdu language',
          youtubeVideoId: 'JWlIY8LkFsQ',
        },
      ],
    },
  },
  2: {
    pdfs: {
      en: [
        {
          title: 'Day 2 - Multi-Language Summary',
          description: 'Day 2 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          downloadPath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          fileSize: '171 KB',
        },
      ],
      ps: [
        {
          title: 'Day 2 - Multi-Language Summary',
          description: 'Day 2 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          downloadPath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          fileSize: '171 KB',
        },
      ],
      prs: [
        {
          title: 'Day 2 - Multi-Language Summary',
          description: 'Day 2 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          downloadPath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          fileSize: '171 KB',
        },
      ],
      ur: [
        {
          title: 'Day 2 - Multi-Language Summary',
          description: 'Day 2 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          downloadPath: '/course-materials/multi-language/day 2 EXAM NOTES RULES OF THE ROAD AND TRAFFIC SIGNS.pdf',
          fileSize: '171 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Rules for users of powered wheelchairs and mobility scooters (Rules 36 to 46)',
          description: 'Rules for users of powered wheelchairs and mobility scooters',
          youtubeVideoId: 'Ouh-bVYZIoU',
        },
        {
          title: 'Rules for motorcyclists (Rules 83 to 88)',
          description: 'Rules specifically for motorcyclists',
          youtubeVideoId: '7hybereviRY',
        },
        {
          title: 'General rules, techniques and advice for all drivers and riders (Rules 103 to 158)',
          description: 'Signals, stopping procedures, lighting, control of the vehicle, speed limits, stopping distances, lines and lane markings, multi-lane carriageways, smoking, mobile phones and sat nav',
          youtubeVideoId: 'VjbPbeh1jBI',
        },
        {
          title: 'Traffic signs',
          description: 'Signs giving orders, warning signs, direction signs, information signs and road works signs',
          youtubeVideoId: '2SLBoP9DJRc',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 2 - Exam Preparation Video',
          description: 'Day 2 exam preparation content in English language',
          youtubeVideoId: 'SHR3YiPYHMY',
        },
      ],
      ps: [
        {
          title: 'Day 2 - Pashto Video',
          description: 'Day 2 course content in Pashto language',
          youtubeVideoId: 'nWBERBFD2Wk',
        },
      ],
      prs: [
        {
          title: 'Day 2 - Dari Video',
          description: 'Day 2 course content in Dari language',
          youtubeVideoId: 'F5FFfbCUKR8',
        },
      ],
      ur: [
        {
          title: 'Day 2 - Urdu Video',
          description: 'Day 2 course content in Urdu language',
          youtubeVideoId: 'NU4vb3KsvD8',
        },
      ],
    },
  },
  3: {
    pdfs: {
      en: [
        {
          title: 'Day 3 - Multi-Language Summary',
          description: 'Day 3 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          downloadPath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          fileSize: '157 KB',
        },
      ],
      ps: [
        {
          title: 'Day 3 - Multi-Language Summary',
          description: 'Day 3 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          downloadPath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          fileSize: '157 KB',
        },
      ],
      prs: [
        {
          title: 'Day 3 - Multi-Language Summary',
          description: 'Day 3 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          downloadPath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          fileSize: '157 KB',
        },
      ],
      ur: [
        {
          title: 'Day 3 - Multi-Language Summary',
          description: 'Day 3 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          downloadPath: '/course-materials/multi-language/DAY 3SAFETY AND YOUR VEHICLE AND SAFETY MARGINS.pdf',
          fileSize: '157 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Driving in adverse weather conditions (Rules 226 to 237)',
          description: 'Wet weather, icy and snowy weather, windy weather, fog and hot weather',
          youtubeVideoId: 'FlPcxxXyjDk',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 3 - Exam Preparation Video',
          description: 'Day 3 exam preparation content in English language',
          youtubeVideoId: '-VAtBeJnK-s',
        },
      ],
      ps: [
        {
          title: 'Day 3 - Pashto Video',
          description: 'Day 3 course content in Pashto language',
          youtubeVideoId: 'JxHgRO5LxgE',
        },
      ],
      prs: [
        {
          title: 'Day 3 - Dari Video',
          description: 'Day 3 course content in Dari language',
          youtubeVideoId: 'KEiTi8Zp7PA',
        },
      ],
      ur: [
        {
          title: 'Day 3 - Urdu Video',
          description: 'Day 3 course content in Urdu language',
          youtubeVideoId: 'EYECiiGdClY',
        },
      ],
    },
  },
  4: {
    pdfs: {
      en: [
        {
          title: 'Day 4 - Multi-Language Summary',
          description: 'Day 4 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          downloadPath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          fileSize: '168 KB',
        },
      ],
      ps: [
        {
          title: 'Day 4 - Multi-Language Summary',
          description: 'Day 4 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          downloadPath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          fileSize: '168 KB',
        },
      ],
      prs: [
        {
          title: 'Day 4 - Multi-Language Summary',
          description: 'Day 4 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          downloadPath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          fileSize: '168 KB',
        },
      ],
      ur: [
        {
          title: 'Day 4 - Multi-Language Summary',
          description: 'Day 4 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          downloadPath: '/course-materials/multi-language/day 4 hazard awareness and vulnerable road users.pdf',
          fileSize: '168 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Using the road (Rules 159 to 203)',
          description: 'General rules, overtaking, road junctions, roundabouts, pedestrian crossings and reversing',
          youtubeVideoId: '3i8jNQLaMQk',
        },
        {
          title: 'Road users requiring extra care (Rules 204 to 225)',
          description: 'Pedestrians, motorcyclists and cyclists, horses and other animals, children, older and disabled people and other vulnerable road users',
          youtubeVideoId: 'AyJskzi7spI',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 4 - Exam Preparation Video',
          description: 'Day 4 exam preparation content in English language',
          youtubeVideoId: 'r8xcGUkXGcs',
        },
      ],
      ps: [
        {
          title: 'Day 4 - Pashto Video',
          description: 'Day 4 course content in Pashto language',
          youtubeVideoId: 'ESoFqmPQSus',
        },
      ],
      prs: [
        {
          title: 'Day 4 - Dari Video',
          description: 'Day 4 course content in Dari language',
          youtubeVideoId: 'q5MsyRq6xuw',
        },
      ],
      ur: [
        {
          title: 'Day 4 - Urdu Video',
          description: 'Day 4 course content in Urdu language',
          youtubeVideoId: 'Q7EzJm7FC3A',
        },
      ],
    },
  },
  5: {
    pdfs: {
      en: [
        {
          title: 'Day 5 - Multi-Language Summary',
          description: 'Day 5 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          downloadPath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          fileSize: '195 KB',
        },
      ],
      ps: [
        {
          title: 'Day 5 - Multi-Language Summary',
          description: 'Day 5 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          downloadPath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          fileSize: '195 KB',
        },
      ],
      prs: [
        {
          title: 'Day 5 - Multi-Language Summary',
          description: 'Day 5 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          downloadPath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          fileSize: '195 KB',
        },
      ],
      ur: [
        {
          title: 'Day 5 - Multi-Language Summary',
          description: 'Day 5 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          downloadPath: '/course-materials/multi-language/day 5 other type of vehicle and vehicle handling.pdf',
          fileSize: '195 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Waiting and parking (Rules 238 to 252)',
          description: 'General parking rules, parking at night, visibility and enforcement',
          youtubeVideoId: 'rgyxXM1qvMY',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 5 - Exam Preparation Video',
          description: 'Day 5 exam preparation content in English language',
          youtubeVideoId: 'n6u9Rk5L48k',
        },
      ],
      ps: [
        {
          title: 'Day 5 - Pashto Video',
          description: 'Day 5 course content in Pashto language',
          youtubeVideoId: 'WV6JZwchrLc',
        },
      ],
      prs: [
        {
          title: 'Day 5 - Dari Video',
          description: 'Day 5 course content in Dari language',
          youtubeVideoId: '-8d59lxiGK0',
        },
      ],
      ur: [
        {
          title: 'Day 5 - Urdu Video',
          description: 'Day 5 course content in Urdu language',
          youtubeVideoId: 'PPMkv2EXnWo',
        },
      ],
    },
  },
  6: {
    pdfs: {
      en: [
        {
          title: 'Day 6 - Multi-Language Summary',
          description: 'Day 6 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 6.pdf',
          downloadPath: '/course-materials/multi-language/DAY 6.pdf',
          fileSize: '122 KB',
        },
      ],
      ps: [
        {
          title: 'Day 6 - Multi-Language Summary',
          description: 'Day 6 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 6.pdf',
          downloadPath: '/course-materials/multi-language/DAY 6.pdf',
          fileSize: '122 KB',
        },
      ],
      prs: [
        {
          title: 'Day 6 - Multi-Language Summary',
          description: 'Day 6 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 6.pdf',
          downloadPath: '/course-materials/multi-language/DAY 6.pdf',
          fileSize: '122 KB',
        },
      ],
      ur: [
        {
          title: 'Day 6 - Multi-Language Summary',
          description: 'Day 6 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 6.pdf',
          downloadPath: '/course-materials/multi-language/DAY 6.pdf',
          fileSize: '122 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Motorways (Rules 253 to 274)',
          description: 'Motorway signals, joining, driving on the motorway, lane discipline, overtaking, stopping and leaving the motorway',
          youtubeVideoId: 'VRjdHZe8Gho',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 6 - Exam Preparation Video',
          description: 'Day 6 exam preparation content in English language',
          youtubeVideoId: 'D2nTvR_-FrU',
        },
      ],
      ps: [
        {
          title: 'Day 6 - Pashto Video',
          description: 'Day 6 course content in Pashto language',
          youtubeVideoId: '5ZN6lAaFiLQ',
        },
      ],
      prs: [
        {
          title: 'Day 6 - Dari Video',
          description: 'Day 6 course content in Dari language',
          youtubeVideoId: 'GlWajX5DQpI',
        },
      ],
      ur: [
        {
          title: 'Day 6 - Urdu Video',
          description: 'Day 6 course content in Urdu language',
          youtubeVideoId: 'WP5N-bgjFcQ',
        },
      ],
    },
  },
  7: {
    pdfs: {
      en: [
        {
          title: 'Day 7 - Multi-Language Summary',
          description: 'Day 7 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          downloadPath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          fileSize: '118 KB',
        },
      ],
      ps: [
        {
          title: 'Day 7 - Multi-Language Summary',
          description: 'Day 7 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          downloadPath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          fileSize: '118 KB',
        },
      ],
      prs: [
        {
          title: 'Day 7 - Multi-Language Summary',
          description: 'Day 7 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          downloadPath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          fileSize: '118 KB',
        },
      ],
      ur: [
        {
          title: 'Day 7 - Multi-Language Summary',
          description: 'Day 7 course summary in English, Pashto, Dari, and Urdu',
          filePath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          downloadPath: '/course-materials/multi-language/DAY 7 MOTERWAY AND ESSENTIAL DOCUMENTS .pdf',
          fileSize: '118 KB',
        },
      ],
    },
    videos: {
      en: [
        // Standard package videos (in order from courseContent.js)
        {
          title: 'Breakdowns and incidents (Rules 275 to 287)',
          description: 'Breakdowns on all roads and motorways, obstructions, incidents, incidents involving dangerous goods and documents',
          youtubeVideoId: 'gmZj4jUanvM',
        },
        {
          title: 'Road works, level crossings and tramways (Rules 288 to 307)',
          description: 'Rules at road works, on motorways and other high-speed roads, level crossings and tramways',
          youtubeVideoId: 'iOqdzjmnecE',
        },
        // Exam preparation video (at the end)
        {
          title: 'Day 7 - Exam Preparation Video',
          description: 'Day 7 exam preparation content in English language',
          youtubeVideoId: 'robG74jPkF4',
        },
      ],
      ps: [
        {
          title: 'Day 7 - Pashto Video',
          description: 'Day 7 course content in Pashto language',
          youtubeVideoId: 'fqBhJkdgVX0',
        },
      ],
      prs: [
        {
          title: 'Day 7 - Dari Video',
          description: 'Day 7 course content in Dari language',
          youtubeVideoId: 'ybL-UfkdLAM',
        },
      ],
      ur: [
        {
          title: 'Day 7 - Urdu Video',
          description: 'Day 7 course content in Urdu language',
          youtubeVideoId: 'fnP_29DILyQ',
        },
      ],
    },
  },
};

function MultiLanguageContent() {
  const packageType = getStoredPackage();
  const [activeTab, setActiveTab] = useState('pdfs'); // 'pdfs' or 'videos'
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [expandedDay, setExpandedDay] = useState(null);

  // Check if user has Elite package
  const isElitePackage = [
    PACKAGE_TYPES.ELITE_SELF_STUDY,
    PACKAGE_TYPES.ELITE_LIVE_SUPPORT,
    PACKAGE_TYPES.DRIVING_THEORY_FULL,
  ].includes(packageType);

  // If not Elite, redirect or show message
  if (!isElitePackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-2xl">
          <div className="glass-card p-6 text-center">
            <div className="text-5xl mb-4">🌐</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Multi-Language Content
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              This feature is only available for Elite packages.
            </p>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  const selectedLanguageData = LANGUAGES.find(lang => lang.code === selectedLanguage);
  
  // For PDFs, use English as default (all languages point to same PDF)
  // For Videos, use selected language
  const contentLanguage = activeTab === 'pdfs' ? 'en' : selectedLanguage;
  const currentContent = MULTI_LANGUAGE_CONTENT[expandedDay]?.[activeTab]?.[contentLanguage] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20 sm:pb-24">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            Multi-Language Content
          </h1>
          <p className="text-sm text-gray-600 text-center font-medium">
            Access course materials in multiple languages
          </p>
        </div>

        {/* Tab Selection: PDFs or Videos */}
        <div className="mb-4 animate-slide-up">
          <div className="glass-card p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('pdfs')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'pdfs'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                📚 PDFs
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'videos'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                🎥 Videos
              </button>
            </div>
          </div>
        </div>

        {/* Language Selection - Only show for Videos */}
        {activeTab === 'videos' && (
          <div className="mb-6 animate-slide-up">
            <div className="glass-card p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Select Language</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedLanguage === language.code
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{language.flag}</div>
                    <div className={`text-xs font-semibold ${
                      selectedLanguage === language.code ? 'text-primary-700' : 'text-gray-700'
                    }`}>
                      {language.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content by Day */}
        <div className="space-y-4 animate-slide-up">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div key={day} className="glass-card overflow-hidden">
              {/* Day Header */}
              <button
                onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-700">{day}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-gray-900">Day {day}</h3>
                    <p className="text-xs text-gray-600">
                      {activeTab === 'pdfs' ? 'PDF Materials (All Languages)' : `Video Lessons in ${selectedLanguageData?.name}`}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform ${
                    expandedDay === day ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Day Content */}
              {expandedDay === day && (
                <div className="px-4 pb-4 animate-fade-in">
                  {activeTab === 'pdfs' ? (
                    <div className="space-y-3 mt-3">
                      {currentContent.length > 0 ? (
                        <div className="space-y-2 sm:space-y-3">
                          {currentContent.map((pdf, index) => (
                            <PdfPreviewCard
                              key={index}
                              title={pdf.title}
                              description={pdf.description}
                              fileSize={pdf.fileSize}
                              filePath={pdf.filePath}
                              downloadPath={pdf.downloadPath || pdf.filePath}
                              dayNumber={day}
                              pdfIndex={index}
                              onPdfViewed={() => {}}
                              isMultiLanguage={true}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <p className="text-gray-600 font-medium">
                            {activeTab === 'pdfs' 
                              ? `PDF for Day ${day} will be available soon.`
                              : `Videos for Day ${day} in ${selectedLanguageData?.name} will be available soon.`
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3 mt-3">
                      {currentContent.length > 0 ? (
                        currentContent.map((video, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">{video.title}</h4>
                            {video.description && (
                              <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                            )}
                            {video.youtubeVideoId && (
                              <div className="aspect-video rounded-lg overflow-hidden">
                                <iframe
                                  className="w-full h-full"
                                  src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                                  title={video.title}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                          <p className="text-gray-600 font-medium">
                            Videos for Day {day} in {selectedLanguageData?.name} will be available soon.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
}

export default MultiLanguageContent;

