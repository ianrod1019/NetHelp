import { useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { getMentors } from '../data/mockData.js'

export default function MessagingDrawer() {
  const { messagingOpen, setMessagingOpen, allowDirectMessages, user } = useApp()
  const mentors = useMemo(() => getMentors(user?.location || ''), [user?.location])

  return (
    <>
      {/* Backdrop */}
      {messagingOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setMessagingOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-200 ${
          messagingOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!messagingOpen}
        aria-label="Direct messages"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 h-14">
          <h2 className="font-semibold text-gray-900">Messages</h2>
          <button
            onClick={() => setMessagingOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Close messages"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!allowDirectMessages ? (
          <div className="p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6a2.25 2.25 0 00-2.25-2.25h-4.5A2.25 2.25 0 005.25 6v12a2.25 2.25 0 002.25 2.25h4.5A2.25 2.25 0 0014.25 18v-3m0 0h6m-6 0l3-3m-3 3l3 3" />
            </svg>
            <p className="mt-3 text-sm font-medium text-gray-900">Direct messages are turned off</p>
            <p className="mt-1 text-sm text-gray-500">
              Enable "Allow Direct Messages" in Settings to communicate with peers and organizers.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100%-3.5rem)]">
            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto">
              {mentors.filter((m) => m.available).map((m) => (
                <div key={m.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm shrink-0">
                    {m.avatar}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                    <p className="text-xs text-gray-500 truncate">{m.role}</p>
                  </div>
                  <span className="ml-auto h-2 w-2 rounded-full bg-green-500 shrink-0" title="Available" />
                </div>
              ))}
            </div>

            {/* Compose */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message…"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      e.target.value = ''
                    }
                  }}
                />
                <button className="btn-primary px-3 py-2" aria-label="Send message">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
