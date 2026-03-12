# SafeZone Scanner – Weapon Detection System

SafeZone Scanner is an AI-powered web application designed to detect weapons in images using modern web technologies.  
The system allows users to upload an image and analyze it for potential weapon threats, helping improve security monitoring and awareness.

This project focuses on providing a **clean interface, fast performance, and scalable architecture** for AI-based weapon detection.

---

## Screenshots

### Home Page
<img width="1899" height="1018" alt="Screenshot 2026-03-08 084649" src="https://github.com/user-attachments/assets/294c12e8-1d57-4fe8-8237-10e73f73d853" />

### Weapon Detection Result
<img width="1918" height="1018" alt="Screenshot 2026-03-08 084906" src="https://github.com/user-attachments/assets/5743b94b-9cca-42f6-ba05-8667880b8e6a" />

---

## Features

- Weapon detection from uploaded images
- Fast and responsive user interface
- AI-powered image analysis
- Clean UI built with modern frontend tools
- Real-time result visualization
- Scalable project architecture

---

## Tech Stack

The project is built using modern web development technologies:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn-ui**
- **Supabase** (backend services)
- **ESLint** for code quality

---

## Project Structure

```
safezone-scanner
│
├── public/                # Static assets
├── src/                   # Main application source code
│   ├── components/        # Reusable UI components
│   ├── pages/             # Application pages
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
│
├── supabase/              # Supabase configuration
│
├── index.html             # Main HTML entry
├── package.json           # Project dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # Linting rules
├── components.json        # UI component configuration
└── README.md
```

---

## Installation and Setup

Follow these steps to run the project locally.

### 1 Clone the Repository

```bash
git clone <YOUR_GIT_REPOSITORY_URL>
```

### 2 Navigate to the Project Folder

```bash
cd safezone-scanner
```

### 3 Install Dependencies

Make sure **Node.js and npm** are installed.

```bash
npm install
```

### 4 Start Development Server

```bash
npm run dev
```

The application will start locally with **live reloading enabled**.

---

## How the System Works

1. The user uploads an image through the interface.
2. The image is processed by the detection system.
3. The AI model analyzes the image for weapon patterns.
4. The result is displayed to the user with detection feedback.

---

## Future Enhancements

- Real-time webcam weapon detection
- Support for multiple weapon classes
- Improved AI model accuracy
- Cloud deployment for large-scale use
- Security monitoring dashboard

---

## Author

**Bhavuk Mahajan**