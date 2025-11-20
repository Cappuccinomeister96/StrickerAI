import sys
from pathlib import Path
from typing import List, Optional
from extraction_agent import IngestionAgent, UnknownLanguageError, EmptyDocumentError
from extraction_model import IngestionConfig
import json


def process_pdfs(pdf_files: Optional[List[Path]] = None, save: bool = False, print_text: bool = False) -> None:

    # Agent mit Konfiguration erstellen
    config = IngestionConfig(
        min_word_threshold_for_ocr=30,
        min_chars_for_lang_detection=80,
        tesseract_lang="deu+eng"
    )
    agent = IngestionAgent(config)
    
    # PDF-Liste bestimmen
    if pdf_files is None:
        pdf_folder = Path(__file__).parent / "data" / "PetrasPDFs"
        pdf_files = sorted(pdf_folder.glob("*.pdf"))
        print(f"Verarbeite alle PDFs in: {pdf_folder}")
    else:
        print(f"Verarbeite {len(pdf_files)} ausgewählte PDF(s)")
    
    # PDFs verarbeiten
    results = []
    errors = []
    
    for pdf_file in pdf_files:
        print(f"\nVerarbeite: {pdf_file.name}")
        
        try:
            doc = agent.process_pdf(str(pdf_file))
            
            print(f"  -> Sprache: {doc.language}")
            print(f"  -> OCR: {'ja' if doc.ocr_used else 'nein'}")
            print(f"  -> Zeichen: {len(doc.text)}")
            
            if(print_text):
                print(f"  -> Text (erste 6000 Zeichen): {doc.text[:6000]}...")    
            
            results.append(doc)

            if(save):
                # Text in Datei speichern
                out_dir = Path(__file__).parent / "output"
                out_dir.mkdir(exist_ok=True)
                json_file = out_dir / f"{pdf_file.stem}.json"

                data = {
                    "filename": pdf_file.name,
                    "language": doc.language,       
                    "ocr_used": doc.ocr_used, 
                    "char_count": len(doc.text),
                    "text": doc.text,
                }

                json_file.write_text(
                    json.dumps(data, ensure_ascii=False, indent=2),
                    encoding="utf-8",
                )
                print(f"  -> JSON gespeichert in: {json_file.name}")

        except EmptyDocumentError as e:
            print(f"  -> Fehler (leer): {e}")
            errors.append((pdf_file.name, "empty"))
            
        except UnknownLanguageError as e:
            print(f"  -> Fehler (Sprache): {e}")
            errors.append((pdf_file.name, "language"))
            
        except Exception as e:
            print(f"  -> Fehler: {e}")
            errors.append((pdf_file.name, str(e)))
    
    # Statistiken berechnen
    lang_stats = {"de": 0, "en": 0}
    ocr_stats = {"ocr": 0, "normal": 0}
    
    for doc in results:
        lang_stats[doc.language] += 1
        ocr_stats["ocr" if doc.ocr_used else "normal"] += 1
    
    # Zusammenfassung ausgeben
    print("\n" + "="*60)
    print(f"Erfolgreich verarbeitet: {len(results)}")
    print(f"Fehler: {len(errors)}")
    
    print("\nAuswertung:")
    print(f"  Sprachen -> en: {lang_stats['en']}, de: {lang_stats['de']}")
    print(f"  OCR -> verwendet: {ocr_stats['ocr']}, normal: {ocr_stats['normal']}")
    
    if errors:
        print("\nFehlgeschlagene PDFs:")
        for filename, reason in errors:
            print(f"  - {filename}: {reason}")


def main():    
    # Modus wählen
    all_pdfs = True
    
    if all_pdfs:
        # Alle PDFs im Ordner verarbeiten
        process_pdfs(save = True, print_text = False)

    else:
        # Nur bestimmte PDFs verarbeiten
        pdf_folder = Path(__file__).parent / "data" / "PetrasPDFs"
        selected_pdfs = [
            #pdf_folder / "#6012 Alena.pdf",
            pdf_folder / "Sonja Sweater TYSK.pdf",
        ]
        process_pdfs(pdf_files=selected_pdfs, save = False, print = False)


if __name__ == "__main__":
    main()
