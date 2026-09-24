import { useState } from 'react'
import Toggle from '../components/Toggle.jsx'
import ThemePicker from '../components/ThemePicker.jsx'
import { useApp } from '../context/AppContext.jsx'

const ROLES = ['Seeker', 'School/Org Admin', 'Employer/Business']

export default function Settings() {
  const {
    user,
    updateProfile,
    allowDirectMessages,
    setAllowDirectMessages,
    notificationsEnabled,
    toggleNotifications,
  } = useApp()

  // Profile form state
  const [name, setName] = useState(user.name)
  const [role, setRole] = useState(user.role)
  const [region, setRegion] = useState(user.location)
  const [profileSaved, setProfileSaved] = useState(false)

  // Email verification state
  const [emailMode, setEmailMode] = useState('idle') // idle | editing | verifying
  const [newEmail, setNewEmail] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [enteredCode, setEnteredCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState('')

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateProfile({ name: name.trim(), role, location: region.trim() })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  const handleSendCode = () => {
    setEmailError('')
    setEmailSuccess('')
    if (!newEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail.trim())) {
      setEmailError('Please enter a valid email address.')
      return
    }
    if (newEmail.trim() === user.email) {
      setEmailError('This is already your email address.')
      return
    }
    // Mock: generate a 6-digit code (no backend to send a real email)
    const code = String(Math.floor(100000 + Math.random() * 900000))
    setSentCode(code)
    setEmailMode('verifying')
  }

  const handleVerifyEmail = () => {
    setEmailError('')
    setEmailSuccess('')
    if (enteredCode.trim() !== sentCode) {
      setEmailError('Incorrect verification code. Please try again.')
      return
    }
    updateProfile({ email: newEmail.trim() })
    setEmailSuccess('Email updated successfully.')
    setEmailMode('idle')
    setNewEmail('')
    setEnteredCode('')
    setSentCode('')
    setTimeout(() => setEmailSuccess(''), 3000)
  }

  const handleCancelEmail = () => {
    setEmailMode('idle')
    setNewEmail('')
    setEnteredCode('')
    setSentCode('')
    setEmailError('')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your privacy, notifications, and profile.</p>
      </div>

      {/* Theme */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Appearance</h2>
        <p className="text-sm text-gray-500 mb-4">Choose a theme for the app. Your preference is saved on this device.</p>
        <ThemePicker />
      </section>

      {/* Profile Information */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Profile Information</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="profile-name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="profile-role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="profile-role"
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="profile-region" className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <input
              id="profile-region"
              className="input"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary">Save Changes</button>
            {profileSaved && (
              <span className="text-sm text-green-600 font-medium">✓ Profile updated</span>
            )}
          </div>
        </form>
      </section>

      {/* Email Address */}
      <section className="card p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Email Address</h2>

        {emailSuccess && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
            {emailSuccess}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current email</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
            </div>
            {emailMode === 'idle' && (
              <button onClick={() => setEmailMode('editing')} className="btn-secondary text-sm">
                Change Email
              </button>
            )}
          </div>

          {emailMode === 'editing' && (
            <div className="space-y-3 border-t border-gray-100 pt-3">
              <div>
                <label htmlFor="new-email" className="block text-sm font-medium text-gray-700 mb-1">
                  New Email
                </label>
                <input
                  id="new-email"
                  type="email"
                  className="input"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new@example.com"
                />
              </div>
              {emailError && <p className="text-sm text-red-600">{emailError}</p>}
              <div className="flex items-center gap-2">
                <button onClick={handleSendCode} className="btn-primary">Send Verification Code</button>
                <button onClick={handleCancelEmail} className="btn-ghost">Cancel</button>
              </div>
            </div>
          )}

          {emailMode === 'verifying' && (
            <div className="space-y-3 border-t border-gray-100 pt-3">
              <div className="rounded-lg bg-brand-50 border border-brand-200 p-3 text-sm text-brand-800">
                <p className="font-medium">Verification code sent to {newEmail}</p>
                <p className="mt-1 text-brand-600">
                  Demo mode — your code is: <span className="font-bold tracking-widest">{sentCode}</span>
                </p>
              </div>
              <div>
                <label htmlFor="verify-code" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Verification Code
                </label>
                <input
                  id="verify-code"
                  className="input tracking-widest"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  inputMode="numeric"
                />
              </div>
              {emailError && <p className="text-sm text-red-600">{emailError}</p>}
              <div className="flex items-center gap-2">
                <button onClick={handleVerifyEmail} className="btn-primary">Verify & Save</button>
                <button onClick={handleCancelEmail} className="btn-ghost">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </section>

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
    </div>
  )
}
