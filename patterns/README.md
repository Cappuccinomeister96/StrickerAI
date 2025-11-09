# Anleitungen-Ordner

Dieser Ordner ist für deine Strickanleitungen vorgesehen.

## Struktur

Die Anleitungen sind in zwei Unterordner aufgeteilt:

```
patterns/
├── pdfs/          ← Alle PDF-Anleitungen
│   ├── anleitung1.pdf
│   ├── anleitung2.pdf
│   └── ...
└── jsons/         ← Alle JSON-Metadaten
    ├── anleitung1.json
    ├── anleitung2.json
    └── ...
```

## JSON-Format

Jede JSON-Datei enthält strukturierte Metadaten zur entsprechenden PDF-Anleitung:

```json
{
  "id": "eindeutige-id",
  "filename": "anleitung.pdf",
  "title": "Titel der Anleitung",
  "description": "Beschreibung des Projekts",
  "analysis": {
    "yarnType": "Garntyp",
    "yarnWeight": "Garnstärke",
    "garmentType": "Kleidungsstückart",
    "targetDemographic": "Zielgruppe",
    "gauge": "Maschenprobe",
    "needleType": "Nadelart",
    "positiveEase": "Mehrweite",
    "constructionMethod": "Strickmethode"
  },
  "difficulty": "Schwierigkeitsgrad",
  "estimatedTime": "Geschätzte Zeit",
  "sizes": ["Größen"],
  "createdAt": "Erstellungsdatum"
}
```

## Hinweis

Die JSON-Dateien werden automatisch vom AI-Backend generiert, wenn du PDFs über die App hochlädst. Die Dateinamen in `pdfs/` und `jsons/` sollten übereinstimmen (z.B. `pullover.pdf` und `pullover.json`).

