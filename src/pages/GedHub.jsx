import { useState } from 'react'
import { gedCenters, studyResources, mentors } from '../data/mockData.js'
import GedCenterCard from '../components/GedCenterCard.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function GedHub() {
  const [view, setView] = useState('list') // 'list' | 'map'
  const [tab, setTab] = useState('centers') // 'centers' | 'resources' | 'mentors'
  const { allowDirectMessages, setMessagingOpen } = useApp()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">GED Resource Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Test centers, free prep classes, study resources, and mentors in Tulsa.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {[
          { key: 'centers', label: 'Test Centers' },
          { key: 'resources', label: 'Study Resources' },
          { key: 'mentors', label: 'Mentors' },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t.key
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Centers tab */}
      {tab === 'centers' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1.5 text-sm font-medium ${view === 'list' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600'}`}
              >
                List
              </button>
              <button
                onClick={() => setView('map')}
                className={`px-3 py-1.5 text-sm font-medium ${view === 'map' ? 'bg-brand-600 text-white' : 'bg-white text-gray-600'}`}
              >
                Map
              </button>
            </div>
          </div>

          {view === 'list' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {gedCenters.map((c) => (
                <GedCenterCard key={c.id} center={c} />
              ))}
            </div>
          ) : (
            <div className="card overflow-hidden">
              <iframe
                title="Tulsa GED Centers Map"
                className="w-full h-[400px] border-0"
                loading="lazy"
                src={`https://www.google.com/maps?q=GED+testing+center+Tulsa+OK&output=embed`}
              />
            </div>
          )}
        </div>
      )}

      {/* Resources tab */}
      {tab === 'resources' && (
        <div className="space-y-3">
          {studyResources.map((r) => (
            <article key={r.id} className="card p-4 flex items-start gap-3">
              <svg className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{r.title}</h3>
                  <span className="badge bg-gray-100 text-gray-600">{r.type}</span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{r.description}</p>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-600 hover:underline mt-1 inline-flex items-center gap-1"
                >
                  Open resource
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Mentors tab */}
      {tab === 'mentors' && (
        <div className="space-y-3">
          {mentors.map((m) => (
            <article key={m.id} className="card p-4 flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold shrink-0">
                {m.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-500">{m.role} · {m.org}</p>
                <p className="text-sm text-gray-600 mt-0.5">{m.specialty}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`badge ${m.available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {m.available ? 'Available' : 'Booked'}
                </span>
                <button
                  onClick={() => {
                    if (allowDirectMessages) {
                      setMessagingOpen(true)
                    }
                  }}
                  disabled={!allowDirectMessages}
                  className="btn-secondary text-xs px-3 py-1.5"
                  title={allowDirectMessages ? 'Message this mentor' : 'Enable DMs in Settings'}
                >
                  Message
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
