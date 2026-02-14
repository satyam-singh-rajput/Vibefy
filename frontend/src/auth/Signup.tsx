import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          email,
          username,
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
        setError(typeof message === 'string' ? message : 'Signup failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-stretch font-display">
      <main className="w-full min-h-screen flex flex-col md:flex-row">
        {/* Left hero section */}
        <section className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#8c25f4] relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9oLx69D02lpqJxHg3NpMQGUGuDT8xgqLXH6RuCK_Amvojd_27VDXhM1KJHNRx2qtytWl2FM3S2WHmxv1WTa-_qL1uVgI3rXaidmjgRJOHVvX7UkzCiUgUZoDq77gVXfhl7zTLF7dIBMbOVjYmwJFGE0cY0Ozoh4p1f13PthfVFENW5JaWsrw7rQLXzFiMoIBws3Wxx45GGBJ3GqKbopfnHM822e_EG_IzZmyNx15fj4gSul7w-cb--pbB1vvjFK3hRuo1ooBXmjYh"
              alt="Abstract music waves"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#8c25f4] via-transparent to-black/40" />
          </div>

          <div className="relative z-10 p-12 text-white max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <span className="material-icons text-white text-3xl">
                  equalizer
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                VIBEFY
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Elevate your <br />
              <span className="text-white/80">Sound.</span>
            </h1>
            <p className="text-xl text-white/70 leading-relaxed font-light">
              Build your personal Vibefy library and sync your favorite tracks
              across the cloud. High‑fidelity audio, anywhere, anytime.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-4">
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#8c25f4] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc_ml3YPMf-8XfATAw4H4Xt7BZZa85ICzxIpflsjdtHUHX3LPthHLhSJ9L1FBZtQy7lAoXt7UVylZuuGCIdtAKnyI1pags8tRSE-PSCrl6ZF-SoYR-2HAM7vG_1xz48pdYP6vbs74nGitQoyr5vEmX8dYWxmjQbGEUV4tko9rmE2WeOYbwIaLcVW9ZHq0vW7oaYE4ZdVHm57unpt3U2H8-Ogtlx6xpZfCJi1kuGP784SYTJfE1h3lvAkARJHhF5v3LgM60_nmwizqZ"
                  alt="Listener avatar 1"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#8c25f4] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6QqDsFZpyAGF2EoMUBUyy5WjrLgp28o9f6fWKwXZXZONlnxWOmhEgHG92So9aW29rIKa79alwLbTS4PlTlOJJFbS-isWCDz8_Z4U6IpdvRcB0Tx76Fj8H9FKsinPoVXI5nRTnVixVymG0P9gCVmH76VZ_WhxxfPK1u4s_BqiVr1c_b9gKNoYbbmlNF-5z8hDdnorpDr1DqQYRFnjRj2AtMorTUd4yQL24N28PWpVu-UgbyruI_gWf1m3KoL8KOidbR5kZ4NoBmxjf"
                  alt="Listener avatar 2"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#8c25f4] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUNA5C5kxppxn6r2amCHyVqTtrtQkBKA80IYklnAjgXH3FXKafXC5vXlF67x23jLtge6XlNnNHaCej0N-RIIih-rU4CPi5px9zYOrvYWC_Kyxj4f7QUaQ5vZxsdmysr0I8b2-Ll_gYUZcb9rll2OmWiUiVrHX8epH-yjI8WmQa0_nR0S89iOFNQdxsJjlGlYVxez0Lrch3-o4TBmdmcNx4FpW0OgA2cCQ83mRg3l4av7Iu9LnrB7eu5o8hPT04LOoSQIt59uDNB86_"
                  alt="Listener avatar 3"
                />
              </div>
              <span className="text-sm font-medium text-white/80">
                Joined by 10k+ audiophiles
              </span>
            </div>
          </div>
        </section>

        {/* Right signup form */}
        <section className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-8 bg-white dark:bg-background-dark">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile logo */}
            <div className="md:hidden flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#8c25f4] rounded-lg flex items-center justify-center">
                <span className="material-icons text-white">equalizer</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Vibefy
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Start your musical journey with a free Vibefy account.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-400 group-focus-within:text-[#8c25f4] transition-colors text-xl">
                      person
                    </span>
                  </div>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="johndoe"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8c25f4]/20 focus:border-[#8c25f4] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-400 group-focus-within:text-[#8c25f4] transition-colors text-xl">
                      email
                    </span>
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8c25f4]/20 focus:border-[#8c25f4] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-icons text-gray-400 group-focus-within:text-[#8c25f4] transition-colors text-xl">
                      lock
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8c25f4]/20 focus:border-[#8c25f4] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#8c25f4] hover:bg-[#771bd0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8c25f4] transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Signing up...' : 'Sign up'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#8c25f4] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Signup
