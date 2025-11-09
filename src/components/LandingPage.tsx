import { Upload, Library, User, Heart, Sparkles, BookOpen } from 'lucide-react'
import './LandingPage.css'

interface LandingPageProps {
  onEnterApp: () => void
}

function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">
            <svg className="hero-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h1 className="hero-title">StrickerApp</h1>
          <p className="hero-subtitle">
            Deine persönliche Strickbibliothek – Alle Anleitungen an einem Ort
          </p>
          <p className="hero-description">
            Organisiere deine Strickanleitungen, behalte den Überblick über deine Projekte 
            und entdecke neue Inspirationen für dein nächstes Meisterwerk.
          </p>
          <button className="cta-button" onClick={onEnterApp}>
            <Sparkles size={20} />
            Jetzt starten
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-content">
          <h2 className="section-title">Alles, was du zum Stricken brauchst</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Upload size={32} />
              </div>
              <h3 className="feature-title">Anleitungen hochladen</h3>
              <p className="feature-description">
                Lade deine PDF-Strickanleitungen einfach hoch und behalte sie 
                übersichtlich sortiert an einem Ort.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Library size={32} />
              </div>
              <h3 className="feature-title">Deine Bibliothek</h3>
              <p className="feature-description">
                Durchsuche deine gesamte Sammlung, filtere nach Kategorien 
                und finde schnell die perfekte Anleitung.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <User size={32} />
              </div>
              <h3 className="feature-title">Mein Bereich</h3>
              <p className="feature-description">
                Verwalte deine aktiven Projekte, markiere Favoriten und 
                behalte den Überblick über deinen Fortschritt.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={32} />
              </div>
              <h3 className="feature-title">Übersichtlich organisiert</h3>
              <p className="feature-description">
                Alle deine Anleitungen strukturiert und jederzeit griffbereit – 
                egal ob Pullover, Socken oder Mützen.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={32} />
              </div>
              <h3 className="feature-title">Mit Liebe gemacht</h3>
              <p className="feature-description">
                Eine App von Strickbegeisterten für Strickbegeisterte – 
                einfach, intuitiv und schön gestaltet.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Sparkles size={32} />
              </div>
              <h3 className="feature-title">Immer dabei</h3>
              <p className="feature-description">
                Zugriff auf deine Anleitungen von überall – am Computer, 
                Tablet oder Smartphone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Bereit zum Loslegen?</h2>
          <p className="cta-text">
            Starte jetzt und bringe Ordnung in deine Strickprojekte
          </p>
          <button className="cta-button cta-button-large" onClick={onEnterApp}>
            <Sparkles size={24} />
            Zur App
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <svg className="footer-logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>StrickerApp</span>
          </div>
          <p className="footer-text">
            Deine persönliche Strickbibliothek – Mit Liebe zum Detail gestaltet
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

