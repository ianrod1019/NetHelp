import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Signup() {
  const { signup, login } = useApp()
  const [mode, setMode] = useState('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name.')
        return
      }
      signup({ name: name.trim(), email: email.trim(), password })
    } else {
      login()
    }
  }

  const switchMode = () => {
    setMode((m) => (m === 'signup' ? 'login' : 'signup'))
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
            N
          </span>
          <span className="font-bold text-2xl tracking-tight">NetHelp</span>
        </div>

        <div className="card p-6">
          <h1 className="text-xl font-bold text-gray-900">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'signup'
              ? 'Sign up to find GED resources, internships, and events in Tulsa.'
              : 'Log in to your NetHelp account.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="signup-name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full">
              {mode === 'signup' ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <button onClick={switchMode} className="text-brand-600 font-medium hover:underline">
                  Log in
                </button>
              </>
            ) : (
              <>
                New to NetHelp?{' '}
                <button onClick={switchMode} className="text-brand-600 font-medium hover:underline">
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
