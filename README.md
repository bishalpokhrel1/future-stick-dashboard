# future-stick-dashboard

A futuristic landing page and personal dashboard with modern UI/UX, dark theme, responsive grid, and interactive charts.

## Features
- Modern dark/light theme with glassy accents
- Responsive grid layout for cards and widgets
- KPI cards, activity table, progress widgets, toasts, and drawer
- Charts (line, bar, doughnut) via Chart.js with graceful fallback
- Mobile sidebar toggle and theme switcher
- Component-driven structure for reusability

## Tech Stack
- HTML, CSS (vanilla) with CSS variables and animations
- JavaScript (ES6), DOM utilities
- Chart.js (optional, CDN or package)
- Optional: Node.js tooling for local dev (serve, lint)

## Project Structure
```
future-stick-dashboard/
├─ dashboard/
│  ├─ dashboard.html
│  ├─ dashboard.css
│  └─ dashboard.js
├─ assets/
│  ├─ images/
│  ├─ icons/
│  └─ fonts/
├─ components/ (reusable HTML/CSS/JS snippets)
├─ landing-page/
├─ package.json
└─ README.md
```

## Getting Started

### 1) Clone
```bash
git clone https://github.com/bishalpokhrel1/future-stick-dashboard.git
cd future-stick-dashboard
```

### 2) Open in browser
- Open dashboard/dashboard.html directly in your browser, or
- Serve locally (recommended) to avoid CORS and get smooth dev:
```bash
# with Node.js installed
npx serve .
# or
python3 -m http.server 5173
```
Then visit http://localhost:3000 or http://localhost:5173 depending on the server.

### 3) Enable charts
Add Chart.js via CDN in dashboard.html head or before closing body:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```
The dashboard will auto-detect Chart.js; if unavailable, charts are skipped gracefully.

## Components
- components/ will hold reusable pieces like navbar, sidebar, kpi-card, chart-card, table-row, toast.
- Each component can have:
  - component-name.html
  - component-name.css (scoped classes)
  - component-name.js

## Development Guidelines
- Use semantic HTML and accessible roles/labels
- Keep CSS variables in :root for theming
- Prefer utility classes and small components over monolith styles
- Keep JS modular; one responsibility per function
- Avoid blocking operations; use requestAnimationFrame for UI transitions

## Scripts (optional)
Add to package.json if using Node tooling:
```json
{
  "scripts": {
    "start": "serve .",
    "lint": "eslint .",
    "format": "prettier -w ."
  }
}
```

## Roadmap
- Add real data hooks and API service layer
- Expand components library (charts, forms, settings panel)
- Add E2E tests (Playwright) and unit tests (Vitest)
- CI workflow for lint/test on PRs

## License
MIT © 2025 bishalpokhrel1
