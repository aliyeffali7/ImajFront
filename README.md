# ReStyle — Construction Company Website

A multi-page React + Vite website for a construction company.

## Project Structure

```
src/
├── App.jsx                  ← Root router (switches between pages)
├── main.jsx                 ← Entry point
├── theme.js                 ← Color constants
├── data/
│   └── index.js             ← All site data (projects, services, team)
├── components/
│   ├── Navbar.jsx           ← Top navigation bar
│   ├── Footer.jsx           ← Site footer
│   └── Shared.jsx           ← Reusable UI (Label, H2, PageHero, etc.)
└── pages/
    ├── Home.jsx             ← Homepage
    ├── About.jsx            ← About us page
    ├── Services.jsx         ← Services page with tabbed selector
    ├── Projects.jsx         ← Project portfolio with filters
    ├── ProjectDetail.jsx    ← Individual project page
    └── Contact.jsx          ← Contact form page
```

## Setup & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open http://localhost:5173 in your browser.

## Customisation

- **Company name / branding**: Edit `src/components/Navbar.jsx` and `src/components/Footer.jsx`
- **Colors**: Edit `src/theme.js`
- **Projects**: Edit the `PROJECTS` array in `src/data/index.js`
- **Services**: Edit the `SERVICES_DATA` array in `src/data/index.js`
- **Team members**: Edit the `TEAM` array in `src/data/index.js`
