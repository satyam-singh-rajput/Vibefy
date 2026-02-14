# Vibefy

A cloud-based music player where users can upload their local audio files and stream them online from the web.

## About This Project

I built **Vibefy** as a full-stack learning project:

- **Backend:** I completed the backend to deepen my understanding of **Java Spring Boot** — building REST APIs, JPA, Spring Security, file handling, and database design.
- **Frontend:** The frontend was **vibe coded** — developed iteratively with AI-assisted coding for rapid prototyping.
- **Design:** Parts of the frontend UI and design were generated using **Stitch**, Google's design generator tool.

## Tech Stack

| Layer      | Technologies                                    |
| ---------- | ----------------------------------------------- |
| **Backend** | Java 17, Spring Boot 3.5, Spring Security, JPA, MySQL |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS        |
| **Database** | MySQL                                            |

## Features

- **User Authentication** — Sign up, login, and session management
- **Music Upload** — Upload local audio files to your personal library
- **Music Playback** — Stream and play your uploaded tracks in the browser
- **Dashboard** — Browse all tracks, albums, and artists
- **Responsive UI** — Dark mode support and clean, modern interface

## Project Structure

```
Vibefy/
├── src/main/java/          # Spring Boot backend
│   └── com/example/Vibefy/
│       ├── Controller/     # REST controllers (Login, Register, Upload, Play)
│       ├── Service/        # Business logic
│       ├── Repository/     # JPA repositories
│       ├── Entity/         # User, Song entities
│       ├── Dto/            # Data transfer objects
│       └── Security/       # Spring Security config
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Dashboard, PlayerBar, Sidebar, etc.
│   │   ├── auth/           # Login, Signup pages
│   │   └── context/        # Playback state
│   └── ...
└── pom.xml
```

## Setup

### Prerequisites

- Java 17+
- Node.js 18+
- MySQL

### Backend

1. Create a MySQL database named `vibefy`
2. Create `src/main/resources/application.properties` with your MySQL URL, username, and password
3. Run: `./mvnw spring-boot:run` (or `mvn spring-boot:run`)

### Frontend

1. Navigate to `frontend/`
2. Run: `npm install`
3. Run: `npm run dev`

The frontend runs on `http://localhost:5173` and proxies API requests to the backend at `http://localhost:8080`.

## License

MIT
