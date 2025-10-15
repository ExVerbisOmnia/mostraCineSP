# Mostra SP - Film Festival Landing Page

> Intelligent, mobile-first landing page for the São Paulo International Film Festival with real-time search and advanced filtering.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![Firebase](https://img.shields.io/badge/firebase-10.x-orange)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎬 About

The official Mostra SP website publishes fragmented scheduling information (only 4 days visible) without efficient search capabilities. **Mostra SP** solves this by:

- Aggregating complete festival data via automated web scraping
- Providing intelligent real-time search with fuzzy matching
- Offering multi-category filtering (director, room, country, duration, time, rating)
- Delivering a responsive, mobile-first user experience

---

## ✨ Features

### 🔍 Intelligent Search
- Real-time search with 300ms debounce
- Autocomplete suggestions with preview
- Fuzzy matching for typo tolerance
- Keyboard navigation support (↑↓ + Enter)

### 🎛️ Advanced Filtering
- **Multi-category filters:** Director, Room, Country, Duration, Time Slot, Rating
- **Smart logic:** AND between categories, OR within categories
- **Multi-select:** Choose multiple options per category

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layouts: 1 column (mobile) → 3 columns (desktop)
- Smooth animations and transitions
- Dark theme with neon-pastel accents

### 🔄 Automated Updates
- Scheduled scraping every 12 hours
- Real-time Firestore sync
- TMDB API integration for ratings

---

## 🛠️ Tech Stack

### Frontend
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **Vanilla JavaScript (ES6+)** - No framework overhead
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Google Fonts (Sora)](https://fonts.google.com/specimen/Sora)** - Modern typography

### Backend & Infrastructure
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)** - Static site hosting
- **[Cloud Functions](https://firebase.google.com/docs/functions)** - Serverless scraping (Node.js 20)
- **[Firestore](https://firebase.google.com/docs/firestore)** - NoSQL real-time database
- **[Cloud Scheduler](https://cloud.google.com/scheduler)** - Automated cron jobs

### External APIs
- **[TMDB API](https://developers.themoviedb.org/)** - Film ratings and metadata
- **mostra.org** - Source data (Puppeteer scraping)

---


## 📁 Project Structure

```
mostraSp/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Tailwind imports & custom styles
│   ├── components/
│   │   ├── SearchBar.js          # Search component
│   │   ├── FilterPanel.js        # Multi-filter component
│   │   └── FilmeCard.js          # Film card component
│   ├── services/
│   │   ├── firebase.js           # Firebase configuration
│   │   └── filmService.js        # Data fetching logic
│   ├── utils/
│   │   ├── fuzzySearch.js        # Fuzzy matching algorithm
│   │   └── filterLogic.js        # Filter application logic
│   ├── main.js                   # Entry point
│   └── index.html
├── functions/
│   ├── src/
│   │   ├── scraper.js            # Puppeteer scraping logic
│   │   └── tmdbIntegration.js    # TMDB API integration
│   ├── index.js                  # Cloud Functions entry
│   └── package.json
├── firestore.rules               # Security rules
├── firebase.json                 # Firebase config
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js                # Vite configuration
├── .eslintrc.json                # ESLint rules
├── .prettierrc                   # Prettier rules
├── package.json
└── README.md
```

---

## 🎨 Design System

### Color Palette

```css
--bg-primary: #0f1419;      /* Near-black blue */
--accent-blue: #7dd3fc;     /* Pastel-neon blue */
--accent-pink: #f9a8d4;     /* Pastel pink */
--text-primary: #e2e8f0;    /* Soft white */
```

### Typography

- **Font Family:** Sora (Google Fonts)
- **Scale:** Tailwind's default typographic scale

### Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

---

## 📊 Data Schema

### Firestore Collection: `filmes`

```javascript
{
  id: "auto-generated-id",
  titulo: "Anatomy of a Fall",
  diretor: "Justine Triet",
  sinopse: "A woman is suspected...",
  pais: "France",
  duracao: 152,  // minutes
  nota: 7.8,     // TMDB rating
  sessoes: [
    { 
      sala: "Room 1", 
      data: "2025-10-20",  // ISO date
      horario: "19:00"     // 24h format
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Automated Updates

Cloud Scheduler runs the scraper every 12 hours:
- **Schedule:** `0 */12 * * *` (every 12 hours)
- **Timezone:** America/Sao_Paulo
- **Target:** Cloud Function `scrapeMostra`

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Gusrodgs**
- GitHub: [@ExVerbisOmnia](https://github.com/ExVerbisOmnia

---

## 🙏 Acknowledgments

- [Mostra Internacional de Cinema de São Paulo](https://www.mostra.org)
- [The Movie Database (TMDB)](https://www.themoviedb.org/)

---

## 📞 Support

For questions or issues, please open an issue on GitHub or me (mailto:gustavo.rodriguez.ars@gmail.com).

---

**Made with ❤️ for cinema lovers in São Paulo**
