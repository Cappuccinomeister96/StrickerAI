from enum import Enum
from typing import Dict, Optional, Literal
from pydantic import BaseModel

Language = Literal["de", "en"]

class RawDocument(BaseModel):
    filename: str
    language: Language
    text: str
    ocr_used: bool = False
    
    @property
    def char_count(self) -> int:
        """Berechnet Zeichenanzahl dynamisch."""
        return len(self.text)

class EnumStatus(str, Enum):
    NOT_PRESENT = "not_present"                 # nichts dazu im Text gefunden
    MATCHED = "matched"                         # zu Enum-Wert gemappt
    FOUND_OUTSIDE_ENUM = "found_outside_enum"   # etwas gefunden, aber nicht in choices


class EnumExtraction(BaseModel):
    status: EnumStatus
    value: Optional[str] = None       # nur gesetzt bei MATCHED (Enum-Wert)
    raw_value: Optional[str] = None   # Originaltext aus der Anleitung
    confidence: float = 0.0           # 0.0–1.0


class StringExtraction(BaseModel):
    found: bool
    value: Optional[str] = None
    raw_value: Optional[str] = None
    confidence: float = 0.0


# Zielschema (PatternMetadata)
class PatternMetadata(BaseModel):
    filename: str
    language: Language

    # Enums
    wolle: EnumExtraction
    garntyp: EnumExtraction
    produkttyp: EnumExtraction
    geschlecht: EnumExtraction
    schwierigkeit: EnumExtraction

    # Strings
    nadeln: StringExtraction
    maschenprobe: StringExtraction
    technik: StringExtraction

    # Optional: Überblick über Feld-Konfidenzen
    field_confidences: Dict[str, float] = {}
