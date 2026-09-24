export default function InternshipCard({ internship }) {
  return (
    <article className="card p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 font-bold text-xs shrink-0">
          {internship.logo}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge bg-green-50 text-green-700">Internship</span>
            {internship.paid ? (
              <span className="badge bg-emerald-50 text-emerald-700">{internship.wage}</span>
            ) : (
              <span className="badge bg-gray-100 text-gray-600">Unpaid</span>
            )}
            {internship.remote && <span className="badge bg-purple-50 text-purple-700">Hybrid</span>}
          </div>
          <h3 className="font-semibold text-gray-900 leading-tight">{internship.title}</h3>
          <p className="text-sm text-gray-500">{internship.company} · {internship.location}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">{internship.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {internship.tags?.map((t) => (
          <span key={t} className="badge bg-gray-100 text-gray-600">{t}</span>
        ))}
      </div>

      <dl className="text-sm text-gray-500">
        <dt className="sr-only">Duration</dt>
        <dd className="flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{internship.duration}</span>
        </dd>
      </dl>

      <div className="mt-1">
        <a
          href={internship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full"
        >
          Apply Now
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-9 9M5 5h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
        </a>
      </div>
    </article>
  )
}
