# Urban Mobility Frontend

React-based frontend for the Inclusive Urban Mobility Intelligence Platform.

## Tech Stack

- React 18
- React Router for navigation
- Axios for API calls
- Vite for build tooling
- CSS for styling

## Prerequisites

- Node.js (v16 or higher)
- Backend server running on port 5000

## Setup Instructions

### 1. Install Dependencies

```bash
cd Frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the Frontend directory:

```bash
cp .env.example .env
```

The default configuration:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Application will run on `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## Project Structure

```
Frontend/
├── src/
│   ├── api/              # API integration layer
│   ├── components/
│   │   ├── common/       # Reusable UI components
│   │   └── feedback/     # Feedback-specific components
│   ├── pages/            # Page components
│   ├── routes/           # Route definitions
│   ├── styles/           # Global styles
│   ├── utils/            # Constants and helpers
│   ├── App.jsx           # Root component
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Pages

- **/** - Landing page with project overview
- **/search** - Search and browse stations
- **/stations/:id** - Station detail page with facilities, feedback, and submission form
- **/awareness** - Educational content about accessibility features

## Components

### Common Components
- `Navbar` - Navigation header
- `RiskBadge` - Visual risk level indicator
- `StationCard` - Station preview card
- `StationScorePanel` - Accessibility score display
- `FacilityList` - List of available facilities
- `Loader` - Loading spinner
- `EmptyState` - Empty state placeholder

### Feedback Components
- `RecentFeedbackList` - Display recent issues
- `FeedbackForm` - Issue submission form

## Design Principles

The UI follows accessibility-first design:
- Large, readable text (18px base)
- High contrast colors
- Clear labels on all interactive elements
- Large buttons (min 48px height)
- Simple, uncluttered layouts
- Color + text labels for status indicators
- No reliance on color alone for information
