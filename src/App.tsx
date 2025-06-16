// src/App.tsx
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Chat from './pages/Chat'
import History from './pages/History'
import './index.css'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white font-sans">
        <header className="flex justify-between items-center px-4 py-3 bg-slate-950 shadow-md">
          <h1 className="text-xl font-bold tracking-wide">📊 YxN Terminal</h1>
          <nav className="flex gap-4 text-sm">
            <NavLink to="/" className={({ isActive }) => isActive ? 'underline text-blue-400' : ''}>ホーム</NavLink>
            <NavLink to="/search" className={({ isActive }) => isActive ? 'underline text-blue-400' : ''}>銘柄探索</NavLink>
            <NavLink to="/chat" className={({ isActive }) => isActive ? 'underline text-blue-400' : ''}>のあと話す</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'underline text-blue-400' : ''}>履歴</NavLink>
            <NavLink to="/portfolio">ポートフォリオ</NavLink>
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/history" element={<History />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>

        <footer className="text-xs text-center text-slate-400 p-3 border-t border-slate-600">
          © 2025 YxN Terminal - Powered by Noa
        </footer>
      </div>
    </Router>
  )
}

export default App
