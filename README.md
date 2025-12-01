# MERN Bug Tracker

A simple MERN (MongoDB, Express, React, Node) app for reporting and tracking bugs. Includes testing with Jest, Supertest, and React Testing Library. This repo includes intentional bugs for debugging practice.

## Project structure
(see file tree in project root)

## Requirements
- Node.js 18+
- npm or yarn
- MongoDB (or use mocked tests / mongodb-memory-server)

## Setup

### Backend
1. `cd backend`
2. Install: `npm install`
3. Start dev server: `npm run dev`
   - uses `MONGO_URI` env var if provided, otherwise `mongodb://localhost:27017/mern-bug-tracker`

### Frontend
1. `cd frontend`
2. Install: `npm install`
3. Start dev: `npm run dev`
4. Edit `VITE_API_URL` in `.env` if backend runs on non-default port.

## Tests

### Backend
- Unit tests (validation helper): `cd backend && npm test`
- Integration tests (mocked model + supertest) included.

### Frontend
- `cd frontend && npm test`
- Uses Jest + React Testing Library

## Testing approach & coverage
- Unit tests cover pure functions (validation).
- Integration tests exercise Express routes (Supertest).
- Frontend tests cover component rendering, user interactions, and mocked API flows.
- For end-to-end or full integration of DB, consider `mongodb-memory-server` for ephemeral DB in tests.

## Debugging techniques used in this project
- Console logging in controllers and React components.
- Node inspector: `node --inspect src/server.js` and attach Chrome DevTools.
- React DevTools and browser Network tab for API call inspection.
- Error boundaries to capture runtime errors on client-side.
- Tests to reproduce and lock failing behaviors.

## Intentional bugs (for practice)
- Typos in route handler names (e.g. `createbug` vs `createBug`).
- Mismatched ID fields (use `_id` in backend but `id` in frontend).
- Missing `await` for async calls.
- Invalid status string to test validation behavior.

## Notes & next steps
- Add authentication for multi-user tracking.
- Add filtering and sorting by status and date.
- Add comments and assignment for each bug.
