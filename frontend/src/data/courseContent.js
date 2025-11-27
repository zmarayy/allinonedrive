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
    title: "Day 1",
    pdfNotes: [
      { 
        title: "Rules for Pedestrians (1-35)", 
        description: "PDF notes covering rules for pedestrians", 
        fileSize: "1.6 MB", 
        filePath: "/course-materials/standard/day-1/rules-pedestrians-1-35.pdf",
        downloadPath: "/course-materials/standard/day-1/rules-pedestrians-1-35.pdf",
        videoPath: "/course-materials/standard/day-1/videos/rule-1-to-17.mp4" // Primary video, may need additional videos
      },
      { 
        title: "Rules for Drivers and Motorcyclists (89-102)", 
        description: "PDF notes for drivers and motorcyclists", 
        fileSize: "665 KB", 
        filePath: "/course-materials/standard/day-1/rules-drivers-motorcyclists-89-102.pdf",
        downloadPath: "/course-materials/standard/day-1/rules-drivers-motorcyclists-89-102.pdf",
        videoPath: "/course-materials/standard/day-1/videos/drivers-motorcyclists-89-102.mp4"
      },
      { 
        title: "Rules for Cyclists (59-82)", 
        description: "PDF notes covering rules for cyclists", 
        fileSize: "506 KB", 
        filePath: "/course-materials/standard/day-1/rules-cyclists-59-82.pdf",
        downloadPath: "/course-materials/standard/day-1/rules-cyclists-59-82.pdf",
        videoPath: "/course-materials/standard/day-1/videos/rule-59-to-82-cyclist.mp4"
      },
      { 
        title: "Animals (47-58)", 
        description: "PDF notes about animals on the road", 
        fileSize: "377 KB", 
        filePath: "/course-materials/standard/day-1/animals-47-58.pdf",
        downloadPath: "/course-materials/standard/day-1/animals-47-58.pdf",
        videoPath: "/course-materials/standard/day-1/videos/animals-47-58.mp4"
      },
      { 
        title: "Summary of Rules H1 to 3", 
        description: "Summary notes for rules H1 to 3", 
        fileSize: "67 KB", 
        filePath: "/course-materials/standard/day-1/summary-rules-h1-3.pdf",
        downloadPath: "/course-materials/standard/day-1/summary-rules-h1-3.pdf",
        videoPath: "/course-materials/standard/day-1/videos/hierarchy-1-to-3.mp4"
      },
      { 
        title: "Part One - Alertness on the Road", 
        description: "Alertness and awareness on the road", 
        fileSize: "90 KB", 
        filePath: "/course-materials/standard/day-1/part-one-alertness.pdf",
        downloadPath: "/course-materials/standard/day-1/part-one-alertness.pdf",
        videoPath: "/course-materials/standard/day-1/videos/eds-alertness.mp4"
      },
      { 
        title: "Part Two - Attitude", 
        description: "Attitude while driving", 
        fileSize: "65 KB", 
        filePath: "/course-materials/standard/day-1/part-two-attitude.pdf",
        downloadPath: "/course-materials/standard/day-1/part-two-attitude.pdf",
        videoPath: "/course-materials/standard/day-1/videos/eds-attitude.mp4"
      },
      { 
        title: "Annex 8", 
        description: "Annex 8 reference material", 
        fileSize: "47 KB", 
        filePath: "/course-materials/standard/day-1/annex-8.pdf",
        downloadPath: "/course-materials/standard/day-1/annex-8.pdf",
        videoPath: "/course-materials/standard/day-1/videos/annex-8.mp4"
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
    title: "Day 2",
    pdfNotes: [
      { 
        title: "Know Your Traffic Signs (DFT)", 
        description: "Official guide to traffic signs", 
        fileSize: "7.0 MB", 
        filePath: "/course-materials/standard/day-2/know-your-traffic-signs-dft.pdf",
        downloadPath: "/course-materials/standard/day-2/know-your-traffic-signs-dft.pdf",
        videoPath: "/course-materials/standard/day-2/videos/road-signs-video.mp4"
      },
      { 
        title: "Traffic Signs - Easy Explanation", 
        description: "Easy to understand traffic signs guide", 
        fileSize: "461 KB", 
        filePath: "/course-materials/standard/day-2/traffic signs easy explanation.pdf",
        downloadPath: "/course-materials/standard/day-2/traffic signs easy explanation.pdf"
      },
      { 
        title: "The Highway Code - Traffic Signs", 
        description: "Official traffic signs from Highway Code", 
        fileSize: "831 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-traffic-signs.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-traffic-signs.pdf"
      },
      { 
        title: "The Highway Code - Road Markings", 
        description: "Road markings guide from Highway Code", 
        fileSize: "785 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-road-markings.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-road-markings.pdf"
      },
      { 
        title: "The Highway Code - Light Signals Controlling Traffic", 
        description: "Traffic light signals guide", 
        fileSize: "104 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-light-signals-controlling-traffic.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-light-signals-controlling-traffic.pdf"
      },
      { 
        title: "The Highway Code - Signals by Authorised Persons", 
        description: "Signals from police and other authorised persons", 
        fileSize: "469 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-signals-by-authorised-persons.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-signals-by-authorised-persons.pdf"
      },
      { 
        title: "The Highway Code - Signals to Other Road Users", 
        description: "How to signal to other road users", 
        fileSize: "100 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-signals-to-other-road-users.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-signals-to-other-road-users.pdf"
      },
      { 
        title: "The Highway Code - Vehicle Markings", 
        description: "Vehicle markings and identification", 
        fileSize: "537 KB", 
        filePath: "/course-materials/standard/day-2/the-highway-code-vehicle-markings.pdf",
        downloadPath: "/course-materials/standard/day-2/the-highway-code-vehicle-markings.pdf"
      },
      { 
        title: "General Rules, Techniques and Advice (103-158)", 
        description: "General rules and techniques for all drivers and riders", 
        fileSize: "1.9 MB", 
        filePath: "/course-materials/standard/day-2/General rules, techniques and advice for all drivers and riders (103 to 158).pdf",
        downloadPath: "/course-materials/standard/day-2/General rules, techniques and advice for all drivers and riders (103 to 158).pdf",
        videoPath: "/course-materials/standard/day-2/videos/rules-103-to-125.mp4"
      },
      { 
        title: "Motorcyclists (83-88)", 
        description: "Rules specifically for motorcyclists", 
        fileSize: "301 KB", 
        filePath: "/course-materials/standard/day-2/motorcyclists 83-88.pdf",
        downloadPath: "/course-materials/standard/day-2/motorcyclists 83-88.pdf",
        videoPath: "/course-materials/standard/day-2/videos/motorcyclists-83-88.mp4"
      },
      { 
        title: "Rules 36 to 46", 
        description: "Rules 36 to 46 from Highway Code", 
        fileSize: "222 KB", 
        filePath: "/course-materials/standard/day-2/rules 36 to 46 pdf marked.pdf",
        downloadPath: "/course-materials/standard/day-2/rules 36 to 46 pdf marked.pdf",
        videoPath: "/course-materials/standard/day-2/videos/powered-wheelchairs-36-46.mp4"
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
    title: "Day 3",
    pdfNotes: [
      { 
        title: "Driving in Adverse Weather (Rules 226-237)", 
        description: "Rules and guidance for driving in adverse weather conditions", 
        fileSize: "570 KB", 
        filePath: "/course-materials/standard/day-3/Driving in Adverse Weather (Rules 226–237).pdf",
        downloadPath: "/course-materials/standard/day-3/Driving in Adverse Weather (Rules 226–237).pdf"
      },
      { 
        title: "Safety and Your Vehicle", 
        description: "Vehicle safety checks and maintenance", 
        fileSize: "261 KB", 
        filePath: "/course-materials/standard/day-3/safety and your vehicle.pdf",
        downloadPath: "/course-materials/standard/day-3/safety and your vehicle.pdf"
      },
      { 
        title: "Part Five - Safety Margins", 
        description: "Safety margins and defensive driving techniques", 
        fileSize: "100 KB", 
        filePath: "/course-materials/standard/day-3/Part five Safety Margins.pdf",
        downloadPath: "/course-materials/standard/day-3/Part five Safety Margins.pdf"
      },
      { 
        title: "Annex 6", 
        description: "Annex 6 reference material", 
        fileSize: "60 KB", 
        filePath: "/course-materials/standard/day-3/annex 6.pdf",
        downloadPath: "/course-materials/standard/day-3/annex 6.pdf"
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
    title: "Day 4",
    pdfNotes: [
      { 
        title: "Using the Road (159-203)", 
        description: "Complete guide to using the road", 
        fileSize: "2.8 MB", 
        filePath: "/course-materials/standard/day-4/Using the road (159 to 203).pdf",
        downloadPath: "/course-materials/standard/day-4/Using the road (159 to 203).pdf"
      },
      { 
        title: "Road Users Requiring Extra Care (204-225)", 
        description: "Guidance for vulnerable road users", 
        fileSize: "954 KB", 
        filePath: "/course-materials/standard/day-4/Road users requiring extra care (204 to 225).pdf",
        downloadPath: "/course-materials/standard/day-4/Road users requiring extra care (204 to 225).pdf"
      },
      { 
        title: "Part Seven - Vulnerable Road Users", 
        description: "Safety for vulnerable road users", 
        fileSize: "177 KB", 
        filePath: "/course-materials/standard/day-4/Part seven Vulnerable Road Users.pdf",
        downloadPath: "/course-materials/standard/day-4/Part seven Vulnerable Road Users.pdf"
      },
      { 
        title: "Part Six - Hazard Awareness", 
        description: "Developing hazard awareness skills", 
        fileSize: "77 KB", 
        filePath: "/course-materials/standard/day-4/Part sixHazard Awareness.pdf",
        downloadPath: "/course-materials/standard/day-4/Part sixHazard Awareness.pdf"
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
    title: "Day 5",
    pdfNotes: [
      { 
        title: "Waiting and Parking (238-252)", 
        description: "Rules for waiting and parking", 
        fileSize: "596 KB", 
        filePath: "/course-materials/standard/day-5/Waiting and parking (238 to 252).pdf",
        downloadPath: "/course-materials/standard/day-5/Waiting and parking (238 to 252).pdf"
      },
      { 
        title: "Part Ten - Vehicle Handling", 
        description: "Vehicle handling techniques", 
        fileSize: "202 KB", 
        filePath: "/course-materials/standard/day-5/Part ten Vehicle Handling.pdf",
        downloadPath: "/course-materials/standard/day-5/Part ten Vehicle Handling.pdf"
      },
      { 
        title: "Part Nine - Vehicle and Motorcycle Handling", 
        description: "Handling vehicles and motorcycles", 
        fileSize: "100 KB", 
        filePath: "/course-materials/standard/day-5/Part nine Vehicle and Motorcycle Handling.pdf",
        downloadPath: "/course-materials/standard/day-5/Part nine Vehicle and Motorcycle Handling.pdf"
      },
      { 
        title: "General Rules, Techniques and Advice", 
        description: "General rules for all drivers and riders", 
        fileSize: "123 KB", 
        filePath: "/course-materials/standard/day-5/General rules, techniques and advice for all drivers and riders.pdf",
        downloadPath: "/course-materials/standard/day-5/General rules, techniques and advice for all drivers and riders.pdf"
      },
      { 
        title: "Other Types of Vehicles", 
        description: "Rules for other vehicle types", 
        fileSize: "79 KB", 
        filePath: "/course-materials/standard/day-5/Other Types of Vehicles.pdf",
        downloadPath: "/course-materials/standard/day-5/Other Types of Vehicles.pdf"
      },
      { 
        title: "Annex 1 and 2", 
        description: "Annex 1 and 2 reference material", 
        fileSize: "88 KB", 
        filePath: "/course-materials/standard/day-5/annex 1 and 2.pdf",
        downloadPath: "/course-materials/standard/day-5/annex 1 and 2.pdf"
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
    title: "Day 6",
    pdfNotes: [
      { 
        title: "Motorways (253-274)", 
        description: "Complete guide to motorway driving", 
        fileSize: "1.1 MB", 
        filePath: "/course-materials/standard/day-6/Motorways (253 to 274).pdf",
        downloadPath: "/course-materials/standard/day-6/Motorways (253 to 274).pdf"
      },
      { 
        title: "Summary - Motorway Rules", 
        description: "Summary of motorway rules", 
        fileSize: "237 KB", 
        filePath: "/course-materials/standard/day-6/summary Motorway Rules.pdf",
        downloadPath: "/course-materials/standard/day-6/summary Motorway Rules.pdf"
      },
      { 
        title: "Essential Documents", 
        description: "Essential documents you need", 
        fileSize: "134 KB", 
        filePath: "/course-materials/standard/day-6/Essential documents.pdf",
        downloadPath: "/course-materials/standard/day-6/Essential documents.pdf"
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
    title: "Day 7",
    pdfNotes: [
      { 
        title: "Breakdowns and Incidents (275-287)", 
        description: "What to do in breakdowns and incidents", 
        fileSize: "911 KB", 
        filePath: "/course-materials/standard/day-7/Breakdowns and incidents (275 to 287).pdf",
        downloadPath: "/course-materials/standard/day-7/Breakdowns and incidents (275 to 287).pdf"
      },
      { 
        title: "Road Works, Level Crossings and Tramways (288-307)", 
        description: "Rules for road works and crossings", 
        fileSize: "346 KB", 
        filePath: "/course-materials/standard/day-7/Road works, level crossings and tramways (288 to 307).pdf",
        downloadPath: "/course-materials/standard/day-7/Road works, level crossings and tramways (288 to 307).pdf"
      },
      { 
        title: "AED QA Flashcards (UK)", 
        description: "Flashcards for theory test questions", 
        fileSize: "274 KB", 
        filePath: "/course-materials/standard/day-7/AED_QA_Flashcards_UK.pdf",
        downloadPath: "/course-materials/standard/day-7/AED_QA_Flashcards_UK.pdf"
      },
      { 
        title: "Part Fifteen - Incidents, Accidents and Emergencies", 
        description: "Handling incidents and emergencies", 
        fileSize: "102 KB", 
        filePath: "/course-materials/standard/day-7/Part fiveteen Incidents, Accidents and Emergencies.pdf",
        downloadPath: "/course-materials/standard/day-7/Part fiveteen Incidents, Accidents and Emergencies.pdf"
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
