export default function GedCenterCard({ center }) {
  return (
    <article className="card p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 leading-tight">{center.name}</h3>

      </div>

      <dl className="text-sm text-gray-500 space-y-1">
        <div className="flex items-start gap-2">
          <svg className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="2.5" />
          </svg>
          <span>{center.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.04 11.04 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${center.phone}`} className="text-brand-600 hover:underline">{center.phone}</a>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{center.hours}</span>
        </div>
      </dl>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {center.services.map((s) => (
          <span key={s} className="badge bg-brand-50 text-brand-700">{s}</span>
        ))}
      </div>

      <a
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary w-full mt-1"
      >
        Get Directions
      </a>
    </article>
  )
}
