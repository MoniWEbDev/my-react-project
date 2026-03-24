import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WasteInput from './pages/WasteInput'
import Gift from './pages/Gift'
import Dashboard from './pages/Dashboard'
import { RecyclingProvider } from './contexts/RecyclingContext'
import { LearningProvider } from './contexts/LearningContext'
import LearningHub from './pages/LearningHub'
import { AppProvider } from './contexts/AppContext'
import CommunityHub from './pages/CommunityHub'

function App() {
  return (
    <AppProvider>
      <RecyclingProvider>
        <LearningProvider>
          <Router>
            <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
              <Navbar />
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/waste" element={<WasteInput />} />
                  <Route path="/gifts" element={<Gift />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/learning" element={<LearningHub />} />
                  <Route path="/community" element={<CommunityHub />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </LearningProvider>
      </RecyclingProvider>
    </AppProvider>
  )
}

export default App
