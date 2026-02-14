import { useState } from 'react'
import UploadMusicModal from './UploadMusicModal'

const Sidebar = () => {
  const [showUploadModal, setShowUploadModal] = useState(false)

  return (
    <>
      <aside className="w-64 flex-shrink-0 border-r border-[#f0f4f5] dark:border-[#2d3235] flex flex-col justify-between bg-white dark:bg-background-dark p-4">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-[#006675] rounded-lg p-1.5 text-white">
              <span className="material-symbols-outlined text-2xl">
                library_music
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#101718] dark:text-white text-base font-bold leading-tight">
                Vibefy
              </h1>
              <p className="text-[#5e878d] text-xs font-medium">Music Library</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl h-12 px-4 bg-[#006675] text-white text-sm font-bold tracking-[0.015em] hover:bg-[#005563] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Upload Music</span>
          </button>

        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#f0f4f5] text-[#101718] group" href="#">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              music_note
            </span>
            <p className="text-sm font-semibold">All Tracks</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg group text-[#5e878d] dark:text-gray-400" href="#">
            <span className="material-symbols-outlined">album</span>
            <p className="text-sm font-medium">Albums</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg group text-[#5e878d] dark:text-gray-400" href="#">
            <span className="material-symbols-outlined">person</span>
            <p className="text-sm font-medium">Artists</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg group text-[#5e878d] dark:text-gray-400" href="#">
            <span className="material-symbols-outlined">playlist_play</span>
            <p className="text-sm font-medium">Playlists</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg group text-[#5e878d] dark:text-gray-400" href="#">
            <span className="material-symbols-outlined">favorite</span>
            <p className="text-sm font-medium">Favorites</p>
          </a>
          <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg group text-[#5e878d] dark:text-gray-400" href="#">
            <span className="material-symbols-outlined">history</span>
            <p className="text-sm font-medium">Recently Played</p>
          </a>
        </nav>
      </div>

      <div className="flex flex-col gap-3 p-3 bg-[#f7f9fa] dark:bg-[#252a2d] rounded-xl">
        <div className="flex items-center gap-2 text-[#101718] dark:text-white">
          <span className="material-symbols-outlined text-xl">database</span>
          <p className="text-sm font-bold">Cloud Storage</p>
        </div>
        <div className="rounded-full bg-[#dae5e7] dark:bg-[#3e4548] h-1.5 overflow-hidden">
          <div className="h-full bg-[#006675]" style={{ width: "45%" }} />
        </div>
        <p className="text-[#5e878d] dark:text-gray-400 text-xs font-medium">
          6.8 GB of 15 GB used
        </p>
        <button className="text-primary text-xs font-bold hover:underline text-left mt-1">
          Upgrade storage
        </button>
      </div>
    </aside>

    {showUploadModal && (
      <UploadMusicModal onClose={() => setShowUploadModal(false)} />
    )}
    </>
  )
}

export default Sidebar
