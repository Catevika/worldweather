# World Weather

A modern, responsive weather application built with React, TypeScript, and Vite. Get real-time weather information, hourly forecasts, daily forecasts, and air quality data with an interactive map interface.

## Table of Contents

- [World Weather](#world-weather)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Demo](#demo)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
    - [Running the App](#running-the-app)
  - [Available Scripts](#available-scripts)
  - [Components](#components)
    - [Weather Cards](#weather-cards)
    - [UI Components](#ui-components)
    - [Loading States](#loading-states)
  - [API Integration](#api-integration)
  - [Contributing](#contributing)
  - [Credits](#credits)

## Features

- 🌍 **Global Weather Search** - Search weather information for any location worldwide
- 📍 **Current Weather Display** - Real-time temperature, humidity, wind speed, and conditions
- 📊 **Hourly Forecast** - Detailed hourly weather predictions
- 📅 **Daily Forecast** - 7-day weather outlook with high/low temperatures
- 🗺️ **Interactive Map** - Multiple map types (satellite, terrain, light, dark) with weather layer visualization
- 💨 **Air Quality Index** - Monitor air pollution levels (PM2.5, NO₂, etc.)
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Skeleton Loading** - Smooth loading states for better UX
- 🎨 **Modern UI** - Built with Tailwind CSS and Radix UI components

## Demo

Live demo available at [your-deployment-url]

## Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7.2
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn UI
- **State Management:** TanStack React Query (React Query)
- **Maps:** Leaflet + MapTiler
- **Icons:** Lucide React
- **Data Validation:** Zod
- **Linting:** ESLint
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free tier available)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Catevika/worldweather.git
cd worldweather
```

2. Install dependencies:

```bash
npm install
```

### Environment Setup

1. Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

2. Add your API credentials:

```env
VITE_API_KEY=your_openweathermap_api_key
```

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api/one-call-3)

### Running the App

Start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Components

### Weather Cards

- **CurrentWeather** - Displays current temperature and conditions
- **HourlyForecast** - Hourly predictions with interactive timeline
- **DailyForecast** - 7-day forecast with high/low temperatures
- **AdditionalInfo** - Detailed metrics (humidity, wind, pressure, etc.)

### UI Components

- **Map** - Interactive leaflet map with weather visualization
- **MapLegend** - Legend for map data
- **LocationDropdown** - Location search and selection
- **MapTypeDropdown** - Map style selector
- **LightDarkToggle** - Theme switcher

### Loading States

- Skeleton components for smooth loading animations
- React Query integration for automatic caching and refetching

## API Integration

The app uses the OpenWeatherMap API endpoints:

- **Current Weather & Forecast:** One Call API 3.0
- **Geocoding:** Geolocation API for location search
- **Air Pollution:** Air Pollution API

All API calls are wrapped with Zod schema validation for type safety.

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## Credits

This project has been created by [AustinDavisTech](https://github.com/AustinDavisTech/WeatherApp). You can find the respective tutorial on [Youtube](https://youtu.be/M-iV9R3kLNA)
