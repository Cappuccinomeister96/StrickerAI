from pydantic import BaseModel
from typing import Literal
from dataclasses import dataclass

Language = Literal["de", "en"]  # unknown -> führt zu Fehler, wird nicht zurückgegeben


class RawDocument(BaseModel):
    filename: str
    language: Language
    text: str
    ocr_used: bool = False


@dataclass
class IngestionConfig:
    """
    Konfiguration für den Ingestion-Agenten.
    """
    min_word_threshold_for_ocr: int = 50
    # ab wie vielen Zeichen wir überhaupt Language Detection probieren
    min_chars_for_lang_detection: int = 100
    # Hinweis-Sprachen für Tesseract (kannst du anpassen)
    tesseract_lang: str = "deu+eng"
