import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

export type PlaybackSong = {
  id: number | string
  title: string
  artist: string
  duration?: string
  durationSeconds?: number
}

type PlaybackState = {
  currentSong: PlaybackSong | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  shuffle: boolean
  repeat: boolean
  queue: PlaybackSong[]
  currentIndex: number
}

type PlaybackContextValue = PlaybackState & {
  setQueue: (songs: PlaybackSong[]) => void
  playSong: (id: number | string) => void
  playTrackAtIndex: (index: number) => void
  togglePlayPause: () => void
  next: () => void
  prev: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
  toggleShuffle: () => void
  toggleRepeat: () => void
}

const defaultState: PlaybackState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  shuffle: false,
  repeat: false,
  queue: [],
  currentIndex: -1,
}

const PlaybackContext = createContext<PlaybackContextValue | null>(null)

export function usePlayback() {
  const ctx = useContext(PlaybackContext)
  if (!ctx) throw new Error('usePlayback must be used within PlaybackProvider')
  return ctx
}

type PlaybackProviderProps = { children: ReactNode }

export function PlaybackProvider({ children }: PlaybackProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const [state, setState] = useState<PlaybackState>(defaultState)

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener('timeupdate', () => {
        setState((s) => ({ ...s, currentTime: audioRef.current?.currentTime ?? 0 }))
      })
      audioRef.current.addEventListener('loadedmetadata', () => {
        setState((s) => ({ ...s, duration: audioRef.current?.duration ?? 0 }))
      })
      audioRef.current.addEventListener('ended', () => {
        setState((s) => {
          if (s.repeat && s.currentSong) {
            audioRef.current?.play()
            return s
          }
          const nextIdx = s.currentIndex + 1
          if (nextIdx < s.queue.length) {
            const nextSong = s.queue[nextIdx]
            return { ...s, currentSong: nextSong, currentIndex: nextIdx, isPlaying: true }
          }
          return { ...s, isPlaying: false }
        })
      })
    }
    return audioRef.current
  }, [])

  // Load and play when currentSong changes
  useEffect(() => {
    const audio = ensureAudio()
    if (!state.currentSong) return
    const id = String(state.currentSong.id)
    setState((s) => ({ ...s, currentTime: 0, duration: 0 }))
    fetch(`/api/playSong/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load track')
        return res.blob()
      })
      .then((blob) => {
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
        const url = URL.createObjectURL(blob)
        objectUrlRef.current = url
        audio.src = url
        audio.volume = state.volume
        audio.play().catch(() => setState((s) => ({ ...s, isPlaying: false })))
      })
      .catch(() => setState((s) => ({ ...s, isPlaying: false })))
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [state.currentSong?.id])

  // Sync play/pause with isPlaying
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !state.currentSong) return
    if (state.isPlaying) audio.play().catch(() => setState((s) => ({ ...s, isPlaying: false })))
    else audio.pause()
  }, [state.isPlaying])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume
  }, [state.volume])

  const setQueue = useCallback((songs: PlaybackSong[]) => {
    setState((s) => ({ ...s, queue: songs, currentIndex: -1 }))
  }, [])

  const playSong = useCallback((id: number | string) => {
    setState((s) => {
      const idx = s.queue.findIndex((q) => String(q.id) === String(id))
      const song = idx >= 0 ? s.queue[idx] : null
      if (!song) return s
      return {
        ...s,
        currentSong: song,
        currentIndex: idx,
        isPlaying: true,
      }
    })
  }, [])

  const playTrackAtIndex = useCallback((index: number) => {
    setState((s) => {
      const song = s.queue[index]
      if (!song) return s
      return {
        ...s,
        currentSong: song,
        currentIndex: index,
        isPlaying: true,
      }
    })
  }, [])

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setState((s) => {
      if (!s.currentSong) return s
      if (s.isPlaying) {
        audio.pause()
        return { ...s, isPlaying: false }
      }
      audio.play()
      return { ...s, isPlaying: true }
    })
  }, [])

  const next = useCallback(() => {
    setState((s) => {
      if (s.queue.length === 0) return s
      const nextIdx = s.shuffle
        ? Math.floor(Math.random() * s.queue.length)
        : Math.min(s.currentIndex + 1, s.queue.length - 1)
      const song = s.queue[nextIdx]
      if (!song) return s
      return { ...s, currentSong: song, currentIndex: nextIdx, isPlaying: true }
    })
  }, [])

  const prev = useCallback(() => {
    const audio = audioRef.current
    setState((s) => {
      if (audio && audio.currentTime > 2) {
        audio.currentTime = 0
        return s
      }
      if (s.queue.length === 0) return s
      const prevIdx = Math.max(0, s.currentIndex - 1)
      const song = s.queue[prevIdx]
      if (!song) return s
      return { ...s, currentSong: song, currentIndex: prevIdx, isPlaying: true }
    })
  }, [])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setState((s) => ({ ...s, currentTime: time }))
    }
  }, [])

  const setVolume = useCallback((v: number) => {
    const vol = Math.max(0, Math.min(1, v))
    setState((s) => ({ ...s, volume: vol }))
  }, [])

  const toggleShuffle = useCallback(() => {
    setState((s) => ({ ...s, shuffle: !s.shuffle }))
  }, [])

  const toggleRepeat = useCallback(() => {
    setState((s) => ({ ...s, repeat: !s.repeat }))
  }, [])

  const value: PlaybackContextValue = {
    ...state,
    setQueue,
    playSong,
    playTrackAtIndex,
    togglePlayPause,
    next,
    prev,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
  }

  return (
    <PlaybackContext.Provider value={value}>
      {children}
    </PlaybackContext.Provider>
  )
}
