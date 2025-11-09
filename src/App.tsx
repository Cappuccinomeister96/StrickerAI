import { useState } from 'react'
import { Upload, Library, User } from 'lucide-react'
import './App.css'
import NewPattern from './components/NewPattern'
import LibraryView from './components/LibraryView'
import MyArea from './components/MyArea'

type Tab = 'new' | 'library' | 'myarea'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('library')

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>StrickerApp</span>
          </div>
          
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              <Upload size={20} />
              <span>Neue Anleitung</span>
            </button>
            <button
              className={`nav-tab ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              <Library size={20} />
              <span>Bibliothek</span>
            </button>
            <button
              className={`nav-tab ${activeTab === 'myarea' ? 'active' : ''}`}
              onClick={() => setActiveTab('myarea')}
            >
              <User size={20} />
              <span>Mein Bereich</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'new' && <NewPattern />}
        {activeTab === 'library' && <LibraryView />}
        {activeTab === 'myarea' && <MyArea />}
      </main>
    </div>
  )
}

export default App

