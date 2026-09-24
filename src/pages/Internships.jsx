import { useMemo, useState } from 'react'
import { internships } from '../data/mockData.js'
import InternshipCard from '../components/InternshipCard.jsx'

export default function Internships() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return internships
    if (filter === 'paid') return internships.filter((i) => i.paid)
    if (filter === 'remote') return internships.filter((i) => i.remote)
    return internships
  }, [filter])

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'paid', label: 'Paid Only' },
    { key: 'remote', label: 'Hybrid/Remote' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Internships & Entry-Level Roles</h1>
        <p className="text-sm text-gray-500 mt-1">Local opportunities in the Tulsa area. Apply directly on the employer's site.</p>
      </div>

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
