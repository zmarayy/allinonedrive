import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { saveQuizScore } from '../utils/progressManager';
// DAY_CONTENT import removed - not used in this file
import BottomNavbar from '../components/BottomNavbar';

// Quiz data for all 7 days
const quizData = {
  1: {
    lessonTitle: 'Day 1: Alertness and Attitude',
    sections: {
      alertness: 'Alertness',
      attitude: 'Attitude'
    },
    questions: [
      // Questions 1-28: Alertness
      {
        id: 1,
        question: 'What should you do before making a U-turn?',
        options: [
          'Give an arm signal as well as using your indicators',
          'Check road markings to see that U-turns are permitted',
          'Look over your shoulder for a final check',
          'Select a higher gear than normal'
        ],
        correctAnswer: 2, // Look over your shoulder for a final check
        section: 'alertness'
      },
      {
        id: 2,
        question: 'What should you do as you approach this bridge?',
        options: [
          'Move to the right',
          'Slow down',
          'Change gear',
          'Keep to 30 mph'
        ],
        correctAnswer: 1, // Slow down
        section: 'alertness'
      },
      {
        id: 3,
        question: 'Where should you avoid overtaking?',
        options: [
          'Just after a bend',
          'In a one-way street',
          'On a dual carriageway',
          'Approaching a dip in the road'
        ],
        correctAnswer: 3, // Approaching a dip in the road
        section: 'alertness'
      },
      {
        id: 4,
        question: 'What does this curved arrow road marking mean?',
        options: [
          'Heavy vehicles should take the next road on the left to avoid a weight limit',
          'The road ahead bends to the left',
          'Overtaking traffic should move back to the left',
          'The road ahead has a camber to the left'
        ],
        correctAnswer: 2, // Overtaking traffic should move back to the left
        section: 'alertness'
      },
      {
        id: 5,
        question: 'What should you do if your mobile phone rings while you\'re driving or riding?',
        options: [
          'Stop immediately',
          'Answer it immediately',
          'Leave it until you have stopped in a safe place',
          'Pull up at the nearest kerb'
        ],
        correctAnswer: 2, // Leave it until you have stopped in a safe place
        section: 'alertness'
      },
      {
        id: 6,
        question: 'Why are these yellow lines painted across the road?',
        options: [
          'To help you choose the correct lane',
          'To help you keep the correct separation distance',
          'To make you aware of your speed',
          'To tell you the distance to the roundabout'
        ],
        correctAnswer: 2, // To make you aware of your speed
        section: 'alertness'
      },
      {
        id: 7,
        question: 'What should you do when you\'re approaching traffic lights that have been green for some time?',
        options: [
          'Accelerate hard',
          'Maintain your speed',
          'Be ready to stop',
          'Brake hard'
        ],
        correctAnswer: 2, // Be ready to stop
        section: 'alertness'
      },
      {
        id: 8,
        question: 'What should you do before slowing down or stopping your vehicle?',
        options: [
          'Sound the horn',
          'Use the mirrors',
          'Select a higher gear',
          'Flash the headlights'
        ],
        correctAnswer: 1, // Use the mirrors
        section: 'alertness'
      },
      {
        id: 9,
        question: 'You\'re following a large vehicle. Why should you stay a safe distance behind it?',
        options: [
          'You\'ll be able to corner more quickly',
          'You\'ll help the large vehicle to stop more easily',
          'You\'ll give the driver a chance to see you in their mirrors',
          'You\'ll keep out of the wind better'
        ],
        correctAnswer: 2, // You'll give the driver a chance to see you in their mirrors
        section: 'alertness'
      },
      {
        id: 10,
        question: 'Why should you use your mirrors when you see a hazard ahead?',
        options: [
          'Because you\'ll need to accelerate out of danger',
          'To assess how your actions will affect the traffic behind',
          'Because you\'ll need to brake sharply and stop',
          'To check what\'s happening on the road ahead'
        ],
        correctAnswer: 1, // To assess how your actions will affect the traffic behind
        section: 'alertness'
      },
      {
        id: 11,
        question: 'You\'re waiting to turn right at the end of a road. What should you do if your view is obstructed by parked vehicles?',
        options: [
          'Stop and then move forward slowly and carefully for a clear view',
          'Move quickly to where you can see so you only block traffic from one direction',
          'Wait for a pedestrian to let you know when it\'s safe for you to emerge',
          'Turn your vehicle around immediately and find another junction to use'
        ],
        correctAnswer: 0, // Stop and then move forward slowly and carefully for a clear view
        section: 'alertness'
      },
      {
        id: 12,
        question: 'There are objects hanging from your interior mirror. Why could this be a hazard?',
        options: [
          'Your view could be obstructed',
          'Your sun visor might get tangled',
          'Your radio reception might be affected',
          'Your windscreen could mist up more easily'
        ],
        correctAnswer: 0, // Your view could be obstructed
        section: 'alertness'
      },
      {
        id: 13,
        question: 'You\'re on a long motorway journey. What should you do if you start to feel sleepy?',
        options: [
          'Play some loud music',
          'Stop on the hard shoulder for a rest',
          'Drive faster to complete your journey sooner',
          'Leave the motorway and stop in a safe place'
        ],
        correctAnswer: 3, // Leave the motorway and stop in a safe place
        section: 'alertness'
      },
      {
        id: 14,
        question: 'Why should you switch your headlights on when it first starts to get dark?',
        options: [
          'To make your dials easier to see',
          'So others can see you more easily',
          'So that you blend in with other drivers',
          'Because the street lights are lit'
        ],
        correctAnswer: 1, // So others can see you more easily
        section: 'alertness'
      },
      {
        id: 15,
        question: 'What\'s most likely to distract you while you\'re driving?',
        options: [
          'Using a mobile phone',
          'Using the windscreen wipers',
          'Using the demisters',
          'Using the mirrors'
        ],
        correctAnswer: 0, // Using a mobile phone
        section: 'alertness'
      },
      {
        id: 16,
        question: 'You\'re driving your car. When may you use a hand-held mobile phone?',
        options: [
          'When you\'re receiving a call',
          'When you\'ve parked safely',
          'When you\'re driving at less than 30 mph',
          'When your car has automatic transmission'
        ],
        correctAnswer: 1, // When you've parked safely
        section: 'alertness'
      },
      {
        id: 17,
        question: 'You\'re driving on a wet road. What should you do if you have to stop your vehicle in an emergency?',
        options: [
          'Apply the parking brake and footbrake together',
          'Keep both hands on the steering wheel',
          'Select reverse gear',
          'Give an arm signal'
        ],
        correctAnswer: 1, // Keep both hands on the steering wheel
        section: 'alertness'
      },
      {
        id: 18,
        question: 'What should you do when you move off from behind a parked car?',
        options: [
          'Give a signal after moving off',
          'Look around before moving off',
          'Look around after moving off',
          'Use the exterior mirrors only'
        ],
        correctAnswer: 1, // Look around before moving off
        section: 'alertness'
      },
      {
        id: 19,
        question: 'You\'re travelling along this road. How should you pass the cyclist?',
        options: [
          'Sound your horn as you pass',
          'Keep close to them as you pass',
          'Leave them plenty of room as you pass',
          'Change down one gear before you pass'
        ],
        correctAnswer: 2, // Leave them plenty of room as you pass
        section: 'alertness'
      },
      {
        id: 20,
        question: 'When do windscreen pillars cause a serious obstruction to your view?',
        options: [
          'When you\'re driving on a motorway',
          'When you\'re driving on a dual carriageway',
          'When you\'re approaching a one-way street',
          'When you\'re approaching bends and junctions'
        ],
        correctAnswer: 3, // When you're approaching bends and junctions
        section: 'alertness'
      },
      {
        id: 21,
        question: 'What should you do if you cannot see clearly behind when you\'re reversing?',
        options: [
          'Open the window to look behind',
          'Open the door to look behind',
          'Look in the nearside mirror',
          'Ask someone to guide you'
        ],
        correctAnswer: 3, // Ask someone to guide you
        section: 'alertness'
      },
      {
        id: 22,
        question: 'What does the term \'blind spot\' mean?',
        options: [
          'An area covered by your right-hand mirror',
          'An area not covered by your headlights',
          'An area covered by your left-hand mirror',
          'An area not visible to the driver'
        ],
        correctAnswer: 3, // An area not visible to the driver
        section: 'alertness'
      },
      {
        id: 23,
        question: 'What\'s likely to happen if you use a hands-free phone while you\'re driving?',
        options: [
          'It will improve your safety',
          'It will increase your concentration',
          'It will reduce your view',
          'It will divert your attention'
        ],
        correctAnswer: 3, // It will divert your attention
        section: 'alertness'
      },
      {
        id: 24,
        question: 'You\'re turning right onto a dual carriageway. What should you do before emerging?',
        options: [
          'Stop, apply the parking brake and then select a low gear',
          'Position your vehicle well to the left of the side road',
          'Check that the central reservation is wide enough for your vehicle',
          'Make sure that you leave enough room for a vehicle behind'
        ],
        correctAnswer: 2, // Check that the central reservation is wide enough for your vehicle
        section: 'alertness'
      },
      {
        id: 25,
        question: 'You\'re waiting to emerge from a junction. The windscreen pillar is restricting your view. What should you be particularly aware of?',
        options: [
          'Lorries',
          'Buses',
          'Motorcyclists',
          'Coaches'
        ],
        correctAnswer: 2, // Motorcyclists
        section: 'alertness'
      },
      {
        id: 26,
        question: 'How can you make sure that a satellite navigation (sat nav) system does not distract you when you\'re driving?',
        options: [
          'Turn it off while you\'re driving in built-up areas',
          'Choose a voice that you find calming',
          'Only set the destination when you\'re lost',
          'Set it before starting your journey'
        ],
        correctAnswer: 3, // Set it before starting your journey
        section: 'alertness'
      },
      {
        id: 27,
        question: 'What must you do when the amber light is flashing at a pelican crossing?',
        options: [
          'Stop and wait for the green light',
          'Stop and wait for the red light',
          'Give way to pedestrians waiting to cross',
          'Give way to pedestrians already on the crossing'
        ],
        correctAnswer: 3, // Give way to pedestrians already on the crossing
        section: 'alertness'
      },
      {
        id: 28,
        question: 'Why should you never wave people across at pedestrian crossings?',
        options: [
          'Another vehicle may be coming',
          'They may not be looking',
          'It\'s safer for you to carry on',
          'They may not be ready to cross'
        ],
        correctAnswer: 0, // Another vehicle may be coming
        section: 'alertness'
      },
      // Questions 29-66: Attitude
      {
        id: 29,
        question: 'Why is it dangerous to travel too close to the vehicle ahead?',
        options: [
          'Your engine will overheat',
          'Your mirrors will need adjusting',
          'Your view of the road ahead will be restricted',
          'Your sat nav will be confused'
        ],
        correctAnswer: 2, // Your view of the road ahead will be restricted
        section: 'attitude'
      },
      {
        id: 30,
        question: 'What will happen if you follow this vehicle too closely?',
        options: [
          'Your brakes will overheat',
          'Your fuel consumption will be increased',
          'Your engine will overheat',
          'Your view ahead will be reduced'
        ],
        correctAnswer: 3, // Your view ahead will be reduced
        section: 'attitude'
      },
      {
        id: 31,
        question: 'What\'s the minimum time gap you should leave when following a vehicle on a wet road?',
        options: [
          'One second',
          'Two seconds',
          'Three seconds',
          'Four seconds'
        ],
        correctAnswer: 3, // Four seconds
        section: 'attitude'
      },
      {
        id: 32,
        question: 'You\'re being overtaken by a long, heavily laden lorry. What should you do if it\'s taking a long time for it to overtake?',
        options: [
          'Speed up',
          'Slow down',
          'Hold your speed',
          'Change direction'
        ],
        correctAnswer: 1, // Slow down
        section: 'attitude'
      },
      {
        id: 33,
        question: 'Which vehicle will use a blue flashing beacon?',
        options: [
          'Motorway maintenance',
          'Bomb disposal',
          'Snow plough',
          'Breakdown recovery'
        ],
        correctAnswer: 3, // Breakdown recovery (Emergency vehicles use blue flashing lights)
        section: 'attitude'
      },
      {
        id: 34,
        question: 'What should you do if you\'re being followed by an ambulance showing flashing blue lights?',
        options: [
          'Pull over as soon as it\'s safe to do so',
          'Accelerate hard to get away from it',
          'Maintain your speed and course',
          'Brake harshly and stop well out into the road'
        ],
        correctAnswer: 0, // Pull over as soon as it's safe to do so
        section: 'attitude'
      },
      {
        id: 35,
        question: 'What type of emergency vehicle is fitted with a green flashing beacon?',
        options: [
          'Fire engine',
          'Road gritter',
          'Ambulance',
          'Doctor\'s car'
        ],
        correctAnswer: 3, // Doctor's car
        section: 'attitude'
      },
      {
        id: 36,
        question: 'Who should obey diamond-shaped traffic signs?',
        options: [
          'Tram drivers',
          'Bus drivers',
          'Lorry drivers',
          'Taxi drivers'
        ],
        correctAnswer: 0, // Tram drivers
        section: 'attitude'
      },
      {
        id: 37,
        question: 'On a road where trams operate, which vehicles will be most at risk from the tram rails?',
        options: [
          'Cars',
          'Cycles',
          'Buses',
          'Lorries'
        ],
        correctAnswer: 1, // Cycles
        section: 'attitude'
      },
      {
        id: 38,
        question: 'You\'re in a one-way street and want to turn right. Where should you position your vehicle when there are two lanes?',
        options: [
          'In the right-hand lane',
          'In the left-hand lane',
          'In either lane, depending on the traffic',
          'Just left of the centre line'
        ],
        correctAnswer: 0, // In the right-hand lane
        section: 'attitude'
      },
      {
        id: 39,
        question: 'You wish to turn right ahead. Why should you take up the correct position in good time?',
        options: [
          'To allow other drivers to pull out in front of you',
          'To give a better view into the road that you\'re joining',
          'To help other road users know what you intend to do',
          'To allow drivers to pass you on the right'
        ],
        correctAnswer: 2, // To help other road users know what you intend to do
        section: 'attitude'
      },
      {
        id: 40,
        question: 'Which type of crossing allows cyclists to ride across with pedestrians?',
        options: [
          'Toucan',
          'Puffin',
          'Pelican',
          'Zebra'
        ],
        correctAnswer: 0, // Toucan
        section: 'attitude'
      },
      {
        id: 41,
        question: 'You\'re travelling at the legal speed limit. What should you do if the vehicle behind approaches quickly, flashing its headlights?',
        options: [
          'Accelerate to make a gap behind you',
          'Touch the brakes sharply to show your brake lights',
          'Maintain your speed to prevent the vehicle from overtaking',
          'Allow the vehicle to overtake'
        ],
        correctAnswer: 3, // Allow the vehicle to overtake
        section: 'attitude'
      },
      {
        id: 42,
        question: 'When should you flash your headlights at other road users?',
        options: [
          'When showing that you\'re giving way',
          'When showing that you\'re about to turn',
          'When telling them that you have right of way',
          'When letting them know that you\'re there'
        ],
        correctAnswer: 3, // When letting them know that you're there
        section: 'attitude'
      },
      {
        id: 43,
        question: 'You\'re approaching an unmarked crossroads. How should you deal with the junction?',
        options: [
          'Accelerate and keep to the middle',
          'Slow down and keep to the right',
          'Accelerate and look to the left',
          'Slow down and look both ways'
        ],
        correctAnswer: 3, // Slow down and look both ways
        section: 'attitude'
      },
      {
        id: 44,
        question: 'The conditions are good and dry. When should you use the \'two-second rule\'?',
        options: [
          'Before restarting the engine after it has stalled',
          'When checking your gap from the vehicle in front',
          'Before using the \'Mirrors - Signal - Manoeuvre\' routine',
          'When traffic lights change to green'
        ],
        correctAnswer: 1, // When checking your gap from the vehicle in front
        section: 'attitude'
      },
      {
        id: 45,
        question: 'Which colour follows the green signal at a puffin crossing?',
        options: [
          'Steady red',
          'Flashing amber',
          'Steady amber',
          'Flashing green'
        ],
        correctAnswer: 0, // Steady red (Puffin crossings have no flashing amber phase)
        section: 'attitude'
      },
      {
        id: 46,
        question: 'You\'re in a line of traffic. What action should you take if the driver behind is following very closely?',
        options: [
          'Ignore the driver behind and continue to travel within the speed limit',
          'Slow down, gradually increasing the gap between you and the vehicle in front',
          'Signal left and wave the driver behind to come past',
          'Move over to a position just left of the centre line of the road'
        ],
        correctAnswer: 1, // Slow down, gradually increasing the gap between you and the vehicle in front
        section: 'attitude'
      },
      {
        id: 47,
        question: 'You\'re travelling along a single-track road. There\'s a passing place on your right. What should you do if you see a vehicle coming towards you?',
        options: [
          'Continue along the single-track road',
          'Stop in the passing place',
          'Move over onto the verge',
          'Wait opposite the passing place'
        ],
        correctAnswer: 3, // Wait opposite the passing place
        section: 'attitude'
      },
      {
        id: 48,
        question: 'You\'re driving on a clear night. Which lights should you use if the national speed limit applies and there\'s a steady stream of oncoming traffic?',
        options: [
          'Full-beam headlights',
          'Sidelights',
          'Dipped headlights',
          'Fog lights'
        ],
        correctAnswer: 2, // Dipped headlights
        section: 'attitude'
      },
      {
        id: 49,
        question: 'You\'re driving behind a heavy goods vehicle. What should you do if it signals left but steers to the right?',
        options: [
          'Slow down and let the vehicle turn',
          'Drive on, keeping to the left',
          'Overtake on the right of it',
          'Hold your speed and sound your horn'
        ],
        correctAnswer: 0, // Slow down and let the vehicle turn
        section: 'attitude'
      },
      {
        id: 50,
        question: 'You\'re driving along this road. What should you do if the red car cuts in close in front of you?',
        options: [
          'Accelerate to get closer to the red car',
          'Give a long blast on the horn',
          'Drop back to leave the correct separation distance',
          'Flash your headlights several times'
        ],
        correctAnswer: 2, // Drop back to leave the correct separation distance
        section: 'attitude'
      },
      {
        id: 51,
        question: 'You\'re waiting in a traffic queue at night. How can you avoid dazzling drivers behind you?',
        options: [
          'Use the parking brake and release the footbrake',
          'Keep your foot on the footbrake',
          'Balance the clutch with the accelerator',
          'Use the parking brake and footbrake together'
        ],
        correctAnswer: 0, // Use the parking brake and release the footbrake
        section: 'attitude'
      },
      {
        id: 52,
        question: 'You\'re driving in traffic at the speed limit for the road. What should you do if the driver behind is trying to overtake?',
        options: [
          'Move closer to the car ahead, so the driver behind has no room to overtake',
          'Wave the driver behind to overtake when it\'s safe',
          'Keep a steady course and allow the driver behind to overtake',
          'Accelerate to get away from the driver behind'
        ],
        correctAnswer: 2, // Keep a steady course and allow the driver behind to overtake
        section: 'attitude'
      },
      {
        id: 53,
        question: 'What does it mean if the signs at a bus lane show no times of operation?',
        options: [
          'The lane is not in operation',
          'The lane is only in operation at peak times',
          'The lane is in operation 24 hours a day',
          'The lane is only in operation in daylight hours'
        ],
        correctAnswer: 2, // The lane is in operation 24 hours a day
        section: 'attitude'
      },
      {
        id: 54,
        question: 'What should you do when a person herding sheep asks you to stop?',
        options: [
          'Ignore them as they have no authority',
          'Stop and switch off your engine',
          'Continue on but drive slowly',
          'Try to get past quickly'
        ],
        correctAnswer: 1, // Stop and switch off your engine
        section: 'attitude'
      },
      {
        id: 55,
        question: 'What should you do when you\'re overtaking a horse and rider?',
        options: [
          'Sound your horn as a warning',
          'Go past as quickly as possible',
          'Flash your headlights as a warning',
          'Go past slowly and carefully'
        ],
        correctAnswer: 3, // Go past slowly and carefully
        section: 'attitude'
      },
      {
        id: 56,
        question: 'You\'re approaching a zebra crossing. What should you do if pedestrians are waiting to cross?',
        options: [
          'Give way to older and infirm people only',
          'Slow down and prepare to stop',
          'Use your headlights to indicate they can cross',
          'Wave at them to cross the road'
        ],
        correctAnswer: 1, // Slow down and prepare to stop
        section: 'attitude'
      },
      {
        id: 57,
        question: 'What should you do if a vehicle pulls out in front of you at a junction?',
        options: [
          'Swerve past it and sound your horn',
          'Flash your headlights and drive up close behind',
          'Slow down and be ready to stop',
          'Accelerate past it immediately'
        ],
        correctAnswer: 2, // Slow down and be ready to stop
        section: 'attitude'
      },
      {
        id: 58,
        question: 'Which instrument-panel warning light would show that headlights are on main beam?',
        options: [
          'Blue light',
          'Green light',
          'Amber light',
          'Red light'
        ],
        correctAnswer: 0, // Blue light
        section: 'attitude'
      },
      {
        id: 59,
        question: 'When should you leave a two-second gap between your vehicle and the one in front?',
        options: [
          'When it\'s raining',
          'When it\'s dry',
          'When it\'s icy',
          'When it\'s foggy'
        ],
        correctAnswer: 1, // When it's dry
        section: 'attitude'
      },
      {
        id: 60,
        question: 'You\'re driving at night on an unlit road. What should you do if you\'re following another vehicle?',
        options: [
          'Flash your headlights',
          'Use dipped headlights',
          'Switch off your headlights',
          'Use full-beam headlights'
        ],
        correctAnswer: 1, // Use dipped headlights
        section: 'attitude'
      },
      {
        id: 61,
        question: 'What should you do if you\'re driving a slow-moving vehicle on a narrow winding road?',
        options: [
          'Keep well out to stop vehicles overtaking dangerously',
          'Wave the vehicles behind to come past you if you think they can overtake quickly',
          'Pull in when you can, to let the vehicles behind overtake',
          'Give a left signal when it\'s safe for vehicles to overtake you'
        ],
        correctAnswer: 2, // Pull in when you can, to let the vehicles behind overtake
        section: 'attitude'
      },
      {
        id: 62,
        question: 'You\'re driving a car that has a diesel engine. What can a loose filler cap on your fuel tank cause?',
        options: [
          'It can make the engine difficult to start',
          'It can make the roads slippery for other road users',
          'It can improve your vehicle\'s fuel consumption',
          'It can increase the level of exhaust emissions'
        ],
        correctAnswer: 1, // It can make the roads slippery for other road users
        section: 'attitude'
      },
      {
        id: 63,
        question: 'What should you do to avoid fuel spillage?',
        options: [
          'Check that your tank is only three-quarters full',
          'Check that you\'ve used a locking filler cap',
          'Check that your fuel gauge is working',
          'Check that your filler cap is securely fastened'
        ],
        correctAnswer: 3, // Check that your filler cap is securely fastened
        section: 'attitude'
      },
      {
        id: 64,
        question: 'What style of driving causes increased risk to everyone?',
        options: [
          'Considerate',
          'Defensive',
          'Competitive',
          'Responsible'
        ],
        correctAnswer: 2, // Competitive
        section: 'attitude'
      }
      // Note: Questions 65-66 need to be provided
      // Currently have 64 questions (28 Alertness + 36 Attitude)
      // Need 2 more questions to reach 66 total
    ]
  },
  2: {
    lessonTitle: 'Day 2: Rules of the Road and Traffic Signs',
    sections: {
      rulesOfTheRoad: 'Rules of the Road',
      roadAndTrafficSigns: 'Road and Traffic Signs'
    },
    questions: [
      // Rules of the Road (Q456-522) - 67 questions
      {
        id: 1,
        question: 'What\'s the meaning of this sign?',
        options: [
          'Local speed limit applies',
          'No waiting on the carriageway',
          'National speed limit applies',
          'No entry for vehicles'
        ],
        correctAnswer: 2, // National speed limit applies
        section: 'rulesOfTheRoad'
      },
      {
        id: 2,
        question: 'What\'s the national speed limit for cars and motorcycles on a dual carriageway?',
        options: [
          '30 mph',
          '50 mph',
          '60 mph',
          '70 mph'
        ],
        correctAnswer: 3, // 70 mph
        section: 'rulesOfTheRoad'
      },
      {
        id: 3,
        question: 'There are no speed-limit signs on the road. In England, Scotland and Northern Ireland how is a 30 mph limit generally indicated?',
        options: [
          'By hazard warning lines',
          'By street lighting',
          'By pedestrian islands',
          'By double or single yellow lines'
        ],
        correctAnswer: 1, // By street lighting
        section: 'rulesOfTheRoad'
      },
      {
        id: 4,
        question: 'In England, Scotland and Northern Ireland what will the speed limit usually be where you can see street lights but no speed-limit signs?',
        options: [
          '30 mph',
          '40 mph',
          '50 mph',
          '60 mph'
        ],
        correctAnswer: 0, // 30 mph
        section: 'rulesOfTheRoad'
      },
      {
        id: 5,
        question: 'What does this sign mean?',
        options: [
          'Minimum speed 30 mph',
          'End of maximum speed',
          'End of minimum speed',
          'Maximum speed 30 mph'
        ],
        correctAnswer: 2, // End of minimum speed
        section: 'rulesOfTheRoad'
      },
      {
        id: 6,
        question: 'What should you do if you want to overtake a tractor but are not sure that it\'s safe?',
        options: [
          'Follow another vehicle as it overtakes the tractor',
          'Sound your horn to make the tractor driver pull over',
          'Speed past, flashing your lights at oncoming traffic',
          'Stay behind it if you\'re in any doubt'
        ],
        correctAnswer: 3, // Stay behind it if you're in any doubt
        section: 'rulesOfTheRoad'
      },
      {
        id: 7,
        question: 'Which vehicle is most likely to take an unusual course at a roundabout?',
        options: [
          'Estate car',
          'Taxi',
          'Delivery van',
          'Long vehicle'
        ],
        correctAnswer: 3, // Long vehicle
        section: 'rulesOfTheRoad'
      },
      {
        id: 8,
        question: 'When may you stop on a clearway?',
        options: [
          'Never',
          'When it\'s busy',
          'In the rush hour',
          'During daylight hours'
        ],
        correctAnswer: 0, // Never
        section: 'rulesOfTheRoad'
      },
      {
        id: 9,
        question: 'What\'s the meaning of this sign?',
        options: [
          'No entry',
          'Waiting restrictions',
          'National speed limit',
          'School crossing patrol'
        ],
        correctAnswer: 1, // Waiting restrictions
        section: 'rulesOfTheRoad'
      },
      {
        id: 10,
        question: 'You\'re looking for somewhere to park at night. When may you park on the right-hand side of the road?',
        options: [
          'When you\'re in a one-way street',
          'When you have your sidelights on',
          'When you\'re more than 10 metres (32 feet) from a junction',
          'When you\'re under a lamppost'
        ],
        correctAnswer: 0, // When you're in a one-way street
        section: 'rulesOfTheRoad'
      },
      {
        id: 11,
        question: 'When should you use the right-hand lane of a three-lane dual carriageway?',
        options: [
          'When you\'re overtaking only',
          'When you\'re overtaking or turning right',
          'When you\'re using cruise control',
          'When you\'re turning right only'
        ],
        correctAnswer: 1, // When you're overtaking or turning right
        section: 'rulesOfTheRoad'
      },
      {
        id: 12,
        question: 'You\'re approaching a busy junction. What should you do when, at the last moment, you realise you\'re in the wrong lane?',
        options: [
          'Continue in that lane',
          'Force your way into the lane you need',
          'Stop until the area has cleared',
          'Use arm signals to help you change lane'
        ],
        correctAnswer: 0, // Continue in that lane
        section: 'rulesOfTheRoad'
      },
      {
        id: 13,
        question: 'Where may you overtake on a one-way street?',
        options: [
          'Only on the left-hand side',
          'Overtaking is not allowed',
          'Only on the right-hand side',
          'On either the right or the left'
        ],
        correctAnswer: 3, // On either the right or the left
        section: 'rulesOfTheRoad'
      },
      {
        id: 14,
        question: 'What signal should you give when you\'re going straight ahead at a roundabout?',
        options: [
          'Signal left before leaving the roundabout',
          'Do not signal at any time',
          'Signal right when you\'re approaching the roundabout',
          'Signal left when you\'re approaching the roundabout'
        ],
        correctAnswer: 0, // Signal left before leaving the roundabout
        section: 'rulesOfTheRoad'
      },
      {
        id: 15,
        question: 'Which vehicle might have to take a different course from normal at a roundabout?',
        options: [
          'Sports car',
          'Van',
          'Estate car',
          'Long vehicle'
        ],
        correctAnswer: 3, // Long vehicle
        section: 'rulesOfTheRoad'
      },
      {
        id: 16,
        question: 'When may you enter a box junction?',
        options: [
          'When there are fewer than two vehicles ahead',
          'When signalled by another road user',
          'When your exit road is clear',
          'When traffic signs direct you'
        ],
        correctAnswer: 2, // When your exit road is clear
        section: 'rulesOfTheRoad'
      },
      {
        id: 17,
        question: 'When may you stop and wait in a box junction?',
        options: [
          'When oncoming traffic prevents you from turning right',
          'When you\'re in a queue of traffic turning left',
          'When you\'re in a queue of traffic going ahead',
          'When you\'re on a roundabout'
        ],
        correctAnswer: 0, // When oncoming traffic prevents you from turning right
        section: 'rulesOfTheRoad'
      },
      {
        id: 18,
        question: 'Who is authorised to signal you to stop?',
        options: [
          'A motorcyclist',
          'A pedestrian',
          'A police officer',
          'A bus driver'
        ],
        correctAnswer: 2, // A police officer
        section: 'rulesOfTheRoad'
      },
      {
        id: 19,
        question: 'What should you do if you see a pedestrian waiting at a zebra crossing?',
        options: [
          'Go on quickly before they step onto the crossing',
          'Stop before you reach the zigzag lines and let them cross',
          'Be ready to slow down or stop to let them cross',
          'Ignore them as they\'re still on the pavement'
        ],
        correctAnswer: 2, // Be ready to slow down or stop to let them cross
        section: 'rulesOfTheRoad'
      },
      {
        id: 20,
        question: 'Which road users benefit from toucan crossings?',
        options: [
          'Car drivers and motorcyclists',
          'Cyclists and pedestrians',
          'Bus and lorry drivers',
          'Tram and train drivers'
        ],
        correctAnswer: 1, // Cyclists and pedestrians
        section: 'rulesOfTheRoad'
      },
      {
        id: 21,
        question: 'You\'re waiting at a pelican crossing. What does it mean when the red light changes to flashing amber?',
        options: [
          'Give way to pedestrians on the crossing',
          'Move off immediately without any hesitation',
          'Wait for the green light before moving off',
          'Get ready and go when the continuous amber light shows'
        ],
        correctAnswer: 0, // Give way to pedestrians on the crossing
        section: 'rulesOfTheRoad'
      },
      {
        id: 22,
        question: 'You see these double white lines along the centre of the road. When may you park on the left?',
        options: [
          'If the line nearest to you is broken',
          'When there are no yellow lines',
          'To pick up or set down passengers',
          'During daylight hours only'
        ],
        correctAnswer: 2, // To pick up or set down passengers
        section: 'rulesOfTheRoad'
      },
      {
        id: 23,
        question: 'You\'re turning right at a crossroads. An oncoming driver is also turning right. What\'s the advantage of turning behind the oncoming vehicle?',
        options: [
          'You\'ll have a clearer view of any approaching traffic',
          'You\'ll use less fuel because you can stay in a higher gear',
          'You\'ll have more time to turn',
          'You\'ll be able to turn without stopping'
        ],
        correctAnswer: 0, // You'll have a clearer view of any approaching traffic
        section: 'rulesOfTheRoad'
      },
      {
        id: 24,
        question: 'You\'re travelling along a residential street. There are parked vehicles on the left-hand side. Why should you keep your speed down?',
        options: [
          'So that oncoming traffic can see you more clearly',
          'You may set off car alarms',
          'There may be delivery lorries on the street',
          'Children may run out from between the vehicles'
        ],
        correctAnswer: 3, // Children may run out from between the vehicles
        section: 'rulesOfTheRoad'
      },
      {
        id: 25,
        question: 'What should you do when there\'s an obstruction on your side of the road?',
        options: [
          'Carry on, as you have priority',
          'Give way to oncoming traffic',
          'Wave oncoming vehicles through',
          'Accelerate to get past first'
        ],
        correctAnswer: 1, // Give way to oncoming traffic
        section: 'rulesOfTheRoad'
      },
      {
        id: 26,
        question: 'When would you use the right-hand lane of a two-lane dual carriageway?',
        options: [
          'When you\'re turning right or overtaking',
          'When you\'re passing a side road on the left',
          'When you\'re staying at the minimum allowed speed',
          'When you\'re travelling at a constant high speed'
        ],
        correctAnswer: 0, // When you're turning right or overtaking
        section: 'rulesOfTheRoad'
      },
      {
        id: 27,
        question: 'Who has priority at an unmarked crossroads?',
        options: [
          'The larger vehicle',
          'No-one has priority',
          'The faster vehicle',
          'The smaller vehicle'
        ],
        correctAnswer: 1, // No-one has priority
        section: 'rulesOfTheRoad'
      },
      {
        id: 28,
        question: 'What\'s the nearest you may park to a junction?',
        options: [
          '10 metres (32 feet)',
          '12 metres (39 feet)',
          '15 metres (49 feet)',
          '20 metres (66 feet)'
        ],
        correctAnswer: 0, // 10 metres (32 feet)
        section: 'rulesOfTheRoad'
      },
      {
        id: 29,
        question: 'You\'re looking for somewhere to safely park your vehicle. Where would you choose to park?',
        options: [
          'At or near a bus stop',
          'In a designated parking space',
          'Near the brow of a hill',
          'On the approach to a level crossing'
        ],
        correctAnswer: 1, // In a designated parking space
        section: 'rulesOfTheRoad'
      },
      {
        id: 30,
        question: 'You\'re waiting at a level crossing. What must you do if a train passes but the lights keep flashing?',
        options: [
          'Carry on waiting',
          'Phone the signal operator',
          'Edge over the stop line and look for trains',
          'Park and investigate'
        ],
        correctAnswer: 0, // Carry on waiting
        section: 'rulesOfTheRoad'
      },
      {
        id: 31,
        question: 'What does this sign mean?',
        options: [
          'No through road',
          'End of traffic-calming zone',
          'Free-parking zone ends',
          'End of controlled parking zone'
        ],
        correctAnswer: 3, // End of controlled parking zone
        section: 'rulesOfTheRoad'
      },
      {
        id: 32,
        question: 'What must you do if you come across roadworks that have a temporary speed limit displayed?',
        options: [
          'Obey the speed limit',
          'Obey the limit, but only during rush hour',
          'Ignore the displayed limit',
          'Use your own judgement; the limit is only advisory'
        ],
        correctAnswer: 0, // Obey the speed limit
        section: 'rulesOfTheRoad'
      },
      {
        id: 33,
        question: 'You\'re in a built-up area at night and the road is well lit. Why should you use dipped headlights?',
        options: [
          'So that you can see further along the road',
          'So that you can go at a much faster speed',
          'So that you can switch to main beam quickly',
          'So that you can be easily seen by others'
        ],
        correctAnswer: 3, // So that you can be easily seen by others
        section: 'rulesOfTheRoad'
      },
      {
        id: 34,
        question: 'You\'re turning right onto a dual carriageway. What should you do if the central reservation is too narrow to contain your vehicle?',
        options: [
          'Proceed to the central reservation and wait',
          'Wait until the road is clear in both directions',
          'Stop in the first lane so that other vehicles give way',
          'Emerge slightly to show your intentions'
        ],
        correctAnswer: 1, // Wait until the road is clear in both directions
        section: 'rulesOfTheRoad'
      },
      {
        id: 35,
        question: 'What\'s the national speed limit on a single carriageway road for cars and motorcycles?',
        options: [
          '30 mph',
          '50 mph',
          '60 mph',
          '70 mph'
        ],
        correctAnswer: 2, // 60 mph
        section: 'rulesOfTheRoad'
      },
      {
        id: 36,
        question: 'What should you do when you park at night on a road that has a 40 mph speed limit?',
        options: [
          'Park facing the traffic',
          'Leave parking lights switched on',
          'Leave dipped headlights switched on',
          'Park near a street light'
        ],
        correctAnswer: 1, // Leave parking lights switched on
        section: 'rulesOfTheRoad'
      },
      {
        id: 37,
        question: 'Where will you see these red and white markers?',
        options: [
          'Approaching the end of a motorway',
          'Approaching a concealed level crossing',
          'Approaching a concealed speed-limit sign',
          'Approaching the end of a dual carriageway'
        ],
        correctAnswer: 1, // Approaching a concealed level crossing
        section: 'rulesOfTheRoad'
      },
      {
        id: 38,
        question: 'You\'re travelling on a motorway in England. When must you stop your vehicle?',
        options: [
          'When signalled to stop by a roadworks supervisor',
          'When signalled to stop by a traffic officer',
          'When signalled to stop by a pedestrian on the hard shoulder',
          'When signalled to stop by a driver who has broken down'
        ],
        correctAnswer: 1, // When signalled to stop by a traffic officer
        section: 'rulesOfTheRoad'
      },
      {
        id: 39,
        question: 'How should you signal if you\'re going straight ahead at a roundabout?',
        options: [
          'Signal right on the approach and then left to leave the roundabout',
          'Signal left after you leave the roundabout and enter the new road',
          'Signal right on the approach to the roundabout and keep the signal on',
          'Signal left just after you pass the exit before the one you\'re going to take'
        ],
        correctAnswer: 3, // Signal left just after you pass the exit before the one you're going to take
        section: 'rulesOfTheRoad'
      },
      {
        id: 40,
        question: 'When may you drive over a pavement?',
        options: [
          'To overtake slow-moving traffic',
          'When the pavement is very wide',
          'If there are no pedestrians nearby',
          'To gain access to a property'
        ],
        correctAnswer: 3, // To gain access to a property
        section: 'rulesOfTheRoad'
      },
      {
        id: 41,
        question: 'A single carriageway road has this sign. What\'s the maximum permitted speed for a car towing a trailer?',
        options: [
          '30 mph',
          '40 mph',
          '50 mph',
          '60 mph'
        ],
        correctAnswer: 2, // 50 mph
        section: 'rulesOfTheRoad'
      },
      {
        id: 42,
        question: 'What\'s the speed limit for a car towing a caravan on a dual carriageway?',
        options: [
          '50 mph',
          '40 mph',
          '70 mph',
          '60 mph'
        ],
        correctAnswer: 3, // 60 mph
        section: 'rulesOfTheRoad'
      },
      {
        id: 43,
        question: 'You want to park and you see this sign. What should you do on the days and times shown?',
        options: [
          'Park in a bay and not pay',
          'Park on yellow lines and pay',
          'Park on yellow lines and not pay',
          'Park in a bay and pay'
        ],
        correctAnswer: 3, // Park in a bay and pay
        section: 'rulesOfTheRoad'
      },
      {
        id: 44,
        question: 'A cycle lane, marked by a solid white line, is in operation. What does this mean for car drivers?',
        options: [
          'They may park in the lane',
          'They may drive in the lane at any time',
          'They may use the lane when necessary',
          'They must not drive along the lane'
        ],
        correctAnswer: 3, // They must not drive along the lane
        section: 'rulesOfTheRoad'
      },
      {
        id: 45,
        question: 'You\'re going to turn left from a main road into a minor road. What should you do as you approach the junction?',
        options: [
          'Keep just left of the middle of the road',
          'Keep in the middle of the road',
          'Swing out to the right just before turning',
          'Keep well to the left of the road'
        ],
        correctAnswer: 3, // Keep well to the left of the road
        section: 'rulesOfTheRoad'
      },
      {
        id: 46,
        question: 'You\'re waiting at a level crossing. What should you do if the red warning lights continue to flash after a train has passed by?',
        options: [
          'Get out and investigate',
          'Telephone the signal operator',
          'Continue to wait',
          'Drive across carefully'
        ],
        correctAnswer: 2, // Continue to wait
        section: 'rulesOfTheRoad'
      },
      {
        id: 47,
        question: 'What should you do if the amber lights come on and a warning sounds while you\'re driving over a level crossing?',
        options: [
          'Get everyone out of the vehicle immediately',
          'Stop and reverse back to clear the crossing',
          'Keep going and clear the crossing',
          'Stop immediately and use your hazard warning lights'
        ],
        correctAnswer: 2, // Keep going and clear the crossing
        section: 'rulesOfTheRoad'
      },
      {
        id: 48,
        question: 'You\'re driving on a busy main road. What should you do if you find that you\'re driving in the wrong direction?',
        options: [
          'Turn into a side road on the right and reverse into the main road',
          'Make a U-turn in the main road',
          'Make a \'three-point\' turn in the main road',
          'Turn around in a side road'
        ],
        correctAnswer: 3, // Turn around in a side road
        section: 'rulesOfTheRoad'
      },
      {
        id: 49,
        question: 'When may you drive without wearing your seat belt?',
        options: [
          'When you\'re carrying out a manoeuvre that includes reversing',
          'When you\'re moving off on a hill',
          'When you\'re testing your brakes',
          'When you\'re driving slowly in queuing traffic'
        ],
        correctAnswer: 0, // When you're carrying out a manoeuvre that includes reversing
        section: 'rulesOfTheRoad'
      },
      {
        id: 50,
        question: 'How far are you allowed to reverse?',
        options: [
          'No further than is necessary',
          'No more than a car\'s length',
          'As far as it takes to reverse around a corner',
          'The length of a residential street'
        ],
        correctAnswer: 0, // No further than is necessary
        section: 'rulesOfTheRoad'
      },
      {
        id: 51,
        question: 'What should you do when you\'re unsure whether it\'s safe to reverse your vehicle?',
        options: [
          'Sound your horn',
          'Rev your engine',
          'Get out and check',
          'Reverse slowly'
        ],
        correctAnswer: 2, // Get out and check
        section: 'rulesOfTheRoad'
      },
      {
        id: 52,
        question: 'Why could it be dangerous to reverse from a side road into a main road?',
        options: [
          'Your reverse sensors will beep',
          'Your view will be restricted',
          'Your reversing lights will be hidden',
          'Your mirrors will need adjusting'
        ],
        correctAnswer: 1, // Your view will be restricted
        section: 'rulesOfTheRoad'
      },
      {
        id: 53,
        question: 'You want to turn right at a box junction. What should you do if there\'s oncoming traffic?',
        options: [
          'Wait in the box junction if your exit is clear',
          'Wait before the junction until it\'s clear of all traffic',
          'Drive on; you cannot turn right at a box junction',
          'Drive slowly into the box junction when signalled by oncoming traffic'
        ],
        correctAnswer: 0, // Wait in the box junction if your exit is clear
        section: 'rulesOfTheRoad'
      },
      {
        id: 54,
        question: 'You\'re reversing into a side road. When would your vehicle be the greatest hazard to passing traffic?',
        options: [
          'After you\'ve completed the manoeuvre',
          'Just before you begin to manoeuvre',
          'After you\'ve entered the side road',
          'When the front of your vehicle swings out'
        ],
        correctAnswer: 3, // When the front of your vehicle swings out
        section: 'rulesOfTheRoad'
      },
      {
        id: 55,
        question: 'Where\'s the safest place to park your vehicle at night?',
        options: [
          'In a garage',
          'On a busy road',
          'In a quiet car park',
          'Near a red route'
        ],
        correctAnswer: 0, // In a garage
        section: 'rulesOfTheRoad'
      },
      {
        id: 56,
        question: 'When may you stop on an urban clearway?',
        options: [
          'To set down and pick up passengers',
          'To use a mobile telephone',
          'To ask for directions',
          'To load or unload goods'
        ],
        correctAnswer: 0, // To set down and pick up passengers
        section: 'rulesOfTheRoad'
      },
      {
        id: 57,
        question: 'You\'re looking for somewhere to park your vehicle. Neither you or your passenger are disabled. What should you do if the only free spaces are marked for disabled drivers?',
        options: [
          'Use one of these spaces',
          'Park in one of these spaces but stay with your vehicle',
          'Use one of the spaces as long as one is kept free',
          'Wait for a regular parking space to become free'
        ],
        correctAnswer: 3, // Wait for a regular parking space to become free
        section: 'rulesOfTheRoad'
      },
      {
        id: 58,
        question: 'You\'re on a road that\'s only wide enough for one vehicle. What should you do if a car is coming towards you?',
        options: [
          'Pull into a passing place on your right',
          'Force the other driver to reverse',
          'Pull into a passing place if your vehicle is wider',
          'Pull into a passing place on your left'
        ],
        correctAnswer: 3, // Pull into a passing place on your left
        section: 'rulesOfTheRoad'
      },
      {
        id: 59,
        question: 'You\'re driving at night with your headlights on main beam. A vehicle is overtaking you. When should you dip your headlights?',
        options: [
          'Some time after the vehicle has passed you',
          'Before the vehicle starts to pass you',
          'Only if the other driver dips their headlights',
          'As soon as the vehicle passes you'
        ],
        correctAnswer: 3, // As soon as the vehicle passes you
        section: 'rulesOfTheRoad'
      },
      {
        id: 60,
        question: 'When may you drive a car in this bus lane?',
        options: [
          'Outside its hours of operation',
          'To get to the front of a traffic queue',
          'You may not use it at any time',
          'To overtake slow-moving traffic'
        ],
        correctAnswer: 0, // Outside its hours of operation
        section: 'rulesOfTheRoad'
      },
      {
        id: 61,
        question: 'Other than direction indicators, how can you give signals to other road users?',
        options: [
          'By using brake lights',
          'By using sidelights',
          'By using fog lights',
          'By using interior lights'
        ],
        correctAnswer: 0, // By using brake lights
        section: 'rulesOfTheRoad'
      },
      {
        id: 62,
        question: 'You\'re parked in a busy high street. What\'s the safest way to turn your vehicle around so you can drive in the opposite direction?',
        options: [
          'Turn around in a quiet side road',
          'Drive into a side road and reverse out into the main road',
          'Ask someone to stop the traffic',
          'Carry out a U-turn'
        ],
        correctAnswer: 0, // Turn around in a quiet side road
        section: 'rulesOfTheRoad'
      },
      {
        id: 63,
        question: 'Where should you park your vehicle at night?',
        options: [
          'Near a police station',
          'In a quiet road',
          'On a red route',
          'In a well-lit area'
        ],
        correctAnswer: 3, // In a well-lit area
        section: 'rulesOfTheRoad'
      },
      {
        id: 64,
        question: 'You\'re driving in the right-hand lane of a dual carriageway. What should you do if you see a sign showing that the right-hand lane is closed 800 yards ahead?',
        options: [
          'Keep in that lane until you reach the queue',
          'Move to the left immediately',
          'Wait and see which lane is moving faster',
          'Move to the left in good time'
        ],
        correctAnswer: 3, // Move to the left in good time
        section: 'rulesOfTheRoad'
      },
      {
        id: 65,
        question: 'You\'re driving on a road that has a cycle lane. What does it mean if the lane is marked by a broken white line?',
        options: [
          'You should not drive in the lane unless it\'s unavoidable',
          'There\'s a reduced speed limit for motor vehicles using the lane',
          'Cyclists can travel in both directions in that lane',
          'The lane must be used by motorcyclists in heavy traffic'
        ],
        correctAnswer: 0, // You should not drive in the lane unless it's unavoidable
        section: 'rulesOfTheRoad'
      },
      {
        id: 66,
        question: 'When are you allowed to park in a parking bay for disabled drivers?',
        options: [
          'When you have a Blue Badge',
          'When you have a wheelchair',
          'When you have an advanced driver certificate',
          'When you have an adapted vehicle'
        ],
        correctAnswer: 0, // When you have a Blue Badge
        section: 'rulesOfTheRoad'
      },
      {
        id: 67,
        question: 'When must you stop your vehicle?',
        options: [
          'If you\'re involved in an incident that causes damage or injury',
          'At a junction where there are \'give way\' lines',
          'At the end of a one-way street',
          'Before merging onto a motorway'
        ],
        correctAnswer: 0, // If you're involved in an incident that causes damage or injury
        section: 'rulesOfTheRoad'
      },
      // Road and Traffic Signs (Q523-656) - 134 questions
      {
        id: 68,
        question: 'When should you use your vehicle\'s horn?',
        options: [
          'To alert others to your presence',
          'To allow you right of way',
          'To greet other road users',
          'To signal your annoyance'
        ],
        correctAnswer: 0, // To alert others to your presence
        section: 'roadAndTrafficSigns'
      },
      {
        id: 69,
        question: 'How can you identify traffic signs that give orders?',
        options: [
          'They\'re rectangular with a yellow border',
          'They\'re triangular with a blue border',
          'They\'re square with a brown border',
          'They\'re circular with a red border'
        ],
        correctAnswer: 3, // They're circular with a red border
        section: 'roadAndTrafficSigns'
      },
      {
        id: 70,
        question: 'What shape are traffic signs giving orders?',
        options: [
          'Circular',
          'Triangular',
          'Rectangular',
          'Square'
        ],
        correctAnswer: 0, // Circular
        section: 'roadAndTrafficSigns'
      },
      {
        id: 71,
        question: 'Which type of sign tells you what you must not do?',
        options: [
          'Circular with red border',
          'Triangular with red border',
          'Rectangular with blue background',
          'Square with yellow background'
        ],
        correctAnswer: 0, // Circular with red border
        section: 'roadAndTrafficSigns'
      },
      {
        id: 72,
        question: 'What does this sign mean?',
        options: [
          'Maximum speed limit with traffic calming',
          'Minimum speed limit with traffic calming',
          '\'20 cars only\' parking zone',
          'Only 20 cars allowed at any one time'
        ],
        correctAnswer: 1, // Minimum speed limit with traffic calming
        section: 'roadAndTrafficSigns'
      },
      {
        id: 73,
        question: 'What does this sign mean?',
        options: [
          'New speed limit 20 mph',
          'No vehicles over 30 tonnes',
          'Minimum speed limit 30 mph',
          'End of 20 mph zone'
        ],
        correctAnswer: 3, // End of 20 mph zone
        section: 'roadAndTrafficSigns'
      },
      {
        id: 74,
        question: 'What does this sign mean?',
        options: [
          'No overtaking',
          'No motor vehicles',
          'Clearway (no stopping)',
          'Cars and motorcycles only'
        ],
        correctAnswer: 2, // Clearway (no stopping)
        section: 'roadAndTrafficSigns'
      },
      {
        id: 75,
        question: 'What does this sign mean?',
        options: [
          'No parking',
          'No road markings',
          'No through road',
          'No entry'
        ],
        correctAnswer: 0, // No parking
        section: 'roadAndTrafficSigns'
      },
      {
        id: 76,
        question: 'What does this sign mean?',
        options: [
          'Bend to the right',
          'Road on the right closed',
          'No traffic from the right',
          'No right turn'
        ],
        correctAnswer: 3, // No right turn
        section: 'roadAndTrafficSigns'
      },
      {
        id: 77,
        question: 'Which sign means \'no entry\'?',
        options: [
          'Red circle with white horizontal bar',
          'Red triangle with white border',
          'Blue circle with white symbol',
          'Yellow diamond with black symbol'
        ],
        correctAnswer: 0, // Red circle with white horizontal bar
        section: 'roadAndTrafficSigns'
      },
      {
        id: 78,
        question: 'What does this sign mean?',
        options: [
          'Route for trams only',
          'Route for buses only',
          'Parking for buses only',
          'Parking for trams only'
        ],
        correctAnswer: 0, // Route for trams only
        section: 'roadAndTrafficSigns'
      },
      {
        id: 79,
        question: 'Which type of vehicle does this sign apply to?',
        options: [
          'Wide vehicles',
          'Long vehicles',
          'High vehicles',
          'Heavy vehicles'
        ],
        correctAnswer: 2, // High vehicles
        section: 'roadAndTrafficSigns'
      },
      {
        id: 80,
        question: 'Which sign means no motor vehicles allowed?',
        options: [
          'Red circle with car symbol crossed out',
          'Blue circle with car symbol',
          'Red triangle with car symbol',
          'Yellow diamond with car symbol'
        ],
        correctAnswer: 0, // Red circle with car symbol crossed out
        section: 'roadAndTrafficSigns'
      },
      {
        id: 81,
        question: 'What does this sign mean?',
        options: [
          'You have priority',
          'No motor vehicles',
          'Two-way traffic',
          'No overtaking'
        ],
        correctAnswer: 3, // No overtaking
        section: 'roadAndTrafficSigns'
      },
      {
        id: 82,
        question: 'What does this sign mean?',
        options: [
          'Waiting restrictions apply',
          'Waiting permitted',
          'National speed limit applies',
          'Clearway (no stopping)'
        ],
        correctAnswer: 0, // Waiting restrictions apply
        section: 'roadAndTrafficSigns'
      },
      {
        id: 83,
        question: 'What does this sign mean?',
        options: [
          'End of restricted speed area',
          'End of restricted parking area',
          'End of clearway',
          'End of cycle route'
        ],
        correctAnswer: 1, // End of restricted parking area
        section: 'roadAndTrafficSigns'
      },
      {
        id: 84,
        question: 'Which sign means \'no stopping\'?',
        options: [
          'Red circle with diagonal line',
          'Blue circle with white symbol',
          'Yellow rectangle with black text',
          'Red triangle with warning symbol'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 85,
        question: 'What does this sign mean?',
        options: [
          'National speed limit applies',
          'Waiting restrictions apply',
          'No stopping',
          'No entry'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 86,
        question: 'What does this sign mean?',
        options: [
          'Distance to parking place ahead',
          'Distance to public telephone ahead',
          'Distance to public house ahead',
          'Distance to passing place ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 87,
        question: 'What does this sign mean?',
        options: [
          'Vehicles may not park on the verge or footway',
          'Vehicles may park on the left-hand side of the road only',
          'Vehicles may park fully on the verge or footway',
          'Vehicles may park on the right-hand side of the road only'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 88,
        question: 'What does this traffic sign mean?',
        options: [
          'No overtaking allowed',
          'Give priority to oncoming traffic',
          'Two-way traffic',
          'One-way traffic only'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 89,
        question: 'What\'s the meaning of this traffic sign?',
        options: [
          'End of two-way road',
          'Give priority to vehicles coming towards you',
          'You have priority over vehicles coming towards you',
          'Bus lane ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 90,
        question: 'What shape is a \'stop\' sign?',
        options: [
          'Octagon',
          'Triangle',
          'Circle',
          'Rectangle'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 91,
        question: 'In winter, road signs can become covered by snow. What does this sign mean?',
        options: [
          'Crossroads',
          'Give way',
          'Stop',
          'Turn right'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 92,
        question: 'What does this sign mean?',
        options: [
          'Service area 30 miles ahead',
          'Maximum speed 30 mph',
          'Minimum speed 30 mph',
          'Lay-by 30 miles ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 93,
        question: 'What does this sign mean?',
        options: [
          'Give way to oncoming vehicles',
          'Approaching traffic passes you on both sides',
          'Turn off at the next available junction',
          'Pass either side to get to the same destination'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 94,
        question: 'What does this sign mean?',
        options: [
          'Route for trams',
          'Give way to trams',
          'Route for buses',
          'Give way to buses'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 95,
        question: 'What messages are given by circular traffic signs that have a blue background?',
        options: [
          'They give temporary directions during a diversion',
          'They give directions to car parks',
          'They give motorway information',
          'They give mandatory instructions'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 96,
        question: 'Where would you see a contraflow bus lane?',
        options: [
          'On a dual carriageway',
          'On a roundabout',
          'On an urban motorway',
          'On a one-way street'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 97,
        question: 'What does this sign mean?',
        options: [
          'Bus station on the right',
          'Contraflow bus lane',
          'With-flow bus lane',
          'Give way to buses'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 98,
        question: 'What does a sign with a brown background show?',
        options: [
          'Tourist directions',
          'Primary roads',
          'Motorway routes',
          'Minor roads'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 99,
        question: 'What does this sign mean?',
        options: [
          'Tourist attraction',
          'Beware of trains',
          'Level crossing',
          'Beware of trams'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 100,
        question: 'What\'s the purpose of triangular shaped signs?',
        options: [
          'To give warnings',
          'To give information',
          'To give orders',
          'To give directions'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 101,
        question: 'What does this sign mean?',
        options: [
          'Turn left ahead',
          'T-junction',
          'No through road',
          'Give way'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 102,
        question: 'What does this sign mean?',
        options: [
          'Multi-exit roundabout',
          'Risk of ice',
          'Six roads converge',
          'Place of historical interest'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 103,
        question: 'What does this sign mean?',
        options: [
          'Crossroads',
          'Level crossing with gate',
          'Level crossing without gate',
          'Ahead only'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 104,
        question: 'What does this sign mean?',
        options: [
          'Ring road',
          'Mini-roundabout',
          'No vehicles',
          'Roundabout'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 105,
        question: 'What information would be shown in a triangular road sign?',
        options: [
          'Road narrows',
          'Ahead only',
          'Keep left',
          'Minimum speed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 106,
        question: 'What does this sign mean?',
        options: [
          'Cyclists must dismount',
          'Cycles are not allowed',
          'Cycle route ahead',
          'Cycle in single file'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 107,
        question: 'Which sign means that pedestrians may be walking along the road?',
        options: [
          'Triangular sign with pedestrian symbol',
          'Circular sign with pedestrian symbol',
          'Rectangular sign with pedestrian symbol',
          'Square sign with pedestrian symbol'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 108,
        question: 'Which sign means there\'s a double bend ahead?',
        options: [
          'Triangular sign with S-bend symbol',
          'Circular sign with bend symbol',
          'Rectangular sign with warning',
          'Square sign with direction arrow'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 109,
        question: 'What does this sign mean?',
        options: [
          'Wait at the barriers',
          'Wait at the crossroads',
          'Give way to trams',
          'Give way to farm vehicles'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 110,
        question: 'What does this sign mean?',
        options: [
          'Hump bridge',
          'Humps in the road',
          'Entrance to tunnel',
          'Soft verges'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 111,
        question: 'Which sign means the end of a dual carriageway?',
        options: [
          'Rectangular sign with dual carriageway symbol',
          'Circular sign with end symbol',
          'Triangular sign with warning',
          'Square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 112,
        question: 'What does this sign mean?',
        options: [
          'End of dual carriageway',
          'Tall bridge',
          'Road narrows',
          'End of narrow bridge'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 113,
        question: 'What does this sign mean?',
        options: [
          'Side winds',
          'Road noise',
          'Airport',
          'Adverse camber'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 114,
        question: 'What does this traffic sign mean?',
        options: [
          'Slippery road ahead',
          'Tyres liable to punctures ahead',
          'Danger ahead',
          'Service area ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 115,
        question: 'You\'re about to overtake. What should you do when you see this sign?',
        options: [
          'Overtake the other driver as quickly as possible',
          'Move to the right to get a better view',
          'Switch your headlights on before overtaking',
          'Hold back until you can see clearly ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 116,
        question: 'What does this sign mean?',
        options: [
          'Level crossing with gate or barrier',
          'Gated road ahead',
          'Level crossing without gate or barrier',
          'Cattle grid ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 117,
        question: 'What does this sign mean?',
        options: [
          'No trams ahead',
          'Oncoming trams',
          'Trams crossing ahead',
          'Trams only'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 118,
        question: 'What does this sign mean?',
        options: [
          'Adverse camber',
          'Steep hill downwards',
          'Uneven road',
          'Steep hill upwards'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 119,
        question: 'What does this sign mean?',
        options: [
          'Uneven road surface',
          'Bridge over the road',
          'Road ahead ends',
          'Water across the road'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 120,
        question: 'What does this sign mean?',
        options: [
          'Turn left for parking area',
          'No through road on the left',
          'No entry for traffic turning left',
          'Turn left for ferry terminal'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 121,
        question: 'What does this sign mean?',
        options: [
          'T-junction',
          'No through road',
          'Telephone box ahead',
          'Toilet ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 122,
        question: 'Which is the sign for a ring road?',
        options: [
          'Circular blue sign with ring symbol',
          'Rectangular green sign with route number',
          'Triangular sign with direction',
          'Square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 123,
        question: 'What does this sign mean?',
        options: [
          'The right-hand lane ahead is narrow',
          'Right-hand lane for buses only',
          'Right-hand lane for turning right',
          'The right-hand lane is closed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 124,
        question: 'What does this sign mean?',
        options: [
          'Change to the left-hand lane',
          'Leave at the next exit',
          'Contraflow system',
          'One-way street'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 125,
        question: 'What does this sign mean?',
        options: [
          'Leave motorway at next exit',
          'Lane for heavy and slow vehicles',
          'All lorries use the hard shoulder',
          'Rest area for lorries'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 126,
        question: 'What does a red traffic light mean?',
        options: [
          'You should stop unless turning left',
          'Stop, if you\'re able to brake safely',
          'You must stop and wait behind the stop line',
          'Proceed with care'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 127,
        question: 'At traffic lights, what does it mean when the amber light shows on its own?',
        options: [
          'Prepare to go',
          'Go if the way is clear',
          'Go if no pedestrians are crossing',
          'Stop at the stop line'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 128,
        question: 'You\'re at a junction controlled by traffic lights. When should you wait at a green light?',
        options: [
          'When pedestrians are waiting to cross',
          'When your exit from the junction is blocked',
          'When you think the lights may be about to change',
          'When you intend to turn right'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 129,
        question: 'You\'re in the left-hand lane at traffic lights, waiting to turn left. Which signal means you must wait?',
        options: [
          'Red light',
          'Amber light',
          'Flashing amber',
          'Green light'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 130,
        question: 'What does this sign mean?',
        options: [
          'Traffic lights out of order',
          'Amber signal out of order',
          'Temporary traffic lights ahead',
          'New traffic lights ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 131,
        question: 'Who has priority when traffic lights are out of order?',
        options: [
          'Traffic going straight on',
          'Traffic turning right',
          'Nobody',
          'Traffic turning left'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 132,
        question: 'Where would you find these flashing red light signals?',
        options: [
          'Pelican crossings',
          'Motorway exits',
          'Zebra crossings',
          'Level crossings'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 133,
        question: 'What do these zigzag white lines mean?',
        options: [
          'No parking at any time',
          'Parking allowed only for a short time',
          'Slow down to 20 mph',
          'Sounding horns is not allowed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 134,
        question: 'When may you cross a double solid white line in the middle of the road?',
        options: [
          'To pass traffic that\'s queuing back at a junction',
          'To pass a car signalling to turn left ahead',
          'To pass a road maintenance vehicle travelling at 10 mph or less',
          'To pass a vehicle that\'s towing a trailer'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 135,
        question: 'What does this road marking mean?',
        options: [
          'Do not cross the line',
          'No stopping allowed',
          'You\'re approaching a hazard',
          'No overtaking allowed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 136,
        question: 'Where would you see this road marking?',
        options: [
          'At traffic lights',
          'On road humps',
          'Near a level crossing',
          'At a box junction'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 137,
        question: 'Which diagram shows a hazard warning line?',
        options: [
          'Broken white line in the centre',
          'Solid white line in the centre',
          'Double white lines',
          'Yellow line at the edge'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 138,
        question: 'Why does this junction have a \'stop\' sign and a stop line on the road?',
        options: [
          'Speed on the major road is derestricted',
          'It\'s a busy junction',
          'Visibility along the major road is restricted',
          'The junction is on a downhill gradient'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 139,
        question: 'What does this line across the road at the entrance to a roundabout mean?',
        options: [
          'Give way to traffic from the right',
          'Traffic from the left has right of way',
          'You have right of way',
          'Stop at the line'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 140,
        question: 'How will a police officer in a patrol vehicle signal for you to stop?',
        options: [
          'Flash the headlights, indicate left and point to the left',
          'Overtake and give a slowing down arm signal',
          'Use the siren, overtake, cut in front and stop',
          'Pull alongside you, use the siren and wave you to stop'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 141,
        question: 'You\'re approaching a junction where the traffic lights are not working. What should you do when a police officer gives this signal?',
        options: [
          'Turn left only',
          'Turn right only',
          'Continue ahead only',
          'Stop at the stop line'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 142,
        question: 'What does this arm signal mean?',
        options: [
          'The driver is slowing down',
          'The driver intends to turn right',
          'The driver wishes to overtake',
          'The driver intends to turn left'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 143,
        question: 'What does this motorway sign mean?',
        options: [
          'Change to the lane on your left',
          'Leave the motorway at the next exit',
          'Change to the opposite carriageway',
          'Pull up on the hard shoulder'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 144,
        question: 'What does this motorway sign mean?',
        options: [
          'Temporary minimum speed 50 mph',
          'No services for 50 miles',
          'Obstruction 50 metres (164 feet) ahead',
          'Temporary maximum speed 50 mph'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 145,
        question: 'What does this sign mean?',
        options: [
          'Through traffic to use left lane',
          'Right-hand lane T-junction only',
          'Right-hand lane closed ahead',
          '11 tonne weight limit'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 146,
        question: 'What does \'25\' mean on this motorway sign?',
        options: [
          'The distance to the nearest town',
          'The route number of the road',
          'The number of the next junction',
          'The speed limit on the slip road'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 147,
        question: 'How should the right-hand lane of a three-lane motorway be used?',
        options: [
          'As a high-speed lane',
          'As an overtaking lane',
          'As a right-turn lane',
          'As an acceleration lane'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 148,
        question: 'Where can you find reflective amber studs on a motorway?',
        options: [
          'Separating the slip road from the motorway',
          'On the left-hand edge of the road',
          'On the right-hand edge of the road',
          'Separating the lanes'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 149,
        question: 'Where would you find green reflective studs on a motorway?',
        options: [
          'Separating driving lanes',
          'Between the hard shoulder and the carriageway',
          'At slip-road entrances and exits',
          'Between the carriageway and the central reservation'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 150,
        question: 'What should you do when you see this sign as you travel along a motorway?',
        options: [
          'Leave the motorway at the next exit',
          'Turn left immediately',
          'Change lane',
          'Move onto the hard shoulder'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 151,
        question: 'What does this sign mean?',
        options: [
          'No motor vehicles',
          'End of motorway',
          'No through road',
          'End of bus lane'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 152,
        question: 'Which sign means that the national speed limit applies?',
        options: [
          'White circle with diagonal black stripe',
          'Red circle with speed limit',
          'Blue circle with white symbol',
          'Yellow diamond with speed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 153,
        question: 'What\'s the national speed limit on a single carriageway road?',
        options: [
          '50 mph',
          '60 mph',
          '40 mph',
          '70 mph'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 154,
        question: 'What does this sign mean?',
        options: [
          'End of motorway',
          'End of restriction',
          'Lane ends ahead',
          'Free recovery ends'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 155,
        question: 'What does this sign indicate?',
        options: [
          'A diversion route',
          'A picnic area',
          'A pedestrian zone',
          'A cycle route'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 156,
        question: 'What does this traffic sign mean?',
        options: [
          'Compulsory maximum speed limit',
          'Advisory maximum speed limit',
          'Compulsory minimum speed limit',
          'Advised separation distance'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 157,
        question: 'What should you do when you see this sign at a crossroads?',
        options: [
          'Maintain the same speed',
          'Carry on with great care',
          'Find another route',
          'Telephone the police'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 158,
        question: 'What does this sign mean?',
        options: [
          'Motorcycles only',
          'No cars',
          'Cars only',
          'No motorcycles'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 159,
        question: 'You\'re on a motorway. A lorry has stopped in the right-hand lane. What should you do when you see this sign on the lorry?',
        options: [
          'Move into the right-hand lane',
          'Stop behind the flashing lights',
          'Pass the lorry on the left',
          'Leave the motorway at the next exit'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 160,
        question: 'You\'re on a motorway. What should you do if there\'s a red cross showing on the signs above your lane only?',
        options: [
          'Continue in that lane and look for further information',
          'Do not continue in that lane',
          'Pull onto the hard shoulder',
          'Stop and wait for an instruction to proceed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 161,
        question: 'When may you sound your vehicle\'s horn?',
        options: [
          'To give you right of way',
          'To attract a friend\'s attention',
          'To warn others of your presence',
          'To make slower drivers move over'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 162,
        question: 'Your vehicle is stationary. When may you use its horn?',
        options: [
          'When another road user poses a danger',
          'When the road is blocked by queuing traffic',
          'When it\'s used only briefly',
          'When signalling that you\'ve just arrived'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 163,
        question: 'What does this sign mean?',
        options: [
          'You can park on the days and times shown',
          'No parking on the days and times shown',
          'No parking at all from Monday to Friday',
          'End of the urban clearway restrictions'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 164,
        question: 'What does this sign mean?',
        options: [
          'Quayside or river bank',
          'Steep hill downwards',
          'Uneven road surface',
          'Road liable to flooding'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 165,
        question: 'Which sign means you have priority over oncoming vehicles?',
        options: [
          'White rectangular sign with priority symbol',
          'Blue circular sign with priority',
          'Red triangular sign with warning',
          'Yellow diamond sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 166,
        question: 'What do the long white lines along the centre of the road mean?',
        options: [
          'Bus lane',
          'Hazard warning',
          'Give way',
          'Lane marking'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 167,
        question: 'What\'s the reason for the hatched area along the centre of this road?',
        options: [
          'It separates traffic flowing in opposite directions',
          'It marks an area to be used by overtaking motorcyclists',
          'It\'s a temporary marking to warn of the roadworks',
          'It separates the two sides of the dual carriageway'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 168,
        question: 'Other drivers may sometimes flash their headlights at you. What\'s the official meaning of this signal?',
        options: [
          'There\'s a radar speed trap ahead',
          'They\'re giving way to you',
          'They\'re warning you of their presence',
          'There\'s a fault with your vehicle'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 169,
        question: 'What does this signal mean?',
        options: [
          'Cars must stop',
          'Trams must stop',
          'Both trams and cars must stop',
          'Both trams and cars can continue'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 170,
        question: 'Where would you find these road markings?',
        options: [
          'At a railway crossing',
          'At a mini-roundabout',
          'On a motorway',
          'On a pedestrian crossing'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 171,
        question: 'A police car is following you. What should you do if the police officer flashes the headlights and points to the left?',
        options: [
          'Turn left at the next junction',
          'Pull up on the left',
          'Stop immediately',
          'Move over to the left'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 172,
        question: 'You see this amber traffic light ahead. Which light, or lights, will come on next?',
        options: [
          'Red alone',
          'Red and amber together',
          'Green and amber together',
          'Green alone'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 173,
        question: 'What does it mean if you see this signal on the motorway?',
        options: [
          'Leave the motorway at the next exit',
          'All vehicles use the hard shoulder',
          'Sharp bend to the left ahead',
          'Stop: all lanes ahead closed'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 174,
        question: 'What must you do when you see this sign?',
        options: [
          'Stop only if traffic is approaching',
          'Stop even if the road is clear',
          'Stop only if children are waiting to cross',
          'Stop only if a red light is showing'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 175,
        question: 'Which shape is used for a \'give way\' sign?',
        options: [
          'Triangle',
          'Circle',
          'Rectangle',
          'Square'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 176,
        question: 'What does this sign mean?',
        options: [
          'Buses turning',
          'Ring road',
          'Mini-roundabout',
          'Keep right'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 177,
        question: 'What does this sign mean?',
        options: [
          'Two-way traffic straight ahead',
          'Two-way traffic crosses a one-way road',
          'Two-way traffic over a bridge',
          'Two-way traffic crosses a two-way road'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 178,
        question: 'What does this sign mean?',
        options: [
          'Two-way traffic crosses a one-way road',
          'Traffic approaching you has priority',
          'Two-way traffic straight ahead',
          'Motorway contraflow system ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 179,
        question: 'What does this sign mean?',
        options: [
          'Hump bridge',
          'Traffic-calming hump',
          'Low bridge',
          'Uneven road'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 180,
        question: 'Which sign informs you that you\'re coming to a \'no through road\'?',
        options: [
          'Rectangular sign with dead end symbol',
          'Circular sign with no entry',
          'Triangular sign with warning',
          'Square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 181,
        question: 'What does this sign mean?',
        options: [
          'Direction to park-and-ride car park',
          'No parking for buses or coaches',
          'Direction to bus and coach park',
          'Parking area for cars and coaches'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 182,
        question: 'What should you do when you\'re approaching traffic lights that have red and amber showing together?',
        options: [
          'Pass the lights if the road is clear',
          'Take care because there\'s a fault with the lights',
          'Wait for the green light',
          'Stop because the lights are changing to red'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 183,
        question: 'You\'ve stopped at a railway level crossing. What should you do if the red lights continue to flash after a train has gone by?',
        options: [
          'Phone the signal operator',
          'Alert drivers behind you',
          'Wait',
          'Proceed with caution'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 184,
        question: 'You\'re in a tunnel and you see this sign. What does it mean?',
        options: [
          'Direction to an emergency pedestrian exit',
          'Beware of pedestrians: no footpath ahead',
          'No access for pedestrians',
          'Beware of pedestrians crossing ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 185,
        question: 'Which sign shows that you\'re entering a one-way system?',
        options: [
          'Blue rectangular sign with one-way arrow',
          'Red circular sign with direction',
          'Yellow triangular sign with warning',
          'White square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 186,
        question: 'What does this sign mean?',
        options: [
          'With-flow bus and cycle lane',
          'Contraflow bus and cycle lane',
          'No buses and cycles allowed',
          'No waiting for buses and cycles'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 187,
        question: 'Which of these signs warns you of a zebra crossing?',
        options: [
          'Triangular sign with zebra crossing symbol',
          'Circular sign with crossing',
          'Rectangular sign with information',
          'Square sign with direction'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 188,
        question: 'What does this sign mean?',
        options: [
          'School crossing patrol',
          'No pedestrians allowed',
          'Pedestrian zone - no vehicles',
          'Zebra crossing ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 189,
        question: 'Which sign means there will be two-way traffic crossing your route ahead?',
        options: [
          'Triangular sign with two-way traffic symbol',
          'Circular sign with warning',
          'Rectangular sign with direction',
          'Square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 190,
        question: 'Which arm signal tells you that the car you\'re following is going to pull up?',
        options: [
          'Right arm moving up and down',
          'Left arm moving up and down',
          'Right arm extended horizontally',
          'Left arm extended horizontally'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 191,
        question: 'Which sign means turn left ahead?',
        options: [
          'Blue rectangular sign with left arrow',
          'Red circular sign with direction',
          'Yellow triangular sign with warning',
          'White square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 192,
        question: 'What should you be aware of if you\'ve just passed this sign?',
        options: [
          'This is a single-track road',
          'You cannot stop on this road',
          'Only one lane is in use',
          'All traffic is going one way'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 193,
        question: 'You\'re approaching traffic lights and the red light is showing. What signal will show next?',
        options: [
          'Red and amber',
          'Green alone',
          'Amber alone',
          'Green and amber'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 194,
        question: 'What does this sign mean?',
        options: [
          'Low bridge ahead',
          'Tunnel ahead',
          'Ancient monument ahead',
          'Traffic danger spot ahead'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 195,
        question: 'What does the white line along the side of the road indicate?',
        options: [
          'The edge of the carriageway',
          'The approach to a hazard',
          'No parking',
          'No overtaking'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 196,
        question: 'What does this white arrow on the road mean?',
        options: [
          'Entrance on the left',
          'All vehicles turn left',
          'Return to your side of the road',
          'Road bends to the left'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 197,
        question: 'How should you give an arm signal to turn left?',
        options: [
          'Extend your left arm horizontally',
          'Extend your right arm horizontally',
          'Raise your left arm up and down',
          'Raise your right arm up and down'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 198,
        question: 'You\'re waiting at a T-junction. What should you do if a vehicle is coming from the right, with its left indicator flashing?',
        options: [
          'Move out and accelerate hard',
          'Wait until the vehicle starts to turn in',
          'Pull out before the vehicle reaches the junction',
          'Move out slowly'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 199,
        question: 'When may you use hazard warning lights while you\'re driving?',
        options: [
          'Instead of sounding the horn in a built-up area between 11.30 pm and 7.00 am',
          'On a motorway or unrestricted dual carriageway, to warn of a hazard ahead',
          'On rural routes, after a sign warning of animals',
          'On the approach to toucan crossings, where cyclists are waiting to cross'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 200,
        question: 'Why should you make sure that your indicators are cancelled after turning at a junction?',
        options: [
          'To avoid flattening the battery',
          'To avoid misleading other road users',
          'To avoid dazzling other road users',
          'To avoid damage to the indicator relay'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      },
      {
        id: 201,
        question: 'You\'re driving in busy traffic. You want to pull up just after a junction on the left. When should you signal?',
        options: [
          'As you\'re passing or just after the junction',
          'Just before you reach the junction',
          'Well before you reach the junction',
          'It would be better not to signal at all'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'roadAndTrafficSigns'
      }
    ]
  },
  3: {
    lessonTitle: 'Day 3: Vehicle Safety and Maintenance',
    sections: {
      questionsBank: 'Questions Bank',
      safetyMargins: 'Safety Margins'
    },
    questions: [
      // Questions Bank (Q67-148) - 82 questions
      {
        id: 1,
        question: 'How would under-inflated tyres affect your vehicle?',
        options: [
          'The vehicle\'s stopping distance would increase',
          'The flash rate of the vehicle\'s indicators would increase',
          'The vehicle\'s gear change mechanism would become stiff',
          'The vehicle\'s headlights would aim high'
        ],
        correctAnswer: 0, // The vehicle's stopping distance would increase
        section: 'questionsBank'
      },
      {
        id: 2,
        question: 'When are you not allowed to sound your vehicle\'s horn?',
        options: [
          'Between 10.00 pm and 6.00 am in a built-up area',
          'At any time in a built-up area',
          'Between 11.30 pm and 7.00 am in a built-up area',
          'Between 11.30 pm and 6.00 am on any road'
        ],
        correctAnswer: 2, // Between 11.30 pm and 7.00 am in a built-up area
        section: 'questionsBank'
      },
      {
        id: 3,
        question: 'What makes the vehicle in the picture \'environmentally friendly\'?',
        options: [
          'It\'s powered by gravity',
          'It\'s powered by diesel',
          'It\'s powered by electricity',
          'It\'s powered by unleaded petrol'
        ],
        correctAnswer: 2, // It's powered by electricity
        section: 'questionsBank'
      },
      {
        id: 4,
        question: 'Why have \'red routes\' been introduced in major cities?',
        options: [
          'To raise the speed limits',
          'To help the traffic flow',
          'To provide better parking',
          'To allow lorries to load more freely'
        ],
        correctAnswer: 1, // To help the traffic flow
        section: 'questionsBank'
      },
      {
        id: 5,
        question: 'What\'s the purpose of road humps, chicanes and narrowings?',
        options: [
          'To separate lanes of traffic',
          'To increase traffic speed',
          'To allow pedestrians to cross',
          'To reduce traffic speed'
        ],
        correctAnswer: 3, // To reduce traffic speed
        section: 'questionsBank'
      },
      {
        id: 6,
        question: 'What\'s the purpose of a catalytic converter?',
        options: [
          'To reduce fuel consumption',
          'To reduce the risk of fire',
          'To reduce harmful exhaust gases',
          'To reduce engine wear'
        ],
        correctAnswer: 2, // To reduce harmful exhaust gases
        section: 'questionsBank'
      },
      {
        id: 7,
        question: 'When should tyre pressures be checked?',
        options: [
          'After any lengthy journey',
          'After travelling at high speed',
          'When tyres are hot',
          'When tyres are cold'
        ],
        correctAnswer: 3, // When tyres are cold
        section: 'questionsBank'
      },
      {
        id: 8,
        question: 'When will your vehicle use more fuel?',
        options: [
          'When its tyres are under-inflated',
          'When its tyres are of different makes',
          'When its tyres are over-inflated',
          'When its tyres are new'
        ],
        correctAnswer: 0, // When its tyres are under-inflated
        section: 'questionsBank'
      },
      {
        id: 9,
        question: 'How should you dispose of a used vehicle battery?',
        options: [
          'Bury it in your garden',
          'Put it in the dustbin',
          'Take it to a local-authority disposal site',
          'Leave it on waste land'
        ],
        correctAnswer: 2, // Take it to a local-authority disposal site
        section: 'questionsBank'
      },
      {
        id: 10,
        question: 'What\'s most likely to increase fuel consumption?',
        options: [
          'Poor steering control',
          'Accelerating around bends',
          'Staying in high gears',
          'Harsh braking and accelerating'
        ],
        correctAnswer: 3, // Harsh braking and accelerating
        section: 'questionsBank'
      },
      {
        id: 11,
        question: 'You\'re parked on the road at night. When must you use parking lights?',
        options: [
          'When there are continuous white lines in the middle of the road',
          'When the speed limit exceeds 30 mph',
          'When you\'re facing oncoming traffic',
          'When you\'re near a bus stop'
        ],
        correctAnswer: 1, // When the speed limit exceeds 30 mph
        section: 'questionsBank'
      },
      {
        id: 12,
        question: 'How can you reduce the environmental harm caused by your motor vehicle?',
        options: [
          'Only use it for short journeys',
          'Do not service it',
          'Drive faster than normal',
          'Keep engine revs low'
        ],
        correctAnswer: 3, // Keep engine revs low
        section: 'questionsBank'
      },
      {
        id: 13,
        question: 'What can cause excessive or uneven tyre wear?',
        options: [
          'A faulty gearbox',
          'A faulty braking system',
          'A faulty electrical system',
          'A faulty exhaust system'
        ],
        correctAnswer: 1, // A faulty braking system
        section: 'questionsBank'
      },
      {
        id: 14,
        question: 'How can you plan your route before starting a long journey?',
        options: [
          'Check your vehicle handbook',
          'Ask your local garage',
          'Use a route planner on the internet',
          'Consult a travel agent'
        ],
        correctAnswer: 2, // Use a route planner on the internet
        section: 'questionsBank'
      },
      {
        id: 15,
        question: 'Why is it a good idea to plan your journey to avoid busy times?',
        options: [
          'You\'ll have an easier journey',
          'You\'ll have a more stressful journey',
          'Your journey time will be longer',
          'It will cause more traffic congestion'
        ],
        correctAnswer: 0, // You'll have an easier journey
        section: 'questionsBank'
      },
      {
        id: 16,
        question: 'How will your journey be affected by travelling outside the busy times of day?',
        options: [
          'Your journey will use more fuel',
          'Your journey will take longer',
          'Your journey will be more hazardous',
          'Your journey will have fewer delays'
        ],
        correctAnswer: 3, // Your journey will have fewer delays
        section: 'questionsBank'
      },
      {
        id: 17,
        question: 'You plan your route before starting a journey. Why should you also plan an alternative route?',
        options: [
          'Your original route may be blocked',
          'Your maps may have different scales',
          'You may find you have to pay a congestion charge',
          'You may get held up by a tractor'
        ],
        correctAnswer: 0, // Your original route may be blocked
        section: 'questionsBank'
      },
      {
        id: 18,
        question: 'You have to arrive on time for an appointment. How should you plan for the journey?',
        options: [
          'Allow plenty of time for the trip',
          'Plan to travel at busy times',
          'Avoid roads with the national speed limit',
          'Prevent other drivers from overtaking'
        ],
        correctAnswer: 0, // Allow plenty of time for the trip
        section: 'questionsBank'
      },
      {
        id: 19,
        question: 'What can you expect if you drive using rapid acceleration and heavy braking?',
        options: [
          'Reduced pollution',
          'Increased fuel consumption',
          'Reduced exhaust emissions',
          'Increased road safety'
        ],
        correctAnswer: 1, // Increased fuel consumption
        section: 'questionsBank'
      },
      {
        id: 20,
        question: 'What could cause you to crash if the level is allowed to get too low?',
        options: [
          'Anti-freeze level',
          'Brake-fluid level',
          'Battery-water level',
          'Radiator-coolant level'
        ],
        correctAnswer: 1, // Brake-fluid level
        section: 'questionsBank'
      },
      {
        id: 21,
        question: 'What should you do if your anti-lock brakes (ABS) warning light stays on?',
        options: [
          'Check the brake-fluid level',
          'Check the footbrake free play',
          'Check that the parking brake is released',
          'Have the brakes checked immediately'
        ],
        correctAnswer: 3, // Have the brakes checked immediately
        section: 'questionsBank'
      },
      {
        id: 22,
        question: 'What does it mean if this light comes on while you\'re driving?',
        options: [
          'A fault in the braking system',
          'The engine oil is low',
          'A rear light has failed',
          'Your seat belt is not fastened'
        ],
        correctAnswer: 0, // A fault in the braking system
        section: 'questionsBank'
      },
      {
        id: 23,
        question: 'Why is it important to wear suitable shoes when you\'re driving?',
        options: [
          'To prevent wear on the pedals',
          'To maintain control of the pedals',
          'To allow you to adjust your seat',
          'To allow you to walk for assistance if you break down'
        ],
        correctAnswer: 1, // To maintain control of the pedals
        section: 'questionsBank'
      },
      {
        id: 24,
        question: 'If you\'re involved in a collision, what will reduce the risk of neck injury?',
        options: [
          'An air-sprung seat',
          'Anti-lock brakes',
          'A collapsible steering wheel',
          'A properly adjusted head restraint'
        ],
        correctAnswer: 3, // A properly adjusted head restraint
        section: 'questionsBank'
      },
      {
        id: 25,
        question: 'What does it mean if your vehicle keeps bouncing after you sharply press down and release on the bodywork over a wheel?',
        options: [
          'The tyres are worn',
          'The tyres are under inflated',
          'The vehicle is on soft ground',
          'The shock absorbers are worn'
        ],
        correctAnswer: 3, // The shock absorbers are worn
        section: 'questionsBank'
      },
      {
        id: 26,
        question: 'How will a roof rack affect your car?',
        options: [
          'There will be less wind noise',
          'The engine will use more oil',
          'The car will accelerate faster',
          'Fuel consumption will increase'
        ],
        correctAnswer: 3, // Fuel consumption will increase
        section: 'questionsBank'
      },
      {
        id: 27,
        question: 'What makes your tyres illegal?',
        options: [
          'If they were bought second-hand',
          'If they have any large, deep cuts in the side wall',
          'If they\'re of different makes',
          'If they have different tread patterns'
        ],
        correctAnswer: 1, // If they have any large, deep cuts in the side wall
        section: 'questionsBank'
      },
      {
        id: 28,
        question: 'What\'s the legal minimum depth of tread for car tyres?',
        options: [
          '1 mm',
          '1.6 mm',
          '2.5 mm',
          '4 mm'
        ],
        correctAnswer: 1, // 1.6 mm
        section: 'questionsBank'
      },
      {
        id: 29,
        question: 'You\'re carrying two 13-year-old children and their parents in your car. Who\'s responsible for seeing that the children wear seat belts?',
        options: [
          'The children\'s parents',
          'You, the driver',
          'The front-seat passenger',
          'The children'
        ],
        correctAnswer: 1, // You, the driver
        section: 'questionsBank'
      },
      {
        id: 30,
        question: 'How can drivers help the environment?',
        options: [
          'By accelerating harshly',
          'By accelerating gently',
          'By using leaded fuel',
          'By driving faster'
        ],
        correctAnswer: 1, // By accelerating gently
        section: 'questionsBank'
      },
      {
        id: 31,
        question: 'How can you avoid wasting fuel?',
        options: [
          'By having your vehicle serviced regularly',
          'By revving the engine in the lower gears',
          'By keeping an empty roof rack on your vehicle',
          'By driving at higher speeds where possible'
        ],
        correctAnswer: 0, // By having your vehicle serviced regularly
        section: 'questionsBank'
      },
      {
        id: 32,
        question: 'What could you do to reduce the volume of traffic on the roads?',
        options: [
          'Drive in a bus lane',
          'Use a car with a smaller engine',
          'Walk or cycle on short journeys',
          'Travel by car at all times'
        ],
        correctAnswer: 2, // Walk or cycle on short journeys
        section: 'questionsBank'
      },
      {
        id: 33,
        question: 'What\'s most likely to waste fuel?',
        options: [
          'Reducing your speed',
          'Driving on motorways',
          'Using different brands of fuel',
          'Under-inflated tyres'
        ],
        correctAnswer: 3, // Under-inflated tyres
        section: 'questionsBank'
      },
      {
        id: 34,
        question: 'What part of the car does the law require you to keep in good condition?',
        options: [
          'The gearbox',
          'The transmission',
          'The door locks',
          'The seat belts'
        ],
        correctAnswer: 3, // The seat belts
        section: 'questionsBank'
      },
      {
        id: 35,
        question: 'How much more fuel will you use by driving at 70 mph, compared with driving at 50 mph?',
        options: [
          'About 5%',
          'About 15%',
          'About 75%',
          'About 100%'
        ],
        correctAnswer: 1, // About 15%
        section: 'questionsBank'
      },
      {
        id: 36,
        question: 'What should you do if your vehicle pulls to one side when you use the brakes?',
        options: [
          'Increase the pressure in your tyres',
          'Have the brakes checked as soon as possible',
          'Change gear and pump the brake pedal',
          'Use your parking brake at the same time'
        ],
        correctAnswer: 1, // Have the brakes checked as soon as possible
        section: 'questionsBank'
      },
      {
        id: 37,
        question: 'What will happen if your car\'s wheels are unbalanced?',
        options: [
          'The steering will pull to one side',
          'The steering will vibrate',
          'The brakes will fail',
          'The tyres will deflate'
        ],
        correctAnswer: 1, // The steering will vibrate
        section: 'questionsBank'
      },
      {
        id: 38,
        question: 'What can be damaged if you turn the steering wheel when the car is not moving?',
        options: [
          'The gearbox',
          'The engine',
          'The brakes',
          'The tyres'
        ],
        correctAnswer: 3, // The tyres
        section: 'questionsBank'
      },
      {
        id: 39,
        question: 'What\'s the safest thing to do if you have to leave valuables in your car?',
        options: [
          'Put them in a carrier bag',
          'Park near a school entrance',
          'Lock them out of sight',
          'Park near a bus stop'
        ],
        correctAnswer: 2, // Lock them out of sight
        section: 'questionsBank'
      },
      {
        id: 40,
        question: 'What may help to deter a thief from stealing your car?',
        options: [
          'Always keeping the headlights on',
          'Fitting reflective glass windows',
          'Always keeping the interior light on',
          'Etching the registration number on the windows'
        ],
        correctAnswer: 3, // Etching the registration number on the windows
        section: 'questionsBank'
      },
      {
        id: 41,
        question: 'What should you remove from your car before leaving it unattended?',
        options: [
          'The car dealer\'s details',
          'The owner\'s manual',
          'The service record',
          'The vehicle registration document'
        ],
        correctAnswer: 3, // The vehicle registration document
        section: 'questionsBank'
      },
      {
        id: 42,
        question: 'What should you do when leaving your vehicle parked and unattended?',
        options: [
          'Park near a busy junction',
          'Park in a housing estate',
          'Lock it and remove the key',
          'Leave the left indicator on'
        ],
        correctAnswer: 2, // Lock it and remove the key
        section: 'questionsBank'
      },
      {
        id: 43,
        question: 'What will reduce fuel consumption?',
        options: [
          'Driving more slowly',
          'Accelerating rapidly',
          'Late and heavy braking',
          'Staying in lower gears'
        ],
        correctAnswer: 0, // Driving more slowly
        section: 'questionsBank'
      },
      {
        id: 44,
        question: 'You service your own vehicle. How should you dispose of the old engine oil?',
        options: [
          'Take it to a local-authority site',
          'Pour it down a drain',
          'Tip it into a hole in the ground',
          'Put it in your dustbin'
        ],
        correctAnswer: 0, // Take it to a local-authority site
        section: 'questionsBank'
      },
      {
        id: 45,
        question: 'Why do MOT tests include an exhaust emission test?',
        options: [
          'To recover the cost of expensive garage equipment',
          'To help protect the environment against pollution',
          'To discover which fuel supplier is used the most',
          'To make sure diesel and petrol engines emit the same fumes'
        ],
        correctAnswer: 1, // To help protect the environment against pollution
        section: 'questionsBank'
      },
      {
        id: 46,
        question: 'How can you reduce the damage your vehicle causes to the environment?',
        options: [
          'Use narrow side streets',
          'Brake heavily',
          'Use busy routes',
          'Anticipate well ahead'
        ],
        correctAnswer: 3, // Anticipate well ahead
        section: 'questionsBank'
      },
      {
        id: 47,
        question: 'How will you benefit from following the manufacturer\'s service schedule for your vehicle?',
        options: [
          'Your vehicle will be cheaper to insure',
          'Your vehicle tax will be lower',
          'Your vehicle will remain reliable',
          'Your journey times will be reduced'
        ],
        correctAnswer: 2, // Your vehicle will remain reliable
        section: 'questionsBank'
      },
      {
        id: 48,
        question: 'How should you drive when you\'re driving along a road that has road humps?',
        options: [
          'Maintain a reduced speed throughout',
          'Accelerate quickly between the humps',
          'Always keep to the maximum legal speed',
          'Drive slowly at school times only'
        ],
        correctAnswer: 0, // Maintain a reduced speed throughout
        section: 'questionsBank'
      },
      {
        id: 49,
        question: 'When should you check the engine oil level?',
        options: [
          'Before a long journey',
          'When the engine is hot',
          'Early in the morning',
          'Every time you drive the car'
        ],
        correctAnswer: 0, // Before a long journey
        section: 'questionsBank'
      },
      {
        id: 50,
        question: 'You\'re having difficulty finding a parking space in a busy town. Can you park on the zigzag lines of a zebra crossing?',
        options: [
          'No, not unless you stay with your car',
          'Yes, in order to drop off a passenger',
          'Yes, if you do not block people from crossing',
          'No, not under any circumstances'
        ],
        correctAnswer: 3, // No, not under any circumstances
        section: 'questionsBank'
      },
      {
        id: 51,
        question: 'What should you do when you leave your car unattended for a few minutes?',
        options: [
          'Leave the engine running',
          'Switch the engine off but leave the key in',
          'Lock it and remove the key',
          'Park near a traffic warden'
        ],
        correctAnswer: 2, // Lock it and remove the key
        section: 'questionsBank'
      },
      {
        id: 52,
        question: 'Why should you try and park in a secure car park?',
        options: [
          'It makes it easy to find your car',
          'It helps deter thieves',
          'It stops the car being exposed to bad weather',
          'It does not cost anything to park here'
        ],
        correctAnswer: 1, // It helps deter thieves
        section: 'questionsBank'
      },
      {
        id: 53,
        question: 'Where would parking your vehicle cause an obstruction?',
        options: [
          'Alongside a parking meter',
          'In front of a property entrance',
          'On your driveway',
          'In a marked parking space'
        ],
        correctAnswer: 1, // In front of a property entrance
        section: 'questionsBank'
      },
      {
        id: 54,
        question: 'What\'s the most important reason for having a properly adjusted head restraint?',
        options: [
          'To make you more comfortable',
          'To help you avoid neck injury',
          'To help you relax',
          'To help you maintain your driving position'
        ],
        correctAnswer: 1, // To help you avoid neck injury
        section: 'questionsBank'
      },
      {
        id: 55,
        question: 'What can you do to reduce environmental damage caused by your vehicle?',
        options: [
          'Avoid using the cruise control',
          'Use the air conditioning whenever you drive',
          'Use the gears to slow the vehicle',
          'Avoid making a lot of short journeys'
        ],
        correctAnswer: 3, // Avoid making a lot of short journeys
        section: 'questionsBank'
      },
      {
        id: 56,
        question: 'What can people who live or work in towns and cities do to help reduce urban pollution levels?',
        options: [
          'Drive more quickly',
          'Over-rev in a low gear',
          'Walk or cycle',
          'Drive short journeys'
        ],
        correctAnswer: 2, // Walk or cycle
        section: 'questionsBank'
      },
      {
        id: 57,
        question: 'How can you reduce the chances of your car being broken into when leaving it unattended?',
        options: [
          'Take all valuables with you',
          'Park near a taxi rank',
          'Place any valuables on the floor',
          'Park near a fire station'
        ],
        correctAnswer: 0, // Take all valuables with you
        section: 'questionsBank'
      },
      {
        id: 58,
        question: 'How can you help to prevent your car radio being stolen?',
        options: [
          'Park in an unlit area',
          'Leave the radio turned on',
          'Park near a busy junction',
          'Install a security-coded radio'
        ],
        correctAnswer: 3, // Install a security-coded radio
        section: 'questionsBank'
      },
      {
        id: 59,
        question: 'How can you reduce the risk of your vehicle being broken into at night?',
        options: [
          'Leave it in a well-lit area',
          'Park in a quiet side road',
          'Do not engage the steering lock',
          'Park in a poorly lit area'
        ],
        correctAnswer: 0, // Leave it in a well-lit area
        section: 'questionsBank'
      },
      {
        id: 60,
        question: 'On a vehicle, where would you find a catalytic converter?',
        options: [
          'In the fuel tank',
          'In the air filter',
          'On the cooling system',
          'On the exhaust system'
        ],
        correctAnswer: 3, // On the exhaust system
        section: 'questionsBank'
      },
      {
        id: 61,
        question: 'What can you achieve if you drive smoothly?',
        options: [
          'Reduction in journey times by about 15%',
          'Increase in fuel consumption by about 15%',
          'Reduction in fuel consumption by about 15%',
          'Increase in journey times by about 15%'
        ],
        correctAnswer: 2, // Reduction in fuel consumption by about 15%
        section: 'questionsBank'
      },
      {
        id: 62,
        question: 'Which driving technique can help you save fuel?',
        options: [
          'Using lower gears as often as possible',
          'Accelerating sharply in each gear',
          'Using each gear in turn',
          'Missing out some gears'
        ],
        correctAnswer: 3, // Missing out some gears
        section: 'questionsBank'
      },
      {
        id: 63,
        question: 'How can driving in a fuel-efficient manner help protect the environment?',
        options: [
          'Through the legal enforcement of speed regulations',
          'By increasing the number of cars on the road',
          'Through increased fuel bills',
          'By reducing exhaust emissions'
        ],
        correctAnswer: 3, // By reducing exhaust emissions
        section: 'questionsBank'
      },
      {
        id: 64,
        question: 'What does fuel-efficient driving achieve?',
        options: [
          'Increased fuel consumption',
          'Improved road safety',
          'Damage to the environment',
          'Increased exhaust emissions'
        ],
        correctAnswer: 1, // Improved road safety
        section: 'questionsBank'
      },
      {
        id: 65,
        question: 'What\'s the legal minimum tread depth for tyres on your trailer or caravan?',
        options: [
          '1 mm',
          '1.6 mm',
          '2 mm',
          '2.6 mm'
        ],
        correctAnswer: 1, // 1.6 mm
        section: 'questionsBank'
      },
      {
        id: 66,
        question: 'When is fuel consumption at its highest?',
        options: [
          'When you\'re braking',
          'When you\'re coasting',
          'When you\'re accelerating',
          'When you\'re turning sharply'
        ],
        correctAnswer: 2, // When you're accelerating
        section: 'questionsBank'
      },
      {
        id: 67,
        question: 'When may a passenger travel in a car without wearing a seat belt?',
        options: [
          'When they\'re under 14 years old',
          'When they\'re under 1.5 metres (5 feet) in height',
          'When they\'re sitting in the rear seat',
          'When they\'re exempt for medical reasons'
        ],
        correctAnswer: 3, // When they're exempt for medical reasons
        section: 'questionsBank'
      },
      {
        id: 68,
        question: 'You\'re driving a friend\'s children home from school. They\'re both under 14 years old. Who\'s responsible for making sure they wear a seat belt or approved child restraint where required?',
        options: [
          'An adult passenger',
          'The children',
          'You, the driver',
          'Your friend'
        ],
        correctAnswer: 2, // You, the driver
        section: 'questionsBank'
      },
      {
        id: 69,
        question: 'What\'s likely to happen if you put too much oil in your engine?',
        options: [
          'The clutch pedal will lock',
          'The air intake will become blocked',
          'The timing belt will slip',
          'The oil seals will leak'
        ],
        correctAnswer: 3, // The oil seals will leak
        section: 'questionsBank'
      },
      {
        id: 70,
        question: 'You have to make an unexpected journey. You\'re carrying a five-year-old child on the back seat of your car. They\'re under 1.35 metres (4 feet 5 inches) tall. How should you seat them if a correct child restraint is not available?',
        options: [
          'Behind the passenger seat',
          'Using an adult seat belt',
          'Sharing a belt with an adult',
          'Between two other children'
        ],
        correctAnswer: 1, // Using an adult seat belt
        section: 'questionsBank'
      },
      {
        id: 71,
        question: 'You\'re carrying an 11-year-old child on the front seat of your car. They\'re under 1.35 metres (4 feet 5 inches) tall. What seat belt security must be in place?',
        options: [
          'They must use an adult seat belt',
          'They must be able to fasten their own seat belt',
          'They must use a suitable child restraint',
          'They must be able to see clearly out of the front window'
        ],
        correctAnswer: 2, // They must use a suitable child restraint
        section: 'questionsBank'
      },
      {
        id: 72,
        question: 'You\'re stopped at the side of the road. What must you do if you\'ll be waiting there for some time?',
        options: [
          'Switch off the engine',
          'Apply the steering lock',
          'Switch off the radio',
          'Use your headlights'
        ],
        correctAnswer: 0, // Switch off the engine
        section: 'questionsBank'
      },
      {
        id: 73,
        question: 'You want to put a rear-facing baby seat on the front passenger seat. What must you do if the passenger seat is protected by a frontal airbag?',
        options: [
          'Deactivate the airbag',
          'Turn the seat to face sideways',
          'Ask a passenger to hold the baby',
          'Put the child in an adult seat belt'
        ],
        correctAnswer: 0, // Deactivate the airbag
        section: 'questionsBank'
      },
      {
        id: 74,
        question: 'You\'re leaving your vehicle parked on a road and unattended. When may you leave the engine running?',
        options: [
          'If you\'ll be parking for less than five minutes',
          'If the battery keeps going flat',
          'When parked in a 20 mph zone',
          'Never if you\'re away from the vehicle'
        ],
        correctAnswer: 3, // Never if you're away from the vehicle
        section: 'questionsBank'
      },
      {
        id: 75,
        question: 'You\'re driving along a motorway and switch on adaptive cruise control. What are you now allowed to do?',
        options: [
          'Remove your seatbelt',
          'Eat and drink',
          'Use your handheld mobile phone',
          'Check the road signs'
        ],
        correctAnswer: 3, // Check the road signs
        section: 'questionsBank'
      },
      {
        id: 76,
        question: 'You\'re driving along a dual carriageway. This symbol is displayed on your dashboard. Which advanced driver assistance system is turned on?',
        options: [
          'Blind-spot assist',
          'Intelligent speed assist',
          'Lane-keep assist',
          'Traffic jam assist'
        ],
        correctAnswer: 2, // Lane-keep assist
        section: 'questionsBank'
      },
      {
        id: 77,
        question: 'You\'re driving a car with blind-spot monitoring function. What must you regularly check to make sure that the function will work properly?',
        options: [
          'That the sensors on the car are clean',
          'That the tyres are correctly inflated',
          'That the dash cam is securely attached',
          'That the car has a GPS signal'
        ],
        correctAnswer: 0, // That the sensors on the car are clean
        section: 'questionsBank'
      },
      {
        id: 78,
        question: 'Which advanced driver assistance system is designed to actively prevent collisions?',
        options: [
          'Automotive night vision',
          'Driver drowsiness detection',
          'Advanced emergency braking system',
          'Cruise control'
        ],
        correctAnswer: 2, // Advanced emergency braking system
        section: 'questionsBank'
      },
      {
        id: 79,
        question: 'Modern cars are often fitted with a variety of technologies, called advanced driver assistance systems. What is the main purpose of these systems?',
        options: [
          'To make the roads safer',
          'To reduce journey times',
          'To make driving easier',
          'To reduce environmental pollution'
        ],
        correctAnswer: 0, // To make the roads safer
        section: 'questionsBank'
      },
      {
        id: 80,
        question: 'You\'re driving along a quiet motorway. Which advanced driver assistance system is most likely to help you?',
        options: [
          'Traffic jam assist',
          'Automotive night vision',
          'Intelligent speed assist',
          'Lane-departure warning'
        ],
        correctAnswer: 3, // Lane-departure warning
        section: 'questionsBank'
      },
      {
        id: 81,
        question: 'You\'re driving a car fitted with driver drowsiness detection. When will your car alert you to take a break?',
        options: [
          'After driving without a break for 4 hours',
          'When sensors identify behaviours that suggest you\'re tired',
          'At pre-programmed times of day',
          'When you pass \'take a break\' road signs'
        ],
        correctAnswer: 1, // When sensors identify behaviours that suggest you're tired
        section: 'questionsBank'
      },
      {
        id: 82,
        question: 'You\'re driving an unfamiliar car fitted with advanced driver assistance systems (ADAS). Where would you find information about how to use the ADAS correctly?',
        options: [
          'Ask at your local garage',
          'In the manufacturer\'s handbook',
          'In the Highway Code',
          'Ask a motoring association'
        ],
        correctAnswer: 1, // In the manufacturer's handbook
        section: 'questionsBank'
      },
      // Safety Margins (Q149-182) - 34 questions
      {
        id: 83,
        question: 'How much can stopping distances increase in icy conditions?',
        options: [
          'Two times',
          'Three times',
          'Five times',
          'Ten times'
        ],
        correctAnswer: 3, // Ten times
        section: 'safetyMargins'
      },
      {
        id: 84,
        question: 'What requires extra care when you\'re driving or riding in windy conditions?',
        options: [
          'Using the brakes',
          'Moving off on a hill',
          'Turning into a narrow road',
          'Passing pedal cyclists'
        ],
        correctAnswer: 3, // Passing pedal cyclists
        section: 'safetyMargins'
      },
      {
        id: 85,
        question: 'Why should you keep well to the left as you approach a right-hand bend?',
        options: [
          'To improve your view of the road',
          'To overcome the effect of the road\'s slope',
          'To let faster traffic from behind overtake',
          'To be positioned safely if you skid'
        ],
        correctAnswer: 0, // To improve your view of the road
        section: 'safetyMargins'
      },
      {
        id: 86,
        question: 'You\'ve just gone through flood water. What should you do to make sure your brakes are working properly?',
        options: [
          'Accelerate and keep to a high speed for a short time',
          'Go slowly while gently applying the brakes',
          'Avoid using the brakes at all for a few miles',
          'Stop for at least an hour to allow them time to dry'
        ],
        correctAnswer: 1, // Go slowly while gently applying the brakes
        section: 'safetyMargins'
      },
      {
        id: 87,
        question: 'What will be affected if the road surface becomes soft in very hot weather?',
        options: [
          'The suspension',
          'The exhaust emissions',
          'The fuel consumption',
          'The tyre grip'
        ],
        correctAnswer: 3, // The tyre grip
        section: 'safetyMargins'
      },
      {
        id: 88,
        question: 'Where is your vehicle most likely to be affected by side winds?',
        options: [
          'On a narrow country lane',
          'On an open stretch of road',
          'On a busy stretch of road',
          'On a long, straight road'
        ],
        correctAnswer: 1, // On an open stretch of road
        section: 'safetyMargins'
      },
      {
        id: 89,
        question: 'You\'re following a vehicle on a wet road. You stay a safe distance behind it. What should you do if a driver overtakes you and pulls into the gap you\'ve left?',
        options: [
          'Flash your headlights as a warning',
          'Try to overtake safely as soon as you can',
          'Drop back to regain a safe distance',
          'Stay close to the other vehicle until it moves on'
        ],
        correctAnswer: 2, // Drop back to regain a safe distance
        section: 'safetyMargins'
      },
      {
        id: 90,
        question: 'You\'re travelling on the motorway. How can you lower the risk of a collision when the vehicle behind is following too closely?',
        options: [
          'Increase your distance from the vehicle in front',
          'Brake sharply',
          'Switch on your hazard warning lights',
          'Move onto the hard shoulder and stop'
        ],
        correctAnswer: 0, // Increase your distance from the vehicle in front
        section: 'safetyMargins'
      },
      {
        id: 91,
        question: 'You\'re following other vehicles in fog. You have your headlights on dipped beam. What else can you do to reduce the chances of being in a collision?',
        options: [
          'Keep close to the vehicle in front',
          'Use main beam instead of dipped headlights',
          'Keep up with the faster vehicles',
          'Keep a safe distance from the vehicle in front'
        ],
        correctAnswer: 3, // Keep a safe distance from the vehicle in front
        section: 'safetyMargins'
      },
      {
        id: 92,
        question: 'What should you do when you\'re using a contraflow system?',
        options: [
          'Choose an appropriate lane in good time',
          'Switch lanes to make better progress',
          'Increase speed to get through the contraflow more quickly',
          'Follow other motorists closely to avoid long queues'
        ],
        correctAnswer: 0, // Choose an appropriate lane in good time
        section: 'safetyMargins'
      },
      {
        id: 93,
        question: 'How can you avoid wheelspin when you\'re driving on an icy road?',
        options: [
          'Drive at a slow speed in the highest gear possible',
          'Use the parking brake if the wheels start to slip',
          'Brake gently and repeatedly',
          'Drive in a low gear at all times'
        ],
        correctAnswer: 0, // Drive at a slow speed in the highest gear possible
        section: 'safetyMargins'
      },
      {
        id: 94,
        question: 'What\'s the main cause of skidding?',
        options: [
          'The weather',
          'The driver',
          'The vehicle',
          'The road'
        ],
        correctAnswer: 1, // The driver
        section: 'safetyMargins'
      },
      {
        id: 95,
        question: 'You\'re driving in freezing conditions. What should you do as you approach a sharp bend?',
        options: [
          'Coast into the bend',
          'Apply your parking brake',
          'Firmly use your footbrake',
          'Slow down gently'
        ],
        correctAnswer: 3, // Slow down gently
        section: 'safetyMargins'
      },
      {
        id: 96,
        question: 'You\'re about to start a journey in freezing weather. What part of your vehicle should you clear of ice and snow?',
        options: [
          'The aerial',
          'The windows',
          'The bumper',
          'The boot'
        ],
        correctAnswer: 1, // The windows
        section: 'safetyMargins'
      },
      {
        id: 97,
        question: 'What will help you to move off on a snowy surface?',
        options: [
          'Using the car\'s lowest gear',
          'Using a higher gear than normal',
          'Using a high engine speed',
          'Using the parking brake and footbrake together'
        ],
        correctAnswer: 1, // Using a higher gear than normal
        section: 'safetyMargins'
      },
      {
        id: 98,
        question: 'What should you do when you\'re driving in snowy conditions?',
        options: [
          'Brake firmly and quickly',
          'Be ready to steer sharply',
          'Use sidelights only',
          'Brake gently in plenty of time'
        ],
        correctAnswer: 3, // Brake gently in plenty of time
        section: 'safetyMargins'
      },
      {
        id: 99,
        question: 'What\'s the main benefit of driving a four-wheel-drive vehicle?',
        options: [
          'Improved grip on the road',
          'Lower fuel consumption',
          'Shorter stopping distances',
          'Improved passenger comfort'
        ],
        correctAnswer: 0, // Improved grip on the road
        section: 'safetyMargins'
      },
      {
        id: 100,
        question: 'You\'re about to go down a steep hill. What should you do to control the speed of your vehicle?',
        options: [
          'Select a high gear and use the brakes carefully',
          'Select a high gear and use the brakes firmly',
          'Select a low gear and use the brakes carefully',
          'Select a low gear and avoid using the brakes'
        ],
        correctAnswer: 2, // Select a low gear and use the brakes carefully
        section: 'safetyMargins'
      },
      {
        id: 101,
        question: 'What should you do when you park a car facing downhill?',
        options: [
          'Turn the steering wheel towards the kerb',
          'Park close to the bumper of another car',
          'Park with two wheels on the kerb',
          'Turn the steering wheel away from the kerb'
        ],
        correctAnswer: 0, // Turn the steering wheel towards the kerb
        section: 'safetyMargins'
      },
      {
        id: 102,
        question: 'You\'re driving in a built-up area that has traffic-calming measures. What should you do when you approach a road hump?',
        options: [
          'Move across to the left-hand side of the road',
          'Wait for any pedestrians to cross',
          'Check your mirror and slow down',
          'Stop and check both pavements'
        ],
        correctAnswer: 2, // Check your mirror and slow down
        section: 'safetyMargins'
      },
      {
        id: 103,
        question: 'On what type of road surface may anti-lock brakes be ineffective?',
        options: [
          'Dry',
          'Loose',
          'Firm',
          'Smooth'
        ],
        correctAnswer: 1, // Loose
        section: 'safetyMargins'
      },
      {
        id: 104,
        question: 'You\'re driving a vehicle that has anti-lock brakes. How should you apply the footbrake when you need to stop in an emergency?',
        options: [
          'Slowly and gently',
          'Slowly but firmly',
          'Rapidly and gently',
          'Rapidly and firmly'
        ],
        correctAnswer: 3, // Rapidly and firmly
        section: 'safetyMargins'
      },
      {
        id: 105,
        question: 'You\'re driving along a country road. You see this sign. What should you do after dealing safely with the hazard?',
        options: [
          'Check your tyre pressures',
          'Switch on your hazard warning lights',
          'Accelerate briskly',
          'Test your brakes'
        ],
        correctAnswer: 3, // Test your brakes
        section: 'safetyMargins'
      },
      {
        id: 106,
        question: 'What would suggest you\'re driving on an icy road?',
        options: [
          'There\'s less wind noise',
          'There\'s less tyre noise',
          'There\'s less transmission noise',
          'There\'s less engine noise'
        ],
        correctAnswer: 1, // There's less tyre noise
        section: 'safetyMargins'
      },
      {
        id: 107,
        question: 'You\'re driving along a wet road. How can you tell if your vehicle\'s tyres are losing their grip on the surface?',
        options: [
          'The engine will stall',
          'The steering will feel very heavy',
          'The engine noise will increase',
          'The steering will feel very light'
        ],
        correctAnswer: 3, // The steering will feel very light
        section: 'safetyMargins'
      },
      {
        id: 108,
        question: 'In which conditions will your overall stopping distance increase?',
        options: [
          'In the rain',
          'In fog',
          'At night',
          'In strong winds'
        ],
        correctAnswer: 0, // In the rain
        section: 'safetyMargins'
      },
      {
        id: 109,
        question: 'You\'re driving on an open road in dry weather. What distance should you keep from the vehicle in front?',
        options: [
          'A two-second time gap',
          'One car length',
          'Two metres (6 feet 6 inches)',
          'Two car lengths'
        ],
        correctAnswer: 0, // A two-second time gap
        section: 'safetyMargins'
      },
      {
        id: 110,
        question: 'How can you use your vehicle\'s engine as a brake?',
        options: [
          'By changing to a lower gear',
          'By selecting reverse gear',
          'By changing to a higher gear',
          'By selecting neutral gear'
        ],
        correctAnswer: 0, // By changing to a lower gear
        section: 'safetyMargins'
      },
      {
        id: 111,
        question: 'How should you use anti-lock brakes when you need to stop in an emergency?',
        options: [
          'Keep pumping the footbrake to prevent skidding',
          'Brake normally but grip the steering wheel tightly',
          'Brake promptly and firmly until you\'ve stopped',
          'Apply the parking brake to reduce the stopping distance'
        ],
        correctAnswer: 2, // Brake promptly and firmly until you've stopped
        section: 'safetyMargins'
      },
      {
        id: 112,
        question: 'What lights should you use when you\'re driving on a wet motorway and vehicles are throwing up surface spray?',
        options: [
          'Hazard warning lights',
          'Dipped headlights',
          'Rear fog lights',
          'Sidelights'
        ],
        correctAnswer: 1, // Dipped headlights
        section: 'safetyMargins'
      },
      {
        id: 113,
        question: 'What can result when you travel for long distances in neutral (known as coasting)?',
        options: [
          'Improvement in control',
          'Easier steering',
          'Reduction in control',
          'Increased fuel consumption'
        ],
        correctAnswer: 2, // Reduction in control
        section: 'safetyMargins'
      },
      {
        id: 114,
        question: 'What should you do before starting a journey in foggy weather?',
        options: [
          'Wear a hi-visibility jacket',
          'Have a caffeinated drink',
          'Allow more time',
          'Reduce your tyre pressures'
        ],
        correctAnswer: 2, // Allow more time
        section: 'safetyMargins'
      },
      {
        id: 115,
        question: 'What should you do when you\'re overtaking a motorcyclist on a windy day?',
        options: [
          'Pass closely',
          'Pass very slowly',
          'Pass widely',
          'Pass immediately'
        ],
        correctAnswer: 2, // Pass widely
        section: 'safetyMargins'
      },
      {
        id: 116,
        question: 'What does it mean if the Electronic Stability Control (ESC) indicator light comes on briefly while you\'re driving?',
        options: [
          'The ESC system has activated',
          'The ESC system has a fault',
          'The ESC system is running a routine test',
          'The ESC system is switched off'
        ],
        correctAnswer: 0, // The ESC system has activated
        section: 'safetyMargins'
      }
    ]
  },
  4: {
    lessonTitle: 'Day 4: Hazard Awareness and Vulnerable Road Users',
    sections: {
      hazardAwareness: 'Hazard Awareness',
      vulnerableRoadUsers: 'Vulnerable Road Users'
    },
    questions: [
      // Questions 183-260 (78 questions) - Hazard Awareness
      {
        id: 1,
        question: 'Where would you expect to see these markers?',
        options: [
          'On a motorway sign',
          'On a railway bridge',
          'On a heavy goods vehicle',
          'On a diversion sign'
        ],
        correctAnswer: 2, // On a heavy goods vehicle
        section: 'hazardAwareness'
      },
      {
        id: 2,
        question: 'What\'s the main hazard shown in this picture?',
        options: [
          'Vehicles turning right',
          'Vehicles doing U-turns',
          'The cyclist crossing the road',
          'Parked cars around the corner'
        ],
        correctAnswer: 2, // The cyclist crossing the road
        section: 'hazardAwareness'
      },
      {
        id: 3,
        question: 'Which road user has caused a hazard?',
        options: [
          'The parked car (arrowed A)',
          'The pedestrian waiting to cross (arrowed B)',
          'The moving car (arrowed C)',
          'The car turning (arrowed D)'
        ],
        correctAnswer: 0, // The parked car (arrowed A)
        section: 'hazardAwareness'
      },
      {
        id: 4,
        question: 'What should the driver of the car approaching the crossing do?',
        options: [
          'Continue at the same speed',
          'Sound the horn',
          'Drive through quickly',
          'Slow down and get ready to stop'
        ],
        correctAnswer: 3, // Slow down and get ready to stop
        section: 'hazardAwareness'
      },
      {
        id: 5,
        question: 'What should the driver of the grey car be especially aware of?',
        options: [
          'The uneven road surface',
          'Traffic following behind',
          'Doors opening on parked cars',
          'Empty parking spaces'
        ],
        correctAnswer: 2, // Doors opening on parked cars
        section: 'hazardAwareness'
      },
      {
        id: 6,
        question: 'What should you expect if you see this sign ahead?',
        options: [
          'The road will go steeply uphill',
          'The road will go steeply downhill',
          'The road will bend sharply to the left',
          'The road will bend sharply to the right'
        ],
        correctAnswer: 2, // The road will bend sharply to the left
        section: 'hazardAwareness'
      },
      {
        id: 7,
        question: 'What should you do as you approach this cyclist?',
        options: [
          'Try to overtake before the cyclist gets to the junction',
          'Flash your headlights at the cyclist',
          'Slow down and allow the cyclist to turn',
          'Rev your engine so the cyclist knows you\'re following behind'
        ],
        correctAnswer: 2, // Slow down and allow the cyclist to turn
        section: 'hazardAwareness'
      },
      {
        id: 8,
        question: 'Why must you take great care when emerging from this junction?',
        options: [
          'The road surface is poor',
          'The footpath is narrow',
          'The kerbs are high',
          'The view is restricted'
        ],
        correctAnswer: 3, // The view is restricted
        section: 'hazardAwareness'
      },
      {
        id: 9,
        question: 'Which type of vehicle should you be ready to give way to as you approach this bridge?',
        options: [
          'Bicycles',
          'Buses',
          'Motorcycles',
          'Cars'
        ],
        correctAnswer: 1, // Buses
        section: 'hazardAwareness'
      },
      {
        id: 10,
        question: 'What type of vehicle could you expect to meet in the middle of the road?',
        options: [
          'Lorry',
          'Bicycle',
          'Car',
          'Motorcycle'
        ],
        correctAnswer: 0, // Lorry
        section: 'hazardAwareness'
      },
      {
        id: 11,
        question: 'What must you do at this junction?',
        options: [
          'Stop behind the line, then edge forward to see clearly',
          'Stop beyond the line, at a point where you can see clearly',
          'Stop only if there\'s traffic on the main road',
          'Stop only if you\'re turning right'
        ],
        correctAnswer: 0, // Stop behind the line, then edge forward to see clearly
        section: 'hazardAwareness'
      },
      {
        id: 12,
        question: 'What should you do if a driver pulls out of a side road in front of you, causing you to brake hard?',
        options: [
          'Ignore the error and stay calm',
          'Flash your lights to show your annoyance',
          'Sound your horn to show your annoyance',
          'Overtake as soon as possible'
        ],
        correctAnswer: 0, // Ignore the error and stay calm
        section: 'hazardAwareness'
      },
      {
        id: 13,
        question: 'Why should you make allowances for older drivers?',
        options: [
          'Older drivers are exempt from wearing seat belts',
          'Older drivers can only drive cars that have automatic gearboxes',
          'Older drivers\' reactions may be slower than other drivers',
          'Older drivers take more risks than other drivers'
        ],
        correctAnswer: 2, // Older drivers' reactions may be slower than other drivers
        section: 'hazardAwareness'
      },
      {
        id: 14,
        question: 'Do you need to plan rest stops when you\'re planning a long journey?',
        options: [
          'Yes, you should plan to stop every half an hour',
          'Yes, regular stops help concentration',
          'No, you\'ll be less tired if you get there as soon as possible',
          'No, only fuel stops will be needed'
        ],
        correctAnswer: 1, // Yes, regular stops help concentration
        section: 'hazardAwareness'
      },
      {
        id: 15,
        question: 'What should you do if the red lights start flashing as you approach a level crossing?',
        options: [
          'Go over it quickly',
          'Go over it carefully',
          'Stop before the barrier',
          'Switch on your hazard warning lights'
        ],
        correctAnswer: 2, // Stop before the barrier
        section: 'hazardAwareness'
      },
      {
        id: 16,
        question: 'You\'re approaching a crossroads. What should you do if the traffic lights have failed?',
        options: [
          'Brake and stop only for large vehicles',
          'Brake sharply to a stop before looking',
          'Be prepared to brake sharply to a stop',
          'Be prepared to stop for any traffic'
        ],
        correctAnswer: 3, // Be prepared to stop for any traffic
        section: 'hazardAwareness'
      },
      {
        id: 17,
        question: 'What should the driver of the red car (arrowed) do?',
        options: [
          'Wave towards the pedestrians who are waiting to cross',
          'Wait for the pedestrian in the road to cross',
          'Quickly drive behind the pedestrian in the road',
          'Tell the pedestrian in the road she should not have crossed'
        ],
        correctAnswer: 1, // Wait for the pedestrian in the road to cross
        section: 'hazardAwareness'
      },
      {
        id: 18,
        question: 'You\'re following a slower-moving vehicle. What should you do if there\'s a junction just ahead on the right?',
        options: [
          'Overtake after checking your mirrors and signalling',
          'Only consider overtaking when you\'re past the junction',
          'Accelerate quickly to overtake before reaching the junction',
          'Slow down and prepare to overtake on the left'
        ],
        correctAnswer: 1, // Only consider overtaking when you're past the junction
        section: 'hazardAwareness'
      },
      {
        id: 19,
        question: 'What should you do as you approach this overhead bridge?',
        options: [
          'Move out to the centre of the road before going through',
          'Find another route; this one is only for high vehicles',
          'Be prepared to give way to large vehicles in the middle of the road',
          'Move across to the right-hand side before going through'
        ],
        correctAnswer: 2, // Be prepared to give way to large vehicles in the middle of the road
        section: 'hazardAwareness'
      },
      {
        id: 20,
        question: 'Why are vehicle mirrors often slightly curved (convex)?',
        options: [
          'They give a wider field of vision',
          'They totally cover blind spots',
          'They make it easier to judge the speed of the traffic behind',
          'They make the traffic behind look bigger'
        ],
        correctAnswer: 0, // They give a wider field of vision
        section: 'hazardAwareness'
      },
      {
        id: 21,
        question: 'You\'re on a three-lane motorway. How should you overtake a slow-moving lorry in the middle lane if it\'s showing this sign?',
        options: [
          'Cautiously approach the lorry, then overtake on either side',
          'Follow the lorry until you can leave the motorway',
          'Use the right-hand lane and overtake the lorry normally',
          'Approach with care and overtake on the left of the lorry'
        ],
        correctAnswer: 3, // Approach with care and overtake on the left of the lorry
        section: 'hazardAwareness'
      },
      {
        id: 22,
        question: 'What should you do if you think the driver of the vehicle in front has forgotten to cancel their right indicator?',
        options: [
          'Flash your lights to alert the driver',
          'Sound your horn before overtaking',
          'Overtake on the left if there\'s room',
          'Stay behind and do not overtake'
        ],
        correctAnswer: 3, // Stay behind and do not overtake
        section: 'hazardAwareness'
      },
      {
        id: 23,
        question: 'What\'s the main hazard the driver of the red car (arrowed) should be aware of?',
        options: [
          'Glare from the sun may affect the driver\'s vision',
          'The black car may stop suddenly',
          'The bus may move out into the road',
          'Oncoming vehicles will assume the driver is turning right'
        ],
        correctAnswer: 2, // The bus may move out into the road
        section: 'hazardAwareness'
      },
      {
        id: 24,
        question: 'What type of vehicle displays this yellow sign?',
        options: [
          'A broken-down vehicle',
          'A school bus',
          'An ice-cream van',
          'A private ambulance'
        ],
        correctAnswer: 1, // A school bus
        section: 'hazardAwareness'
      },
      {
        id: 25,
        question: 'What hazard should you be aware of when travelling along this street?',
        options: [
          'Glare from the sun',
          'Lack of road markings',
          'Children running out between vehicles',
          'Heavy goods vehicles'
        ],
        correctAnswer: 2, // Children running out between vehicles
        section: 'hazardAwareness'
      },
      {
        id: 26,
        question: 'What\'s the main hazard you should be aware of when following this cyclist?',
        options: [
          'The cyclist may move to the left and dismount',
          'The cyclist may swerve into the road',
          'The cyclist may get off and push their bicycle',
          'The cyclist may wish to turn right at the end of the road'
        ],
        correctAnswer: 1, // The cyclist may swerve into the road
        section: 'hazardAwareness'
      },
      {
        id: 27,
        question: 'A driver\'s behaviour has upset you. How can you get over this incident safely?',
        options: [
          'Stop and take a break',
          'Shout abusive language',
          'Gesture to them with your hand',
          'Follow them, flashing your headlights'
        ],
        correctAnswer: 0, // Stop and take a break
        section: 'hazardAwareness'
      },
      {
        id: 28,
        question: 'How should you drive or ride in areas with traffic-calming measures?',
        options: [
          'At a reduced speed',
          'At the speed limit',
          'In the centre of the road',
          'With headlights on dipped beam'
        ],
        correctAnswer: 0, // At a reduced speed
        section: 'hazardAwareness'
      },
      {
        id: 29,
        question: 'Why should you slow down as you approach this hazard?',
        options: [
          'Because of the level crossing',
          'Because it\'s hard to see to the right',
          'Because of approaching traffic',
          'Because of animals crossing'
        ],
        correctAnswer: 0, // Because of the level crossing
        section: 'hazardAwareness'
      },
      {
        id: 30,
        question: 'Why are place names painted on the road surface?',
        options: [
          'To restrict the flow of traffic',
          'To warn of oncoming traffic',
          'To help you select the correct lane in good time',
          'To prevent you from changing lanes'
        ],
        correctAnswer: 2, // To help you select the correct lane in good time
        section: 'hazardAwareness'
      },
      {
        id: 31,
        question: 'Some two-way roads are divided into three lanes. Why are they particularly dangerous?',
        options: [
          'Traffic in both directions can use the middle lane to overtake',
          'Traffic can travel faster in poor weather conditions',
          'Traffic can overtake on the left',
          'Traffic uses the middle lane for emergencies only'
        ],
        correctAnswer: 0, // Traffic in both directions can use the middle lane to overtake
        section: 'hazardAwareness'
      },
      {
        id: 32,
        question: 'What type of vehicle uses an amber flashing beacon on a dual carriageway?',
        options: [
          'An ambulance',
          'A fire engine',
          'A doctor on call',
          'A tractor'
        ],
        correctAnswer: 3, // A tractor
        section: 'hazardAwareness'
      },
      {
        id: 33,
        question: 'What does this signal from a police officer mean to oncoming traffic?',
        options: [
          'Go ahead',
          'Stop',
          'Turn left',
          'Turn right'
        ],
        correctAnswer: 1, // Stop
        section: 'hazardAwareness'
      },
      {
        id: 34,
        question: 'Why should you be cautious when going past this bus waiting at a bus stop?',
        options: [
          'There\'s a zebra crossing ahead',
          'There are driveways on the left',
          'People may cross the road in front of it',
          'The road surface will be slippery'
        ],
        correctAnswer: 2, // People may cross the road in front of it
        section: 'hazardAwareness'
      },
      {
        id: 35,
        question: 'Where would it be unsafe to overtake?',
        options: [
          'On a single carriageway',
          'On a one-way street',
          'Approaching a junction',
          'Travelling up a long hill'
        ],
        correctAnswer: 2, // Approaching a junction
        section: 'hazardAwareness'
      },
      {
        id: 36,
        question: 'How can drinking alcohol affect your ability to drive or ride?',
        options: [
          'Your ability to judge speed will be reduced',
          'Your confidence will be reduced',
          'Your reactions will be faster',
          'Your awareness of danger will be improved'
        ],
        correctAnswer: 0, // Your ability to judge speed will be reduced
        section: 'hazardAwareness'
      },
      {
        id: 37,
        question: 'What does the solid white line at the side of the road indicate?',
        options: [
          'Traffic lights ahead',
          'Edge of the carriageway',
          'Footpath on the left',
          'Cycle path'
        ],
        correctAnswer: 1, // Edge of the carriageway
        section: 'hazardAwareness'
      },
      {
        id: 38,
        question: 'You\'re driving towards this level crossing. What would be the first warning of an approaching train?',
        options: [
          'Both half-barriers down',
          'A steady amber light',
          'One half-barrier down',
          'Twin flashing red lights'
        ],
        correctAnswer: 1, // A steady amber light
        section: 'hazardAwareness'
      },
      {
        id: 39,
        question: 'You\'re behind this cyclist. When the traffic lights change, what should you do?',
        options: [
          'Try to move off before the cyclist',
          'Allow the cyclist time and room',
          'Turn right but give the cyclist room',
          'Tap your horn and drive through first'
        ],
        correctAnswer: 1, // Allow the cyclist time and room
        section: 'hazardAwareness'
      },
      {
        id: 40,
        question: 'You intend to turn left at the traffic lights. What should you do just before turning?',
        options: [
          'Check your right mirror',
          'Move up closer to the car ahead',
          'Move out to the right',
          'Check for bicycles on your left'
        ],
        correctAnswer: 3, // Check for bicycles on your left
        section: 'hazardAwareness'
      },
      {
        id: 41,
        question: 'Why should you reduce your speed here?',
        options: [
          'A staggered junction is ahead',
          'A low bridge is ahead',
          'The road surface changes ahead',
          'The road narrows ahead'
        ],
        correctAnswer: 0, // A staggered junction is ahead
        section: 'hazardAwareness'
      },
      {
        id: 42,
        question: 'What might you expect to happen in this situation?',
        options: [
          'Traffic will move into the right-hand lane',
          'Traffic speed will increase',
          'Traffic will move into the left-hand lane',
          'Traffic will not need to change position'
        ],
        correctAnswer: 2, // Traffic will move into the left-hand lane
        section: 'hazardAwareness'
      },
      {
        id: 43,
        question: 'You\'re driving on a road with several lanes. What do these signs above the lanes mean?',
        options: [
          'The two right lanes are open',
          'The two left lanes are open',
          'Traffic in the left lanes should stop',
          'Traffic in the right lanes should stop'
        ],
        correctAnswer: 1, // The two left lanes are open
        section: 'hazardAwareness'
      },
      {
        id: 44,
        question: 'You\'re invited to a pub lunch. What should you do if you know that you\'ll have to drive in the evening?',
        options: [
          'Avoid mixing your alcoholic drinks',
          'Do not drink any alcohol at all',
          'Have some milk before drinking alcohol',
          'Eat a hot meal with your alcoholic drinks'
        ],
        correctAnswer: 1, // Do not drink any alcohol at all
        section: 'hazardAwareness'
      },
      {
        id: 45,
        question: 'What will become more expensive after you\'ve been convicted of driving while unfit through drink or drugs?',
        options: [
          'Road fund licence',
          'Insurance premiums',
          'Vehicle test certificate',
          'Driving licence'
        ],
        correctAnswer: 1, // Insurance premiums
        section: 'hazardAwareness'
      },
      {
        id: 46,
        question: 'What advice should you give to a driver who has had a few alcoholic drinks at a party?',
        options: [
          'Have a strong cup of coffee and then drive home',
          'Drive home carefully and slowly',
          'Go home by public transport',
          'Wait a short while and then drive home'
        ],
        correctAnswer: 2, // Go home by public transport
        section: 'hazardAwareness'
      },
      {
        id: 47,
        question: 'What should you do about driving if you\'ve been taking medicine that causes drowsiness?',
        options: [
          'Only drive if your journey is necessary',
          'Drive on quiet roads',
          'Ask someone to come with you',
          'Avoid driving and check with your doctor'
        ],
        correctAnswer: 3, // Avoid driving and check with your doctor
        section: 'hazardAwareness'
      },
      {
        id: 48,
        question: 'What should you do if a doctor prescribes drugs that are likely to affect your driving?',
        options: [
          'Only drive if someone is with you',
          'Avoid driving on motorways',
          'Get someone else to drive',
          'Never drive at more than 30 mph'
        ],
        correctAnswer: 2, // Get someone else to drive
        section: 'hazardAwareness'
      },
      {
        id: 49,
        question: 'What must you do if your ability to drive is impaired during a period of illness?',
        options: [
          'See your doctor each time before you drive',
          'Take smaller doses of any medicines',
          'Stop driving until you\'re fit to drive again',
          'Take all your medicines with you when you drive'
        ],
        correctAnswer: 2, // Stop driving until you're fit to drive again
        section: 'hazardAwareness'
      },
      {
        id: 50,
        question: 'What should you do if you begin to feel drowsy while you\'re driving?',
        options: [
          'Stop and rest as soon as possible',
          'Turn the heater up to keep you warm and comfortable',
          'Close the car windows to help you concentrate',
          'Continue with your journey but drive more slowly'
        ],
        correctAnswer: 0, // Stop and rest as soon as possible
        section: 'hazardAwareness'
      },
      {
        id: 51,
        question: 'What should you do if you become tired while you\'re driving on a motorway?',
        options: [
          'Pull up on the hard shoulder and change drivers',
          'Leave the motorway at the next exit and rest',
          'Increase your speed and turn up the radio volume',
          'Close all your windows and set the heating to warm'
        ],
        correctAnswer: 1, // Leave the motorway at the next exit and rest
        section: 'hazardAwareness'
      },
      {
        id: 52,
        question: 'You\'re about to drive home. What should you do if you feel very tired and have a severe headache?',
        options: [
          'Wait until you\'re fit and well before driving',
          'Drive home, but take a tablet for headaches',
          'Drive home if you can stay awake for the journey',
          'Wait for a short time, then drive home slowly'
        ],
        correctAnswer: 0, // Wait until you're fit and well before driving
        section: 'hazardAwareness'
      },
      {
        id: 53,
        question: 'What can you do to help prevent tiredness on a long journey?',
        options: [
          'Eat a large meal before driving',
          'Take regular refreshment breaks',
          'Play loud music in the car',
          'Complete the journey without stopping'
        ],
        correctAnswer: 1, // Take regular refreshment breaks
        section: 'hazardAwareness'
      },
      {
        id: 54,
        question: 'You take some cough medicine given to you by a friend. What should you do before driving your car?',
        options: [
          'Ask your friend if taking the medicine affected their driving',
          'Drink some strong coffee one hour before driving',
          'Check the label to see if the medicine will affect your driving',
          'Drive a short distance to see if the medicine is affecting your driving'
        ],
        correctAnswer: 2, // Check the label to see if the medicine will affect your driving
        section: 'hazardAwareness'
      },
      {
        id: 55,
        question: 'You\'re driving on a one-way street. What should you do if you realise you\'ve taken the wrong route?',
        options: [
          'Reverse out of the road',
          'Turn around in a side road',
          'Continue and find another route',
          'Reverse into a driveway'
        ],
        correctAnswer: 2, // Continue and find another route
        section: 'hazardAwareness'
      },
      {
        id: 56,
        question: 'What will be a serious distraction while you\'re driving?',
        options: [
          'Looking at road maps',
          'Switching on your demister',
          'Using your windscreen washers',
          'Looking in your door mirror'
        ],
        correctAnswer: 0, // Looking at road maps
        section: 'hazardAwareness'
      },
      {
        id: 57,
        question: 'What should you do if the vehicle starts reversing off the driveway?',
        options: [
          'Move to the opposite side of the road',
          'Drive through as you have priority',
          'Sound your horn and be prepared to stop',
          'Speed up and drive through quickly'
        ],
        correctAnswer: 2, // Sound your horn and be prepared to stop
        section: 'hazardAwareness'
      },
      {
        id: 58,
        question: 'You\'ve been involved in an argument that\'s made you feel angry. What should you do before starting your journey?',
        options: [
          'Open a window',
          'Turn on your radio',
          'Have an alcoholic drink',
          'Calm down'
        ],
        correctAnswer: 3, // Calm down
        section: 'hazardAwareness'
      },
      {
        id: 59,
        question: 'You\'re driving on this dual carriageway. Why may you need to slow down?',
        options: [
          'There\'s a broken white line in the centre',
          'There are solid white lines on either side',
          'There are roadworks ahead of you',
          'There are no footpaths'
        ],
        correctAnswer: 2, // There are roadworks ahead of you
        section: 'hazardAwareness'
      },
      {
        id: 60,
        question: 'You\'ve just been overtaken by this motorcyclist. What should you do if the rider cuts in sharply?',
        options: [
          'Sound the horn',
          'Brake firmly',
          'Keep a safe gap',
          'Flash your lights'
        ],
        correctAnswer: 2, // Keep a safe gap
        section: 'hazardAwareness'
      },
      {
        id: 61,
        question: 'You\'re about to drive your car. What should you do if you cannot find the glasses you need to wear?',
        options: [
          'Drive home slowly, keeping to quiet roads',
          'Borrow a friend\'s glasses and use those',
          'Drive home at night, so that the lights will help you',
          'Find a way of getting home without driving'
        ],
        correctAnswer: 3, // Find a way of getting home without driving
        section: 'hazardAwareness'
      },
      {
        id: 62,
        question: 'How does drinking alcohol affect your driving behaviour?',
        options: [
          'It improves judgement skills',
          'It increases confidence',
          'It leads to faster reactions',
          'It increases concentration'
        ],
        correctAnswer: 1, // It increases confidence
        section: 'hazardAwareness'
      },
      {
        id: 63,
        question: 'Why should you check the information leaflet before taking any medicine?',
        options: [
          'Drug companies want customer feedback on their products',
          'You may have to let your insurance company know about the medicine',
          'Some types of medicine can affect your ability to drive safely',
          'The medicine you take may affect your hearing'
        ],
        correctAnswer: 2, // Some types of medicine can affect your ability to drive safely
        section: 'hazardAwareness'
      },
      {
        id: 64,
        question: 'You need glasses to read a vehicle number plate at the required distance. When must you wear them?',
        options: [
          'Only in bad weather conditions',
          'Whenever you\'re driving',
          'When you think it\'s necessary',
          'Only at night time'
        ],
        correctAnswer: 1, // Whenever you're driving
        section: 'hazardAwareness'
      },
      {
        id: 65,
        question: 'Which type of glasses would make driving at night more difficult?',
        options: [
          'Half-moon',
          'Round',
          'Bifocal',
          'Tinted'
        ],
        correctAnswer: 3, // Tinted
        section: 'hazardAwareness'
      },
      {
        id: 66,
        question: 'What can seriously reduce your ability to concentrate?',
        options: [
          'Drugs',
          'Busy roads',
          'Tinted windows',
          'Weather conditions'
        ],
        correctAnswer: 0, // Drugs
        section: 'hazardAwareness'
      },
      {
        id: 67,
        question: 'What must you do if your eyesight has become very poor and you\'re no longer able to meet the driver\'s eyesight requirements?',
        options: [
          'Tell the driver licensing authority',
          'Tell your doctor',
          'Tell the police',
          'Tell your optician'
        ],
        correctAnswer: 0, // Tell the driver licensing authority
        section: 'hazardAwareness'
      },
      {
        id: 68,
        question: 'When should you use hazard warning lights?',
        options: [
          'When you\'re double-parked on a two-way road',
          'When your direction indicators are not working',
          'When warning oncoming traffic that you intend to stop',
          'When your vehicle has broken down and is causing an obstruction'
        ],
        correctAnswer: 3, // When your vehicle has broken down and is causing an obstruction
        section: 'hazardAwareness'
      },
      {
        id: 69,
        question: 'You want to turn left at this junction. What should you do if your view of the main road is restricted?',
        options: [
          'Stay well back and wait to see if anything comes',
          'Build up your speed so that you can emerge quickly',
          'Stop and apply the parking brake even if the road is clear',
          'Approach slowly and edge out until you can see more clearly'
        ],
        correctAnswer: 3, // Approach slowly and edge out until you can see more clearly
        section: 'hazardAwareness'
      },
      {
        id: 70,
        question: 'You\'re driving a car fitted with automatic transmission. When would you use \'kick-down\'?',
        options: [
          'To engage cruise control',
          'To accelerate quickly',
          'To brake progressively',
          'To improve fuel economy'
        ],
        correctAnswer: 1, // To accelerate quickly
        section: 'hazardAwareness'
      },
      {
        id: 71,
        question: 'What should you do if it\'s raining and you\'re following this lorry on a motorway?',
        options: [
          'Allow a two-second separation gap',
          'Switch your headlights onto main beam',
          'Move into a lane that has less spray',
          'Be aware of spray reducing your vision'
        ],
        correctAnswer: 3, // Be aware of spray reducing your vision
        section: 'hazardAwareness'
      },
      {
        id: 72,
        question: 'You\'re driving towards this left-hand bend. What danger should you be anticipating?',
        options: [
          'A vehicle overtaking you',
          'Mud on the road',
          'The road getting narrower',
          'Pedestrians walking towards you'
        ],
        correctAnswer: 3, // Pedestrians walking towards you
        section: 'hazardAwareness'
      },
      {
        id: 73,
        question: 'What should you do if the traffic in the left-hand lane is slowing?',
        options: [
          'Slow down, keeping a safe separation distance',
          'Accelerate past the vehicles in the left-hand lane',
          'Pull up on the left-hand verge',
          'Move across and continue in the right-hand lane'
        ],
        correctAnswer: 0, // Slow down, keeping a safe separation distance
        section: 'hazardAwareness'
      },
      {
        id: 74,
        question: 'When may you use hazard warning lights?',
        options: [
          'When driving on a motorway to warn traffic behind of a hazard ahead',
          'When you\'re double-parked on a two-way road',
          'When your direction indicators are not working',
          'When warning oncoming traffic that you intend to stop'
        ],
        correctAnswer: 0, // When driving on a motorway to warn traffic behind of a hazard ahead
        section: 'hazardAwareness'
      },
      {
        id: 75,
        question: 'You\'re waiting to emerge at a junction. Your view is restricted by parked vehicles. What can help you to see traffic on the road you\'re joining?',
        options: [
          'Looking for traffic behind you',
          'Reflections of traffic in windows',
          'Making eye contact with other road users',
          'Checking for traffic in your interior mirror'
        ],
        correctAnswer: 1, // Reflections of traffic in windows
        section: 'hazardAwareness'
      },
      {
        id: 76,
        question: 'What must you do if poor health affects your driving?',
        options: [
          'Inform your local police',
          'Avoid using motorways',
          'Always drive accompanied',
          'Inform the licensing authority'
        ],
        correctAnswer: 3, // Inform the licensing authority
        section: 'hazardAwareness'
      },
      {
        id: 77,
        question: 'Why should the junction on the left be kept clear?',
        options: [
          'To allow vehicles to enter and emerge',
          'To allow the bus to reverse',
          'To allow vehicles to make a U-turn',
          'To allow vehicles to park'
        ],
        correctAnswer: 0, // To allow vehicles to enter and emerge
        section: 'hazardAwareness'
      },
      {
        id: 78,
        question: 'What should you do if you start to feel drowsy while you\'re driving on a motorway?',
        options: [
          'Stop on the hard shoulder for a sleep',
          'Open a window and stop as soon as it\'s safe and legal',
          'Speed up to arrive at your destination sooner',
          'Slow down and let other drivers overtake'
        ],
        correctAnswer: 1, // Open a window and stop as soon as it's safe and legal
        section: 'hazardAwareness'
      },
      // Questions 261-331 (71 questions) - Vulnerable Road Users
      {
        id: 79,
        question: 'Which sign means that there may be people walking along the road?',
        options: [
          'Triangular sign with pedestrian symbol',
          'Circular sign with pedestrian',
          'Rectangular sign with warning',
          'Square sign with information'
        ],
        correctAnswer: 0, // Triangular sign with pedestrian symbol
        section: 'vulnerableRoadUsers'
      },
      {
        id: 80,
        question: 'What should you do if you want to turn left at a junction where pedestrians have started to cross?',
        options: [
          'Go around them, leaving plenty of room',
          'Stop and wave at them to cross',
          'Sound your horn and proceed',
          'Give way to them'
        ],
        correctAnswer: 3, // Give way to them
        section: 'vulnerableRoadUsers'
      },
      {
        id: 81,
        question: 'What hazard should you be especially aware of if you\'re turning left into a side road?',
        options: [
          'One-way street',
          'Pedestrians',
          'Traffic congestion',
          'Parked vehicles'
        ],
        correctAnswer: 1, // Pedestrians
        section: 'vulnerableRoadUsers'
      },
      {
        id: 82,
        question: 'Why should you check for motorcyclists just before turning right into a side road?',
        options: [
          'They may be overtaking on your left',
          'They may be following you closely',
          'They may be emerging from the side road',
          'They may be overtaking on your right'
        ],
        correctAnswer: 3, // They may be overtaking on your right
        section: 'vulnerableRoadUsers'
      },
      {
        id: 83,
        question: 'Why is a toucan crossing different from a puffin crossing?',
        options: [
          'Moped riders can use it',
          'It\'s controlled by a traffic warden',
          'It\'s controlled by two flashing lights',
          'Pedestrians and cyclists can use it together'
        ],
        correctAnswer: 3, // Pedestrians and cyclists can use it together
        section: 'vulnerableRoadUsers'
      },
      {
        id: 84,
        question: 'How will a school crossing patrol signal you to stop?',
        options: [
          'By pointing to children waiting to cross',
          'By displaying a red light',
          'By displaying a \'stop\' sign',
          'By giving you an arm signal'
        ],
        correctAnswer: 2, // By displaying a 'stop' sign
        section: 'vulnerableRoadUsers'
      },
      {
        id: 85,
        question: 'Where would you see this sign?',
        options: [
          'In the window of a car taking children to school',
          'At the side of the road',
          'At playground areas',
          'On the rear of a school bus or coach'
        ],
        correctAnswer: 3, // On the rear of a school bus or coach
        section: 'vulnerableRoadUsers'
      },
      {
        id: 86,
        question: 'What does this sign mean?',
        options: [
          'No route for pedestrians and cyclists',
          'A route for pedestrians only',
          'A route for cyclists only',
          'A route for pedestrians and cyclists'
        ],
        correctAnswer: 3, // A route for pedestrians and cyclists
        section: 'vulnerableRoadUsers'
      },
      {
        id: 87,
        question: 'You see a pedestrian carrying a white stick that also has a red band. What does this mean?',
        options: [
          'They have limited mobility',
          'They\'re deaf',
          'They\'re blind',
          'They\'re deaf and blind'
        ],
        correctAnswer: 3, // They're deaf and blind
        section: 'vulnerableRoadUsers'
      },
      {
        id: 88,
        question: 'What would you do if you see older people crossing the road ahead?',
        options: [
          'Wave them across so they know that you\'ve seen them',
          'Be patient and allow them to cross in their own time',
          'Rev the engine to let them know that you\'re waiting',
          'Tap the horn in case they\'re hard of hearing'
        ],
        correctAnswer: 1, // Be patient and allow them to cross in their own time
        section: 'vulnerableRoadUsers'
      },
      {
        id: 89,
        question: 'What should you do when you see an older person about to cross the road ahead?',
        options: [
          'Expect them to wait for you to pass',
          'Speed up to get past them quickly',
          'Stop and wave them across the road',
          'Be careful; they may misjudge your speed'
        ],
        correctAnswer: 3, // Be careful; they may misjudge your speed
        section: 'vulnerableRoadUsers'
      },
      {
        id: 90,
        question: 'You\'re approaching a roundabout. What should you do if a cyclist ahead is signalling to turn right?',
        options: [
          'Overtake on the right',
          'Give a warning with your horn',
          'Signal the cyclist to move across',
          'Give the cyclist plenty of room'
        ],
        correctAnswer: 3, // Give the cyclist plenty of room
        section: 'vulnerableRoadUsers'
      },
      {
        id: 91,
        question: 'Which vehicle should you allow extra room as you overtake them?',
        options: [
          'Lorry',
          'Tractor',
          'Bicycle',
          'Road-sweeper'
        ],
        correctAnswer: 2, // Bicycle
        section: 'vulnerableRoadUsers'
      },
      {
        id: 92,
        question: 'Why should you look carefully for motorcyclists and cyclists at junctions?',
        options: [
          'They may want to turn into the side road',
          'They may slow down to let you turn',
          'They\'re harder to see',
          'They might not see you turn'
        ],
        correctAnswer: 2, // They're harder to see
        section: 'vulnerableRoadUsers'
      },
      {
        id: 93,
        question: 'You\'re waiting to come out of a side road. Why should you look carefully for motorcycles?',
        options: [
          'Motorcycles are usually faster than cars',
          'Police patrols often use motorcycles',
          'Motorcycles can easily be hidden behind obstructions',
          'Motorcycles have right of way'
        ],
        correctAnswer: 2, // Motorcycles can easily be hidden behind obstructions
        section: 'vulnerableRoadUsers'
      },
      {
        id: 94,
        question: 'Why do motorcyclists use dipped headlights in daylight?',
        options: [
          'So that the rider can be seen more easily',
          'To stop the battery overcharging',
          'To improve the rider\'s vision',
          'The rider is inviting you to proceed'
        ],
        correctAnswer: 0, // So that the rider can be seen more easily
        section: 'vulnerableRoadUsers'
      },
      {
        id: 95,
        question: 'Why do motorcyclists wear bright clothing?',
        options: [
          'They must do so by law',
          'It helps keep them cool in summer',
          'The colours are popular',
          'To make them more visible'
        ],
        correctAnswer: 3, // To make them more visible
        section: 'vulnerableRoadUsers'
      },
      {
        id: 96,
        question: 'Why do motorcyclists often look round over their right shoulder just before turning right?',
        options: [
          'To listen for traffic behind them',
          'Motorcycles do not have mirrors',
          'It helps them balance as they turn',
          'To check for traffic in their blind area'
        ],
        correctAnswer: 3, // To check for traffic in their blind area
        section: 'vulnerableRoadUsers'
      },
      {
        id: 97,
        question: 'Which is the most vulnerable road user?',
        options: [
          'Car driver',
          'Tractor driver',
          'Lorry driver',
          'Motorcyclist'
        ],
        correctAnswer: 3, // Motorcyclist
        section: 'vulnerableRoadUsers'
      },
      {
        id: 98,
        question: 'You\'re approaching a roundabout. What should you do if there are horses being ridden in front of you?',
        options: [
          'Sound your horn as a warning',
          'Treat them like any other vehicle',
          'Give them plenty of room',
          'Accelerate past as quickly as possible'
        ],
        correctAnswer: 2, // Give them plenty of room
        section: 'vulnerableRoadUsers'
      },
      {
        id: 99,
        question: 'As you approach a pelican crossing, the lights change to green. What should you do if older people are still crossing?',
        options: [
          'Wave them to cross as quickly as they can',
          'Rev your engine to make them hurry',
          'Flash your lights in case they\'ve not noticed you',
          'Wait patiently while they cross'
        ],
        correctAnswer: 3, // Wait patiently while they cross
        section: 'vulnerableRoadUsers'
      },
      {
        id: 100,
        question: 'What action should you take when you see flashing amber lights under a school warning sign?',
        options: [
          'Reduce speed until you\'re clear of the area',
          'Keep up your speed and sound the horn',
          'Increase your speed to clear the area quickly',
          'Wait at the lights until they stop flashing'
        ],
        correctAnswer: 0, // Reduce speed until you're clear of the area
        section: 'vulnerableRoadUsers'
      },
      {
        id: 101,
        question: 'Why should these road markings be kept clear?',
        options: [
          'To allow children to be dropped off at school',
          'To allow teachers to park',
          'To allow children to be picked up after school',
          'To allow children to see and be seen when they\'re crossing the road'
        ],
        correctAnswer: 3, // To allow children to see and be seen when they're crossing the road
        section: 'vulnerableRoadUsers'
      },
      {
        id: 102,
        question: 'Where would you see this sign?',
        options: [
          'Near a school crossing',
          'At a playground entrance',
          'On a school bus',
          'At a \'pedestrians only\' area'
        ],
        correctAnswer: 2, // On a school bus
        section: 'vulnerableRoadUsers'
      },
      {
        id: 103,
        question: 'You\'re following two cyclists as they approach a roundabout in the left-hand lane. Where would you expect the cyclists to go?',
        options: [
          'Left',
          'Right',
          'Any direction',
          'Straight ahead'
        ],
        correctAnswer: 2, // Any direction
        section: 'vulnerableRoadUsers'
      },
      {
        id: 104,
        question: 'You\'re travelling behind a moped. What should you do if you want to turn left a short distance ahead?',
        options: [
          'Overtake the moped before the junction',
          'Pull alongside the moped and stay level until just before the junction',
          'Sound your horn as a warning and pull in front of the moped',
          'Stay behind until the moped has passed the junction'
        ],
        correctAnswer: 3, // Stay behind until the moped has passed the junction
        section: 'vulnerableRoadUsers'
      },
      {
        id: 105,
        question: 'You see a horse rider as you approach a roundabout. What should you do if they\'re signalling right but keeping well to the left?',
        options: [
          'Proceed as normal',
          'Keep close to them',
          'Cut in front of them',
          'Stay well back'
        ],
        correctAnswer: 3, // Stay well back
        section: 'vulnerableRoadUsers'
      },
      {
        id: 106,
        question: 'How should you react to inexperienced drivers?',
        options: [
          'Sound your horn to warn them of your presence',
          'Be patient and prepare for them to react more slowly',
          'Flash your headlights to indicate that it\'s safe for them to proceed',
          'Overtake them as soon as possible'
        ],
        correctAnswer: 1, // Be patient and prepare for them to react more slowly
        section: 'vulnerableRoadUsers'
      },
      {
        id: 107,
        question: 'What should you do when you\'re following a learner driver who stalls at a junction?',
        options: [
          'Be patient, as you expect them to make mistakes',
          'Stay very close behind and flash your headlights',
          'Start to rev your engine if they take too long to restart',
          'Immediately steer around them and drive on'
        ],
        correctAnswer: 0, // Be patient, as you expect them to make mistakes
        section: 'vulnerableRoadUsers'
      },
      {
        id: 108,
        question: 'You\'re on a country road. What should you expect to see coming towards you on your side of the road?',
        options: [
          'Motorcycles',
          'Bicycles',
          'Pedestrians',
          'Horse riders'
        ],
        correctAnswer: 2, // Pedestrians
        section: 'vulnerableRoadUsers'
      },
      {
        id: 109,
        question: 'You\'re following a cyclist. What should you do when you wish to turn left a short distance ahead?',
        options: [
          'Overtake the cyclist before you reach the junction',
          'Pull alongside the cyclist and stay level until after the junction',
          'Hold back until the cyclist has passed the junction',
          'Go around the cyclist on the junction'
        ],
        correctAnswer: 2, // Hold back until the cyclist has passed the junction
        section: 'vulnerableRoadUsers'
      },
      {
        id: 110,
        question: 'A horse rider is in the left-hand lane approaching a roundabout. Where should you expect the rider to go?',
        options: [
          'In any direction',
          'To the right',
          'To the left',
          'Straight ahead'
        ],
        correctAnswer: 0, // In any direction
        section: 'vulnerableRoadUsers'
      },
      {
        id: 111,
        question: 'Powered vehicles used by disabled people are small and can be hard to see. What must they display if they\'re travelling on a dual carriageway?',
        options: [
          'Flashing red beacon',
          'Flashing green beacon',
          'Flashing blue beacon',
          'Flashing amber beacon'
        ],
        correctAnswer: 3, // Flashing amber beacon
        section: 'vulnerableRoadUsers'
      },
      {
        id: 112,
        question: 'What does it mean when a moving vehicle is showing a flashing amber beacon?',
        options: [
          'The vehicle is slow moving',
          'The vehicle has broken down',
          'The vehicle is a doctor\'s car',
          'The vehicle belongs to a school crossing patrol'
        ],
        correctAnswer: 0, // The vehicle is slow moving
        section: 'vulnerableRoadUsers'
      },
      {
        id: 113,
        question: 'What does this sign mean?',
        options: [
          'Contraflow cycle lane',
          'With-flow cycle lane',
          'Cycles and buses only',
          'No cycles or buses'
        ],
        correctAnswer: 1, // With-flow cycle lane
        section: 'vulnerableRoadUsers'
      },
      {
        id: 114,
        question: 'What should you do when you see these horse riders in front?',
        options: [
          'Pull out to the middle of the road',
          'Slow down and be ready to stop',
          'Switch on your hazard warning lights',
          'Give a right-turn signal'
        ],
        correctAnswer: 1, // Slow down and be ready to stop
        section: 'vulnerableRoadUsers'
      },
      {
        id: 115,
        question: 'What\'s the purpose of these road markings?',
        options: [
          'To make sure children can see and be seen when they\'re crossing the road',
          'To allow teachers to have clear access to the school',
          'To make sure delivery vehicles have easy access to the school',
          'To allow parents to pick up or drop off children safely'
        ],
        correctAnswer: 0, // To make sure children can see and be seen when they're crossing the road
        section: 'vulnerableRoadUsers'
      },
      {
        id: 116,
        question: 'What should you do if the left-hand pavement is closed due to street repairs?',
        options: [
          'Watch out for pedestrians walking in the road',
          'Use your right-hand mirror more often',
          'Speed up to get past the roadworks more quickly',
          'Position close to the left-hand kerb'
        ],
        correctAnswer: 0, // Watch out for pedestrians walking in the road
        section: 'vulnerableRoadUsers'
      },
      {
        id: 117,
        question: 'What should you do when you\'re following a motorcyclist along a road that has a poor surface?',
        options: [
          'Follow closely so they can see you in their mirrors',
          'Overtake immediately to avoid delays',
          'Allow extra room in case they swerve to avoid potholes',
          'Allow the same room as normal to avoid wasting road space'
        ],
        correctAnswer: 2, // Allow extra room in case they swerve to avoid potholes
        section: 'vulnerableRoadUsers'
      },
      {
        id: 118,
        question: 'What does this sign mean?',
        options: [
          'No cycling',
          'Cycle route ahead',
          'Cycle parking only',
          'End of cycle route'
        ],
        correctAnswer: 3, // End of cycle route
        section: 'vulnerableRoadUsers'
      },
      {
        id: 119,
        question: 'You\'re approaching this roundabout. What should you do when a cyclist is keeping to the left while signalling to turn right?',
        options: [
          'Sound your horn',
          'Overtake them',
          'Assume they\'re turning left',
          'Allow them space to turn'
        ],
        correctAnswer: 3, // Allow them space to turn
        section: 'vulnerableRoadUsers'
      },
      {
        id: 120,
        question: 'What should you do when you\'re approaching this crossing?',
        options: [
          'Prepare to slow down and stop',
          'Stop and wave the pedestrians across',
          'Speed up and pass by quickly',
          'Continue unless the pedestrians step out'
        ],
        correctAnswer: 0, // Prepare to slow down and stop
        section: 'vulnerableRoadUsers'
      },
      {
        id: 121,
        question: 'What does it mean if you see a pedestrian with a dog that has a yellow or burgundy coat?',
        options: [
          'The pedestrian is an older person',
          'The pedestrian is a dog trainer',
          'The pedestrian is colour-blind',
          'The pedestrian is deaf'
        ],
        correctAnswer: 3, // The pedestrian is deaf
        section: 'vulnerableRoadUsers'
      },
      {
        id: 122,
        question: 'Who may use toucan crossings?',
        options: [
          'Motorcyclists and cyclists',
          'Motorcyclists and pedestrians',
          'Only cyclists',
          'Cyclists and pedestrians'
        ],
        correctAnswer: 3, // Cyclists and pedestrians
        section: 'vulnerableRoadUsers'
      },
      {
        id: 123,
        question: 'This junction, controlled by traffic lights, has a marked area between two stop lines. What\'s this for?',
        options: [
          'To allow taxis to position in front of other traffic',
          'To allow people with disabilities to cross the road',
          'To allow cyclists and pedestrians to cross the road together',
          'To allow cyclists to position in front of other traffic'
        ],
        correctAnswer: 3, // To allow cyclists to position in front of other traffic
        section: 'vulnerableRoadUsers'
      },
      {
        id: 124,
        question: 'You\'re about to overtake a cyclist. Why should you leave them as much room as you would give to a car?',
        options: [
          'The cyclist might speed up',
          'The cyclist might get off their bicycle',
          'The cyclist might be unsettled if you pass too near them',
          'The cyclist might have to make a left turn'
        ],
        correctAnswer: 2, // The cyclist might be unsettled if you pass too near them
        section: 'vulnerableRoadUsers'
      },
      {
        id: 125,
        question: 'What should you do when you\'re passing loose sheep on the road?',
        options: [
          'Briefly sound your horn',
          'Go very slowly',
          'Pass quickly but quietly',
          'Herd them to the side of the road'
        ],
        correctAnswer: 1, // Go very slowly
        section: 'vulnerableRoadUsers'
      },
      {
        id: 126,
        question: 'At night, what does it mean if you see a pedestrian wearing reflective clothing and carrying a bright red light?',
        options: [
          'You\'re approaching roadworks',
          'You\'re approaching an organised walk',
          'You\'re approaching a slow-moving vehicle',
          'You\'re approaching a traffic danger spot'
        ],
        correctAnswer: 1, // You're approaching an organised walk
        section: 'vulnerableRoadUsers'
      },
      {
        id: 127,
        question: 'You\'ve just passed your driving test. How can you reduce your risk of being involved in a collision?',
        options: [
          'By always staying close to the vehicle in front',
          'By never going over 40 mph',
          'By staying in the left-hand lane on all roads',
          'By taking further training'
        ],
        correctAnswer: 3, // By taking further training
        section: 'vulnerableRoadUsers'
      },
      {
        id: 128,
        question: 'You\'re turning right from a main road into a side road. There\'s no oncoming traffic. What should you do if pedestrians are standing on the pavement waiting to cross the side road?',
        options: [
          'Turn in because the pedestrians are safe on the pavement',
          'Wave at the pedestrians, inviting them to cross the road',
          'Wait and give way to the pedestrians',
          'Sound your horn to alert the pedestrians to your presence'
        ],
        correctAnswer: 2, // Wait and give way to the pedestrians
        section: 'vulnerableRoadUsers'
      },
      {
        id: 129,
        question: 'You\'re travelling on a narrow section of road. What should you do if a horse rider ahead is riding in the centre of the lane?',
        options: [
          'Sound your horn to alert them to your presence',
          'Stay behind and allow them to ride in this position',
          'Move across to the right and try to ease past them',
          'Get up close behind to encourage them to move aside'
        ],
        correctAnswer: 1, // Stay behind and allow them to ride in this position
        section: 'vulnerableRoadUsers'
      },
      {
        id: 130,
        question: 'You\'re about to overtake a cyclist on a road that has a 30 mph speed limit. How much room should you leave them as you overtake?',
        options: [
          'At least as much room as you would if you were overtaking a car',
          'At least a car\'s width',
          'At least a car\'s length',
          'At least 2 car widths'
        ],
        correctAnswer: 0, // At least as much room as you would if you were overtaking a car
        section: 'vulnerableRoadUsers'
      },
      {
        id: 131,
        question: 'You\'re turning left from a main road into a side road. What should you do if there\'s a pedestrian on the pavement waiting to cross the side road?',
        options: [
          'Flash your lights to encourage the pedestrian to cross',
          'Carry on turning into the side road',
          'Sound your horn to let the pedestrian know you\'re there',
          'Wait and give way to the pedestrian'
        ],
        correctAnswer: 3, // Wait and give way to the pedestrian
        section: 'vulnerableRoadUsers'
      },
      {
        id: 132,
        question: 'You want to reverse into a side road. What should you do if you\'re not sure that the area behind your car is clear?',
        options: [
          'Look through the rear window only',
          'Get out and check',
          'Check the mirrors only',
          'Carry on, assuming it\'s clear'
        ],
        correctAnswer: 1, // Get out and check
        section: 'vulnerableRoadUsers'
      },
      {
        id: 133,
        question: 'You\'re about to reverse into a side road. What should you do if a pedestrian is waiting to cross behind your car?',
        options: [
          'Wave to the pedestrian to stop',
          'Give way to the pedestrian',
          'Sound your horn to warn the pedestrian',
          'Reverse before the pedestrian starts to cross'
        ],
        correctAnswer: 1, // Give way to the pedestrian
        section: 'vulnerableRoadUsers'
      },
      {
        id: 134,
        question: 'Which road users are most difficult to see when you\'re reversing your car?',
        options: [
          'Motorcyclists',
          'Car drivers',
          'Cyclists',
          'Children'
        ],
        correctAnswer: 3, // Children
        section: 'vulnerableRoadUsers'
      },
      {
        id: 135,
        question: 'You want to turn right from a junction. What should you do if your view is restricted by parked vehicles?',
        options: [
          'Move out quickly, but be prepared to stop',
          'Sound your horn and pull out if there\'s no reply',
          'Stop, then move forward slowly until you have a clear view',
          'Stop, get out and look along the main road to check'
        ],
        correctAnswer: 2, // Stop, then move forward slowly until you have a clear view
        section: 'vulnerableRoadUsers'
      },
      {
        id: 136,
        question: 'You\'re at the front of a queue of traffic waiting to turn right into a side road. Why is it important to check your right mirror just before turning?',
        options: [
          'To look for pedestrians about to cross',
          'To check for overtaking vehicles',
          'To make sure the side road is clear',
          'To check for emerging traffic'
        ],
        correctAnswer: 1, // To check for overtaking vehicles
        section: 'vulnerableRoadUsers'
      },
      {
        id: 137,
        question: 'You\'ve driven up to a pelican crossing. What must you do while the amber light is flashing?',
        options: [
          'Signal the pedestrian to cross',
          'Always wait for the green light before proceeding',
          'Give way to any pedestrians on the crossing',
          'Wait for the red-and-amber light before proceeding'
        ],
        correctAnswer: 2, // Give way to any pedestrians on the crossing
        section: 'vulnerableRoadUsers'
      },
      {
        id: 138,
        question: 'You\'ve stopped at a pelican crossing. What should you do if a disabled person is crossing slowly in front of you and the lights change to green?',
        options: [
          'Wait for them to finish crossing',
          'Drive in front of them',
          'Edge forward slowly',
          'Sound your horn'
        ],
        correctAnswer: 0, // Wait for them to finish crossing
        section: 'vulnerableRoadUsers'
      },
      {
        id: 139,
        question: 'You\'re driving past a line of parked cars. What should you do if a ball bounces out into the road ahead?',
        options: [
          'Continue driving at the same speed and sound your horn',
          'Continue driving at the same speed and flash your headlights',
          'Slow down and be prepared to stop for children',
          'Stop and wave the children across to fetch their ball'
        ],
        correctAnswer: 2, // Slow down and be prepared to stop for children
        section: 'vulnerableRoadUsers'
      },
      {
        id: 140,
        question: 'You want to turn right from a main road into a side road. What should you do just before turning?',
        options: [
          'Cancel your right-turn signal',
          'Select first gear',
          'Check for traffic overtaking on your right',
          'Stop and set the parking brake'
        ],
        correctAnswer: 2, // Check for traffic overtaking on your right
        section: 'vulnerableRoadUsers'
      },
      {
        id: 141,
        question: 'You\'re driving in a slow-moving queue of traffic. What should you do just before changing lane?',
        options: [
          'Sound the horn and flash your lights',
          'Look for motorcyclists filtering through the traffic',
          'Give a \'slowing down\' arm signal',
          'Change down to first gear'
        ],
        correctAnswer: 1, // Look for motorcyclists filtering through the traffic
        section: 'vulnerableRoadUsers'
      },
      {
        id: 142,
        question: 'You\'re driving in town. Why should you be careful if there\'s a bus at a bus stop on the other side of the road?',
        options: [
          'The bus might have broken down',
          'Pedestrians might come from behind the bus',
          'The bus might move off suddenly',
          'The bus might remain stationary'
        ],
        correctAnswer: 1, // Pedestrians might come from behind the bus
        section: 'vulnerableRoadUsers'
      },
      {
        id: 143,
        question: 'How should you overtake horse riders?',
        options: [
          'Drive up close and overtake as soon as possible',
          'Speed is not important but allow plenty of room',
          'Use your horn just once to warn them',
          'Drive slowly and leave plenty of room'
        ],
        correctAnswer: 3, // Drive slowly and leave plenty of room
        section: 'vulnerableRoadUsers'
      },
      {
        id: 144,
        question: 'Why should you allow extra room while overtaking a motorcyclist on a windy day?',
        options: [
          'The rider may turn off suddenly to get out of the wind',
          'The rider may be blown in front of you',
          'The rider may stop suddenly',
          'The rider may be travelling faster than normal'
        ],
        correctAnswer: 1, // The rider may be blown in front of you
        section: 'vulnerableRoadUsers'
      },
      {
        id: 145,
        question: 'Where should you take particular care to look for motorcyclists and cyclists?',
        options: [
          'On dual carriageways',
          'At junctions',
          'At zebra crossings',
          'On one-way streets'
        ],
        correctAnswer: 1, // At junctions
        section: 'vulnerableRoadUsers'
      },
      {
        id: 146,
        question: 'The road outside this school is marked with yellow zigzag lines. What do these lines mean?',
        options: [
          'You may park on the lines when dropping off schoolchildren',
          'You may park on the lines when picking up schoolchildren',
          'You should not wait or park your vehicle here',
          'You must stay with your vehicle if you park here'
        ],
        correctAnswer: 2, // You should not wait or park your vehicle here
        section: 'vulnerableRoadUsers'
      },
      {
        id: 147,
        question: 'You\'re driving past parked cars. What should you do if you see a bicycle wheel sticking out between the cars?',
        options: [
          'Accelerate past quickly and sound your horn',
          'Slow down and wave the cyclist across',
          'Brake sharply and flash your headlights',
          'Slow down and be prepared to stop for a cyclist'
        ],
        correctAnswer: 3, // Slow down and be prepared to stop for a cyclist
        section: 'vulnerableRoadUsers'
      },
      {
        id: 148,
        question: 'You\'re driving at night. What should you do if you\'re dazzled by a vehicle behind you?',
        options: [
          'Set your mirror to the anti-dazzle position',
          'Set your mirror to dazzle the other driver',
          'Brake sharply to a stop',
          'Switch your rear lights on and off'
        ],
        correctAnswer: 0, // Set your mirror to the anti-dazzle position
        section: 'vulnerableRoadUsers'
      },
      {
        id: 149,
        question: 'You\'re driving towards a zebra crossing. What should you do if a person in a wheelchair is waiting to cross?',
        options: [
          'Continue on your way',
          'Wave to the person to cross',
          'Wave to the person to wait',
          'Be prepared to stop'
        ],
        correctAnswer: 3, // Be prepared to stop
        section: 'vulnerableRoadUsers'
      }
    ]
  },
  5: {
    lessonTitle: 'Day 5: Other Vehicles and Vehicle Handling',
    sections: {
      otherTypesOfVehicle: 'Other Types of Vehicle',
      vehicleHandling: 'Vehicle Handling'
    },
    questions: [
      // Other Types of Vehicle (Q332-353) - 22 questions
      {
        id: 1,
        question: 'You\'re about to overtake a slow-moving motorcyclist. Which sign would make you take special care?',
        options: [
          'Triangular sign with bend symbol',
          'Circular sign with speed limit',
          'Rectangular sign with direction',
          'Square sign with information'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'otherTypesOfVehicle'
      },
      {
        id: 2,
        question: 'You\'re waiting to turn right out of a minor road. It\'s clear to the left but a lorry is coming from the right. Why should you wait, even if you have enough time to turn?',
        options: [
          'Anything overtaking the lorry will be hidden from view',
          'The lorry could suddenly speed up',
          'The lorry might be slowing down',
          'The load on the lorry might be unstable'
        ],
        correctAnswer: 0, // Anything overtaking the lorry will be hidden from view
        section: 'otherTypesOfVehicle'
      },
      {
        id: 3,
        question: 'You\'re following a long vehicle as it approaches a crossroads. What should you do if it signals left but moves out to the right?',
        options: [
          'Get closer in order to pass it quickly',
          'Stay well back and give it room',
          'Assume the signal is wrong and that it\'s turning right',
          'Overtake it as it starts to slow down'
        ],
        correctAnswer: 1, // Stay well back and give it room
        section: 'otherTypesOfVehicle'
      },
      {
        id: 4,
        question: 'You\'re following a long vehicle approaching a crossroads. What should you do if the driver signals right but moves close to the left-hand kerb?',
        options: [
          'Warn the driver about the wrong signal',
          'Wait behind the long vehicle',
          'Report the driver to the police',
          'Overtake on the right-hand side'
        ],
        correctAnswer: 1, // Wait behind the long vehicle
        section: 'otherTypesOfVehicle'
      },
      {
        id: 5,
        question: 'You\'re approaching a mini-roundabout. What should you do if a long vehicle in front signals left but positions over to the right?',
        options: [
          'Sound your horn',
          'Overtake on the left',
          'Follow the same course as the lorry',
          'Keep well back'
        ],
        correctAnswer: 3, // Keep well back
        section: 'otherTypesOfVehicle'
      },
      {
        id: 6,
        question: 'You\'re driving on a single carriageway road. Why should you keep well back while you\'re following a large vehicle?',
        options: [
          'To give yourself acceleration space if you decide to overtake',
          'To get the best view of the road ahead',
          'To leave a gap in case the vehicle stops and rolls back',
          'To offer other drivers a safe gap if they want to overtake you'
        ],
        correctAnswer: 1, // To get the best view of the road ahead
        section: 'otherTypesOfVehicle'
      },
      {
        id: 7,
        question: 'You\'re travelling behind a bus. What should you do if it pulls up at a bus stop?',
        options: [
          'Accelerate past the bus',
          'Look for pedestrians',
          'Sound your horn',
          'Pull in closely behind the bus'
        ],
        correctAnswer: 1, // Look for pedestrians
        section: 'otherTypesOfVehicle'
      },
      {
        id: 8,
        question: 'You\'re following a lorry on a wet road. What should you do when spray makes it difficult to see the road ahead?',
        options: [
          'Drop back until you can see better',
          'Put your headlights on full beam',
          'Keep close to the lorry, away from the spray',
          'Speed up and overtake quickly'
        ],
        correctAnswer: 0, // Drop back until you can see better
        section: 'otherTypesOfVehicle'
      },
      {
        id: 9,
        question: 'You\'re leaving a safe gap as you follow a large vehicle. What should you do if a car moves into this gap?',
        options: [
          'Sound your horn',
          'Drop back further',
          'Flash your headlights',
          'Start to overtake'
        ],
        correctAnswer: 1, // Drop back further
        section: 'otherTypesOfVehicle'
      },
      {
        id: 10,
        question: 'What should you do when you\'re approaching a bus that\'s signalling to move away from a bus stop?',
        options: [
          'Get past before it moves',
          'Allow it to pull away, if it\'s safe to do so',
          'Flash your headlights as you approach',
          'Signal left and wave the bus on'
        ],
        correctAnswer: 1, // Allow it to pull away, if it's safe to do so
        section: 'otherTypesOfVehicle'
      },
      {
        id: 11,
        question: 'What should you do if you want to overtake a long, slow-moving vehicle on a busy road?',
        options: [
          'Follow it closely and keep moving out to see the road ahead',
          'Flash your headlights for the oncoming traffic to give way',
          'Stay behind until the driver waves you past',
          'Keep well back so that you get a good view of the road ahead'
        ],
        correctAnswer: 3, // Keep well back so that you get a good view of the road ahead
        section: 'otherTypesOfVehicle'
      },
      {
        id: 12,
        question: 'Which vehicles are least likely to be affected by side wind?',
        options: [
          'Cyclists',
          'Motorcyclists',
          'High-sided vehicles',
          'Cars'
        ],
        correctAnswer: 3, // Cars
        section: 'otherTypesOfVehicle'
      },
      {
        id: 13,
        question: 'What should you do as you approach this lorry?',
        options: [
          'Slow down and be prepared to wait',
          'Make the lorry wait for you',
          'Flash your lights at the lorry',
          'Move to the right-hand side of the road'
        ],
        correctAnswer: 0, // Slow down and be prepared to wait
        section: 'otherTypesOfVehicle'
      },
      {
        id: 14,
        question: 'You\'re following a large vehicle as it approaches a crossroads. What should you do if the driver signals to turn left?',
        options: [
          'Overtake if you can leave plenty of room',
          'Overtake if there are no oncoming vehicles',
          'Wait for the driver to cancel their signal',
          'Wait for the vehicle to finish turning'
        ],
        correctAnswer: 3, // Wait for the vehicle to finish turning
        section: 'otherTypesOfVehicle'
      },
      {
        id: 15,
        question: 'Why is it more difficult to overtake a large vehicle than a car?',
        options: [
          'It will take longer to overtake a large vehicle',
          'A large vehicle will be fitted with a speed limiter',
          'A large vehicle will have air brakes',
          'It will take longer for a large vehicle to accelerate'
        ],
        correctAnswer: 0, // It will take longer to overtake a large vehicle
        section: 'otherTypesOfVehicle'
      },
      {
        id: 16,
        question: 'It\'s very windy. What should you do if you\'re behind a motorcyclist who\'s overtaking a high-sided vehicle?',
        options: [
          'Overtake the motorcyclist immediately',
          'Keep well back',
          'Stay level with the motorcyclist',
          'Keep close to the motorcyclist'
        ],
        correctAnswer: 1, // Keep well back
        section: 'otherTypesOfVehicle'
      },
      {
        id: 17,
        question: 'What should you do if there\'s a bus at a bus stop ahead of you?',
        options: [
          'Flash your lights to warn the driver of your presence',
          'Continue at the same speed but sound your horn as a warning',
          'Watch carefully for the sudden appearance of pedestrians',
          'Pass the bus as quickly as you possibly can'
        ],
        correctAnswer: 2, // Watch carefully for the sudden appearance of pedestrians
        section: 'otherTypesOfVehicle'
      },
      {
        id: 18,
        question: 'What should you be prepared to do in this situation?',
        options: [
          'Sound your horn and continue',
          'Slow down and give way',
          'Report the driver to the police',
          'Squeeze through the gap'
        ],
        correctAnswer: 1, // Slow down and give way
        section: 'otherTypesOfVehicle'
      },
      {
        id: 19,
        question: 'Why should drivers be more careful on roads where trams also operate?',
        options: [
          'Because trams do not have a horn',
          'Because trams cannot stop for cars',
          'Because trams do not have lights',
          'Because trams cannot steer to avoid obstructions'
        ],
        correctAnswer: 3, // Because trams cannot steer to avoid obstructions
        section: 'otherTypesOfVehicle'
      },
      {
        id: 20,
        question: 'You\'re towing a caravan. Which is the safest type of rear-view mirror to use?',
        options: [
          'Interior wide-angle mirror',
          'Extended-arm side mirrors',
          'Ordinary door mirrors',
          'Ordinary interior mirror'
        ],
        correctAnswer: 1, // Extended-arm side mirrors
        section: 'otherTypesOfVehicle'
      },
      {
        id: 21,
        question: 'You\'re driving in heavy traffic on a wet road. Which lights should you use if there\'s a lot of surface spray?',
        options: [
          'Main-beam headlights',
          'Sidelights only',
          'Rear fog lights if visibility is more than 100 metres (328 feet)',
          'Dipped headlights'
        ],
        correctAnswer: 3, // Dipped headlights
        section: 'otherTypesOfVehicle'
      },
      {
        id: 22,
        question: 'What should you do if you overtake a cyclist when it\'s very windy?',
        options: [
          'Overtake very slowly',
          'Keep close as you pass',
          'Sound your horn repeatedly',
          'Allow extra room'
        ],
        correctAnswer: 3, // Allow extra room
        section: 'otherTypesOfVehicle'
      },
      // Vehicle Handling (Q354-369 and 370-398) - 45 questions
      {
        id: 23,
        question: 'When may you overtake another vehicle on their left?',
        options: [
          'When you\'re in a one-way street',
          'When approaching a motorway slip road where you\'ll be turning off',
          'When the vehicle in front is signalling to turn left',
          'When a slower vehicle is travelling in the right-hand lane of a dual carriageway'
        ],
        correctAnswer: 0, // When you're in a one-way street
        section: 'vehicleHandling'
      },
      {
        id: 24,
        question: 'You\'re travelling in very heavy rain. How is this likely to affect your overall stopping distance?',
        options: [
          'It will be doubled',
          'It will be halved',
          'It will be ten times greater',
          'It will be no different'
        ],
        correctAnswer: 0, // It will be doubled
        section: 'vehicleHandling'
      },
      {
        id: 25,
        question: 'What should you do when you\'re overtaking at night?',
        options: [
          'Wait until a bend so that you can see oncoming headlights',
          'Sound your horn twice before moving out',
          'Go past slowly so that you can react to unseen hazards',
          'Beware of bends in the road ahead'
        ],
        correctAnswer: 3, // Beware of bends in the road ahead
        section: 'vehicleHandling'
      },
      {
        id: 26,
        question: 'When may you wait in a box junction?',
        options: [
          'When you\'re stationary in a queue of traffic',
          'When approaching a pelican crossing',
          'When approaching a zebra crossing',
          'When oncoming traffic prevents you turning right'
        ],
        correctAnswer: 3, // When oncoming traffic prevents you turning right
        section: 'vehicleHandling'
      },
      {
        id: 27,
        question: 'Which plate may appear with this road sign?',
        options: [
          'Distance plate',
          'Time plate',
          'Speed plate',
          'Direction plate'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'vehicleHandling'
      },
      {
        id: 28,
        question: 'What\'s the reason for traffic-calming measures?',
        options: [
          'To stop road rage',
          'To make overtaking easier',
          'To slow traffic down',
          'To make parking easier'
        ],
        correctAnswer: 2, // To slow traffic down
        section: 'vehicleHandling'
      },
      {
        id: 29,
        question: 'What colour are the reflective studs along the left-hand edge of the motorway?',
        options: [
          'Green',
          'Amber',
          'Red',
          'White'
        ],
        correctAnswer: 2, // Red
        section: 'vehicleHandling'
      },
      {
        id: 30,
        question: 'What\'s a rumble device designed to do?',
        options: [
          'Give directions',
          'Prevent cattle escaping',
          'Alert you to low tyre pressure',
          'Alert you to a hazard'
        ],
        correctAnswer: 3, // Alert you to a hazard
        section: 'vehicleHandling'
      },
      {
        id: 31,
        question: 'What should you do if you have to make a journey in foggy conditions?',
        options: [
          'Follow other vehicles\' tail lights closely',
          'Avoid using dipped headlights',
          'Leave plenty of time for your journey',
          'Keep two seconds behind the vehicle ahead'
        ],
        correctAnswer: 2, // Leave plenty of time for your journey
        section: 'vehicleHandling'
      },
      {
        id: 32,
        question: 'What must you do when you\'re overtaking a car at night?',
        options: [
          'Flash your headlights before overtaking',
          'Select a higher gear',
          'Switch your headlights to main beam before overtaking',
          'Make sure you do not dazzle other road users'
        ],
        correctAnswer: 3, // Make sure you do not dazzle other road users
        section: 'vehicleHandling'
      },
      {
        id: 33,
        question: 'You\'re travelling on a road that has road humps. What should you do when the driver in front is travelling more slowly than you?',
        options: [
          'Sound your horn',
          'Overtake as soon as you can',
          'Flash your headlights',
          'Slow down and stay behind'
        ],
        correctAnswer: 3, // Slow down and stay behind
        section: 'vehicleHandling'
      },
      {
        id: 34,
        question: 'What\'s the purpose of the yellow lines painted across the road?',
        options: [
          'To show a safe distance between vehicles',
          'To keep the area clear of traffic',
          'To make you aware of your speed',
          'To warn you to change direction'
        ],
        correctAnswer: 2, // To make you aware of your speed
        section: 'vehicleHandling'
      },
      {
        id: 35,
        question: 'What should you do when you meet an oncoming vehicle on a single-track road?',
        options: [
          'Reverse back to the main road',
          'Carry out an emergency stop',
          'Stop at a passing place',
          'Switch on your hazard warning lights'
        ],
        correctAnswer: 2, // Stop at a passing place
        section: 'vehicleHandling'
      },
      {
        id: 36,
        question: 'The road is wet. Why would a motorcyclist steer around drain covers while they were cornering?',
        options: [
          'To avoid puncturing the tyres on the edge of the drain covers',
          'To prevent the motorcycle sliding on the metal drain covers',
          'To help judge the bend using the drain covers as marker points',
          'To avoid splashing pedestrians on the pavement'
        ],
        correctAnswer: 1, // To prevent the motorcycle sliding on the metal drain covers
        section: 'vehicleHandling'
      },
      {
        id: 37,
        question: 'Why should you test your brakes after this hazard?',
        options: [
          'You\'ll be on a slippery road',
          'Your brakes will be wet',
          'You\'ll be going down a long hill',
          'You\'ll have just crossed a long bridge'
        ],
        correctAnswer: 1, // Your brakes will be wet
        section: 'vehicleHandling'
      },
      {
        id: 38,
        question: 'Why should you reduce your speed when you\'re driving or riding in fog?',
        options: [
          'The brakes do not work as well',
          'You\'ll be dazzled by other headlights',
          'The engine will take longer to warm up',
          'It\'s more difficult to see what\'s ahead'
        ],
        correctAnswer: 3, // It's more difficult to see what's ahead
        section: 'vehicleHandling'
      },
      {
        id: 39,
        question: 'What will happen to your car when you drive up a steep hill?',
        options: [
          'The high gears will pull better',
          'The steering will feel heavier',
          'Overtaking will be easier',
          'The engine will work harder'
        ],
        correctAnswer: 3, // The engine will work harder
        section: 'vehicleHandling'
      },
      {
        id: 40,
        question: 'You\'re driving on the motorway in windy conditions. What should you do as you overtake a high-sided vehicle?',
        options: [
          'Increase your speed',
          'Be wary of a sudden gust',
          'Drive alongside very closely',
          'Expect normal conditions'
        ],
        correctAnswer: 1, // Be wary of a sudden gust
        section: 'vehicleHandling'
      },
      {
        id: 41,
        question: 'You\'re driving in fog. Why should you keep well back from the vehicle in front?',
        options: [
          'In case it changes direction suddenly',
          'In case its fog lights dazzle you',
          'In case it stops suddenly',
          'In case its brake lights dazzle you'
        ],
        correctAnswer: 2, // In case it stops suddenly
        section: 'vehicleHandling'
      },
      {
        id: 42,
        question: 'What should you do if you park on the road when it\'s foggy?',
        options: [
          'Leave parking lights switched on',
          'Leave dipped headlights and fog lights switched on',
          'Leave dipped headlights switched on',
          'Leave main-beam headlights switched on'
        ],
        correctAnswer: 0, // Leave parking lights switched on
        section: 'vehicleHandling'
      },
      {
        id: 43,
        question: 'You\'re driving at night. What should you do if you\'re dazzled by headlights coming towards you?',
        options: [
          'Pull down your sun visor',
          'Slow down or stop',
          'Flash your main-beam headlights',
          'Shade your eyes with your hand'
        ],
        correctAnswer: 1, // Slow down or stop
        section: 'vehicleHandling'
      },
      {
        id: 44,
        question: 'When may front fog lights be used?',
        options: [
          'When visibility is seriously reduced',
          'When they\'re fitted above the bumper',
          'When they\'re not as bright as the headlights',
          'When an audible warning device is used'
        ],
        correctAnswer: 0, // When visibility is seriously reduced
        section: 'vehicleHandling'
      },
      {
        id: 45,
        question: 'You\'re driving with your front fog lights switched on. What should you do if the fog has cleared?',
        options: [
          'Leave them on if other drivers have their lights on',
          'Switch them off as long as visibility remains good',
          'Flash them to warn oncoming traffic that it\'s foggy',
          'Drive with them on instead of your headlights'
        ],
        correctAnswer: 1, // Switch them off as long as visibility remains good
        section: 'vehicleHandling'
      },
      {
        id: 46,
        question: 'Why should you switch off your rear fog lights when the fog has cleared?',
        options: [
          'To allow your headlights to work',
          'To stop draining the battery',
          'To stop the engine losing power',
          'To prevent dazzling drivers behind'
        ],
        correctAnswer: 3, // To prevent dazzling drivers behind
        section: 'vehicleHandling'
      },
      {
        id: 47,
        question: 'What will happen if you use rear fog lights in good conditions?',
        options: [
          'They\'ll make it safer when towing a trailer',
          'They\'ll protect you from larger vehicles',
          'They\'ll dazzle other drivers',
          'They\'ll make drivers behind keep back'
        ],
        correctAnswer: 2, // They'll dazzle other drivers
        section: 'vehicleHandling'
      },
      {
        id: 48,
        question: 'Why would you fit chains to your wheels?',
        options: [
          'To help prevent damage to the road surface',
          'To help prevent wear to the tyres',
          'To help prevent skidding in deep snow',
          'To help prevent the brakes locking'
        ],
        correctAnswer: 2, // To help prevent skidding in deep snow
        section: 'vehicleHandling'
      },
      {
        id: 49,
        question: 'How can you use your vehicle\'s engine to control your speed?',
        options: [
          'By changing to a lower gear',
          'By selecting reverse gear',
          'By changing to a higher gear',
          'By selecting neutral'
        ],
        correctAnswer: 0, // By changing to a lower gear
        section: 'vehicleHandling'
      },
      {
        id: 50,
        question: 'Why could it be dangerous to keep the clutch down, or select neutral, for long periods of time while you\'re driving?',
        options: [
          'Fuel spillage will occur',
          'Engine damage may be caused',
          'You\'ll have less steering and braking control',
          'It will wear tyres out more quickly'
        ],
        correctAnswer: 2, // You'll have less steering and braking control
        section: 'vehicleHandling'
      },
      {
        id: 51,
        question: 'You\'re driving on an icy road. What distance from the car in front should you drive?',
        options: [
          'Four times the normal distance',
          'Six times the normal distance',
          'Eight times the normal distance',
          'Ten times the normal distance'
        ],
        correctAnswer: 3, // Ten times the normal distance
        section: 'vehicleHandling'
      },
      {
        id: 52,
        question: 'Which lights must you use if you\'re driving on a well-lit motorway at night?',
        options: [
          'Use only your sidelights',
          'Use your headlights',
          'Use rear fog lights',
          'Use front fog lights'
        ],
        correctAnswer: 1, // Use your headlights
        section: 'vehicleHandling'
      },
      {
        id: 53,
        question: 'You\'re driving on a motorway at night. Which lights should you have on if there are other vehicles just ahead of you?',
        options: [
          'Front fog lights',
          'Main-beam headlights',
          'Sidelights only',
          'Dipped headlights'
        ],
        correctAnswer: 3, // Dipped headlights
        section: 'vehicleHandling'
      },
      {
        id: 54,
        question: 'What will affect your vehicle\'s stopping distance?',
        options: [
          'The speed limit',
          'The street lighting',
          'The time of day',
          'The condition of the tyres'
        ],
        correctAnswer: 3, // The condition of the tyres
        section: 'vehicleHandling'
      },
      {
        id: 55,
        question: 'When will you feel the effects of engine braking?',
        options: [
          'When you only use the parking brake',
          'When you\'re in neutral',
          'When you change to a lower gear',
          'When you change to a higher gear'
        ],
        correctAnswer: 2, // When you change to a lower gear
        section: 'vehicleHandling'
      },
      {
        id: 56,
        question: 'Which lights should you switch on when daytime visibility is poor but not seriously reduced?',
        options: [
          'Headlights and fog lights',
          'Front fog lights',
          'Dipped headlights',
          'Rear fog lights'
        ],
        correctAnswer: 2, // Dipped headlights
        section: 'vehicleHandling'
      },
      {
        id: 57,
        question: 'Why are vehicles fitted with rear fog lights?',
        options: [
          'To make them more visible when driving at high speed',
          'To show when they\'ve broken down in a dangerous position',
          'To make them more visible in thick fog',
          'To warn drivers following closely to drop back'
        ],
        correctAnswer: 2, // To make them more visible in thick fog
        section: 'vehicleHandling'
      },
      {
        id: 58,
        question: 'There\'s been a heavy fall of snow. What should you consider before driving in these conditions?',
        options: [
          'Whether you should fit an amber flashing beacon to your car',
          'Whether you should drive without wearing your seat belt',
          'Whether you should wear sunglasses to reduce the glare',
          'Whether your journey is essential'
        ],
        correctAnswer: 3, // Whether your journey is essential
        section: 'vehicleHandling'
      },
      {
        id: 59,
        question: 'What should you check before you start a journey in foggy weather?',
        options: [
          'The radiator has enough anti-freeze',
          'You have a warning triangle in the vehicle',
          'The windows and lights are clean and clear',
          'You have a mobile phone with you'
        ],
        correctAnswer: 2, // The windows and lights are clean and clear
        section: 'vehicleHandling'
      },
      {
        id: 60,
        question: 'You\'ve been driving in fog. What must you do when the visibility improves?',
        options: [
          'Switch off your fog lights',
          'Keep your rear fog lights switched on',
          'Keep your front fog lights switched on',
          'Leave your fog lights switched on in case the fog returns'
        ],
        correctAnswer: 0, // Switch off your fog lights
        section: 'vehicleHandling'
      },
      {
        id: 61,
        question: 'Why is it dangerous to leave rear fog lights switched on after the fog has cleared?',
        options: [
          'They may be confused with brake lights',
          'The bulbs would fail',
          'Electrical systems could be overloaded',
          'Direction indicators may not work properly'
        ],
        correctAnswer: 0, // They may be confused with brake lights
        section: 'vehicleHandling'
      },
      {
        id: 62,
        question: 'What will happen if you hold the clutch pedal down or roll in neutral for too long?',
        options: [
          'It will use more fuel',
          'It will cause the engine to overheat',
          'It will reduce your control',
          'It will improve tyre wear'
        ],
        correctAnswer: 2, // It will reduce your control
        section: 'vehicleHandling'
      },
      {
        id: 63,
        question: 'Why is it bad technique to coast when you\'re driving downhill?',
        options: [
          'The fuel consumption will increase',
          'The engine will overheat',
          'The tyres will wear more quickly',
          'The vehicle will gain speed more quickly'
        ],
        correctAnswer: 3, // The vehicle will gain speed more quickly
        section: 'vehicleHandling'
      },
      {
        id: 64,
        question: 'What should you do when dealing with this hazard?',
        options: [
          'Switch on your hazard warning lights',
          'Use a low gear and drive slowly',
          'Use a high gear to prevent wheelspin',
          'Switch on your windscreen wipers'
        ],
        correctAnswer: 1, // Use a low gear and drive slowly
        section: 'vehicleHandling'
      },
      {
        id: 65,
        question: 'Why is travelling in neutral for long distances (known as coasting) bad driving technique?',
        options: [
          'It will cause the car to skid',
          'It will make the engine stall',
          'The engine will run faster',
          'There will not be any engine braking'
        ],
        correctAnswer: 3, // There will not be any engine braking
        section: 'vehicleHandling'
      },
      {
        id: 66,
        question: 'When must you use dipped headlights during the day?',
        options: [
          'All the time you\'re driving',
          'When you\'re driving along narrow streets',
          'When you\'re driving in poor visibility',
          'When you\'re parking'
        ],
        correctAnswer: 2, // When you're driving in poor visibility
        section: 'vehicleHandling'
      },
      {
        id: 67,
        question: 'What should you do when you\'re driving along a road that has a series of road humps?',
        options: [
          'Brake firmly when you reach each road hump',
          'Vary your speed between each road hump',
          'Stay at a reduced speed for the whole stretch of road',
          'Set your car\'s cruise control'
        ],
        correctAnswer: 2, // Stay at a reduced speed for the whole stretch of road
        section: 'vehicleHandling'
      }
    ]
  },
  6: {
    lessonTitle: 'Day 6: Motorway Rules and Essential Documents',
    sections: {
      motorwayRules: 'Motorway Rules',
      essentialDocuments: 'Essential Documents'
    },
    questions: [
      // Motorway Rules (Q399-455) - 57 questions
      {
        id: 1,
        question: 'You\'re joining a motorway from a slip road. How should you deal with traffic already on the motorway?',
        options: [
          'Carry on along the hard shoulder until you see a safe gap',
          'Stop at the end of the slip road and look for a safe gap',
          'Use the slip road to accelerate until you\'re moving much faster than the motorway traffic',
          'Match your speed to traffic in the left-hand lane and filter into a safe gap'
        ],
        correctAnswer: 3, // Match your speed to traffic in the left-hand lane and filter into a safe gap
        section: 'motorwayRules'
      },
      {
        id: 2,
        question: 'What\'s the national speed limit on motorways for cars and motorcycles?',
        options: [
          '30 mph',
          '50 mph',
          '60 mph',
          '70 mph'
        ],
        correctAnswer: 3, // 70 mph
        section: 'motorwayRules'
      },
      {
        id: 3,
        question: 'Which vehicles should use the left-hand lane on a three-lane motorway?',
        options: [
          'Any vehicle that\'s not overtaking',
          'Large vehicles only',
          'Emergency vehicles only',
          'Slow vehicles only'
        ],
        correctAnswer: 0, // Any vehicle that's not overtaking
        section: 'motorwayRules'
      },
      {
        id: 4,
        question: 'Which vehicles are not allowed to use the right-hand lane of a three-lane motorway?',
        options: [
          'Small delivery vans',
          'Motorcycles',
          'Vehicles towing a trailer',
          'Motorcycle and sidecar outfits'
        ],
        correctAnswer: 2, // Vehicles towing a trailer
        section: 'motorwayRules'
      },
      {
        id: 5,
        question: 'Your vehicle breaks down on a motorway and you need to call for help. Why might it be better to use an emergency roadside telephone rather than a mobile phone?',
        options: [
          'It connects you to a local garage',
          'Using a mobile phone will distract other drivers',
          'It allows easy location by the emergency services',
          'Mobile phones do not work on motorways'
        ],
        correctAnswer: 2, // It allows easy location by the emergency services
        section: 'motorwayRules'
      },
      {
        id: 6,
        question: 'Your vehicle broke down on the hard shoulder of a motorway, but has now been repaired. How should you rejoin the main carriageway?',
        options: [
          'Move out onto the carriageway, then build up your speed',
          'Move out onto the carriageway using your hazard warning lights',
          'Gain speed on the hard shoulder before moving out onto the carriageway',
          'Wait on the hard shoulder until someone flashes their headlights at you'
        ],
        correctAnswer: 2, // Gain speed on the hard shoulder before moving out onto the carriageway
        section: 'motorwayRules'
      },
      {
        id: 7,
        question: 'You\'re travelling along a motorway. Where would you find a crawler or climbing lane?',
        options: [
          'On a steep gradient',
          'Before a service area',
          'Before a junction',
          'Along the hard shoulder'
        ],
        correctAnswer: 0, // On a steep gradient
        section: 'motorwayRules'
      },
      {
        id: 8,
        question: 'What do these motorway signs mean?',
        options: [
          'They\'re countdown markers to a bridge',
          'They\'re distance markers to the next telephone',
          'They\'re countdown markers to the next exit',
          'They warn of a police control ahead'
        ],
        correctAnswer: 2, // They're countdown markers to the next exit
        section: 'motorwayRules'
      },
      {
        id: 9,
        question: 'Where are amber reflective studs found on a motorway?',
        options: [
          'Between the hard shoulder and the carriageway',
          'Between the acceleration lane and the carriageway',
          'Between the central reservation and the carriageway',
          'Between each pair of lanes'
        ],
        correctAnswer: 2, // Between the central reservation and the carriageway
        section: 'motorwayRules'
      },
      {
        id: 10,
        question: 'What colour are the reflective studs between the lanes on a motorway?',
        options: [
          'Green',
          'Amber',
          'White',
          'Red'
        ],
        correctAnswer: 2, // White
        section: 'motorwayRules'
      },
      {
        id: 11,
        question: 'What colour are the reflective studs between a motorway and a slip road?',
        options: [
          'Amber',
          'White',
          'Green',
          'Red'
        ],
        correctAnswer: 2, // Green
        section: 'motorwayRules'
      },
      {
        id: 12,
        question: 'Your vehicle has broken down on a motorway. In which direction should you walk to find the nearest emergency telephone?',
        options: [
          'With the traffic flow',
          'Facing oncoming traffic',
          'In the direction shown on the marker posts',
          'In the direction of the nearest exit'
        ],
        correctAnswer: 1, // Facing oncoming traffic
        section: 'motorwayRules'
      },
      {
        id: 13,
        question: 'Why is it important to make full use of the slip road as you join a motorway?',
        options: [
          'Because there\'s space available to turn round if you need to',
          'To allow you direct access to the overtaking lanes',
          'To allow you to fit safely into the traffic flow in the left-hand lane',
          'Because you can continue on the hard shoulder'
        ],
        correctAnswer: 2, // To allow you to fit safely into the traffic flow in the left-hand lane
        section: 'motorwayRules'
      },
      {
        id: 14,
        question: 'How should you position yourself when you use the emergency telephone on a motorway?',
        options: [
          'Stay close to the carriageway',
          'Face the oncoming traffic',
          'Keep your back to the traffic',
          'Stand on the hard shoulder'
        ],
        correctAnswer: 1, // Face the oncoming traffic
        section: 'motorwayRules'
      },
      {
        id: 15,
        question: 'What colour are the reflective studs between the hard shoulder and the left-hand lane of a motorway?',
        options: [
          'Green',
          'Red',
          'White',
          'Amber'
        ],
        correctAnswer: 1, // Red
        section: 'motorwayRules'
      },
      {
        id: 16,
        question: 'On a three-lane motorway, which lane should you use if there\'s no traffic ahead?',
        options: [
          'Left',
          'Right',
          'Centre',
          'Either the right or centre'
        ],
        correctAnswer: 0, // Left
        section: 'motorwayRules'
      },
      {
        id: 17,
        question: 'What should you do when going through a contraflow system on a motorway?',
        options: [
          'Use dipped headlights',
          'Keep a good distance from the vehicle ahead',
          'Switch lanes to keep the traffic flowing',
          'Stay close to the vehicle ahead to reduce queues'
        ],
        correctAnswer: 1, // Keep a good distance from the vehicle ahead
        section: 'motorwayRules'
      },
      {
        id: 18,
        question: 'You\'re on a three-lane motorway. Which lane are you in if there are red reflective studs on your left and white ones to your right?',
        options: [
          'In the right-hand lane',
          'In the middle lane',
          'On the hard shoulder',
          'In the left-hand lane'
        ],
        correctAnswer: 3, // In the left-hand lane
        section: 'motorwayRules'
      },
      {
        id: 19,
        question: 'What should you do when you\'re approaching roadworks on a motorway?',
        options: [
          'Speed up to clear the area quickly',
          'Always use the hard shoulder',
          'Obey the speed limit',
          'Stay very close to the vehicle in front'
        ],
        correctAnswer: 2, // Obey the speed limit
        section: 'motorwayRules'
      },
      {
        id: 20,
        question: 'Which vehicles are prohibited from using the motorway?',
        options: [
          'Powered mobility scooters',
          'Motorcycles over 50 cc',
          'Double-deck buses',
          'Cars with automatic transmission'
        ],
        correctAnswer: 0, // Powered mobility scooters
        section: 'motorwayRules'
      },
      {
        id: 21,
        question: 'What should you do while you\'re driving or riding along a motorway?',
        options: [
          'Look much further ahead than you would on other roads',
          'Travel much faster than you would on other roads',
          'Maintain a shorter separation distance than you would on other roads',
          'Concentrate more than you would on other roads'
        ],
        correctAnswer: 0, // Look much further ahead than you would on other roads
        section: 'motorwayRules'
      },
      {
        id: 22,
        question: 'What should you do immediately after joining a motorway?',
        options: [
          'Try to overtake',
          'Re-adjust your mirrors',
          'Position your vehicle in the centre lane',
          'Stay in the left-hand lane'
        ],
        correctAnswer: 3, // Stay in the left-hand lane
        section: 'motorwayRules'
      },
      {
        id: 23,
        question: 'When would you use the right-hand lane on a three-lane motorway?',
        options: [
          'When you\'re turning right',
          'When you\'re overtaking',
          'When you\'re travelling above the speed limit',
          'When you\'re trying to save fuel'
        ],
        correctAnswer: 1, // When you're overtaking
        section: 'motorwayRules'
      },
      {
        id: 24,
        question: 'You\'re on a motorway. The hard shoulder is not being used as a running lane. When should you use the hard shoulder?',
        options: [
          'When you\'re stopping in an emergency',
          'When you\'re leaving the motorway',
          'When you\'re stopping for a rest',
          'When you\'re joining the motorway'
        ],
        correctAnswer: 0, // When you're stopping in an emergency
        section: 'motorwayRules'
      },
      {
        id: 25,
        question: 'You\'re in the right-hand lane of a three-lane motorway. What do these overhead signs mean?',
        options: [
          'Move to the left and reduce your speed to 50 mph',
          'There are roadworks 50 metres (55 yards) ahead',
          'Use the hard shoulder until you\'ve passed the hazard',
          'Leave the motorway at the next exit'
        ],
        correctAnswer: 0, // Move to the left and reduce your speed to 50 mph
        section: 'motorwayRules'
      },
      {
        id: 26,
        question: 'When are you allowed to stop on a motorway?',
        options: [
          'When you need to walk and get fresh air',
          'When you wish to pick up hitchhikers',
          'When you\'re signalled to do so by traffic signals',
          'When you need to use a mobile telephone'
        ],
        correctAnswer: 2, // When you're signalled to do so by traffic signals
        section: 'motorwayRules'
      },
      {
        id: 27,
        question: 'You\'re travelling in the left-hand lane of a three-lane motorway. How should you react to traffic joining from a slip road?',
        options: [
          'Increase your speed to make sure they join behind you',
          'Adjust your speed or change lane if you can do so safely',
          'Maintain a steady speed',
          'Switch on your hazard warning lights'
        ],
        correctAnswer: 1, // Adjust your speed or change lane if you can do so safely
        section: 'motorwayRules'
      },
      {
        id: 28,
        question: 'How should you use the lanes on a motorway?',
        options: [
          'Use the lane that has the least traffic',
          'Keep to the left-hand lane unless you\'re overtaking',
          'Overtake using the lane that\'s clearest',
          'Stay in one lane until you reach your exit'
        ],
        correctAnswer: 1, // Keep to the left-hand lane unless you're overtaking
        section: 'motorwayRules'
      },
      {
        id: 29,
        question: 'You\'re travelling along a motorway. When are you allowed to overtake on the left?',
        options: [
          'When you can see well ahead that the hard shoulder is clear',
          'When the traffic in the right-hand lane is signalling right',
          'When you warn drivers behind by signalling left',
          'When in queues and traffic to your right is moving more slowly than you are'
        ],
        correctAnswer: 3, // When in queues and traffic to your right is moving more slowly than you are
        section: 'motorwayRules'
      },
      {
        id: 30,
        question: 'When would you use an emergency area on a motorway?',
        options: [
          'In cases of emergency or breakdown',
          'If you think you\'ll be involved in a road rage incident',
          'To stop and check where you are',
          'To make a private phone call'
        ],
        correctAnswer: 0, // In cases of emergency or breakdown
        section: 'motorwayRules'
      },
      {
        id: 31,
        question: 'Traffic officers operate on motorways and some primary routes in England and Wales. What are they authorised to do?',
        options: [
          'Stop and arrest drivers who break the law',
          'Repair broken-down vehicles on the motorway',
          'Issue fixed penalty notices',
          'Stop and direct anyone on a motorway'
        ],
        correctAnswer: 3, // Stop and direct anyone on a motorway
        section: 'motorwayRules'
      },
      {
        id: 32,
        question: 'You\'re on a motorway. What does it mean when a red cross is displayed above the hard shoulder?',
        options: [
          'Pull up in this lane to answer your mobile phone',
          'Use this lane as a running lane',
          'This lane can be used if you need a rest',
          'You must not travel in this lane'
        ],
        correctAnswer: 3, // You must not travel in this lane
        section: 'motorwayRules'
      },
      {
        id: 33,
        question: 'You\'re on a motorway. What does it mean when a mandatory speed limit is displayed above the hard shoulder?',
        options: [
          'You should not travel in this lane',
          'The hard shoulder can be used as a running lane',
          'You can park on the hard shoulder if you feel tired',
          'You can pull up in this lane to answer a mobile phone'
        ],
        correctAnswer: 1, // The hard shoulder can be used as a running lane
        section: 'motorwayRules'
      },
      {
        id: 34,
        question: 'How is bunching reduced on motorways?',
        options: [
          'By using higher speed limits',
          'By using advisory speed limits',
          'By using minimum speed limits',
          'By using variable speed limits'
        ],
        correctAnswer: 3, // By using variable speed limits
        section: 'motorwayRules'
      },
      {
        id: 35,
        question: 'What helps to reduce traffic bunching on a motorway?',
        options: [
          'Variable speed limits',
          'Contraflow systems',
          'National speed limits',
          'Lane closures'
        ],
        correctAnswer: 0, // Variable speed limits
        section: 'motorwayRules'
      },
      {
        id: 36,
        question: 'When may you stop on a motorway?',
        options: [
          'If you have to read a map',
          'When you\'re tired and need a rest',
          'If your mobile phone rings',
          'In an emergency or breakdown'
        ],
        correctAnswer: 3, // In an emergency or breakdown
        section: 'motorwayRules'
      },
      {
        id: 37,
        question: 'What\'s the national speed limit for a car or motorcycle on a motorway?',
        options: [
          '50 mph',
          '60 mph',
          '70 mph',
          '80 mph'
        ],
        correctAnswer: 2, // 70 mph
        section: 'motorwayRules'
      },
      {
        id: 38,
        question: 'You stop on the hard shoulder of a motorway and use the emergency telephone. Where\'s the best place to wait for help to arrive?',
        options: [
          'Next to the phone',
          'Well away from the carriageway',
          'With your vehicle',
          'On the hard shoulder'
        ],
        correctAnswer: 1, // Well away from the carriageway
        section: 'motorwayRules'
      },
      {
        id: 39,
        question: 'You\'re on a motorway. What must you do if there\'s a red cross showing above every lane?',
        options: [
          'Pull onto the hard shoulder',
          'Slow down and watch for further signals',
          'Leave at the next exit',
          'Stop and wait'
        ],
        correctAnswer: 3, // Stop and wait
        section: 'motorwayRules'
      },
      {
        id: 40,
        question: 'You\'re on a motorway. What does it mean if a red cross is showing above the hard shoulder and mandatory speed limits above all other lanes?',
        options: [
          'The hard shoulder can be used as a rest area if you feel tired',
          'The hard shoulder is for emergency or breakdown use only',
          'The hard shoulder can be used as a normal running lane',
          'The hard shoulder has a speed limit of 50 mph'
        ],
        correctAnswer: 1, // The hard shoulder is for emergency or breakdown use only
        section: 'motorwayRules'
      },
      {
        id: 41,
        question: 'What does this motorway sign mean?',
        options: [
          'Use any lane except the hard shoulder',
          'Use the hard shoulder only',
          'Use the three right-hand lanes only',
          'Use all the lanes, including the hard shoulder'
        ],
        correctAnswer: 3, // Use all the lanes, including the hard shoulder
        section: 'motorwayRules'
      },
      {
        id: 42,
        question: 'Where should you stop to rest if you feel tired while you\'re travelling along a motorway?',
        options: [
          'On the hard shoulder',
          'At the nearest service area',
          'On a slip road',
          'On the central reservation'
        ],
        correctAnswer: 1, // At the nearest service area
        section: 'motorwayRules'
      },
      {
        id: 43,
        question: 'You have stopped in an emergency area. What must you do before you rejoin the carriageway?',
        options: [
          'Use the emergency telephone',
          'Give an arm signal as you are moving off',
          'Switch on your vehicle\'s headlights',
          'Move away with your hazard lights on'
        ],
        correctAnswer: 0, // Use the emergency telephone
        section: 'motorwayRules'
      },
      {
        id: 44,
        question: 'How should you rejoin the motorway after a breakdown on the hard shoulder?',
        options: [
          'Build up speed on the hard shoulder before looking for a safe gap in the traffic',
          'Move straight out into the left-hand lane as you are not allowed to drive on the hard shoulder',
          'Wait until a vehicle in the left-hand lane signals to you that it\'s safe to rejoin',
          'Keep your hazard lights flashing until you have safely rejoined the carriageway'
        ],
        correctAnswer: 0, // Build up speed on the hard shoulder before looking for a safe gap in the traffic
        section: 'motorwayRules'
      },
      {
        id: 45,
        question: 'What\'s the speed limit for a car towing a trailer on a motorway?',
        options: [
          '40 mph',
          '50 mph',
          '60 mph',
          '70 mph'
        ],
        correctAnswer: 2, // 60 mph
        section: 'motorwayRules'
      },
      {
        id: 46,
        question: 'When should you use the left-hand lane of a motorway?',
        options: [
          'When your vehicle breaks down',
          'When you\'re overtaking slower traffic in the other lanes',
          'When you\'re making a phone call',
          'When the road ahead is clear'
        ],
        correctAnswer: 3, // When the road ahead is clear
        section: 'motorwayRules'
      },
      {
        id: 47,
        question: 'You\'re driving on a motorway and have to slow down suddenly due to a hazard ahead. How can you warn drivers behind of the hazard?',
        options: [
          'Switch on your hazard warning lights',
          'Switch on your headlights',
          'Sound your horn',
          'Flash your headlights'
        ],
        correctAnswer: 0, // Switch on your hazard warning lights
        section: 'motorwayRules'
      },
      {
        id: 48,
        question: 'Your car gets a puncture while you\'re driving on the motorway. What should you do when you\'ve stopped on the hard shoulder?',
        options: [
          'Carefully change the wheel yourself',
          'Use an emergency telephone and call for help',
          'Try to wave down another vehicle for help',
          'Only change the wheel if you have a passenger to help you'
        ],
        correctAnswer: 1, // Use an emergency telephone and call for help
        section: 'motorwayRules'
      },
      {
        id: 49,
        question: 'What should you do if you\'re driving on a motorway and you miss the exit that you wanted to take?',
        options: [
          'Carefully reverse along the hard shoulder',
          'Carry on to the next exit',
          'Carefully reverse in the left-hand lane',
          'Make a U-turn at the next gap in the central reservation'
        ],
        correctAnswer: 1, // Carry on to the next exit
        section: 'motorwayRules'
      },
      {
        id: 50,
        question: 'Your vehicle has broken down on a motorway. What should you do if you\'re not able to get onto the hard shoulder?',
        options: [
          'Switch on your hazard warning lights',
          'Stop the traffic behind and ask for help',
          'Attempt to repair your vehicle quickly',
          'Stand behind your vehicle to warn others'
        ],
        correctAnswer: 0, // Switch on your hazard warning lights
        section: 'motorwayRules'
      },
      {
        id: 51,
        question: 'Why is it particularly important to check your vehicle before making a long motorway journey?',
        options: [
          'You\'ll have to do more harsh braking on motorways',
          'Motorway services areas do not deal with breakdowns',
          'The road surface will wear down the tyres faster',
          'Continuous high speeds increase the risk of your vehicle breaking down'
        ],
        correctAnswer: 3, // Continuous high speeds increase the risk of your vehicle breaking down
        section: 'motorwayRules'
      },
      {
        id: 52,
        question: 'You\'re driving on a motorway. What does it mean if the car in front shows its hazard warning lights for a short time?',
        options: [
          'The driver wants you to overtake',
          'The other car is going to change lanes',
          'Traffic ahead is slowing or stopping suddenly',
          'There\'s a police speed check ahead'
        ],
        correctAnswer: 2, // Traffic ahead is slowing or stopping suddenly
        section: 'motorwayRules'
      },
      {
        id: 53,
        question: 'You\'re driving on the motorway. Which lane should you get into well before you reach your exit?',
        options: [
          'The middle lane',
          'The left-hand lane',
          'The hard shoulder',
          'The right-hand lane'
        ],
        correctAnswer: 1, // The left-hand lane
        section: 'motorwayRules'
      },
      {
        id: 54,
        question: 'What restrictions apply to people who have a provisional driving licence?',
        options: [
          'They cannot drive over 30 mph',
          'They cannot drive at night',
          'They cannot drive unaccompanied',
          'They cannot drive with more than one passenger'
        ],
        correctAnswer: 2, // They cannot drive unaccompanied
        section: 'motorwayRules'
      },
      {
        id: 55,
        question: 'Your vehicle breaks down on a motorway and you manage to stop on the hard shoulder. What should you do if you use your mobile phone to call for help?',
        options: [
          'Stand at the rear of the vehicle while making the call',
          'Phone a friend and ask them to come and collect you',
          'Wait in the car for the emergency services to arrive',
          'Check your location from the nearest marker posts beside the hard shoulder'
        ],
        correctAnswer: 3, // Check your location from the nearest marker posts beside the hard shoulder
        section: 'motorwayRules'
      },
      {
        id: 56,
        question: 'You\'re towing a trailer along a three-lane motorway. When may you use the right-hand lane?',
        options: [
          'When there are lane closures',
          'When there\'s slow-moving traffic',
          'When you can maintain a high speed',
          'When large vehicles are in the left and centre lanes'
        ],
        correctAnswer: 0, // When there are lane closures
        section: 'motorwayRules'
      },
      {
        id: 57,
        question: 'What would you expect to find at a contraflow system on a motorway?',
        options: [
          'Temporary traffic lights',
          'Lower speed limits',
          'Wider lanes than normal',
          'Road humps'
        ],
        correctAnswer: 1, // Lower speed limits
        section: 'motorwayRules'
      },
      // Essential Documents (Q657-683) - 27 questions
      {
        id: 58,
        question: 'For how long is an MOT certificate normally valid?',
        options: [
          'Three years after the date it was issued',
          '10,000 miles',
          'One year after the date it was issued',
          '30,000 miles'
        ],
        correctAnswer: 2, // One year after the date it was issued
        section: 'essentialDocuments'
      },
      {
        id: 59,
        question: 'You\'ve just passed your first practical driving test. What will you have to do if you get six penalty points on your licence in the next two years?',
        options: [
          'Retake only your theory test',
          'Retake your theory and practical tests',
          'Retake only your practical test',
          'Reapply for your full licence immediately'
        ],
        correctAnswer: 1, // Retake your theory and practical tests
        section: 'essentialDocuments'
      },
      {
        id: 60,
        question: 'For how long is a Statutory Off-Road Notification (SORN) valid?',
        options: [
          'Until the vehicle is taxed, sold or scrapped',
          'Until the vehicle is insured and MOT\'d',
          'Until the vehicle is repaired or modified',
          'Until the vehicle is used on the road'
        ],
        correctAnswer: 0, // Until the vehicle is taxed, sold or scrapped
        section: 'essentialDocuments'
      },
      {
        id: 61,
        question: 'What\'s a Statutory Off-Road Notification (SORN)?',
        options: [
          'A notification to tell DVSA that a vehicle does not have a current MOT',
          'Information kept by the police about the owner of a vehicle',
          'A notification to tell DVLA that a vehicle is not being used on the road',
          'Information held by insurance companies to check a vehicle is insured'
        ],
        correctAnswer: 2, // A notification to tell DVLA that a vehicle is not being used on the road
        section: 'essentialDocuments'
      },
      {
        id: 62,
        question: 'What\'s the maximum fine for driving or riding without insurance?',
        options: [
          'Unlimited',
          '£500',
          '£1000',
          '£5000'
        ],
        correctAnswer: 0, // Unlimited
        section: 'essentialDocuments'
      },
      {
        id: 63,
        question: 'Who\'s legally responsible for ensuring that a vehicle registration certificate (V5C) is updated?',
        options: [
          'The registered vehicle keeper',
          'The vehicle manufacturer',
          'Your insurance company',
          'The licensing authority'
        ],
        correctAnswer: 0, // The registered vehicle keeper
        section: 'essentialDocuments'
      },
      {
        id: 64,
        question: 'Your insurer will issue you with an insurance certificate. When must you produce this document for inspection?',
        options: [
          'When making a SORN',
          'When buying or selling a vehicle',
          'When a police officer asks you for it',
          'When your vehicle is having an MOT test'
        ],
        correctAnswer: 2, // When a police officer asks you for it
        section: 'essentialDocuments'
      },
      {
        id: 65,
        question: 'When must your vehicle have valid insurance cover?',
        options: [
          'Before you can make a SORN',
          'Before you can sell the vehicle',
          'Before you can scrap the vehicle',
          'Before you can tax the vehicle'
        ],
        correctAnswer: 3, // Before you can tax the vehicle
        section: 'essentialDocuments'
      },
      {
        id: 66,
        question: 'What do you need before you can legally use a motor vehicle on the road?',
        options: [
          'An appropriate driving licence',
          'Breakdown cover',
          'Proof of your identity',
          'A vehicle handbook'
        ],
        correctAnswer: 0, // An appropriate driving licence
        section: 'essentialDocuments'
      },
      {
        id: 67,
        question: 'What must you have when you apply to renew your vehicle tax?',
        options: [
          'Valid insurance',
          'The vehicle\'s chassis number',
          'The handbook',
          'A valid driving licence'
        ],
        correctAnswer: 0, // Valid insurance
        section: 'essentialDocuments'
      },
      {
        id: 68,
        question: 'A police officer asks to see your documents. You do not have them with you. How many days do you have to produce them at a police station?',
        options: [
          '5 days',
          '7 days',
          '14 days',
          '21 days'
        ],
        correctAnswer: 1, // 7 days
        section: 'essentialDocuments'
      },
      {
        id: 69,
        question: 'When should you update your vehicle registration certificate?',
        options: [
          'When you pass your driving test',
          'When you move house',
          'When your vehicle needs an MOT',
          'When you have a collision'
        ],
        correctAnswer: 0, // TODO: Confirm correct answer
        section: 'essentialDocuments'
      },
      {
        id: 70,
        question: 'What must you check before you drive someone else\'s vehicle?',
        options: [
          'That the vehicle owner has third-party insurance cover',
          'That your own vehicle has insurance cover',
          'That the vehicle is insured for your use',
          'That the insurance documents are in the vehicle'
        ],
        correctAnswer: 2, // That the vehicle is insured for your use
        section: 'essentialDocuments'
      },
      {
        id: 71,
        question: 'Your car needs to pass an MOT test. What may be invalidated if you drive the car without a current MOT certificate?',
        options: [
          'The vehicle service record',
          'The vehicle insurance',
          'The vehicle tax',
          'The vehicle registration document'
        ],
        correctAnswer: 1, // The vehicle insurance
        section: 'essentialDocuments'
      },
      {
        id: 72,
        question: 'What legal requirement must be met by a newly qualified driver?',
        options: [
          'They must display green L plates',
          'They must have a new photograph taken for their full licence',
          'They must be accompanied on their first motorway journey',
          'They must have valid motor insurance'
        ],
        correctAnswer: 3, // They must have valid motor insurance
        section: 'essentialDocuments'
      },
      {
        id: 73,
        question: 'What\'s covered by third-party insurance?',
        options: [
          'Damage to your vehicle',
          'Fire damage to your vehicle',
          'Flood damage to your vehicle',
          'Damage to other vehicles'
        ],
        correctAnswer: 3, // Damage to other vehicles
        section: 'essentialDocuments'
      },
      {
        id: 74,
        question: 'Who\'s responsible for paying the vehicle tax?',
        options: [
          'The driver of the vehicle',
          'The registered keeper of the vehicle',
          'The car dealer',
          'The Driver and Vehicle Licensing Agency (DVLA)'
        ],
        correctAnswer: 1, // The registered keeper of the vehicle
        section: 'essentialDocuments'
      },
      {
        id: 75,
        question: 'What information is found on a vehicle registration document?',
        options: [
          'The registered keeper',
          'The type of insurance cover',
          'The service history details',
          'The date of the MOT'
        ],
        correctAnswer: 0, // The registered keeper
        section: 'essentialDocuments'
      },
      {
        id: 76,
        question: 'When must you contact the Driver and Vehicle Licensing Agency (DVLA)?',
        options: [
          'When you get a parking ticket',
          'When you change your vehicle',
          'When you use your vehicle for work',
          'When your vehicle\'s insurance is due'
        ],
        correctAnswer: 1, // When you change your vehicle
        section: 'essentialDocuments'
      },
      {
        id: 77,
        question: 'What circumstances require you to notify the Driver and Vehicle Licensing Agency (DVLA)?',
        options: [
          'When your health affects your driving',
          'When you have to work abroad',
          'When you lend your vehicle to someone',
          'When your vehicle needs an MOT certificate'
        ],
        correctAnswer: 0, // When your health affects your driving
        section: 'essentialDocuments'
      },
      {
        id: 78,
        question: 'When could the cost of your insurance be reduced?',
        options: [
          'When you\'re under 25 years old',
          'When you do not wear glasses',
          'When you pass the driving test first time',
          'When you complete the Pass Plus scheme'
        ],
        correctAnswer: 3, // When you complete the Pass Plus scheme
        section: 'essentialDocuments'
      },
      {
        id: 79,
        question: 'In order to supervise a learner driver you need to have held a full driving licence for the same category of vehicle, for at least three years. What other requirement must you meet?',
        options: [
          'To have a car with dual controls',
          'To be at least 21 years old',
          'To be an approved driving instructor',
          'To hold an advanced driving certificate'
        ],
        correctAnswer: 1, // To be at least 21 years old
        section: 'essentialDocuments'
      },
      {
        id: 80,
        question: 'Your car requires an MOT certificate. When is it legal to drive it without an MOT certificate?',
        options: [
          'Up to seven days after the old certificate has run out',
          'When driving to an MOT centre to arrange an appointment',
          'When driving the car with the owner\'s permission',
          'When driving to an appointment at an MOT centre'
        ],
        correctAnswer: 3, // When driving to an appointment at an MOT centre
        section: 'essentialDocuments'
      },
      {
        id: 81,
        question: 'When will a new car need its first MOT test?',
        options: [
          'When it\'s one year old',
          'When it\'s three years old',
          'When it\'s five years old',
          'When it\'s seven years old'
        ],
        correctAnswer: 1, // When it's three years old
        section: 'essentialDocuments'
      },
      {
        id: 82,
        question: 'What does third-party insurance cover?',
        options: [
          'Damage to your vehicle',
          'Damage to other vehicles',
          'Injury to yourself',
          'All damage and injury'
        ],
        correctAnswer: 1, // Damage to other vehicles
        section: 'essentialDocuments'
      },
      {
        id: 83,
        question: 'What\'s the legal minimum insurance cover you must have to drive on public roads?',
        options: [
          'Third party, fire and theft',
          'Comprehensive',
          'Third party only',
          'Personal injury cover'
        ],
        correctAnswer: 2, // Third party only
        section: 'essentialDocuments'
      },
      {
        id: 84,
        question: 'What does it mean if your insurance policy has an excess of £500?',
        options: [
          'The insurance company will pay the first £500 of any claim',
          'You\'ll be paid £500 if you do not claim within one year',
          'Your vehicle is insured for a value of £500 if it\'s stolen',
          'You\'ll have to pay the first £500 of the cost of any claim'
        ],
        correctAnswer: 3, // You'll have to pay the first £500 of the cost of any claim
        section: 'essentialDocuments'
      }
    ]
  },
  7: {
    lessonTitle: 'Day 7: Incidents, Emergencies and Vehicle Loading',
    sections: {
      incidentsAccidentsEmergencies: 'Incidents, Accidents and Emergencies',
      vehicleLoading: 'Vehicle Loading',
      firstAid: 'First Aid'
    },
    questions: [
      // Incidents, Accidents and Emergencies (Q684-731) - 48 questions
      {
        id: 1,
        question: 'When are you allowed to use hazard warning lights?',
        options: [
          'When stopped and temporarily obstructing traffic',
          'When travelling during darkness without headlights',
          'When parked on double yellow lines to visit a shop',
          'When travelling slowly because you\'re lost'
        ],
        correctAnswer: 0, // When stopped and temporarily obstructing traffic
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 2,
        question: 'What should you do if you have to stop while you\'re going through a congested tunnel?',
        options: [
          'Pull up very close to the vehicle in front to save space',
          'Ignore any message signs, as they\'re never up to date',
          'Keep a safe distance from the vehicle in front',
          'Make a U-turn and find another route'
        ],
        correctAnswer: 2, // Keep a safe distance from the vehicle in front
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 3,
        question: 'What should you do if you see a large box fall from a lorry onto the motorway?',
        options: [
          'Go to the next emergency telephone and report the hazard',
          'Catch up with the lorry and try to get the driver\'s attention',
          'Stop close to the box until the police arrive',
          'Pull over to the hard shoulder, then remove the box'
        ],
        correctAnswer: 0, // Go to the next emergency telephone and report the hazard
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 4,
        question: 'You\'re going through a long tunnel. What will warn you of congestion or an incident ahead?',
        options: [
          'Hazard warning lines',
          'Other drivers flashing their lights',
          'Variable message signs',
          'Areas with hatch markings'
        ],
        correctAnswer: 2, // Variable message signs
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 5,
        question: 'You\'re the first person to arrive at an incident where people are badly injured. You\'ve switched on your hazard warning lights and checked all engines are stopped. What else should you do?',
        options: [
          'Make sure that an ambulance has been called',
          'Stop other cars and ask the drivers for help',
          'Try and get people who are injured to drink something',
          'Move the people who are injured clear of their vehicles'
        ],
        correctAnswer: 0, // Make sure that an ambulance has been called
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 6,
        question: 'You arrive at an incident. There\'s no danger from fire or further collisions and the emergency services have been called. What\'s your first priority when attending to an unconscious motorcyclist?',
        options: [
          'Check whether they\'re breathing normally',
          'Check whether they\'re bleeding',
          'Check whether they have any broken bones',
          'Check whether they have any bruising'
        ],
        correctAnswer: 0, // Check whether they're breathing normally
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 7,
        question: 'At an incident, someone is unconscious and you want to help. What would be the first thing to check?',
        options: [
          'Whether their vehicle is insured',
          'Whether they have any allergies',
          'Whether they\'re comfortable',
          'Whether their airway is open'
        ],
        correctAnswer: 3, // Whether their airway is open
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 8,
        question: 'What could you do to help injured people at an incident?',
        options: [
          'Keep them warm and comfortable',
          'Give them something to eat',
          'Keep them on the move by walking them around',
          'Give them a warm drink'
        ],
        correctAnswer: 0, // Keep them warm and comfortable
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 9,
        question: 'There\'s been a collision. How can you help a driver who\'s suffering from shock?',
        options: [
          'Give them a drink',
          'Reassure them confidently',
          'Ask who caused the incident',
          'Offer them a cigarette'
        ],
        correctAnswer: 1, // Reassure them confidently
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 10,
        question: 'You arrive at the scene of a motorcycle crash. No other vehicle is involved. The rider is unconscious and lying in the middle of the road. What\'s the first thing you should do at the scene?',
        options: [
          'Move the rider out of the road',
          'Warn other traffic',
          'Clear the road of debris',
          'Give the rider reassurance'
        ],
        correctAnswer: 1, // Warn other traffic
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 11,
        question: 'At an incident, a casualty is unconscious but breathing. When should you move them?',
        options: [
          'When an ambulance is on its way',
          'When bystanders tell you to move them',
          'When there\'s a risk of further danger',
          'When bystanders offer to help you'
        ],
        correctAnswer: 2, // When there's a risk of further danger
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 12,
        question: 'At an incident, it\'s important to look after any casualties. What should you do with them when the area is safe?',
        options: [
          'Move them away from the vehicles',
          'Ask them how it happened',
          'Give them something to eat',
          'Keep them where they are'
        ],
        correctAnswer: 3, // Keep them where they are
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 13,
        question: 'Which sign shows that a tanker is carrying dangerous goods?',
        options: [
          'Orange rectangular sign with hazard symbol',
          'Red circular sign with warning',
          'Yellow diamond sign with information',
          'Blue square sign with direction'
        ],
        correctAnswer: 0, // Orange rectangular sign with hazard symbol
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 14,
        question: 'Which document may the police ask you to produce after you\'ve been involved in a collision?',
        options: [
          'Your vehicle registration document',
          'Your driving licence',
          'Your theory test certificate',
          'Your vehicle service record'
        ],
        correctAnswer: 1, // Your driving licence
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 15,
        question: 'After a collision, someone is unconscious in their vehicle. When should you call the emergency services?',
        options: [
          'Only as a last resort',
          'As soon as possible',
          'After you\'ve woken them up',
          'After checking for broken bones'
        ],
        correctAnswer: 1, // As soon as possible
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 16,
        question: 'A collision has just happened. An injured person is lying in a busy road. What\'s the first thing you should do?',
        options: [
          'Treat the person for shock',
          'Warn other traffic',
          'Place them in the recovery position',
          'Make sure the injured person is kept warm'
        ],
        correctAnswer: 1, // Warn other traffic
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 17,
        question: 'You\'re at the scene of an incident. How could you help someone who\'s suffering from shock?',
        options: [
          'Reassure them confidently',
          'Offer them a cigarette',
          'Give them a warm drink',
          'Offer them some food'
        ],
        correctAnswer: 0, // Reassure them confidently
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 18,
        question: 'There\'s been a collision. A motorcyclist is lying injured and unconscious. Why should you only remove their helmet if it\'s essential?',
        options: [
          'They might not want you to remove it',
          'Removing it could make any injuries worse',
          'Removing it could let them get cold',
          'You could scratch the helmet as you remove it'
        ],
        correctAnswer: 1, // Removing it could make any injuries worse
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 19,
        question: 'You\'re on a motorway. When can you use hazard warning lights?',
        options: [
          'When a vehicle is following too closely',
          'When you slow down quickly because of danger ahead',
          'When you\'re being towed by another vehicle',
          'When you\'re using the hard shoulder as a running lane'
        ],
        correctAnswer: 1, // When you slow down quickly because of danger ahead
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 20,
        question: 'You\'ve broken down on a two-way road. You have a warning triangle. At least how far from your vehicle should you place the warning triangle?',
        options: [
          '5 metres (16 feet)',
          '25 metres (82 feet)',
          '45 metres (147 feet)',
          '100 metres (328 feet)'
        ],
        correctAnswer: 2, // 45 metres (147 feet)
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 21,
        question: 'Your car breaks down on a level crossing. What\'s the first thing you should do?',
        options: [
          'Tell drivers behind what\'s happened',
          'Leave your vehicle and get everyone clear',
          'Walk down the track and signal the next train',
          'Stay in your car until you\'re told to move'
        ],
        correctAnswer: 1, // Leave your vehicle and get everyone clear
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 22,
        question: 'What should you do if a tyre bursts while you\'re driving?',
        options: [
          'Pull on the parking brake',
          'Brake as quickly as possible',
          'Pull up slowly at the side of the road',
          'Continue on at a normal speed'
        ],
        correctAnswer: 2, // Pull up slowly at the side of the road
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 23,
        question: 'What should you do if your vehicle has a puncture on a motorway?',
        options: [
          'Drive slowly to the next service area to get assistance',
          'Pull up on the hard shoulder or in an emergency area. Change the wheel as quickly as possible',
          'Pull up on the hard shoulder or in an emergency area and call for assistance',
          'Switch on your hazard warning lights. Stop in your lane'
        ],
        correctAnswer: 2, // Pull up on the hard shoulder or in an emergency area and call for assistance
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 24,
        question: 'Your vehicle has stalled in the middle of a level crossing. What should you do if the warning bells start to ring while you\'re trying to restart the engine?',
        options: [
          'Get out of the car and clear of the crossing',
          'Run down the track to warn the signal operator',
          'Carry on trying to restart the engine',
          'Push the vehicle clear of the crossing'
        ],
        correctAnswer: 0, // Get out of the car and clear of the crossing
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 25,
        question: 'What should you do before driving into a tunnel?',
        options: [
          'Switch off your radio',
          'Take off your sunglasses',
          'Close your sunroof',
          'Switch on your windscreen wipers'
        ],
        correctAnswer: 1, // Take off your sunglasses
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 26,
        question: 'Which lights should you use when you\'re driving in a tunnel?',
        options: [
          'Sidelights',
          'Front spotlights',
          'Dipped headlights',
          'Rear fog lights'
        ],
        correctAnswer: 2, // Dipped headlights
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 27,
        question: 'What should you do to reduce the risk of your vehicle catching fire?',
        options: [
          'Keep water levels above maximum',
          'Check out any strong smell of fuel',
          'Avoid driving with a full tank of fuel',
          'Use fuel additives'
        ],
        correctAnswer: 1, // Check out any strong smell of fuel
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 28,
        question: 'You\'re driving on the motorway. What should you do if luggage falls from your vehicle?',
        options: [
          'Stop at the next emergency telephone and report the incident',
          'Stop on the motorway and switch on hazard warning lights while you pick it up',
          'Walk back up the motorway to pick it up',
          'Pull up on the hard shoulder and wave traffic down'
        ],
        correctAnswer: 0, // Stop at the next emergency telephone and report the incident
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 29,
        question: 'What should you do if an instrument panel warning light comes on while you\'re driving?',
        options: [
          'Continue if the engine sounds all right',
          'Hope that it\'s just a temporary electrical fault',
          'Deal with the problem when there\'s more time',
          'Check out the problem quickly and safely'
        ],
        correctAnswer: 3, // Check out the problem quickly and safely
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 30,
        question: 'What should you do if your vehicle breaks down in a tunnel?',
        options: [
          'Stay in your vehicle and wait for the police',
          'Stand in the lane behind your vehicle to warn others',
          'Stand in front of your vehicle to warn oncoming drivers',
          'Switch on hazard warning lights, then go and call for help'
        ],
        correctAnswer: 3, // Switch on hazard warning lights, then go and call for help
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 31,
        question: 'What should you do if your vehicle catches fire while you\'re driving through a tunnel?',
        options: [
          'Leave it where it is, with the engine running',
          'Pull up, then walk to an emergency telephone',
          'Park it away from the carriageway',
          'Drive it out of the tunnel if it\'s safe to do so'
        ],
        correctAnswer: 3, // Drive it out of the tunnel if it's safe to do so
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 32,
        question: 'What should you do first if your vehicle has broken down on an automatic railway level crossing?',
        options: [
          'Get everyone out of the vehicle and clear of the crossing',
          'Telephone your vehicle recovery service to move it',
          'Walk along the track to give warning to any approaching trains',
          'Try to push the vehicle clear of the crossing as soon as possible'
        ],
        correctAnswer: 0, // Get everyone out of the vehicle and clear of the crossing
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 33,
        question: 'What\'s the first thing you must do if you have a collision while you\'re driving your car?',
        options: [
          'Stop only if someone waves at you',
          'Call the emergency services',
          'Stop at the scene of the incident',
          'Call your insurance company'
        ],
        correctAnswer: 2, // Stop at the scene of the incident
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 34,
        question: 'What information should you share if you\'re involved in a collision that causes damage to another vehicle?',
        options: [
          'Your occupation and reason for your journey',
          'Your name, address and vehicle registration number',
          'Your national insurance number',
          'Your internet service provider'
        ],
        correctAnswer: 1, // Your name, address and vehicle registration number
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 35,
        question: 'You lose control of your car and damage a garden wall. What must you do if the property owner is not available?',
        options: [
          'Report the incident to the police within 24 hours',
          'Go back to tell the house owner the next day',
          'Report the incident to your insurance company when you get home',
          'Find someone in the area to tell them about it immediately'
        ],
        correctAnswer: 0, // Report the incident to the police within 24 hours
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 36,
        question: 'You arrive at the scene of a crash where someone is bleeding heavily from a wound in their arm. Nothing is embedded in the wound. What could you do to help?',
        options: [
          'Walk them around and keep them talking',
          'Dab the wound',
          'Get them a drink',
          'Apply pressure over the wound'
        ],
        correctAnswer: 3, // Apply pressure over the wound
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 37,
        question: 'You\'re at an incident. What could you do to help an unconscious casualty?',
        options: [
          'Take photographs of the scene',
          'Check that they\'re breathing normally',
          'Move them to somewhere more comfortable',
          'Splash their face with cool water'
        ],
        correctAnswer: 1, // Check that they're breathing normally
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 38,
        question: 'A casualty is not breathing normally and needs CPR. At what rate should you press down and release on the centre of their chest?',
        options: [
          '10 times per minute',
          '120 times per minute',
          '60 times per minute',
          '240 times per minute'
        ],
        correctAnswer: 1, // 120 times per minute (about twice a second)
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 39,
        question: 'Following a collision, a person has been injured. What would be a warning sign for shock?',
        options: [
          'Flushed complexion',
          'Warm dry skin',
          'Slow pulse',
          'Rapid shallow breathing'
        ],
        correctAnswer: 3, // Rapid shallow breathing
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 40,
        question: 'An injured person has been placed in the recovery position. They\'re unconscious but breathing normally. What else should be done?',
        options: [
          'Press firmly between their shoulders',
          'Place their arms by their side',
          'Give them a hot sweet drink',
          'Check their airway remains open'
        ],
        correctAnswer: 3, // Check their airway remains open
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 41,
        question: 'An injured motorcyclist is lying unconscious in the road. The traffic has stopped and there\'s no further danger. What could you do to help?',
        options: [
          'Remove their safety helmet',
          'Seek medical assistance',
          'Move the person off the road',
          'Remove their leather jacket'
        ],
        correctAnswer: 1, // Seek medical assistance
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 42,
        question: 'An adult casualty is not breathing. To maintain circulation, CPR should be given. What\'s the correct depth to press down on their chest?',
        options: [
          '1 to 2 centimetres',
          '5 to 6 centimetres',
          '10 to 15 centimetres',
          '15 to 20 centimetres'
        ],
        correctAnswer: 1, // 5 to 6 centimetres
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 43,
        question: 'You arrive at the scene of a motorcycle crash. The rider is injured. When should their helmet be removed?',
        options: [
          'Only when it\'s essential',
          'Always straight away',
          'Only when the motorcyclist asks',
          'Always, unless they\'re in shock'
        ],
        correctAnswer: 0, // Only when it's essential
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 44,
        question: 'At an incident, how could you help a small child who\'s not breathing?',
        options: [
          'Find their parents and explain what\'s happening',
          'Open their airway and begin CPR',
          'Put them in the recovery position and slap their back',
          'Talk to them confidently until an ambulance arrives'
        ],
        correctAnswer: 1, // Open their airway and begin CPR
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 45,
        question: 'At an incident, a casualty is not breathing. What should you do while helping them to start breathing again?',
        options: [
          'Put their arms across their chest',
          'Shake them firmly',
          'Roll them onto their side',
          'Open their airway'
        ],
        correctAnswer: 3, // Open their airway
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 46,
        question: 'At an incident, someone is suffering from severe burns. How could you help them?',
        options: [
          'Apply lotions to the injury',
          'Burst any blisters',
          'Remove anything sticking to the burns',
          'Douse the burns with clean, cool water'
        ],
        correctAnswer: 3, // Douse the burns with clean, cool water
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 47,
        question: 'You arrive at an incident. A pedestrian is bleeding heavily from a leg wound. The leg is not broken and there\'s nothing in the wound. How could you help?',
        options: [
          'Dab the wound to stop the bleeding',
          'Keep the casualty\'s legs flat on the ground',
          'Give them a warm drink',
          'Apply firm pressure over the wound'
        ],
        correctAnswer: 3, // Apply firm pressure over the wound
        section: 'incidentsAccidentsEmergencies'
      },
      {
        id: 48,
        question: 'At an incident, how could you help a casualty who has stopped breathing?',
        options: [
          'Keep their head tilted forwards as far as possible',
          'Follow the DR ABC code',
          'Raise their legs to help with circulation',
          'Try to give them something to drink'
        ],
        correctAnswer: 1, // Follow the DR ABC code
        section: 'incidentsAccidentsEmergencies'
      },
      // Vehicle Loading (Q732-752) - 21 questions
      {
        id: 49,
        question: 'What restrictions apply if you\'re towing a trailer on a three-lane motorway?',
        options: [
          'You must not exceed 50 mph',
          'You must not overtake',
          'You must have a stabiliser fitted',
          'You must not use the right-hand lane'
        ],
        correctAnswer: 3, // You must not use the right-hand lane
        section: 'vehicleLoading'
      },
      {
        id: 50,
        question: 'What should you do if you\'re towing a trailer and it starts to swing from side to side?',
        options: [
          'Ease off the accelerator to reduce your speed',
          'Let go of the steering wheel and let it correct itself',
          'Brake hard and hold the pedal down',
          'Accelerate until it stabilises'
        ],
        correctAnswer: 0, // Ease off the accelerator to reduce your speed
        section: 'vehicleLoading'
      },
      {
        id: 51,
        question: 'When would you increase the pressure in your tyres so that it\'s above the normal value?',
        options: [
          'When the roads are slippery',
          'When the vehicle is fitted with anti-lock brakes',
          'When the tyre tread is worn below 2 mm',
          'When carrying a heavy load'
        ],
        correctAnswer: 3, // When carrying a heavy load
        section: 'vehicleLoading'
      },
      {
        id: 52,
        question: 'How will a heavy load on your roof rack affect your vehicle\'s handling?',
        options: [
          'It will improve the road holding',
          'It will reduce the stopping distance',
          'It will make the steering lighter',
          'It will reduce stability'
        ],
        correctAnswer: 3, // It will reduce stability
        section: 'vehicleLoading'
      },
      {
        id: 53,
        question: 'What would be affected if you carry a very heavy load on your vehicle?',
        options: [
          'The vehicle\'s gearbox',
          'The vehicle\'s ventilation',
          'The vehicle\'s handling',
          'The vehicle\'s battery'
        ],
        correctAnswer: 2, // The vehicle's handling
        section: 'vehicleLoading'
      },
      {
        id: 54,
        question: 'Who\'s responsible for making sure that a vehicle is not overloaded?',
        options: [
          'The driver of the vehicle',
          'The owner of the items being carried',
          'The person who loaded the vehicle',
          'The licensing authority'
        ],
        correctAnswer: 0, // The driver of the vehicle
        section: 'vehicleLoading'
      },
      {
        id: 55,
        question: 'You\'re planning to tow a caravan. What will help the handling of the combination?',
        options: [
          'A jockey wheel fitted to the tow bar',
          'Power steering fitted to the towing vehicle',
          'Anti-lock brakes fitted to the towing vehicle',
          'A stabiliser fitted to the tow bar'
        ],
        correctAnswer: 3, // A stabiliser fitted to the tow bar
        section: 'vehicleLoading'
      },
      {
        id: 56,
        question: 'Are passengers allowed to ride in a caravan that\'s being towed?',
        options: [
          'Yes, if they\'re over 14',
          'No, not at any time',
          'Only if all the seats in the towing vehicle are full',
          'Only if a stabiliser is fitted'
        ],
        correctAnswer: 1, // No, not at any time
        section: 'vehicleLoading'
      },
      {
        id: 57,
        question: 'What safety device must be fitted to a trailer braking system?',
        options: [
          'Stabiliser',
          'Jockey wheel',
          'Corner steadies',
          'Breakaway cable'
        ],
        correctAnswer: 3, // Breakaway cable
        section: 'vehicleLoading'
      },
      {
        id: 58,
        question: 'You wish to tow a trailer. Where would you find the maximum noseweight for your vehicle\'s tow hitch?',
        options: [
          'In the vehicle handbook',
          'In The Highway Code',
          'In your vehicle registration certificate',
          'In your licence documents'
        ],
        correctAnswer: 0, // In the vehicle handbook
        section: 'vehicleLoading'
      },
      {
        id: 59,
        question: 'How should a load be carried on your roof rack?',
        options: [
          'Securely fastened with suitable restraints',
          'Loaded towards the rear of the vehicle',
          'Visible in your exterior mirror',
          'Covered with plastic sheeting'
        ],
        correctAnswer: 0, // Securely fastened with suitable restraints
        section: 'vehicleLoading'
      },
      {
        id: 60,
        question: 'You\'re carrying a child under three years old in your car. Which restraint is suitable for a child of this age?',
        options: [
          'A child seat',
          'An adult holding a child',
          'An adult seat belt',
          'An adult lap belt'
        ],
        correctAnswer: 0, // A child seat
        section: 'vehicleLoading'
      },
      {
        id: 61,
        question: 'You\'ve just passed your driving test. What\'s the maximum authorised mass (MAM) of any trailer that you can tow?',
        options: [
          '6,500 kg',
          '5,500 kg',
          '4,500 kg',
          '3,500 kg'
        ],
        correctAnswer: 3, // 3,500 kg
        section: 'vehicleLoading'
      },
      {
        id: 62,
        question: 'What should you do before you tow a trailer for the first time?',
        options: [
          'Ask DVLA to update your licence',
          'Fit P plates to your trailer',
          'Take professional training',
          'Pass a special driving test'
        ],
        correctAnswer: 2, // Take professional training
        section: 'vehicleLoading'
      },
      {
        id: 63,
        question: 'You\'re going to tow a trailer that\'s wider than your car. What must you fit to your car before you start towing it?',
        options: [
          'Exterior towing mirrors',
          'Projection markers',
          'Parking sensors',
          'Rear-view camera'
        ],
        correctAnswer: 0, // Exterior towing mirrors
        section: 'vehicleLoading'
      },
      {
        id: 64,
        question: 'What must you do when you hitch an unbraked trailer to a towing vehicle?',
        options: [
          'Fit a secondary coupling device',
          'Grease the tow ball and hitch',
          'Switch off the reversing sensor on the towing vehicle',
          'Make sure you can see the trailer in the mirrors'
        ],
        correctAnswer: 0, // Fit a secondary coupling device
        section: 'vehicleLoading'
      },
      {
        id: 65,
        question: 'What\'s the minimum depth of tread on the tyres of a trailer?',
        options: [
          '1 mm',
          '1.6 mm',
          '2 mm',
          '2.2 mm'
        ],
        correctAnswer: 1, // 1.6 mm
        section: 'vehicleLoading'
      },
      {
        id: 66,
        question: 'You\'re about to start a journey towing a trailer. What should you do if you notice that a light on your trailer is not working?',
        options: [
          'Continue with your journey because the lights on your car are working',
          'Disconnect the trailer electrical coupling before continuing with your journey',
          'Repair the fault before continuing with your journey',
          'Book the trailer in for repair before continuing with your journey'
        ],
        correctAnswer: 2, // Repair the fault before continuing with your journey
        section: 'vehicleLoading'
      },
      {
        id: 67,
        question: 'What does it mean if your trailer has a maximum authorised mass (MAM) of 3,500 kg?',
        options: [
          'Your trailer can carry a load of 3,500 kg',
          'Your empty trailer weighs 3,500 kg',
          'Your trailer and towing vehicle combined cannot weigh more than 3,500 kg',
          'Your trailer and load combined cannot weigh more than 3,500 kg'
        ],
        correctAnswer: 3, // Your trailer and load combined cannot weigh more than 3,500 kg
        section: 'vehicleLoading'
      },
      {
        id: 68,
        question: 'What should you do if your trailer starts to swerve or snake?',
        options: [
          'Reduce speed gently',
          'Brake firmly',
          'Increase speed',
          'Steer sharply'
        ],
        correctAnswer: 0, // Reduce speed gently
        section: 'vehicleLoading'
      },
      {
        id: 69,
        question: 'How should you load your trailer?',
        options: [
          'Put heavy items at the front',
          'Put heavy items at the back',
          'Put heavy items over the axle(s)',
          'Put heavy items in the corners'
        ],
        correctAnswer: 2, // Put heavy items over the axle(s)
        section: 'vehicleLoading'
      },
      // First Aid - 9 questions
      {
        id: 70,
        question: 'Who can use a public access defibrillator (AED)?',
        options: [
          'Paramedics only',
          'First aiders only',
          'Doctors only',
          'Everyone'
        ],
        correctAnswer: 3, // Everyone
        section: 'firstAid'
      },
      {
        id: 71,
        question: 'You\'re asked to fetch a defibrillator (AED). What\'s the best way to find the nearest AED?',
        options: [
          'Follow the arrows on marker posts',
          'The 999 operator will direct you',
          'Ask your car\'s built-in sat nav',
          'Check the casualty\'s belongings'
        ],
        correctAnswer: 1, // The 999 operator will direct you
        section: 'firstAid'
      },
      {
        id: 72,
        question: 'You\'re performing cardiopulmonary resuscitation (CPR) on a casualty. Someone stops to help. What should you get them to do?',
        options: [
          'Fetch a blanket',
          'Fetch a first aid kit',
          'Fetch a defibrillator',
          'Fetch a privacy screen'
        ],
        correctAnswer: 2, // Fetch a defibrillator
        section: 'firstAid'
      },
      {
        id: 73,
        question: 'You need to use a defibrillator (AED) on a casualty, how will you know how to use it?',
        options: [
          'You need to be trained to use an AED',
          'The AED gives you visual and verbal instructions',
          'You must read the AED\'s instruction manual',
          'The casualty will tell you what to do'
        ],
        correctAnswer: 1, // The AED gives you visual and verbal instructions
        section: 'firstAid'
      },
      {
        id: 74,
        question: 'You\'re performing cardiopulmonary resuscitation (CPR) on a 6-year-old child. How\'s it different to performing CPR on an adult?',
        options: [
          'You may only need one hand and press down 4 to 5 cm',
          'You should press twice as fast but more gently',
          'You should press more slowly but more firmly',
          'You can only use 2 fingers and press down 1 to 2 cm'
        ],
        correctAnswer: 0, // You may only need one hand and press down 4 to 5 cm
        section: 'firstAid'
      },
      {
        id: 75,
        question: 'You\'re performing cardiopulmonary resuscitation (CPR) on a casualty. When should you stop CPR?',
        options: [
          'When you need to talk to the 999 operator',
          'When you\'ve completed 5 minutes of compressions',
          'When you want to fetch a defibrillator (AED)',
          'When they start breathing or a healthcare professional takes over'
        ],
        correctAnswer: 3, // When they start breathing or a healthcare professional takes over
        section: 'firstAid'
      },
      {
        id: 76,
        question: 'You arrive at the scene of an incident. You see a casualty who\'s not moving. What should you do first?',
        options: [
          'Check if it\'s safe to approach the casualty',
          'Begin cardiopulmonary resuscitation (CPR)',
          'Start looking for a defibrillator (AED)',
          'Move the casualty into the recovery position'
        ],
        correctAnswer: 0, // Check if it's safe to approach the casualty
        section: 'firstAid'
      },
      {
        id: 77,
        question: 'You\'re performing cardiopulmonary resuscitation (CPR) on a casualty. How fast should chest compressions be?',
        options: [
          'Once per second',
          'Twice per second',
          'Three times per second',
          'Once every 5 seconds'
        ],
        correctAnswer: 1, // Twice per second
        section: 'firstAid'
      },
      {
        id: 78,
        question: 'You arrive at the scene of a crash where someone is bleeding heavily from a wound in their arm. Nothing is embedded in the wound. What could you do to help?',
        options: [
          'Walk them around and keep them talking',
          'Dab the wound',
          'Get them a drink',
          'Apply pressure over the wound'
        ],
        correctAnswer: 3, // Apply pressure over the wound
        section: 'firstAid'
      }
    ]
  }
};

// Helper function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to randomize question options
const randomizeQuestion = (question) => {
  // Validate question structure
  if (!question || !question.options || !Array.isArray(question.options)) {
    console.warn('Invalid question structure:', question);
    return question;
  }
  
  // Ensure correctAnswer is a valid index
  if (typeof question.correctAnswer !== 'number' || 
      question.correctAnswer < 0 || 
      question.correctAnswer >= question.options.length) {
    console.warn('Invalid correctAnswer for question:', question);
    return question;
  }
  
  // Create array of indices [0, 1, 2, 3]
  const indices = question.options.map((_, index) => index);
  // Shuffle the indices
  const shuffledIndices = shuffleArray(indices);
  
  // Find where the correct answer moved to
  const originalCorrectIndex = question.correctAnswer;
  const newCorrectIndex = shuffledIndices.indexOf(originalCorrectIndex);
  
  // Validate new correct index
  if (newCorrectIndex === -1) {
    console.warn('Could not find correct answer after shuffling:', question);
    return question;
  }
  
  // Create new options array with shuffled order
  const shuffledOptions = shuffledIndices.map(idx => question.options[idx]);
  
  return {
    ...question,
    options: shuffledOptions,
    correctAnswer: newCorrectIndex,
    originalCorrectAnswer: originalCorrectIndex // Keep original for reference if needed
  };
};

function Quiz() {
  const navigate = useNavigate();
  const { day } = useParams();
  const dayNumber = parseInt(day) || 1;
  const rawQuiz = quizData[dayNumber] || quizData[1];
  
  // Randomize questions when component loads or when day changes
  const [quiz, setQuiz] = useState(() => {
    if (!rawQuiz || !rawQuiz.questions) return rawQuiz;
    const randomizedQuestions = rawQuiz.questions.map(q => randomizeQuestion(q));
    return {
      ...rawQuiz,
      questions: randomizedQuestions
    };
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  
  // All days are now unlocked - quiz is always available
  const canTakeQuiz = true;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    // Reset and randomize questions when day changes
    const rawQuizData = quizData[dayNumber] || quizData[1];
    if (rawQuizData && rawQuizData.questions) {
      const randomizedQuestions = rawQuizData.questions.map(q => randomizeQuestion(q));
      setQuiz({
        ...rawQuizData,
        questions: randomizedQuestions
      });
    }
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsQuizComplete(false);
    setScore(0);
  }, [day, dayNumber]);

  const handleAnswerSelect = (optionIndex) => {
    if (showResult || isQuizComplete) return;
    
    setSelectedAnswer(optionIndex);
    setShowResult(true);

    // Check if answer is correct
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    const newAnswers = [...answers, { questionId: currentQuestion.id, selected: optionIndex, correct: isCorrect }];
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete - calculate score
      const correctAnswers = answers.filter(a => a.correct).length;
      const finalScore = correctAnswers + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      setScore(finalScore);
      setIsQuizComplete(true);
    }
  };

  const handleBackToCourse = () => {
    navigate('/course-content');
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setIsQuizComplete(false);
    setScore(0);
  };

  // Save quiz score using progressManager
  useEffect(() => {
    if (isQuizComplete && dayNumber) {
      saveQuizScore(dayNumber, score, totalQuestions);
    }
  }, [isQuizComplete, score, totalQuestions, dayNumber]);

  if (isQuizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70; // Changed from 80% to 70%

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {passed ? '🎉 Quiz Passed!' : 'Quiz Complete'}
              </h1>
              <div className="text-5xl mb-4">{passed ? '✅' : '📝'}</div>
            </div>

            {/* Score Card */}
            <div className={`glass-card p-8 mb-6 animate-slide-up ${passed ? 'border-2 border-green-400' : 'border-2 border-amber-400'}`}>
              <div className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-amber-600'}`}>
                  {score}/{totalQuestions}
                </div>
                <div className="text-xl text-gray-600 font-medium mb-4">
                  {percentage}% Correct
                </div>
                
                {passed ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">
                      ✅ Great job! You passed with {percentage}%. Day {dayNumber} is now marked as completed!
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-amber-800 font-semibold text-sm sm:text-base">
                      You need 70% to pass and mark this day as completed. You got {percentage}%. Review the materials and try again!
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {passed ? (
                    <button
                      onClick={() => {
                        // Small delay to ensure localStorage is updated
                        setTimeout(() => {
                          navigate('/course-content');
                          // Force page refresh to update all progress indicators
                          window.location.reload();
                        }, 100);
                      }}
                      className="w-full bg-green-600 active:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px] touch-manipulation"
                    >
                      Continue to Day {dayNumber + 1}
                    </button>
                  ) : (
                    <button
                      onClick={handleRetry}
                      className="w-full bg-amber-600 active:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[48px] touch-manipulation"
                    >
                      Try Again
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/course-content')}
                    className="w-full glass-button py-4 px-6 text-lg font-semibold text-gray-900 min-h-[48px] touch-manipulation"
                  >
                    Back to Course Content
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
  
  if (!canTakeQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 text-center">
              {/* All days are now unlocked - this section should not appear */}
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start!
              </h2>
              <p className="text-gray-600 font-medium mb-6">
                All course materials are available. Study at your own pace, then take the exam when ready.
              </p>
              <button
                onClick={() => navigate('/course-content')}
                className="bg-primary-600 active:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg min-h-[48px] touch-manipulation"
              >
                Go to Course Content
              </button>
            </div>
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-100 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {quiz.lessonTitle}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm md:text-base text-gray-600 font-medium">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
              <p className="text-sm text-gray-500">
                {Math.round(progress)}%
              </p>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-card p-6 md:p-8 mb-6 animate-slide-up">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showFeedback = showResult;

                let buttonClass = 'w-full text-left py-4 px-6 rounded-lg font-medium transition-all duration-300 ';
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += 'bg-green-100 border-2 border-green-500 text-green-800';
                  } else if (isSelected && !isCorrect) {
                    buttonClass += 'bg-red-100 border-2 border-red-500 text-red-800';
                  } else {
                    buttonClass += 'bg-gray-100 border-2 border-gray-300 text-gray-600';
                  }
                } else {
                  buttonClass += 'bg-white/50 border-2 border-white/30 text-gray-900 hover:bg-white/70 hover:border-primary-300';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && isCorrect && (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          {showResult && (
            <div className="animate-slide-up">
              <button
                onClick={handleNext}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}
              </button>
            </div>
          )}

          {/* Back to Lesson Button */}
          {!showResult && (
            <div className="text-center mt-6">
              <button
                onClick={handleBackToCourse}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Course
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default Quiz;

