import os
from pathlib import Path
from extraction_agent import IngestionAgent, UnknownLanguageError, EmptyDocumentError
from extraction_model import IngestionConfig

def main():
    # 1) Agent mit Custom-Config erstellen (optional)
    config = IngestionConfig(
        min_word_threshold_for_ocr=30,  # Niedrigerer Threshold für OCR
        min_chars_for_lang_detection=80,
        tesseract_lang="deu+eng"
    )
    agent = IngestionAgent(config)
    
    # 2) PDF-Ordner
    pdf_folder = Path(__file__).parent / "data" / "PetrasPDFs"
    
    # 3) Alle PDFs durchgehen
    results = []
    errors = []
    
    for pdf_file in sorted(pdf_folder.glob("*.pdf")):
        print(f"\n📄 Verarbeite: {pdf_file.name}")
        
        try:
            # PDF verarbeiten
            doc = agent.process_pdf(str(pdf_file))
            
            # Ergebnis anzeigen
            print(f"   ✓ Sprache: {doc.language}")
            print(f"   ✓ OCR verwendet: {doc.ocr_used}")
            print(f"   ✓ Text-Länge: {len(doc.text)} Zeichen")
            print(f"   ✓ Erste 100 Zeichen: {doc.text[:100]}...")
            
            results.append(doc)
            
        except EmptyDocumentError as e:
            print(f"   ✗ Leer: {e}")
            errors.append((pdf_file.name, "empty"))
            
        except UnknownLanguageError as e:
            print(f"   ✗ Sprache: {e}")
            errors.append((pdf_file.name, "language"))
            
        except Exception as e:
            print(f"   ✗ Fehler: {e}")
            errors.append((pdf_file.name, str(e)))
    
    # 4) Statistiken berechnen
    lang_stats = {"de": 0, "en": 0}
    ocr_stats = {"ocr": 0, "normal": 0}
    
    for doc in results:
        lang_stats[doc.language] += 1
        if doc.ocr_used:
            ocr_stats["ocr"] += 1
        else:
            ocr_stats["normal"] += 1
    
    # 5) Zusammenfassung
    print("\n" + "="*60)
    print(f"✓ Erfolgreich verarbeitet: {len(results)}")
    print(f"✗ Fehler: {len(errors)}")
    
    print("\n📊 Auswertung:")
    print(f"   Sprachen → en: {lang_stats['en']}, de: {lang_stats['de']}")
    print(f"   OCR → verwendet: {ocr_stats['ocr']}, normal: {ocr_stats['normal']}")
    
    if errors:
        print("\nFehlgeschlagene PDFs:")
        for filename, reason in errors:
            print(f"  - {filename}: {reason}")
    
    # 6) Beispiel: JSON exportieren
    if results:
        print("\n📦 Beispiel JSON-Export (erstes Dokument):")
        print(results[0].model_dump_json(indent=2))

if __name__ == "__main__":
    main()
