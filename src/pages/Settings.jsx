import Toggle from '../components/Toggle.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Settings() {
  const {
    user,
    allowDirectMessages,
    setAllowDirectMessages,
    notificationsEnabled,
    toggleNotifications,
  } = useApp()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your privacy, notifications, and profile.</p>
      </div>

      {/* Privacy */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-2">Privacy & Messaging</h2>
        <div className="divide-y divide-gray-100">
          <Toggle
            id="dm-toggle"
            label="Allow Direct Messages"
            description="Let peers and organizers message you directly."
            checked={allowDirectMessages}
            onChange={setAllowDirectMessages}
          />
        </div>
        {!allowDirectMessages && (
          <p className="mt-2 text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
            Direct messages are currently disabled. Your inbox is hidden and no one can start a conversation with you.
          </p>
        )}
      </section>

      {/* Notifications */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-2">Browser Notifications</h2>
        <div className="divide-y divide-gray-100">
          <Toggle
            id="notif-toggle"
            label="Event Reminders"
            description="Get browser notifications about upcoming RSVP'd events."
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
        </div>
        {!notificationsEnabled && (
          <p className="mt-2 text-sm text-gray-500">
            Turn this on to allow NetHelp to send you reminders before events you've RSVP'd to.
          </p>
        )}
      </section>

      {/* Profile info */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-3">Profile</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Name</dt>
            <dd className="text-gray-900 font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="text-gray-900 font-medium">{user.role}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Region</dt>
            <dd className="text-gray-900 font-medium">{user.location}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900 font-medium">{user.email}</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
