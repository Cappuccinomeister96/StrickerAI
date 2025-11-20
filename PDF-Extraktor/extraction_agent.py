import os
import re
from typing import Optional
import pdfplumber
from pdf2image import convert_from_path
import pytesseract
from langdetect import detect, DetectorFactory
from extraction_model import RawDocument, IngestionConfig

# Langdetect deterministisch machen
DetectorFactory.seed = 0


class UnknownLanguageError(Exception):
    pass


class EmptyDocumentError(Exception):
    pass


class IngestionAgent:
    def __init__(self, config: Optional[IngestionConfig] = None):
        self.config = config or IngestionConfig()

    def process_pdf(self, pdf_path: str) -> RawDocument:
        """
        Nimmt ein PDF, extrahiert Text per OCR und erkennt die Sprache.
        Gibt ein RawDocument zurück oder wirft eine Exception, wenn Sprache nicht de/en ist.
        """
        filename = os.path.basename(pdf_path)

        # Text per OCR extrahieren (zuverlässigste Methode für alle PDF-Typen)
        text = self._extract_text_ocr(pdf_path)
        word_count = self._count_words(text)
        ocr_used = True

        # Minimaler Text vorhanden?
        if word_count == 0:
            raise EmptyDocumentError(f"Kein Text im PDF gefunden: {filename}")

        # Text aufräumen
        cleaned_text = self._clean_text(text)

        # Sprache erkennen
        language = self._detect_language(cleaned_text)

        return RawDocument(
            filename=filename,
            language=language,
            text=cleaned_text,
            ocr_used=ocr_used,
        )

    # ------------------------------
    # Einzelne Schritte / Helpers
    # ------------------------------

    def _extract_text_ocr(self, pdf_path: str) -> str:
        # PDF -> Images -> OCR pro Seite
        images = convert_from_path(pdf_path)
        texts = []
        for img in images:
            page_text = pytesseract.image_to_string(img, lang=self.config.tesseract_lang)
            texts.append(page_text)
        return "\n".join(texts)

    @staticmethod
    def _count_words(text: str) -> int:
        # sehr simple Wortzählung
        words = re.findall(r"\S+", text)
        return len(words)

    @staticmethod
    def _clean_text(text: str) -> str:
        # einfache Normalisierung: Whitespace glätten
        # je nach Bedarf kannst du hier mehr Logik ergänzen
        text = text.replace("\r\n", "\n").replace("\r", "\n")
        text = re.sub(r"[ \t]+", " ", text)
        text = re.sub(r"\n\s+\n", "\n\n", text)
        return text.strip()

    def _detect_language(self, text: str) -> str:
        # Falls Text sehr kurz ist, lieber Fehler als raten
        if len(text) < self.config.min_chars_for_lang_detection:
            raise UnknownLanguageError("Text zu kurz für verlässliche Spracherkennung.")

        # Langdetect kann Fehler werfen, also absichern
        try:
            lang_code = detect(text)
        except Exception as e:
            raise UnknownLanguageError(f"Spracherkennung fehlgeschlagen: {e}")

        # Langcodes grob mappen
        if lang_code.startswith("de"):
            return "de"
        if lang_code.startswith("en"):
            return "en"

        # alles andere -> UnknownLanguageError, wie von dir gewünscht
        raise UnknownLanguageError(f"Unbekannte Sprache erkannt: {lang_code}")
