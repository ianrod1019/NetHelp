import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import GedHub from './pages/GedHub.jsx'
import Events from './pages/Events.jsx'
import EventDetail from './pages/EventDetail.jsx'
import Internships from './pages/Internships.jsx'
import Profile from './pages/Profile.jsx'
import SettingsPage from './pages/Settings.jsx'
import History from './pages/History.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ged" element={<GedHub />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
