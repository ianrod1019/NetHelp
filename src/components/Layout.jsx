import { Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import Header from './Header.jsx'
import FilterHotbar from './FilterHotbar.jsx'
import MessagingDrawer from './MessagingDrawer.jsx'
import Signup from '../pages/Signup.jsx'

export default function Layout() {
  const { isAuthenticated } = useApp()

  if (!isAuthenticated) {
    return <Signup />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FilterHotbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          NetHelp — Connecting Tulsa students, scholars, and dropouts with opportunities.
          <span className="block mt-1 text-xs">Default region: Tulsa, OK · Built for accessibility</span>
        </div>
      </footer>
      <MessagingDrawer />
    </div>
  )
}
