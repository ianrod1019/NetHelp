import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

export default function History() {
  const { history, removeHistoryEntry } = useApp()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Event History</h1>
        <p className="text-sm text-gray-500 mt-1">A verified log of events you've attended. This record appears on your public digital resume.</p>
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((h) => (
            <article key={h.id} className="card p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900">{h.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {new Date(h.dateAttended).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={() => removeHistoryEntry(h.id)}
                  className="text-sm text-gray-400 hover:text-red-600 shrink-0"
                  aria-label="Remove history entry"
                >
                  Remove
                </button>
              </div>

              <dl className="mt-3 space-y-1 text-sm">
                <div>
                  <dt className="inline font-medium text-gray-700">Contacts Met: </dt>
                  <dd className="inline text-gray-600">{h.contactsMet}</dd>
                </div>
                {h.notes && h.notes !== '—' && (
                  <div>
                    <dt className="inline font-medium text-gray-700">Notes: </dt>
                    <dd className="inline text-gray-600">{h.notes}</dd>
                  </div>
                )}
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No events in your history yet.</p>
          <Link to="/events" className="btn-secondary mt-4 inline-flex">Browse Events</Link>
        </div>
      )}
    </div>
  )
}
