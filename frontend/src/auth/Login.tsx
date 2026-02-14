import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const contentType = response.headers.get('content-type')
      let message = ''

      if (contentType?.includes('application/json')) {
        const data = await response.json()
        message = data.message ?? data
      } else {
        message = await response.text()
      }

      if (response.ok) {
        navigate('/', { replace: true, state: { welcomeMessage: message || 'Welcome to Vibefy' } })
      } else {
        setError(typeof message === 'string' ? message : 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #FDF0F3 0%, #F0FAFD 40%, #FFFDF0 100%)' }}>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#4f46e5] shadow-lg flex items-center justify-center text-white mb-4">
            <span className="material-symbols-outlined text-2xl">library_music</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#111827]">Log in</h1>
          <p className="text-sm text-[#6b7280] mt-1">
            Welcome back to Vibefy
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 px-6 py-7">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-[#6b7280] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[#9ca3af] text-base absolute left-3 top-1/2 -translate-y-1/2">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-9 py-2.5 text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/30 focus:border-[#4f46e5] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6b7280] mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-[#9ca3af] text-base absolute left-3 top-1/2 -translate-y-1/2">
                  lock
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-9 py-2.5 text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/30 focus:border-[#4f46e5] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold py-2.5 shadow-md shadow-indigo-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-[#6b7280]">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-[#4f46e5] hover:text-[#3730a3] underline-offset-2 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

