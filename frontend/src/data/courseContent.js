/**
 * Course Content Data Structure
 * 7-Day Plan with Package-Based Content Visibility
 * Supports: Standard, Elite Self-Study, Elite Live Support, Driving + Theory Full Package
 */

// 7-Day Plan Structure
export const SEVEN_DAY_PLAN = [
  { day: 1, label: "Day 1" },
  { day: 2, label: "Day 2" },
  { day: 3, label: "Day 3" },
  { day: 4, label: "Day 4" },
  { day: 5, label: "Day 5" },
  { day: 6, label: "Day 6" },
  { day: 7, label: "Day 7" }
];

/**
 * Get content visibility for a specific day based on package level
 */
export function getContentForDay(dayNumber, packageLevel) {
  const baseContent = {
    pdfNotes: true,              // All packages
    odtWordNotes: true,          // All packages
    downloadableResources: true, // All packages
    flashcards: true,            // All packages (if available)
  };

  const videoContent = {
    videos: packageLevel !== "standard",
  };

  const quizContent = {
    quiz: packageLevel !== "standard",
  };

  const liveSupport = {
    liveSupport: packageLevel === "elite_live_support" || packageLevel === "driving_theory_full",
  };

  const drivingLessons = {
    drivingLessons: packageLevel === "driving_theory_full",
  };

  return {
    ...baseContent,
    ...videoContent,
    ...quizContent,
    ...liveSupport,
    ...drivingLessons
  };
}

/**
 * Day Content Data
 * Files are stored in: /course-materials/{package}/day-{X}/
 * 
 * To add PDFs:
 * 1. Place PDF files in: public/course-materials/standard/day-1/, day-2/, etc.
 * 2. Update the filePath below to match your actual file names
 * 3. Update fileSize with actual file sizes
 */
