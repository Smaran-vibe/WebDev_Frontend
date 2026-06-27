# PowerAlert Nepal

## Problem Statement
Nepal Electricity Authority (NEA) serves over 3.2 million consumers but has 
no centralized digital platform for power cut alerts. Consumers find out about 
outages only when their lights go off. PowerAlert Nepal solves this by providing 
a searchable, area-based web platform for upcoming power cuts, maintenance 
schedules, and live outage status.

## Features
- Area-based power cut search with dynamic card rendering
- Color-coded outage cards (Scheduled / Active / Restored)
- Weekly maintenance calendar with filter and sort
- Live power status display
- Citizen outage reporting with localStorage persistence
- Contact form with email validation
- Fully responsive design (mobile, tablet, desktop)

## Technologies Used
- HTML5 (semantic structure)
- Tailwind CSS (utility-first styling)
- Vanilla JavaScript (DOM manipulation, localStorage, form validation)
- Google Fonts (Space Grotesk, Inter)

## Folder Structure
PowerAlertNepal/
│
├── index.html
├── css/
├── js/
│   └── poweralert.js
├── favicon_io/
├── README.md
└── research.pdf

## Future Improvements
- Connect to real NEA API or scrape official notices
- Add push notification support for subscribed areas
- User login system to save preferred ward/area
- SMS alert integration for non-smartphone users
- Admin dashboard for NEA staff to post updates directly

## Learning Outcomes
- Learned how to structure a single page application with multiple sections
- Understood localStorage for client-side data persistence
- Practiced form validation and error handling in JavaScript
- Improved responsive design skills using Tailwind CSS
- Learned to think like a developer by solving a real local problem