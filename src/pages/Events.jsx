import { useMemo, useState } from 'react'
import { events } from '../data/mockData.js'
import EventCard from '../components/EventCard.jsx'

export default function Events() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return events
    return events.filter((e) => e.category === filter)
  }, [filter])

  const categories = ['all', 'Events', 'GED Prep']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="text-sm text-gray-500 mt-1">Networking events, workshops, and study groups in Tulsa.</p>
      </div>

      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === c ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 py-8 text-center">No events found.</p>
      )}
    </div>
  )
}
