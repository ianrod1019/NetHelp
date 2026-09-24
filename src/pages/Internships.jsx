import { useMemo, useState } from 'react'
import { getInternships, resolveRegion, supportedRegions } from '../data/mockData.js'
import InternshipCard from '../components/InternshipCard.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Internships() {
  const { user } = useApp()
  const region = user?.location || ''
  const [filter, setFilter] = useState('all')

  const allInternships = useMemo(() => getInternships(region), [region])

  const filtered = useMemo(() => {
    if (filter === 'all') return allInternships
    if (filter === 'paid') return allInternships.filter((i) => i.paid)
    if (filter === 'remote') return allInternships.filter((i) => i.remote)
    return allInternships
  }, [filter, allInternships])

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'paid', label: 'Paid Only' },
    { key: 'remote', label: 'Hybrid/Remote' },
  ]

  const isSupported = !!resolveRegion(region)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Internships & Entry-Level Roles</h1>
        <p className="text-sm text-gray-500 mt-1">
          Local opportunities in the {region || 'Tulsa'} area. Apply directly on the employer's site.
        </p>
      </div>

      {!isSupported && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
          <p className="font-medium">No internship data for "{region}" yet.</p>
          <p className="mt-1">
            We currently cover: {supportedRegions.join(', ')}. Update your region in Settings to see local opportunities.
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((i) => (
            <InternshipCard key={i.id} internship={i} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 py-8 text-center">No internships found.</p>
      )}
    </div>
  )
}
