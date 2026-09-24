# NetHelp — Development Guide

## Overview
NetHelp is a front-end web app built with **Vite + React 18 + React Router 6 + Tailwind CSS 3**. It connects students, scholars, and dropouts in Tulsa, OK with GED resources, local internships, and networking events.

## Running the App
```bash
docker compose -f docker-compose.base44.yml up -d
```
- The Vite dev server runs on port 5173 inside the container, mapped to host port 3000.
- Dependencies install automatically on container start (`npm install`).
- Live reload is enabled (Chokidar polling for bind-mount compatibility).

## Architecture
- **State management**: React Context (`src/context/AppContext.jsx`) holds user profile, settings toggles, RSVP state, event history, and messaging drawer state.
- **Mock data**: All in `src/data/mockData.js` — events, internships, GED centers, mentors, and study resources for Tulsa, OK.
- **Routing**: React Router with a shared `Layout` (header + sticky filter hotbar + messaging drawer).

## Key Features
- **Filter Hotbar**: Sticky bar below header — All Feed / GED Prep / Internships / Events / Mentors.
- **RSVP**: Toggle on event cards and detail pages; RSVP'd events appear in Profile.
- **Self-Report Attendance**: On event detail pages, saves to History log with title, date, contacts met, and notes.
- **Digital Resume**: Public profile page with skills, education/GED status, and verified event history.
- **Settings**: Toggle for "Allow Direct Messages" and browser notifications (uses Notification API).
- **Messaging Drawer**: Slide-out panel; disabled when DM toggle is off.
- **Internship Apply**: "Apply Now" opens external URL in a new tab.

## User Roles (mock)
1. **Seeker** — default role; can view, RSVP, log history, access GED resources, build resume, set messaging prefs.
2. **School/Org Admin** — verified via `.edu`/school domain; can post events (mock organizers shown in data).
3. **Employer/Business** — verified via company domain; can post internships (mock companies shown in data).

## Verification
- Visit `/` for the home feed with events and internships.
- Visit `/ged` for GED centers (list/map), study resources, and mentors.
- Visit `/events` and click an event for detail, RSVP, and self-report.
- Visit `/profile` for the digital resume.
- Visit `/settings` to toggle DMs and notifications.
- Visit `/history` for the event history log.
