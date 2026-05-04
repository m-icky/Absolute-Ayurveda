# Absolute Ayurveda — Luxury Wellness Website

A premium, luxury wellness website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **Full-screen Hero:** Animated botanical SVG and scroll indicator.
- **Dynamic Navbar:** Transparent transitions to solid on scroll + mobile hamburger menu.
- **Scroll Animations:** Triggered fade-up and entrance animations using Framer Motion.
- **Interactive Content:** Stats bar, Philosophy pillars, and dynamic Doctor profile cards.
- **Alternating Layouts:** High-end facilities display with hover zoom effects.
- **Course Carousel:** Infinite scrolling animated course cards.
- **Advanced SEO:** Comprehensive meta tags, Open Graph, Twitter cards, and dynamic metadata for packages.
- **Contact Integration:** Responsive contact form and WhatsApp integration.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

---

## 🏗 Project Structure

```text
absolute-ayurveda/
├── Frontend/             # Next.js Application
│   ├── app/              # App Router (Pages, Layouts)
│   ├── components/       # Reusable React Components
│   ├── public/           # Static Assets
│   ├── styles/           # Global CSS
│   ├── next.config.js    # Next.js configuration
│   └── package.json      # Frontend dependencies
│
├── Backend/              # Django Application
│   ├── backend_project/  # Core Django settings
│   ├── manage.py         # Django management script
│   └── .env              # Environment variables
```

## 🏛 Architecture

The project is built using a decoupled client-server architecture:

- **Frontend (Next.js)**: Handles the presentation layer, routing, and server-side rendering (SSR) for optimal SEO and performance. Framer Motion is used for rich animations, and Tailwind CSS for styling.
- **Backend (Django)**: Serves as the API layer and data management system. It provides RESTful endpoints using the Django REST Framework to handle resources such as Specialists, Courses, Packages, and Consultations.
- **Database (MySQL)**: The primary data store connected to the Django backend.
- **Communication**: The Next.js frontend fetches data from and posts data to the Django API endpoints asynchronously.

---

## 🔍 Search Engine Optimization (SEO)

The project implements best-in-class SEO practices using the Next.js **Metadata API**:

- **Dynamic Metadata:** Each Ayurveda package generates unique SEO titles and descriptions based on its content.
- **Social Sharing:** Optimized Open Graph and Twitter cards for premium social media previews.
- **Sitemap & Robots:** Automated generation of `sitemap.xml` and `robots.txt` to ensure proper search engine indexing.
- **Canonical URLs:** Implemented globally to prevent duplicate content issues.
- **Semantic HTML:** Proper use of heading hierarchies (H1-H6) and descriptive alt text for images.

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

```bash
npm run build
npm start
```

---

**Complete SEO strategy for your application. Here's a summary of the improvements:**

✅ **What's New**
- Global SEO: Added comprehensive Open Graph, Twitter, and canonical meta tags in the root layout.
- Dynamic Metadata: Each Ayurveda package now automatically generates its own unique title, description, and social sharing tags based on its content.
- Automated Indexing:
sitemap.xml: Dynamically generated to include your homepage, courses, and all individual package pages.
robots.txt: Properly configured to guide search engine crawlers.
🔍 **How to Verify**
You can view the results locally:

```bash
Sitemap: http://localhost:3000/sitemap.xml
Robots: http://localhost:3000/robots.txt
```

Meta Tags: Inspect any page's <head> in your browser to see the new tags in action.

---

*Absolute Ayurveda · Healing Since 2008 · Kerala, India*