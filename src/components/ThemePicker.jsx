import { useApp } from '../context/AppContext.jsx'

const THEMES = [
  {
    key: 'light',
    label: 'Light',
    swatch: ['#f9fafb', '#ffffff', '#1385f5'],
  },
  {
    key: 'dark',
    label: 'Dark',
    swatch: ['#1a1b26', '#252636', '#52c0ff'],
  },
  {
    key: 'midnight',
    label: 'Midnight',
    swatch: ['#0f0f1e', '#1a1a2e', '#818cf8'],
  },
  {
    key: 'forest',
    label: 'Forest',
    swatch: ['#0d1a10', '#162420', '#4ade80'],
  },
  {
    key: 'sunset',
    label: 'Sunset',
    swatch: ['#eeaf61', '#fb9062', '#ee5d6c'],
  },
  {
    key: 'pink',
    label: 'Pink',
    swatch: ['#fdf0f5', '#fff5f8', '#ec4899'],
  },
]

export default function ThemePicker() {
  const { theme, setTheme } = useApp()

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {THEMES.map((t) => {
        const active = theme === t.key
        return (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            className={`rounded-xl border-2 p-3 text-left transition-all ${
              active
                ? 'border-brand-500 ring-2 ring-brand-500/30'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex gap-1 mb-2">
              {t.swatch.map((c, i) => (
                <span
                  key={i}
                  className="h-6 w-6 rounded-full border border-black/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
              {t.label}
              {active && (
                <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
