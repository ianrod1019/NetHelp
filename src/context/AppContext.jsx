import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // User profile state
  const [user, setUser] = useState({
    name: 'Jordan Rivers',
    role: 'Seeker',
    avatar: 'JR',
    location: 'Tulsa, OK',
    bio: 'GED candidate and aspiring software developer based in Tulsa. Looking for internships and mentorship.',
    skills: ['JavaScript', 'HTML/CSS', 'Python', 'Public Speaking'],
    education: 'GED — In Progress (Est. Dec 2026)',
    email: 'jordan@example.com',
  })

  // Settings toggles
  const [allowDirectMessages, setAllowDirectMessages] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  // RSVP'd event IDs
  const [rsvpedEvents, setRsvpedEvents] = useState([])

  // History log entries
  const [history, setHistory] = useState([
    {
      id: 'h1',
      eventId: 'e1',
      title: 'Tulsa Tech Career Fair 2026',
      dateAttended: '2026-09-10',
      contactsMet: 'Met recruiter from OneGas and a TCC advisor.',
      notes: 'Follow up with OneGas about summer internship.',
    },
  ])

  // Messaging drawer
  const [messagingOpen, setMessagingOpen] = useState(false)

  const toggleRSVP = useCallback((eventId) => {
    setRsvpedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    )
  }, [])

  const isRsvped = useCallback((eventId) => rsvpedEvents.includes(eventId), [rsvpedEvents])

  const addHistoryEntry = useCallback((entry) => {
    setHistory((prev) => [
      {
        id: `h${Date.now()}`,
        ...entry,
      },
      ...prev,
    ])
  }, [])

  const removeHistoryEntry = useCallback((entryId) => {
    setHistory((prev) => prev.filter((h) => h.id !== entryId))
  }, [])

  // Browser Notifications
  const requestNotificationPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.')
      return false
    }
    if (Notification.permission === 'granted') {
      setNotificationsEnabled(true)
      return true
    }
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      setNotificationsEnabled(true)
      return true
    }
    setNotificationsEnabled(false)
    return false
  }, [])

  const toggleNotifications = useCallback(async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false)
      return
    }
    await requestNotificationPermission()
  }, [notificationsEnabled, requestNotificationPermission])

  // Send a test notification when toggled on
  useEffect(() => {
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('NetHelp Notifications Enabled', {
        body: 'You will be reminded about upcoming RSVP\u2019d events.',
      })
    }
  }, [notificationsEnabled])

  const value = {
    user,
    setUser,
    allowDirectMessages,
    setAllowDirectMessages,
    notificationsEnabled,
    toggleNotifications,
    rsvpedEvents,
    toggleRSVP,
    isRsvped,
    history,
    addHistoryEntry,
    removeHistoryEntry,
    messagingOpen,
    setMessagingOpen,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
