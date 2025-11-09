import { useState } from 'react'
import { Plus, Edit2, Trash2, Package } from 'lucide-react'
import { Needle, Yarn } from '../types'
import './MyArea.css'

// Mock-Daten
const mockNeedles: Needle[] = [
  { id: '1', type: 'Rundstricknadel', size: '4.0 mm', material: 'Metall', quantity: 2 },
  { id: '2', type: 'Nadelspiel', size: '3.5 mm', material: 'Holz', quantity: 1 },
  { id: '3', type: 'Stricknadeln', size: '5.0 mm', material: 'Bambus', quantity: 1 }
]

const mockYarns: Yarn[] = [
  { id: '1', brand: 'Lana Grossa', name: 'Meilenweit', color: 'Blau meliert', weight: 'Sockengarn', quantity: 5, unit: 'Knäuel' },
  { id: '2', brand: 'Schachenmayr', name: 'Merino Extrafine', color: 'Beige', weight: 'Sport', quantity: 300, unit: 'Gramm' },
  { id: '3', brand: 'Drops', name: 'Alpaca', color: 'Grau', weight: 'DK', quantity: 8, unit: 'Knäuel' }
]

type Section = 'needles' | 'yarn'

function MyArea() {
  const [activeSection, setActiveSection] = useState<Section>('needles')
  const [needles] = useState<Needle[]>(mockNeedles)
  const [yarns] = useState<Yarn[]>(mockYarns)

  return (
    <div className="my-area">
      <div className="page-header">
        <h1 className="page-title">Mein Bereich</h1>
        <p className="page-description">
          Verwalte deine Nadeln, Wolle und andere Materialien
        </p>
      </div>

      <div className="section-tabs">
        <button
          className={`section-tab ${activeSection === 'needles' ? 'active' : ''}`}
          onClick={() => setActiveSection('needles')}
        >
          <Package size={20} />
          Nadeln ({needles.length})
        </button>
        <button
          className={`section-tab ${activeSection === 'yarn' ? 'active' : ''}`}
          onClick={() => setActiveSection('yarn')}
        >
          <Package size={20} />
          Wolle ({yarns.length})
        </button>
      </div>

      <div className="section-content">
        {activeSection === 'needles' && <NeedlesSection needles={needles} />}
        {activeSection === 'yarn' && <YarnSection yarns={yarns} />}
      </div>
    </div>
  )
}

interface NeedlesSectionProps {
  needles: Needle[]
}

function NeedlesSection({ needles }: NeedlesSectionProps) {
  const handleAdd = () => {
    alert('Hier würde ein Dialog zum Hinzufügen einer neuen Nadel erscheinen')
  }

  const handleEdit = (needle: Needle) => {
    alert(`Bearbeiten: ${needle.type} ${needle.size}`)
  }

  const handleDelete = (needle: Needle) => {
    if (confirm(`Möchtest du "${needle.type} ${needle.size}" wirklich löschen?`)) {
      alert('Nadel würde gelöscht werden')
    }
  }

  return (
    <div className="inventory-section">
      <div className="inventory-header">
        <h2 className="inventory-title">Meine Nadeln</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={20} />
          Nadel hinzufügen
        </button>
      </div>

      <div className="inventory-grid">
        {needles.map(needle => (
          <div key={needle.id} className="inventory-card">
            <div className="inventory-card-header">
              <div>
                <h3 className="inventory-item-name">{needle.type}</h3>
                <p className="inventory-item-subtitle">{needle.size}</p>
              </div>
              <div className="inventory-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEdit(needle)}
                  aria-label="Bearbeiten"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="icon-btn icon-btn-danger"
                  onClick={() => handleDelete(needle)}
                  aria-label="Löschen"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="inventory-details">
              <div className="detail-row">
                <span className="detail-label">Material:</span>
                <span className="detail-value">{needle.material}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Anzahl:</span>
                <span className="detail-value">{needle.quantity}x</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface YarnSectionProps {
  yarns: Yarn[]
}

function YarnSection({ yarns }: YarnSectionProps) {
  const handleAdd = () => {
    alert('Hier würde ein Dialog zum Hinzufügen neuer Wolle erscheinen')
  }

  const handleEdit = (yarn: Yarn) => {
    alert(`Bearbeiten: ${yarn.brand} ${yarn.name}`)
  }

  const handleDelete = (yarn: Yarn) => {
    if (confirm(`Möchtest du "${yarn.brand} ${yarn.name}" wirklich löschen?`)) {
      alert('Wolle würde gelöscht werden')
    }
  }

  return (
    <div className="inventory-section">
      <div className="inventory-header">
        <h2 className="inventory-title">Meine Wolle</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={20} />
          Wolle hinzufügen
        </button>
      </div>

      <div className="inventory-grid">
        {yarns.map(yarn => (
          <div key={yarn.id} className="inventory-card">
            <div className="inventory-card-header">
              <div>
                <h3 className="inventory-item-name">{yarn.brand}</h3>
                <p className="inventory-item-subtitle">{yarn.name}</p>
              </div>
              <div className="inventory-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEdit(yarn)}
                  aria-label="Bearbeiten"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="icon-btn icon-btn-danger"
                  onClick={() => handleDelete(yarn)}
                  aria-label="Löschen"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="inventory-details">
              <div className="detail-row">
                <span className="detail-label">Farbe:</span>
                <span className="detail-value">{yarn.color}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stärke:</span>
                <span className="detail-value">{yarn.weight}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Menge:</span>
                <span className="detail-value">
                  {yarn.quantity} {yarn.unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyArea

