# StrickerApp

Eine moderne WebApp für StrickerInnen zur intelligenten Verwaltung von Strickanleitungen und Materialien.

## Features

### 1. Neue Anleitung
- PDF-Upload mit Drag & Drop
- Mehrere Dateien gleichzeitig hochladen
- Automatische Verarbeitung durch AI-Backend (in Entwicklung)

### 2. Bibliothek
- Moderne Kachel-Ansicht mit PDF-Vorschaubildern
- Intelligente Filterung nach:
  - Schwierigkeit
  - Kleidungsstückart
  - Zielgruppe
  - Nadelart
  - Garnart
  - Maschenprobe
- Suchfunktion
- Hover-Overlay mit detaillierten Metadaten
- Direktes Öffnen der PDFs

### 3. Mein Bereich
- Verwaltung von Nadeln
- Verwaltung von Wolle
- Übersichtliche Inventarverwaltung

## Technologie-Stack

- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **React Dropzone** für Datei-Uploads
- **React PDF** für PDF-Vorschau-Rendering
- **Lucide React** für Icons
- Modernes CSS mit Custom Properties

## Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Produktions-Build testen
npm run preview
```

## PDF-Vorschau

Die App rendert PDF-Vorschaubilder automatisch direkt aus den PDF-Dateien mit `react-pdf`. Es werden keine separaten Thumbnail-Bilder benötigt - die erste Seite jedes PDFs wird dynamisch als Vorschau geladen.

## Entwicklung

Die App läuft standardmäßig auf `http://localhost:5173`

### Projekt-Struktur

```
src/
├── components/
│   ├── NewPattern.tsx      # PDF-Upload Komponente
│   ├── LibraryView.tsx     # Bibliothek mit Filterung
│   └── MyArea.tsx          # Materialverwaltung
├── data/
│   └── patterns.ts         # Pattern-Daten
├── types.ts                # TypeScript Typen
├── App.tsx                 # Haupt-App Komponente
├── App.css                 # Globale Styles
└── main.tsx               # Entry Point

patterns/
├── pdfs/                   # PDF-Anleitungen
└── jsons/                  # JSON-Metadaten
```

## Design

Die App verwendet eine warme, professionelle Farbpalette:
- Primärfarbe: Warmes Braun (#8B7355)
- Hintergrund: Cremeweiß (#FAF8F5)
- Akzente: Beige-Töne

## Backend-Integration

Die App ist vorbereitet für die Integration mit einem AI-Backend:
- PDF-Upload sendet Dateien an Backend-Endpunkt
- JSON-Metadaten werden vom Backend zurückgegeben
- Filterung basiert auf strukturierten JSON-Daten

## Lizenz

Privates Projekt
