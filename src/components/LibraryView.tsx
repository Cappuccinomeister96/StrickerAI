import { useState, useMemo } from 'react'
import { Search, FileText, X } from 'lucide-react'
import { Pattern } from '../types'
import './LibraryView.css'

// Mock-Daten für die Demo
const mockPatterns: Pattern[] = [
  {
    id: '1',
    name: 'Klassischer Pullover',
    pdfPath: '/patterns/pullover1.pdf',
    metadata: {
      maschenprobe: '22 Maschen x 30 Reihen',
      nadelart: 'Rundstricknadel',
      garnArt: 'Merinowolle',
      kleidungsstueckart: 'Pullover',
      fuerWen: 'Frau'
    }
  },
  {
    id: '2',
    name: 'Babysocken',
    pdfPath: '/patterns/socken1.pdf',
    metadata: {
      maschenprobe: '28 Maschen x 36 Reihen',
      nadelart: 'Nadelspiel',
      garnArt: 'Baumwolle',
      kleidungsstueckart: 'Socken',
      fuerWen: 'Kind'
    }
  },
  {
    id: '3',
    name: 'Herrenschal',
    pdfPath: '/patterns/schal1.pdf',
    metadata: {
      maschenprobe: '20 Maschen x 28 Reihen',
      nadelart: 'Stricknadeln',
      garnArt: 'Alpakawolle',
      kleidungsstueckart: 'Schal',
      fuerWen: 'Mann'
    }
  },
  {
    id: '4',
    name: 'Sommertop',
    pdfPath: '/patterns/top1.pdf',
    metadata: {
      maschenprobe: '24 Maschen x 32 Reihen',
      nadelart: 'Rundstricknadel',
      garnArt: 'Baumwolle',
      kleidungsstueckart: 'Top',
      fuerWen: 'Frau'
    }
  }
]

interface FilterState {
  maschenprobe: string[]
  nadelart: string[]
  garnArt: string[]
  kleidungsstueckart: string[]
  fuerWen: string[]
}

function LibraryView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    maschenprobe: [],
    nadelart: [],
    garnArt: [],
    kleidungsstueckart: [],
    fuerWen: []
  })

  // Extrahiere alle einzigartigen Werte für Filter
  const filterOptions = useMemo(() => {
    return {
      maschenprobe: [...new Set(mockPatterns.map(p => p.metadata.maschenprobe))],
      nadelart: [...new Set(mockPatterns.map(p => p.metadata.nadelart))],
      garnArt: [...new Set(mockPatterns.map(p => p.metadata.garnArt))],
      kleidungsstueckart: [...new Set(mockPatterns.map(p => p.metadata.kleidungsstueckart))],
      fuerWen: [...new Set(mockPatterns.map(p => p.metadata.fuerWen))]
    }
  }, [])

  // Gefilterte Anleitungen
  const filteredPatterns = useMemo(() => {
    return mockPatterns.filter(pattern => {
      // Suchfilter
      const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Attribute-Filter
      const matchesFilters = (
        (filters.maschenprobe.length === 0 || filters.maschenprobe.includes(pattern.metadata.maschenprobe)) &&
        (filters.nadelart.length === 0 || filters.nadelart.includes(pattern.metadata.nadelart)) &&
        (filters.garnArt.length === 0 || filters.garnArt.includes(pattern.metadata.garnArt)) &&
        (filters.kleidungsstueckart.length === 0 || filters.kleidungsstueckart.includes(pattern.metadata.kleidungsstueckart)) &&
        (filters.fuerWen.length === 0 || filters.fuerWen.includes(pattern.metadata.fuerWen))
      )
      
      return matchesSearch && matchesFilters
    })
  }, [searchTerm, filters])

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[category]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [category]: updated }
    })
  }

  const clearAllFilters = () => {
    setFilters({
      maschenprobe: [],
      nadelart: [],
      garnArt: [],
      kleidungsstueckart: [],
      fuerWen: []
    })
    setSearchTerm('')
  }

  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="library-view">
      <div className="page-header">
        <h1 className="page-title">Meine Bibliothek</h1>
        <p className="page-description">
          Durchsuche und filtere deine Strickanleitungen
        </p>
      </div>

      <div className="library-layout">
        {/* Sidebar mit Filtern */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2 className="filters-title">Filter</h2>
            {activeFilterCount > 0 && (
              <button className="clear-filters" onClick={clearAllFilters}>
                <X size={16} />
                Zurücksetzen
              </button>
            )}
          </div>

          {/* Suchfeld */}
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Anleitung suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filter-Kategorien */}
          <div className="filter-groups">
            <FilterGroup
              title="Für wen"
              options={filterOptions.fuerWen}
              selected={filters.fuerWen}
              onToggle={(value) => toggleFilter('fuerWen', value)}
            />
            
            <FilterGroup
              title="Kleidungsstück"
              options={filterOptions.kleidungsstueckart}
              selected={filters.kleidungsstueckart}
              onToggle={(value) => toggleFilter('kleidungsstueckart', value)}
            />
            
            <FilterGroup
              title="Nadelart"
              options={filterOptions.nadelart}
              selected={filters.nadelart}
              onToggle={(value) => toggleFilter('nadelart', value)}
            />
            
            <FilterGroup
              title="Garnart"
              options={filterOptions.garnArt}
              selected={filters.garnArt}
              onToggle={(value) => toggleFilter('garnArt', value)}
            />
            
            <FilterGroup
              title="Maschenprobe"
              options={filterOptions.maschenprobe}
              selected={filters.maschenprobe}
              onToggle={(value) => toggleFilter('maschenprobe', value)}
            />
          </div>
        </aside>

        {/* Hauptbereich mit Anleitungen */}
        <div className="patterns-main">
          <div className="patterns-header">
            <h3 className="patterns-count">
              {filteredPatterns.length} {filteredPatterns.length === 1 ? 'Anleitung' : 'Anleitungen'}
            </h3>
          </div>

          {filteredPatterns.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <p>Keine Anleitungen gefunden</p>
              <button className="btn btn-secondary" onClick={clearAllFilters}>
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="patterns-grid">
              {filteredPatterns.map(pattern => (
                <PatternCard key={pattern.id} pattern={pattern} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface FilterGroupProps {
  title: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
}

function FilterGroup({ title, options, selected, onToggle }: FilterGroupProps) {
  return (
    <div className="filter-group">
      <h3 className="filter-group-title">{title}</h3>
      <div className="filter-options">
        {options.map(option => (
          <label key={option} className="filter-option">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
              className="filter-checkbox"
            />
            <span className="filter-label">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

interface PatternCardProps {
  pattern: Pattern
}

function PatternCard({ pattern }: PatternCardProps) {
  return (
    <div className="pattern-card">
      <div className="pattern-card-header">
        <FileText className="pattern-icon" size={24} />
        <h4 className="pattern-name">{pattern.name}</h4>
      </div>
      <div className="pattern-metadata">
        <div className="metadata-item">
          <span className="metadata-label">Für:</span>
          <span className="metadata-value">{pattern.metadata.fuerWen}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Art:</span>
          <span className="metadata-value">{pattern.metadata.kleidungsstueckart}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Nadeln:</span>
          <span className="metadata-value">{pattern.metadata.nadelart}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Garn:</span>
          <span className="metadata-value">{pattern.metadata.garnArt}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Maschenprobe:</span>
          <span className="metadata-value">{pattern.metadata.maschenprobe}</span>
        </div>
      </div>
      <button className="btn btn-primary pattern-open-btn">
        PDF öffnen
      </button>
    </div>
  )
}

export default LibraryView

