# StrickerApp

Eine moderne WebApp für StrickerInnen zur intelligenten Verwaltung von Strickanleitungen und Materialien.

## Features

### 1. Neue Anleitung
- PDF-Upload mit Drag & Drop
- Mehrere Dateien gleichzeitig hochladen
- Automatische Verarbeitung durch AI-Backend (in Entwicklung)

### 2. Bibliothek
- Intelligente Filterung nach:
  - Maschenprobe
  - Nadelart
  - Garnart
  - Kleidungsstückart
  - Für wen (Mann, Frau, Kind)
- Suchfunktion
- Übersichtliche Kartenansicht

### 3. Mein Bereich
- Verwaltung von Nadeln
- Verwaltung von Wolle
- Übersichtliche Inventarverwaltung

## Technologie-Stack

- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **React Dropzone** für Datei-Uploads
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

## Entwicklung

Die App läuft standardmäßig auf `http://localhost:5173`

### Projekt-Struktur

```
src/
├── components/
│   ├── NewPattern.tsx      # PDF-Upload Komponente
│   ├── LibraryView.tsx     # Bibliothek mit Filterung
│   └── MyArea.tsx          # Materialverwaltung
├── types.ts                # TypeScript Typen
├── App.tsx                 # Haupt-App Komponente
├── App.css                 # Globale Styles
└── main.tsx               # Entry Point
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
