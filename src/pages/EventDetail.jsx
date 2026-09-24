import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getAllEvents } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = getAllEvents().find((e) => e.id === id)
  const { isRsvped, toggleRSVP, addHistoryEntry } = useApp()
  const [reported, setReported] = useState(false)
  const [contacts, setContacts] = useState('')
  const [notes, setNotes] = useState('')

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Event not found.</p>
        <Link to="/events" className="btn-secondary mt-4 inline-flex">Back to Events</Link>
      </div>
    )
  }

  const rsvped = isRsvped(event.id)

  const handleSelfReport = () => {
    addHistoryEntry({
      eventId: event.id,
      title: event.title,
      dateAttended: event.date,
      contactsMet: contacts || '—',
      notes: notes || '—',
    })
    setReported(true)
    setContacts('')
    setNotes('')
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="btn-ghost -ml-2">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="flex flex-wrap items-center gap-2">
        <span className="badge bg-brand-50 text-brand-700">Event</span>
        {event.tags?.map((t) => (
          <span key={t} className="badge bg-gray-100 text-gray-600">{t}</span>
        ))}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Organized by {event.organizer}</p>
      </div>

      <div className="card p-5 space-y-4">
        <p className="text-gray-700">{event.description}</p>

        <dl className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-400 font-medium">Date & Time</dt>
            <dd className="text-gray-900 mt-0.5">
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              <br />
              {event.time}
            </dd>
          </div>
          <div>
            <dt className="text-gray-400 font-medium">Location</dt>
            <dd className="text-gray-900 mt-0.5">{event.location}<br />{event.address}</dd>
          </div>
        </dl>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          View on Map
        </a>
      </div>

      {/* RSVP */}
      <div className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Attend</h2>
        <div className="flex flex-wrap items-center gap-3">
          {rsvped ? (
            <>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm font-semibold">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                You're going
              </span>
              <button
                onClick={() => toggleRSVP(event.id)}
                className="btn-secondary text-red-600 hover:bg-red-50 border-red-200"
              >
                Cancel RSVP
              </button>
              <span className="text-sm text-green-600 font-medium">
                We'll remind you before the event.
              </span>
            </>
          ) : (
            <button
              onClick={() => toggleRSVP(event.id)}
              className="btn-primary"
            >
              RSVP to this event
            </button>
          )}
        </div>
      </div>

      {/* Self-Report Attendance */}
      <div className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-1">Self-Report Attendance</h2>
        <p className="text-sm text-gray-500 mb-4">
          Already attended? Log it to your personal History to build your verified event record.
        </p>

        {reported ? (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            <p className="font-medium">✓ Attendance saved to your History.</p>
            <Link to="/history" className="underline mt-1 inline-block">View your History log →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
              <input className="input" value={event.title} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Attended</label>
              <input className="input" defaultValue={event.date} type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contacts Met</label>
              <input
                className="input"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
                placeholder="e.g. Met a recruiter from OneGas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                className="input min-h-[80px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any follow-up actions or takeaways…"
              />
            </div>
            <button onClick={handleSelfReport} className="btn-primary">
              Save to History
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
