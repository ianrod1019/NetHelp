import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function EventCard({ event }) {
  const { isRsvped, toggleRSVP } = useApp()
  const rsvped = isRsvped(event.id)

  return (
    <article className="card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge bg-brand-50 text-brand-700">Event</span>
            {event.tags?.map((t) => (
              <span key={t} className="badge bg-gray-100 text-gray-600">{t}</span>
            ))}
          </div>
          <h3 className="font-semibold text-gray-900 leading-tight">
            <Link to={`/events/${event.id}`} className="hover:text-brand-600">
              {event.title}
            </Link>
          </h3>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>

      <dl className="text-sm text-gray-500 space-y-1">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <span className="truncate">{event.location}</span>
        </div>
      </dl>

      <div className="flex items-center gap-2 mt-1">
        <button
          onClick={() => toggleRSVP(event.id)}
          className={rsvped ? 'btn-secondary' : 'btn-primary'}
        >
          {rsvped ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Going
            </>
          ) : (
            'RSVP'
          )}
        </button>
        <Link to={`/events/${event.id}`} className="btn-ghost">
          Details
        </Link>
      </div>
    </article>
  )
}
