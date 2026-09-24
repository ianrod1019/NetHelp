import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'

const FILTERS = [
  { label: 'All Feed', path: '/', key: 'all' },
  { label: 'GED Prep', path: '/ged', key: 'ged' },
  { label: 'Internships', path: '/internships', key: 'internships' },
  { label: 'Events', path: '/events', key: 'events' },
]

export default function FilterHotbar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <nav
      className="sticky top-14 z-30 bg-surface border-b border-gray-200 shadow-sm"
      aria-label="Feed filters"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          {FILTERS.map((f) => (
            <NavLink
              key={f.key}
              to={f.path}
              end={f.path === '/'}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`
              }
            >
              {f.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
