import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { getEvents, getInternships, resolveRegion, supportedRegions } from '../data/mockData.js'
import EventCard from '../components/EventCard.jsx'
import InternshipCard from '../components/InternshipCard.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Home() {
  const { user } = useApp()
  const region = user?.location || ''
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [localSearch, setLocalSearch] = useState(query)

  const q = (localSearch || query).toLowerCase()
  const isSupported = !!resolveRegion(region)

  const allEvents = useMemo(() => getEvents(region), [region])
  const allInternships = useMemo(() => getInternships(region), [region])

  const filteredEvents = useMemo(
    () => allEvents.filter((e) =>
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.tags?.some((t) => t.toLowerCase().includes(q))
    ),
    [q, allEvents]
  )

  const filteredInternships = useMemo(
    () => allInternships.filter((i) =>
      !q ||
      i.title.toLowerCase().includes(q) ||
      i.company.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.tags?.some((t) => t.toLowerCase().includes(q))
    ),
    [q, allInternships]
  )

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Opportunities in {region || 'Tulsa, OK'}
        </h1>
        <p className="mt-2 text-brand-100 max-w-lg">
          GED resources, local internships, and networking events — all in one place.
          RSVP, track your history, and build your digital resume.
        </p>
      </section>

      {!isSupported && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          <p className="font-medium">No local data for "{region}" yet.</p>
          <p className="mt-1">
            We currently cover: {supportedRegions.join(', ')}. Update your region in Settings to see local opportunities.
          </p>
        </div>
      )}

      {/* Quick search */}
      <div className="relative">
        <input
          type="search"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Filter this feed…"
          className="input"
          aria-label="Filter feed"
        />
      </div>

      {/* Events */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="inline-block h-5 w-1.5 rounded-full bg-brand-600" />
          Upcoming Events
          <span className="text-sm font-normal text-gray-400">({filteredEvents.length})</span>
        </h2>
        {filteredEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-8 text-center">No events match your search.</p>
        )}
      </section>

      {/* Internships */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="inline-block h-5 w-1.5 rounded-full bg-green-600" />
          Local Internships
          <span className="text-sm font-normal text-gray-400">({filteredInternships.length})</span>
        </h2>
        {filteredInternships.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredInternships.map((i) => (
              <InternshipCard key={i.id} internship={i} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-8 text-center">No internships match your search.</p>
        )}
      </section>
    </div>
  )
}
