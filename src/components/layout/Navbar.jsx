import { NavLink } from 'react-router-dom'
import { Home, Search, BarChart3, Star, Settings, CloudSun } from 'lucide-react'
import { ThemeToggle } from '../theme/ThemeToggle'

const LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/compare', label: 'Compare', icon: BarChart3 },
  { to: '/favorites', label: 'Favorites', icon: Star },
  { to: '/settings', label: 'Settings', icon: Settings }
]

export function Navbar() {
  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-ink/10 bg-cloud/80
        text-ink backdrop-blur-lg
        transition-colors duration-300
        dark:border-white/10 dark:bg-night/40 dark:text-cloud
      "
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="cursor-hover flex items-center gap-2 font-display text-lg font-semibold"
        >
          <CloudSun size={22} className="text-teal" />
          Skyline
        </NavLink>

        <nav className="hidden gap-1 sm:flex">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `cursor-hover flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                  isActive
                    ? 'bg-ink/10 font-medium text-teal dark:bg-white/10'
                    : 'opacity-70 hover:opacity-100'
                }`
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle />
      </div>

      {/* mobile bottom-safe nav */}
      <nav
        className="
          flex justify-around
          border-t border-ink/10
          py-2 sm:hidden
          dark:border-white/10
        "
      >
        {LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={label}
            className={({ isActive }) =>
              `cursor-hover flex flex-col items-center gap-0.5 px-2 text-[10px] transition ${
                isActive ? 'text-teal' : 'opacity-60'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}