# 🏫 CampusGuide

CampusGuide is a Node.js + Express-powered campus navigation web app designed to help students and visitors explore River Valley High School (RVHS). It provides a clean and interactive interface to discover key facilities, learn about the school, and navigate easily. It is currently hosted at:  
🔗 [https://campusguide-ajgq.onrender.com/]

---

## 🚀 Features

- **Multiple views** served via Express routing.
- **Dynamic routing & page generation** from the backend.
- **Fully responsive** (coming soon!) design for desktop and mobile.
- **Modular architecture** that’s easy to expand and maintain.
- **Hosted on Render** for live deployment and sharing.

---

## 📄 Pages Overview

### `home.ejs` – Home Page
This is the landing page of the website. It includes:
- Navigation to all main areas of the site.
- Buttons/links to the **Facilities Page** and **About Us Page**.
- A simple and clean interface to welcome users.

### `tour.ejs` – Facilities Page
This page showcases RVHS's top facilities with images and descriptions. It acts as a virtual campus tour for new students, parents, and guests.

### `about.ejs` – About Us Page
A static page describing RVHS, its culture, mission, and vision. Great for first-time visitors or those interested in learning more about the school.

### `facility.ejs` – Individual Facility View
This is a dynamic page rendered from the backend that shows details of a specific facility when clicked from the `tour.ejs` page. It includes:
- The facility name
- Image(s)
- Description and features

---

## 🛠️ Getting Started

1. Clone this repo:
   ```bash
   git clone https://github.com/whoisarjun/campusguide.git
   cd campusguide
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app locally:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
campusguide/
├── js/                # Frontend JavaScript
├── public/            # Static assets (CSS, images)
├── views/             # HTML templates (home, tour, about, facility)
├── package.json
├── server.js          # Express backend
└── README.md
```

---

## 📄 License

MIT © 2024 Arjun Palakkal
