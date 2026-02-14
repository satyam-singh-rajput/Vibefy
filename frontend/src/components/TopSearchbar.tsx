import { useNavigate } from 'react-router-dom'

function TopSearchbar() {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-background-dark border-b border-[#f0f4f5] dark:border-[#2d3235]">
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#5e878d] text-xl">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Search for tracks, artists, or albums..."
            className="block w-full pl-11 pr-4 py-2 bg-[#f0f4f5] dark:bg-[#252a2d] border-none rounded-xl text-sm placeholder-[#5e878d] focus:ring-2 focus:ring-primary/20 transition-all font-display"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <button
          className="p-2 rounded-lg bg-[#fef2f2] dark:bg-[#3f1d1d] text-[#b91c1c] hover:bg-[#fee2e2] dark:hover:bg-[#451a1a] transition-colors border border-[#fecaca]/70 flex items-center justify-center"
          onClick={() => navigate('/login', { replace: true })}
          aria-label="Logout"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
        </button>
        <button className="p-2 rounded-lg bg-[#f0f4f5] dark:bg-[#252a2d] text-[#101718] dark:text-white hover:bg-[#e2e8ea] dark:hover:bg-[#32383b] transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark" />
        </button>
        <div className="h-8 w-[1px] bg-[#f0f4f5] dark:border-[#2d3235]" />
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#f0f4f5] dark:border-gray-700"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD837l6wnuE5aG7fYd6yRCp1TnUM-3_5Od5o8IIBj8rahfiJp6tRgoJGXRNbxpNatx0ZlrlT0_KoKW9iH7hOXQ_ydNiZ-2fvE1cBlYe7UYXOYiggUyVde9AgSNb2klQXmeW6hlaxQsjXddUTmcSakfvH1iA-eajkX3WLUWvsuwv_3z4HgnCE0HqhUAV7AlQbp1mR3NaZdff-5wtL8y5hL2dtbyuTce0PGKkWSzNtWBYum9yDLJSK-rdv29052DzQVe_Q9UUAOdG1ijf")',
            }}
          />
        </div>
      </div>
    </header>
  )
}

export default TopSearchbar
