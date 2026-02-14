import { useState, useRef } from 'react'

type UploadMusicModalProps = {
  onClose: () => void
}

function UploadMusicModal({ onClose }: UploadMusicModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!file) {
      setError('Please select a file.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (response.ok) {
        window.dispatchEvent(new CustomEvent('vibefy-songs-refresh'))
        onClose()
      } else {
        const text = await response.text()
        setError(text || 'Upload failed. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0]
    setFile(chosen ?? null)
    setError('')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#252a2d] rounded-3xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - match Create Account style */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7F5DFE] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">upload_file</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Music</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Add tracks to your library
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <form className="p-6 pt-0 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* File selection area at bottom - prominent "Upload files" style */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose a file
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-3 px-4 py-5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:border-[#7F5DFE] hover:bg-[#7F5DFE]/5 hover:text-[#7F5DFE] dark:hover:bg-[#7F5DFE]/10 transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">upload_file</span>
              <span className="text-sm font-medium">
                {file ? file.name : 'Click or drop file here'}
              </span>
            </button>
          </div>

          {/* Primary Upload button - same style as Create Account */}
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-2xl bg-[#7F5DFE] hover:bg-[#6b4de6] text-white text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              'Uploading...'
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">upload</span>
                Upload
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadMusicModal
