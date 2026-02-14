import { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { PlaybackProvider } from './context/PlaybackContext'
import Sidebar from './components/Sidebar'
import TopSearchbar from './components/TopSearchbar'
import DashboardContent from './components/DashboardContent'
import PlayerBar from './components/PlayerBar'
import Login from './auth/Login'
import Signup from './auth/Signup'

function Dashboard() {
  const location = useLocation()
  const welcomeMessage = (location.state as { welcomeMessage?: string } | null)?.welcomeMessage
  const [showWelcome, setShowWelcome] = useState(!!welcomeMessage)

  return (
    <PlaybackProvider>
      <div className="flex h-screen bg-background-light dark:bg-background-dark">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {showWelcome && welcomeMessage && (
            <div className="flex items-center justify-between gap-4 px-6 py-3 bg-[#006675] text-white text-sm font-medium flex-shrink-0">
              <span>{welcomeMessage}</span>
              <button
                type="button"
                onClick={() => setShowWelcome(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
                aria-label="Dismiss"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          )}
          <TopSearchbar />
          <div className="flex-1 overflow-y-auto min-h-0">
            <DashboardContent />
          </div>
          <PlayerBar />
        </div>
      </div>
    </PlaybackProvider>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
