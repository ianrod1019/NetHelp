import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { events } from '../data/mockData.js'

export default function Profile() {
  const { user, history, rsvpedEvents, allowDirectMessages } = useApp()

  const rsvpedEventDetails = rsvpedEvents
    .map((id) => events.find((e) => e.id === id))
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="card p-6">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold text-xl shrink-0">
            {user.avatar}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.role} · {user.location}</p>
            <p className="text-sm text-gray-600 mt-2">{user.bio}</p>
          </div>
          <Link to="/settings" className="btn-secondary shrink-0">Settings</Link>
        </div>
      </div>

      {/* Digital Resume */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Digital Resume</h2>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href)
            }}
            className="btn-ghost text-sm"
          >
            Copy Share Link
          </button>
        </div>

        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-400 uppercase tracking-wide">Skills</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {user.skills.map((s) => (
                <span key={s} className="badge bg-brand-50 text-brand-700">{s}</span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-400 uppercase tracking-wide">Education / GED Status</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.education}</dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-gray-400 uppercase tracking-wide">Messaging</dt>
            <dd className="mt-1 text-sm text-gray-900">
              Direct messages: <span className={allowDirectMessages ? 'text-green-600 font-medium' : 'text-gray-500'}>{allowDirectMessages ? 'Enabled' : 'Disabled'}</span>
            </dd>
          </div>
        </dl>
      </div>

      {/* RSVP'd Events */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Upcoming RSVPs</h2>
        {rsvpedEventDetails.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {rsvpedEventDetails.map((e) => (
              <li key={e.id} className="py-2 flex items-center justify-between">
                <div>
                  <Link to={`/events/${e.id}`} className="text-sm font-medium text-gray-900 hover:text-brand-600">{e.title}</Link>
                  <p className="text-xs text-gray-500">{new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} · {e.time}</p>
                </div>
                <span className="badge bg-brand-50 text-brand-700">Going</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No upcoming RSVPs. <Link to="/events" className="text-brand-600 hover:underline">Browse events →</Link></p>
        )}
      </div>

      {/* Verified Event History */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Verified Event History</h2>
          <Link to="/history" className="text-sm text-brand-600 hover:underline">View all →</Link>
        </div>
        {history.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {history.slice(0, 3).map((h) => (
              <li key={h.id} className="py-2">
                <p className="text-sm font-medium text-gray-900">{h.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(h.dateAttended).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  {' · '}
                  {h.contactsMet}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No events logged yet.</p>
        )}
      </div>
    </div>
  )
}
