import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function Header() {
  const { user, setMessagingOpen, allowDirectMessages, logout } = useApp()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-sm">
            N
          </span>
          <span className="font-bold text-lg tracking-tight hidden sm:block">NetHelp</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, internships, GED…"
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-1.5 text-sm placeholder-gray-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              aria-label="Search NetHelp"
            />
          </div>
        </form>

        {/* Location */}
        <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600 shrink-0" title="Your region">
          <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <span className="font-medium">Tulsa, OK</span>
        </div>

        {/* Messages */}
        <button
          onClick={() => setMessagingOpen(true)}
          disabled={!allowDirectMessages}
          className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Open messages"
          title={allowDirectMessages ? 'Messages' : 'Direct messages are disabled in settings'}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 20l1.3-3.9A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        {/* Avatar */}
        <Link
          to="/profile"
          className="shrink-0 flex items-center gap-2 rounded-lg hover:bg-gray-100 p-1 pr-2"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
            {user?.avatar}
          </span>
          <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
        </Link>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 shrink-0"
          aria-label="Log out"
          title="Log out"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  )
}
