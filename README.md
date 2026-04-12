# Absolute Ayurveda — Luxury Wellness Website

A premium, luxury wellness website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- Full-screen hero with animated botanical SVG and scroll indicator
- Transparent navbar → solid on scroll + mobile hamburger menu
- Scroll-triggered fade-up animations on every section (Framer Motion)
- Stats bar, Philosophy pillars, About with mission grid
- Doctor profile cards with hover lift effect
- Alternating facilities layout with hover zoom
- Dark editorial courses section
- Contact form with success state
- Minimal footer

---

## 🚀 Getting Started

### 1. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Run development server
\`\`\`bash
npm run dev
\`\`\`

### 3. Open in browser
\`\`\`
http://localhost:3000
\`\`\`

---

## 🏗 Project Structure

\`\`\`
absolute-ayurveda/
├── app/
│   ├── layout.jsx        # Root layout with metadata
│   └── page.jsx          # Main page
├── components/
│   ├── Navbar.jsx        # Sticky transparent → solid navbar
│   ├── Hero.jsx          # Full-screen hero section
│   ├── StatsBar.jsx      # Olive stats bar (16+ yrs, 3 sanctuaries)
│   ├── Intro.jsx         # Philosophy + three pillars
│   ├── About.jsx         # About + mission grid
│   ├── Doctors.jsx       # Doctor cards + testimonial
│   ├── Facilities.jsx    # Alternating facility blocks
│   ├── Courses.jsx       # Dark editorial courses section
│   ├── Contact.jsx       # Contact form + details
│   ├── Footer.jsx        # Minimal footer
│   └── Reveal.jsx        # Reusable scroll-reveal wrapper
├── styles/
│   └── globals.css       # Tailwind + Google Fonts + design tokens
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
\`\`\`

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Background | `#FFFFFF`, `#F8F6F0` |
| Text | `#1A1A1A` |
| Olive Green | `#6B7C5B` |
| Gold / Beige | `#C9B79C` |
| Muted Text | `#6B6B6B` |
| Border | `#E2DADA` |
| Heading Font | Playfair Display (serif) |
| Body Font | Lato (sans-serif) |

---

## 📦 Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

*Absolute Ayurveda · Healing Since 2008 · Kerala, India*
