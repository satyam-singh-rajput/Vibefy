import { useState, useEffect, useCallback } from 'react'
import { usePlayback } from '../context/PlaybackContext'
import type { PlaybackSong } from '../context/PlaybackContext'

export type SongItem = {
  id?: number | string
  songId?: number | string
  name?: string
  fileName?: string
  title?: string
  owner?: string
  artist?: string
  lastModified?: string
  uploadedAt?: string
  size?: string
  sizeInBytes?: number
  duration?: string
  durationSeconds?: number
  url?: string
  [key: string]: unknown
}

/** Id used for playSong API - backend may send id, songId, or we use 1-based index */
function getSongId(song: SongItem, index: number): number | string {
  if (song.id != null) return song.id
  if (song.songId != null) return song.songId
  return index + 1
}

const PAGE_SIZE = 5

function formatSize(bytes: number | undefined): string {
  if (bytes == null) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getDisplayName(song: SongItem): string {
  return song.title ?? song.name ?? song.fileName ?? 'Unknown'
}

function getOwner(song: SongItem): string {
  return song.owner ?? song.artist ?? 'Me'
}

function getDate(song: SongItem): string {
  const raw = song.lastModified ?? song.uploadedAt
  if (!raw) return '—'
  try {
    const d = new Date(raw)
    return isNaN(d.getTime()) ? String(raw) : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return String(raw)
  }
}

function getSize(song: SongItem): string {
  if (song.size) return String(song.size)
  if (song.sizeInBytes != null) return formatSize(song.sizeInBytes)
  return '—'
}

function getDuration(song: SongItem): string {
  if (song.duration) return String(song.duration)
  if (typeof song.durationSeconds === 'number') {
    const m = Math.floor(song.durationSeconds / 60)
    const s = Math.floor(song.durationSeconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }
  return '—'
}

function toPlaybackSong(song: SongItem, id: number | string): PlaybackSong {
  return {
    id,
    title: getDisplayName(song),
    artist: getOwner(song),
    duration: getDuration(song),
    durationSeconds: typeof song.durationSeconds === 'number' ? song.durationSeconds : undefined,
  }
}

export default function DashboardContent() {
  const [songs, setSongs] = useState<SongItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const { currentSong, isPlaying, playSong, togglePlayPause, setQueue } = usePlayback()

  const fetchSongs = useCallback(() => {
    setLoading(true)
    setError('')
    fetch('/api/getUserSongList', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load songs')
        return res.json()
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.songs ?? data?.list ?? []
        const nextSongs = Array.isArray(list) ? list : []
        setSongs(nextSongs)
        const queue: PlaybackSong[] = nextSongs.map((s: SongItem, i: number) =>
          toPlaybackSong(s, getSongId(s, i))
        )
        setQueue(queue)
      })
      .catch((err) => {
        setError(err.message || 'Could not load your music.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [setQueue])

  useEffect(() => {
    fetchSongs()
    const onRefresh = () => fetchSongs()
    window.addEventListener('vibefy-songs-refresh', onRefresh)
    return () => window.removeEventListener('vibefy-songs-refresh', onRefresh)
  }, [fetchSongs])

  const total = songs.length
  const start = (page - 1) * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, total)
  const pageSongs = songs.slice(start, end)
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="flex-1 overflow-y-auto bg-[#fbfcfc] dark:bg-[#181a1c] p-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#e8f4f5] dark:bg-[#006675]/20 p-5 rounded-xl border border-[#d0e8ea] dark:border-[#006675]/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#006675] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">music_note</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">Tracks</p>
            <p className="text-xl font-bold text-[#101718] dark:text-white">{loading ? '—' : `${total} MP3/WAV`}</p>
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl border border-orange-100 dark:border-orange-800/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">schedule</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">Listening Time</p>
            <p className="text-xl font-bold text-[#101718] dark:text-white">{loading ? '—' : '— Hours'}</p>
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">high_quality</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">High Fidelity</p>
            <p className="text-xl font-bold text-[#101718] dark:text-white">{loading ? '—' : `${total} Lossless`}</p>
          </div>
        </div>
      </div>

      {/* My Music Library */}
      <div className="bg-white dark:bg-[#252a2d] rounded-xl border border-[#f0f4f5] dark:border-[#2d3235] shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-b border-[#f0f4f5] dark:border-[#2d3235]">
          <div>
            <h2 className="text-xl font-bold text-[#101718] dark:text-white">My Music Library</h2>
            <p className="text-sm text-[#5e878d] dark:text-gray-400 mt-0.5">Manage and play your audio collection</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#5e878d] dark:text-gray-400">Playback Mode:</span>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#f0f4f5] dark:border-[#2d3235] bg-white dark:bg-[#252a2d] text-sm font-medium text-[#101718] dark:text-white hover:bg-[#f7f9fa] dark:hover:bg-[#2d3235] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">shuffle</span>
              Shuffle
            </button>
          </div>
        </div>

        {error && (
          <div className="p-6 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {loading && (
          <div className="p-12 text-center text-[#5e878d] dark:text-gray-400">Loading your music...</div>
        )}

        {!loading && !error && (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#f0f4f5] dark:border-[#2d3235] bg-[#fbfcfc] dark:bg-[#2a2f32]">
                  <th className="px-6 py-4 text-xs font-bold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider w-14">Play</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">Song Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">Artist</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">Date Uploaded</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#5e878d] dark:text-gray-400 uppercase tracking-wider text-right w-14">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f5] dark:divide-[#2d3235]">
                {pageSongs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#5e878d] dark:text-gray-400 text-sm">
                      No songs yet. Upload music to get started.
                    </td>
                  </tr>
                ) : (
                  pageSongs.map((song, idx) => {
                    const songId = getSongId(song, start + idx)
                    const isActive = currentSong && String(currentSong.id) === String(songId)
                    const showPause = isActive && isPlaying
                    return (
                      <tr
                        key={String(song.id ?? song.songId ?? song.fileName ?? song.name ?? idx)}
                        className={`transition-colors ${isActive ? 'bg-[#e8f4f5] dark:bg-[#006675]/15' : 'hover:bg-[#f7f9fa] dark:hover:bg-[#2d3235]'}`}
                      >
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            onClick={() => {
                              if (showPause) togglePlayPause()
                              else playSong(songId)
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-[#006675] text-white hover:bg-[#005563]' : 'bg-[#e5eaec] dark:bg-[#3e4548] text-[#101718] dark:text-white hover:bg-[#d0d5d8] dark:hover:bg-[#4a5256]'}`}
                            aria-label={showPause ? 'Pause' : 'Play'}
                          >
                            <span className="material-symbols-outlined text-2xl">
                              {showPause ? 'pause' : 'play_arrow'}
                            </span>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-[#006675] text-white' : 'bg-[#f0f4f5] dark:bg-[#3e4548] text-[#006675]'}`}>
                              <span className="material-symbols-outlined">{isActive ? 'person' : 'music_note'}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#101718] dark:text-white truncate max-w-[220px]">
                                {getDisplayName(song)}
                              </p>
                              {isActive && (
                                <p className="text-xs text-[#006675] font-medium mt-0.5">NOW PLAYING</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#101718] dark:text-gray-300">{getOwner(song)}</td>
                        <td className="px-6 py-4 text-sm text-[#5e878d] dark:text-gray-400">{getDate(song)}</td>
                        <td className="px-6 py-4 text-sm text-[#5e878d] dark:text-gray-400">{getDuration(song)}</td>
                        <td className="px-6 py-4 text-right">
                          <button type="button" className="p-1.5 rounded-lg text-[#5e878d] hover:bg-[#f0f4f5] dark:hover:bg-[#3e4548] hover:text-[#101718] dark:hover:text-white transition-colors" aria-label="More actions">
                            <span className="material-symbols-outlined text-lg">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>

            {total > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#f0f4f5] dark:border-[#2d3235]">
                <p className="text-sm text-[#5e878d] dark:text-gray-400">
                  Showing <span className="font-semibold text-[#101718] dark:text-white">{start + 1}-{end}</span> of {total} tracks
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 rounded-lg border border-[#f0f4f5] dark:border-[#2d3235] text-sm font-semibold bg-white dark:bg-[#252a2d] text-[#101718] dark:text-white hover:bg-[#f7f9fa] dark:hover:bg-[#2d3235] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg border border-[#f0f4f5] dark:border-[#2d3235] text-sm font-semibold bg-white dark:bg-[#252a2d] text-[#101718] dark:text-white hover:bg-[#f7f9fa] dark:hover:bg-[#2d3235] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