export const DAY_CONTENT = {
  1: {
    day: 1,
    title: "Day 1: Alertness and Attitude",
    pdfNotes: [
      { 
        title: "Introduction - Who The Highway Code is for (Rules H1 to H3)", 
        description: "Who The Highway Code is for, how it is worded, consequences of not following the rules, self-driving vehicles and the hierarchy of road users", 
        fileSize: "67 KB", 
        filePath: "/course-materials/standard/day-1/summary-rules-h1-3.pdf",
        downloadPath: "/course-materials/standard/day-1/summary-rules-h1-3.pdf",
        videoPath: "/course-materials/standard/day-1/videos/hierarchy-1-to-3.mp4"
      },
      { 
        title: "Rules for Pedestrians (Rules 1 to 35)", 
        description: "PDF notes covering rules for pedestrians", 
        fileSize: "1.6 MB", 
        filePath: "/course-materials/standard/day-1/rules-pedestrians-1-35.pdf",
        downloadPath: "/course-materials/standard/day-1/rules-pedestrians-1-35.pdf",
        videoPath: "/course-materials/standard/day-1/videos/rule-1-to-17.mp4"
      },
      { 
        title: "Rules about Animals (Rules 47 to 58)", 
        description: "PDF notes about animals on the road", 
        fileSize: "377 KB", 
        filePath: "/course-materials/standard/day-1/animals-47-58.pdf",
        downloadPath: "/course-materials/standard/day-1/animals-47-58.pdf",
        videoPath: "/course-materials/standard/day-1/videos/animals-47-58.mp4"
      },
      { 
        title: "Rules for Cyclists (Rules 59 to 82)", 
        description: "PDF notes covering rules for cyclists", 
        fileSize: "506 KB", 
        filePath: "/course-materials/standard/day-1/rules-cyclists-59-82.pdf",
        downloadPath: "/course-materials/standard/day-1/rules-cyclists-59-82.pdf",
        videoPath: "/course-materials/standard/day-1/videos/rule-59-to-82-cyclist.mp4"
      },
      { 
        title: "Rules for Drivers and Motorcyclists (Rules 89 to 102)", 
        description: "Vehicle condition, fitness to drive, alcohol and drugs, what to do before setting off, vehicle towing and loading, seat belts and child restraints", 
        fileSize: "665 KB", 
        filePath: "/course-materials/standard/day-1/rules-drivers-motorcyclists-89-102.pdf",
        downloadPath: "/course-materials/standard/day-1/rules-drivers-motorcyclists-89-102.pdf",
        videoPath: "/course-materials/standard/day-1/videos/drivers-motorcyclists-89-102.mp4"
      },
      { 
        title: "Annex 8 – Safety code for new drivers", 
        description: "New Drivers Act, further training and advice for new drivers", 
        fileSize: "47 KB", 
        filePath: "/course-materials/standard/day-1/annex-8.pdf",
        downloadPath: "/course-materials/standard/day-1/annex-8.pdf"
        // No video for Annex 8 - PDF only
      }
    ],
    odtWordNotes: [
      { title: "Day 1 ODT Notes", description: "ODT/Word format notes for Day 1", fileSize: "1.8 MB", path: "standard package/day 1/day1-notes.odt" }
    ],
    videos: [
      { title: "Day 1 Video Lesson", description: "Video explanation for Day 1 content", duration: "15:30", embedUrl: null, path: "standard package/day 1/day1-video.mp4" }
    ],
    flashcards: [
      { title: "Day 1 Flashcards", description: "Flashcards for Day 1 topics", count: "25 cards", path: "standard package/day 1/day1-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 1 Quiz",
      description: "Test your knowledge with Day 1 quiz",
      questions: 10,
      path: "standard package/day 1/day1-quiz.json"
    },
    downloadableResources: [
      { title: "Day 1 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 1/day1-summary.pdf" }
    ],
    liveSupport: {
      title: "Day 1 Live Support",
      description: "Live support session for Day 1 (if applicable)",
      available: false
    }
  },
  2: {
    day: 2,
    title: "Day 2: Rules of the Road and Traffic Signs",
    pdfNotes: [
      { 
        title: "Rules for users of powered wheelchairs and mobility scooters (Rules 36 to 46)", 
        description: "Rules for users of powered wheelchairs and mobility scooters", 
        fileSize: "222 KB", 
        filePath: "/course-materials/standard/day-2/rules 36 to 46 pdf marked.pdf",
        downloadPath: "/course-materials/standard/day-2/rules 36 to 46 pdf marked.pdf",
        videoPath: "/course-materials/standard/day-2/videos/powered-wheelchairs-36-46.mp4"
      },
      { 
        title: "Rules for motorcyclists (Rules 83 to 88)", 
        description: "Rules specifically for motorcyclists", 
        fileSize: "301 KB", 
        filePath: "/course-materials/standard/day-2/motorcyclists 83-88.pdf",
        downloadPath: "/course-materials/standard/day-2/motorcyclists 83-88.pdf",
        videoPath: "/course-materials/standard/day-2/videos/motorcyclists-83-88.mp4"
      },
      { 
        title: "General rules, techniques and advice for all drivers and riders (Rules 103 to 158)", 
        description: "Signals, stopping procedures, lighting, control of the vehicle, speed limits, stopping distances, lines and lane markings, multi-lane carriageways, smoking, mobile phones and sat nav", 
        fileSize: "1.9 MB", 
        filePath: "/course-materials/standard/day-2/General rules, techniques and advice for all drivers and riders (103 to 158).pdf",
        downloadPath: "/course-materials/standard/day-2/General rules, techniques and advice for all drivers and riders (103 to 158).pdf",
        videoPath: "/course-materials/standard/day-2/videos/rules-103-to-125.mp4"
      },
      { 
        title: "Light signals controlling traffic", 
        description: "Traffic light signals, flashing red lights, motorway signals and lane control signals", 
        fileSize: "104 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-light-signals-controlling-traffic.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-light-signals-controlling-traffic.pdf"
        // PDF only - no video
      },
      { 
        title: "Signals to other road users", 
        description: "Direction indicators, brake lights, reversing lights, arm signals", 
        fileSize: "100 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-signals-to-other-road-users.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-signals-to-other-road-users.pdf"
        // PDF only - no video
      },
      { 
        title: "Signals by authorised persons", 
        description: "Police officers, people controlling traffic, DVSA officers, traffic officers, school crossing patrols", 
        fileSize: "469 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-signals-by-authorised-persons.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-signals-by-authorised-persons.pdf"
        // PDF only - no video
      },
      { 
        title: "Traffic signs", 
        description: "Signs giving orders, warning signs, direction signs, information signs and road works signs", 
        fileSize: "7.0 MB", 
        filePath: "/course-materials/standard/day-2/know-your-traffic-signs-dft.pdf",
        downloadPath: "/course-materials/standard/day-2/know-your-traffic-signs-dft.pdf",
        videoPath: "/course-materials/standard/day-2/videos/road-signs-video.mp4"
      },
      { 
        title: "Road markings", 
        description: "Across the carriageway, along the carriageway, at the edge and other markings", 
        fileSize: "785 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-road-markings.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-road-markings.pdf"
        // PDF only - no video
      },
      { 
        title: "Vehicle markings", 
        description: "Large goods vehicle rear markings, hazard warning plates, projection markers and other markings", 
        fileSize: "537 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-vehicle-markings.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-vehicle-markings.pdf"
        // PDF only - no video
      }
    ],
    odtWordNotes: [
      { title: "Day 2 ODT Notes", description: "ODT/Word format notes for Day 2", fileSize: "1.8 MB", path: "standard package/day 2/day2-notes.odt" }
    ],
    videos: [
      { title: "Day 2 Video Lesson", description: "Video explanation for Day 2 content", duration: "18:45", embedUrl: null, path: "standard package/day 2/day2-video.mp4" }
    ],
    flashcards: [
      { title: "Day 2 Flashcards", description: "Flashcards for Day 2 topics", count: "30 cards", path: "standard package/day 2/day2-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 2 Quiz",
      description: "Test your knowledge with Day 2 quiz",
      questions: 10,
      path: "standard package/day 2/day2-quiz.json"
    },
    downloadableResources: [
      { title: "Day 2 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 2/day2-summary.pdf" }
    ],
    liveSupport: {
      title: "Day 2 Live Support",
      description: "Live support session for Day 2 (if applicable)",
      available: false
    }
  },
  3: {
    day: 3,
    title: "Day 3: Safety of the Vehicle and Safety Margins",
    pdfNotes: [
      { 
        title: "Driving in adverse weather conditions (Rules 226 to 237)", 
        description: "Wet weather, icy and snowy weather, windy weather, fog and hot weather", 
        fileSize: "570 KB", 
        filePath: "/course-materials/standard/day-3/Driving in Adverse Weather (Rules 226–237).pdf",
        downloadPath: "/course-materials/standard/day-3/Driving in Adverse Weather (Rules 226–237).pdf",
        videoPath: "/course-materials/standard/day-3/videos/weather-226-to-237.mp4"
      },
      { 
        title: "Annex 6 – Vehicle maintenance, safety and security", 
        description: "Vehicle checks, maintenance schedules, safety systems and vehicle security", 
        fileSize: "60 KB", 
        filePath: "/course-materials/standard/day-3/annex 6.pdf",
        downloadPath: "/course-materials/standard/day-3/annex 6.pdf"
        // PDF only - no video
      },
      { 
        title: "Safety and your vehicle", 
        description: "Vehicle safety checks and maintenance", 
        fileSize: "261 KB", 
        filePath: "/course-materials/standard/day-3/safety and your vehicle.pdf",
        downloadPath: "/course-materials/standard/day-3/safety and your vehicle.pdf"
        // PDF only - no video
      },
      { 
        title: "Safety margins", 
        description: "Safety margins and defensive driving techniques", 
        fileSize: "100 KB", 
        filePath: "/course-materials/standard/day-3/Part five Safety Margins.pdf",
        downloadPath: "/course-materials/standard/day-3/Part five Safety Margins.pdf"
        // PDF only - no video
      }
    ],
    odtWordNotes: [
      { title: "Day 3 ODT Notes", description: "ODT/Word format notes for Day 3", fileSize: "1.8 MB", path: "standard package/day 3/day3-notes.odt" }
    ],
    videos: [
      { title: "Day 3 Video Lesson", description: "Video explanation for Day 3 content", duration: "20:15", embedUrl: null, path: "standard package/day 3/day3-video.mp4" }
    ],
    flashcards: [
      { title: "Day 3 Flashcards", description: "Flashcards for Day 3 topics", count: "28 cards", path: "standard package/day 3/day3-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 3 Quiz",
      description: "Test your knowledge with Day 3 quiz",
      questions: 10,
      path: "standard package/day 3/day3-quiz.json"
    },
    downloadableResources: [
      { title: "Day 3 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 3/day3-summary.pdf" }
    ],
    liveSupport: {
      title: "Day 3 Live Support",
      description: "Live support session for Day 3 (if applicable)",
      available: false
    }
  },
  4: {
    day: 4,
    title: "Day 4: Hazard Awareness and Vulnerable Road Users",
    pdfNotes: [
      { 
        title: "Using the road (Rules 159 to 203)", 
        description: "General rules, overtaking, road junctions, roundabouts, pedestrian crossings and reversing", 
        fileSize: "2.8 MB", 
        filePath: "/course-materials/standard/day-4/Using the road (159 to 203).pdf",
        downloadPath: "/course-materials/standard/day-4/Using the road (159 to 203).pdf",
        videoPath: "/course-materials/standard/day-4/videos/using-the-road-159-to-203.mp4"
      },
      { 
        title: "Road users requiring extra care (Rules 204 to 225)", 
        description: "Pedestrians, motorcyclists and cyclists, horses and other animals, children, older and disabled people and other vulnerable road users", 
        fileSize: "954 KB", 
        filePath: "/course-materials/standard/day-4/Road users requiring extra care (204 to 225).pdf",
        downloadPath: "/course-materials/standard/day-4/Road users requiring extra care (204 to 225).pdf",
        videoPath: "/course-materials/standard/day-4/videos/road-users-extra-care-204-to-225.mp4"
      },
      { 
        title: "Hazard awareness", 
        description: "Developing hazard awareness skills", 
        fileSize: "77 KB", 
        filePath: "/course-materials/standard/day-4/Part sixHazard Awareness.pdf",
        downloadPath: "/course-materials/standard/day-4/Part sixHazard Awareness.pdf"
        // PDF only - no video
      },
      { 
        title: "Vulnerable road users", 
        description: "Safety for vulnerable road users", 
        fileSize: "177 KB", 
        filePath: "/course-materials/standard/day-4/Part seven Vulnerable Road Users.pdf",
        downloadPath: "/course-materials/standard/day-4/Part seven Vulnerable Road Users.pdf"
        // PDF only - no video
      }
    ],
    odtWordNotes: [
      { title: "Day 4 ODT Notes", description: "ODT/Word format notes for Day 4", fileSize: "1.8 MB", path: "standard package/day 4/day4-notes.odt" }
    ],
    videos: [
      { title: "Day 4 Video Lesson", description: "Video explanation for Day 4 content", duration: "22:30", embedUrl: null, path: "standard package/day 4/day4-video.mp4" }
    ],
    flashcards: [
      { title: "Day 4 Flashcards", description: "Flashcards for Day 4 topics", count: "32 cards", path: "standard package/day 4/day4-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 4 Quiz",
      description: "Test your knowledge with Day 4 quiz",
      questions: 10,
      path: "standard package/day 4/day4-quiz.json"
    },
    downloadableResources: [
      { title: "Day 4 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 4/day4-summary.pdf" }
    ],
    liveSupport: {
      title: "Day 4 Live Support",
      description: "Live support session for Day 4 (if applicable)",
      available: false
    }
  },
  5: {
    day: 5,
    title: "Day 5: Other Vehicles and Vehicle Handling",
    pdfNotes: [
      { 
        title: "Waiting and parking (Rules 238 to 252)", 
        description: "General parking rules, parking at night, visibility and enforcement", 
        fileSize: "596 KB", 
        filePath: "/course-materials/standard/day-5/Waiting and parking (238 to 252).pdf",
        downloadPath: "/course-materials/standard/day-5/Waiting and parking (238 to 252).pdf",
        videoPath: "/course-materials/standard/day-5/videos/waiting-and-parking-238-to-252.mp4"
      },
      { 
        title: "Annex 1 – You and your bicycle", 
        description: "Information and rules about you and your bicycle", 
        fileSize: "88 KB", 
        filePath: "/course-materials/standard/day-5/annex 1 and 2.pdf",
        downloadPath: "/course-materials/standard/day-5/annex 1 and 2.pdf"
        // PDF only - no video (Annex 1 is part of annex 1 and 2 PDF)
      },
      { 
        title: "Annex 2 – Motorcycle licence requirements", 
        description: "Information and rules on motorcycle licence categories and progression", 
        fileSize: "88 KB", 
        filePath: "/course-materials/standard/day-5/annex 1 and 2.pdf",
        downloadPath: "/course-materials/standard/day-5/annex 1 and 2.pdf"
        // PDF only - no video (Annex 2 is part of annex 1 and 2 PDF)
      },
      { 
        title: "Other types of vehicles", 
        description: "Rules for other vehicle types", 
        fileSize: "79 KB", 
        filePath: "/course-materials/standard/day-5/Other Types of Vehicles.pdf",
        downloadPath: "/course-materials/standard/day-5/Other Types of Vehicles.pdf"
        // PDF only - no video
      },
      { 
        title: "Vehicle handling", 
        description: "Vehicle handling techniques", 
        fileSize: "202 KB", 
        filePath: "/course-materials/standard/day-5/Part ten Vehicle Handling.pdf",
        downloadPath: "/course-materials/standard/day-5/Part ten Vehicle Handling.pdf"
        // PDF only - no video
      }
    ],
    odtWordNotes: [
      { title: "Day 5 ODT Notes", description: "ODT/Word format notes for Day 5", fileSize: "1.8 MB", path: "standard package/day 5/day5-notes.odt" }
    ],
    videos: [
      { title: "Day 5 Video Lesson", description: "Video explanation for Day 5 content", duration: "19:20", embedUrl: null, path: "standard package/day 5/day5-video.mp4" }
    ],
    flashcards: [
      { title: "Day 5 Flashcards", description: "Flashcards for Day 5 topics", count: "27 cards", path: "standard package/day 5/day5-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 5 Quiz",
      description: "Test your knowledge with Day 5 quiz",
      questions: 10,
      path: "standard package/day 5/day5-quiz.json"
    },
    downloadableResources: [
      { title: "Day 5 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 5/day5-summary.pdf" }
    ],
    liveSupport: {
      title: "Day 5 Live Support",
      description: "Live support session for Day 5 (if applicable)",
      available: false
    }
  },
  6: {
    day: 6,
    title: "Day 6: Motorway Rules and Essential Documents",
    pdfNotes: [
      { 
        title: "Motorways (Rules 253 to 274)", 
        description: "Motorway signals, joining, driving on the motorway, lane discipline, overtaking, stopping and leaving the motorway", 
        fileSize: "1.1 MB", 
        filePath: "/course-materials/standard/day-6/Motorways (253 to 274).pdf",
        downloadPath: "/course-materials/standard/day-6/Motorways (253 to 274).pdf",
        videoPath: "/course-materials/standard/day-6/videos/motorways-253-to-274.mp4"
      },
      { 
        title: "Annex 3 – Motor vehicle documentation and learner driver requirements", 
        description: "Documents required, tax, MOT, insurance, learner driver rules", 
        fileSize: "134 KB", 
        filePath: "/course-materials/standard/day-6/Essential documents.pdf",
        downloadPath: "/course-materials/standard/day-6/Essential documents.pdf"
        // PDF only - no video
      },
      { 
        title: "Annex 5 – Penalties", 
        description: "Penalty points, disqualification, the penalty table, new drivers and other consequences of offending", 
        fileSize: "237 KB", 
        filePath: "/course-materials/standard/day-6/summary Motorway Rules.pdf",
        downloadPath: "/course-materials/standard/day-6/summary Motorway Rules.pdf"
        // PDF only - no video
      }
    ],
    odtWordNotes: [
      { title: "Day 6 ODT Notes", description: "ODT/Word format notes for Day 6", fileSize: "1.8 MB", path: "standard package/day 6/day6-notes.odt" }
    ],
    videos: [
      { title: "Day 6 Video Lesson", description: "Video explanation for Day 6 content", duration: "25:00", embedUrl: null, path: "standard package/day 6/day6-video.mp4" }
    ],
    flashcards: [
      { title: "Day 6 Complete Flashcards Set", description: "All flashcards for Day 6", count: "50+ cards", path: "standard package/day 6/day6-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 6 Quiz",
      description: "Test your knowledge with Day 6 quiz",
      questions: 15,
      path: "standard package/day 6/day6-quiz.json"
    },
    downloadableResources: [
      { title: "Day 6 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 6/day6-summary.pdf" },
      { title: "Day 6 Final Review", description: "Complete review materials", fileSize: "1.2 MB", path: "standard package/day 6/day6-review.pdf" }
    ],
    liveSupport: {
      title: "Day 6 Live Support",
      description: "Live support session for Day 6 (if applicable)",
      available: false
    }
  },
  7: {
    day: 7,
    title: "Day 7: Incidents, Emergencies and Vehicle Loading",
    pdfNotes: [
      { 
        title: "Breakdowns and incidents (Rules 275 to 287)", 
        description: "Breakdowns on all roads and motorways, obstructions, incidents, incidents involving dangerous goods and documents", 
        fileSize: "911 KB", 
        filePath: "/course-materials/standard/day-7/Breakdowns and incidents (275 to 287).pdf",
        downloadPath: "/course-materials/standard/day-7/Breakdowns and incidents (275 to 287).pdf",
        videoPath: "/course-materials/standard/day-7/videos/breakdowns-and-incidents-275-to-287.mp4"
      },
      { 
        title: "Road works, level crossings and tramways (Rules 288 to 307)", 
        description: "Rules at road works, on motorways and other high-speed roads, level crossings and tramways", 
        fileSize: "346 KB", 
        filePath: "/course-materials/standard/day-7/Road works, level crossings and tramways (288 to 307).pdf",
        downloadPath: "/course-materials/standard/day-7/Road works, level crossings and tramways (288 to 307).pdf",
        videoPath: "/course-materials/standard/day-7/videos/adas-system.mp4"
      },
      { 
        title: "Annex 7 – First aid on the road", 
        description: "Dealing with danger, getting help, helping those involved and providing emergency care", 
        fileSize: "274 KB", 
        filePath: "/course-materials/standard/day-7/AED_QA_Flashcards_UK.pdf",
        downloadPath: "/course-materials/standard/day-7/AED_QA_Flashcards_UK.pdf"
        // PDF only - no video
      }
    ],
    odtWordNotes: [
      { title: "Day 7 ODT Notes", description: "ODT/Word format notes for Day 7", fileSize: "1.8 MB", path: "standard package/day 7/day7-notes.odt" }
    ],
    videos: [
      { title: "Day 7 Video Lesson", description: "Video explanation for Day 7 content", duration: "28:45", embedUrl: null, path: "standard package/day 7/day7-video.mp4" }
    ],
    flashcards: [
      { title: "Day 7 Complete Flashcards Set", description: "All flashcards for Day 7", count: "60+ cards", path: "standard package/day 7/day7-flashcards.pdf" }
    ],
    quiz: {
      title: "Day 7 Final Quiz",
      description: "Final quiz to test all knowledge",
      questions: 20,
      path: "standard package/day 7/day7-quiz.json"
    },
    downloadableResources: [
      { title: "Day 7 Summary Sheet", description: "Quick reference summary", fileSize: "0.5 MB", path: "standard package/day 7/day7-summary.pdf" },
      { title: "Day 7 Final Review", description: "Complete final review materials", fileSize: "1.5 MB", path: "standard package/day 7/day7-review.pdf" }
    ],
    liveSupport: {
      title: "Day 7 Live Support Session",
      description: "Final live support session (if applicable)",
      available: false
    }
  }
};
