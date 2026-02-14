import { usePlayback } from '../context/PlaybackContext'

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    repeat,
    togglePlayPause,
    next,
    prev,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  } = usePlayback()

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!currentSong) {
    return (
      <footer className="flex-shrink-0 h-20 border-t border-[#f0f4f5] dark:border-[#2d3235] bg-white dark:bg-[#252a2d] flex items-center justify-center text-[#5e878d] dark:text-gray-400 text-sm">
        Select a track to play
      </footer>
    )
  }

  return (
    <footer className="flex-shrink-0 border-t border-[#f0f4f5] dark:border-[#2d3235] bg-white dark:bg-[#252a2d] px-4 py-3">
      <div className="flex items-center gap-6 max-w-full">
        {/* Left: track info */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#006675] flex items-center justify-center text-white flex-shrink-0">
            <span className="material-symbols-outlined text-2xl">person</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#101718] dark:text-white truncate">{currentSong.title}</p>
            <p className="text-xs text-[#5e878d] dark:text-gray-400 truncate flex items-center gap-1">
              {currentSong.artist}
              <button type="button" className="p-0.5 rounded hover:bg-[#f0f4f5] dark:hover:bg-[#3e4548] text-[#5e878d] hover:text-red-500 transition-colors" aria-label="Like">
                <span className="material-symbols-outlined text-base">favorite</span>
              </button>
            </p>
          </div>
        </div>

        {/* Center: progress + controls */}
        <div className="flex-1 flex flex-col items-center gap-1 min-w-0 max-w-2xl">
          <div className="flex items-center gap-4 w-full">
            <button
              type="button"
              onClick={toggleShuffle}
              className={`p-1.5 rounded-full transition-colors ${shuffle ? 'text-[#006675]' : 'text-[#5e878d] dark:text-gray-400 hover:text-[#101718] dark:hover:text-white'}`}
              aria-label="Shuffle"
            >
              <span className="material-symbols-outlined text-xl">shuffle</span>
            </button>
            <button
              type="button"
              onClick={prev}
              className="p-1.5 rounded-full text-[#5e878d] dark:text-gray-400 hover:text-[#101718] dark:hover:text-white transition-colors"
              aria-label="Previous"
            >
              <span className="material-symbols-outlined text-2xl">skip_previous</span>
            </button>
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-12 h-12 rounded-full bg-[#006675] text-white flex items-center justify-center hover:bg-[#005563] transition-colors flex-shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <span className="material-symbols-outlined text-3xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <button
              type="button"
              onClick={next}
              className="p-1.5 rounded-full text-[#5e878d] dark:text-gray-400 hover:text-[#101718] dark:hover:text-white transition-colors"
              aria-label="Next"
            >
              <span className="material-symbols-outlined text-2xl">skip_next</span>
            </button>
            <button
              type="button"
              onClick={toggleRepeat}
              className={`p-1.5 rounded-full transition-colors ${repeat ? 'text-[#006675]' : 'text-[#5e878d] dark:text-gray-400 hover:text-[#101718] dark:hover:text-white'}`}
              aria-label="Repeat"
            >
              <span className="material-symbols-outlined text-xl">repeat</span>
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-[#5e878d] dark:text-gray-400 tabular-nums w-8">{formatTime(currentTime)}</span>
            <div
              className="flex-1 h-1 rounded-full bg-[#e5eaec] dark:bg-[#3e4548] cursor-pointer overflow-hidden group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const pct = Math.max(0, Math.min(1, x / rect.width))
                seek(pct * duration)
              }}
            >
              <div
                className="h-full bg-[#006675] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-[#5e878d] dark:text-gray-400 tabular-nums w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: volume + queue */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="material-symbols-outlined text-[#5e878d] dark:text-gray-400 text-xl">volume_up</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 h-1 rounded-full appearance-none bg-[#e5eaec] dark:bg-[#3e4548] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#006675] [&::-webkit-slider-thumb]:cursor-pointer"
            aria-label="Volume"
          />
          <button
            type="button"
            className="p-1.5 rounded-full text-[#5e878d] dark:text-gray-400 hover:text-[#101718] dark:hover:text-white transition-colors"
            aria-label="Queue"
          >
            <span className="material-symbols-outlined text-xl">queue_music</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
