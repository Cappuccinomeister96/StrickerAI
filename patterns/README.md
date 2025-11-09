# Anleitungen-Ordner

Dieser Ordner ist für deine Strickanleitungen vorgesehen.

## Struktur

Für jede Anleitung sollten zwei Dateien vorhanden sein:

1. **PDF-Datei**: Die eigentliche Strickanleitung
2. **JSON-Datei**: Die strukturierten Metadaten (vom AI-Backend generiert)

### Beispiel

```
patterns/
├── pullover-klassisch.pdf
├── pullover-klassisch.json
├── babysocken.pdf
├── babysocken.json
└── ...
```

## JSON-Format

Jede JSON-Datei sollte folgende Struktur haben:

```json
{
  "id": "eindeutige-id",
  "name": "Name der Anleitung",
  "pdfPath": "pullover-klassisch.pdf",
  "metadata": {
    "maschenprobe": "22 Maschen x 30 Reihen",
    "nadelart": "Rundstricknadel",
    "garnArt": "Merinowolle",
    "kleidungsstueckart": "Pullover",
    "fuerWen": "Frau"
  }
}
```

## Hinweis

Die JSON-Dateien werden automatisch vom AI-Backend generiert, wenn du PDFs über die App hochlädst.

