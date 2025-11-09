import { useState, useMemo } from 'react'
import { Search, FileText, X, ChevronDown, ChevronRight } from 'lucide-react'
import { Pattern } from '../types'
import { patterns } from '../data/patterns'
import { PDFThumbnail } from './PDFThumbnail'
import './LibraryView.css'

interface FilterState {
  gauge: string[]
  needleType: string[]
  yarnType: string[]
  garmentType: string[]
  targetDemographic: string[]
  difficulty: string[]
}

function LibraryView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    gauge: [],
    needleType: [],
    yarnType: [],
    garmentType: [],
    targetDemographic: [],
    difficulty: []
  })

  // Extrahiere alle einzigartigen Werte für Filter
  const filterOptions = useMemo(() => {
    return {
      gauge: [...new Set(patterns.map(p => p.analysis.gauge).filter(Boolean))],
      needleType: [...new Set(patterns.map(p => p.analysis.needleType).filter(Boolean))],
      yarnType: [...new Set(patterns.map(p => p.analysis.yarnType).filter(Boolean))],
      garmentType: [...new Set(patterns.map(p => p.analysis.garmentType).filter(Boolean))],
      targetDemographic: [...new Set(patterns.map(p => p.analysis.targetDemographic).filter(Boolean))],
      difficulty: [...new Set(patterns.map(p => p.difficulty))]
    }
  }, [])

  // Gefilterte Anleitungen
  const filteredPatterns = useMemo(() => {
    return patterns.filter(pattern => {
      // Suchfilter
      const matchesSearch = pattern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Attribute-Filter
      const matchesFilters = (
        (filters.gauge.length === 0 || (pattern.analysis.gauge && filters.gauge.includes(pattern.analysis.gauge))) &&
        (filters.needleType.length === 0 || (pattern.analysis.needleType && filters.needleType.includes(pattern.analysis.needleType))) &&
        (filters.yarnType.length === 0 || (pattern.analysis.yarnType && filters.yarnType.includes(pattern.analysis.yarnType))) &&
        (filters.garmentType.length === 0 || (pattern.analysis.garmentType && filters.garmentType.includes(pattern.analysis.garmentType))) &&
        (filters.targetDemographic.length === 0 || (pattern.analysis.targetDemographic && filters.targetDemographic.includes(pattern.analysis.targetDemographic))) &&
        (filters.difficulty.length === 0 || filters.difficulty.includes(pattern.difficulty))
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
      gauge: [],
      needleType: [],
      yarnType: [],
      garmentType: [],
      targetDemographic: [],
      difficulty: []
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
              title="Schwierigkeit"
              options={filterOptions.difficulty}
              selected={filters.difficulty}
              onToggle={(value) => toggleFilter('difficulty', value)}
            />
            
            <FilterGroup
              title="Kleidungsstück"
              options={filterOptions.garmentType}
              selected={filters.garmentType}
              onToggle={(value) => toggleFilter('garmentType', value)}
            />
            
            <FilterGroup
              title="Für wen"
              options={filterOptions.targetDemographic}
              selected={filters.targetDemographic}
              onToggle={(value) => toggleFilter('targetDemographic', value)}
            />
            
            <FilterGroup
              title="Nadelart"
              options={filterOptions.needleType}
              selected={filters.needleType}
              onToggle={(value) => toggleFilter('needleType', value)}
            />
            
            <FilterGroup
              title="Garnart"
              options={filterOptions.yarnType}
              selected={filters.yarnType}
              onToggle={(value) => toggleFilter('yarnType', value)}
            />
            
            <FilterGroup
              title="Maschenprobe"
              options={filterOptions.gauge}
              selected={filters.gauge}
              onToggle={(value) => toggleFilter('gauge', value)}
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="filter-group">
      <button 
        className="filter-group-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="filter-group-title-wrapper">
          <h3 className="filter-group-title">{title}</h3>
          {selected.length > 0 && (
            <span className="filter-count">{selected.length}</span>
          )}
        </div>
        <div className="filter-group-icon">
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </button>
      
      {isOpen && (
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
      )}
    </div>
  )
}

interface PatternCardProps {
  pattern: Pattern
}

function PatternCard({ pattern }: PatternCardProps) {
  const openPDF = () => {
    window.open(`/patterns/pdfs/${pattern.filename}`, '_blank')
  }

  const pdfPath = `/patterns/pdfs/${pattern.filename}`

  return (
    <div className="pattern-card" onClick={openPDF}>
      <div className="pattern-card-image">
        <PDFThumbnail pdfPath={pdfPath} alt={pattern.title} />
        <div className="pattern-card-overlay">
          <div className="pattern-overlay-content">
            <h4 className="pattern-overlay-title">{pattern.title}</h4>
            <p className="pattern-overlay-description">{pattern.description}</p>
            
            <div className="pattern-overlay-metadata">
              <div className="metadata-badge difficulty">
                {pattern.difficulty}
              </div>
              
              {pattern.analysis.garmentType && (
                <div className="metadata-item">
                  <span className="metadata-label">Art:</span>
                  <span className="metadata-value">{pattern.analysis.garmentType}</span>
                </div>
              )}
              
              {pattern.analysis.targetDemographic && (
                <div className="metadata-item">
                  <span className="metadata-label">Für:</span>
                  <span className="metadata-value">{pattern.analysis.targetDemographic}</span>
                </div>
              )}
              
              {pattern.analysis.yarnType && (
                <div className="metadata-item">
                  <span className="metadata-label">Garn:</span>
                  <span className="metadata-value">{pattern.analysis.yarnType}</span>
                </div>
              )}
              
              {pattern.analysis.needleType && (
                <div className="metadata-item">
                  <span className="metadata-label">Nadeln:</span>
                  <span className="metadata-value">{pattern.analysis.needleType}</span>
                </div>
              )}
              
              {pattern.analysis.gauge && (
                <div className="metadata-item">
                  <span className="metadata-label">Maschenprobe:</span>
                  <span className="metadata-value">{pattern.analysis.gauge}</span>
                </div>
              )}
              
              {pattern.sizes.length > 0 && (
                <div className="metadata-item">
                  <span className="metadata-label">Größen:</span>
                  <span className="metadata-value">{pattern.sizes.join(', ')}</span>
                </div>
              )}
              
              <div className="metadata-item">
                <span className="metadata-label">Zeit:</span>
                <span className="metadata-value">{pattern.estimatedTime}</span>
              </div>
            </div>
            
            <div className="pattern-overlay-action">
              <FileText size={20} />
              <span>PDF öffnen</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pattern-card-footer">
        <h4 className="pattern-card-title">{pattern.title}</h4>
      </div>
    </div>
  )
}

export default LibraryView

