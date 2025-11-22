# PDF-Analyzing-Agent/analysis_agent.py

from pathlib import Path
import yaml

from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from pattern_models import (
    RawDocument,
    PatternMetadata,
)
from pattern_models import Language 


# Konfigmodelle für YAML
from typing import Dict, List, Optional, Literal
from pydantic import BaseModel

class AttributeConfig(BaseModel):
    type: Literal["enum", "string"] = "string"
    choices: Optional[List[str]] = None
    description: Optional[str] = None


class ExtractionConfig(BaseModel):
    attributes: Dict[str, AttributeConfig]


class AnalysisAgent:
    def __init__(
        self,
        config_path: str | Path,
        model_name: str = "gpt-4o",
        temperature: float = 0.0,
    ):
        self.config_path = Path(config_path)
        self.config = self._load_config(self.config_path)

        self.llm = ChatOpenAI(
            model=model_name,
            temperature=temperature,
        )

        self.parser = PydanticOutputParser(pydantic_object=PatternMetadata)

        self.prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                (
                    "Du extrahierst Metadaten aus Strickanleitungen.\n"
                    "- Die Anleitung kann auf Deutsch oder Englisch sein.\n"
                    "- Normalisiere englische und deutsche Begriffe auf die Enum-Werte "
                    "aus der Konfiguration (z.B. 'socks' und 'Socken' -> 'socken').\n"
                    "- Für Enum-Felder:\n"
                    "  * 'not_present'  -> Im Text wurde nichts dazu gefunden.\n"
                    "  * 'matched'      -> Ein gefundener Wert passt zu einem Enum-Wert.\n"
                    "  * 'found_outside_enum' -> Es wurde etwas gefunden, das nicht in der Enum-Liste steht.\n"
                    "- Bei 'found_outside_enum' speichere die gefundene Roh-Formulierung in 'raw_value'.\n"
                    "- Fülle 'confidence' immer mit einer Zahl zwischen 0.0 und 1.0.\n"
                    "- Gib die Antwort ausschließlich als JSON im Schema 'PatternMetadata' zurück."
                ),
            ),
            (
                "human",
                (
                    "Sprache der Anleitung: {language}\n"
                    "Dateiname: {filename}\n"
                    "Zeichenanzahl: {char_count}\n\n"
                    "Konfiguration der Attribute:\n"
                    "{config_text}\n\n"
                    "Hier ist der Volltext der Anleitung:\n"
                    "----- BEGINN TEXT -----\n"
                    "{document_text}\n"
                    "----- ENDE TEXT -----\n\n"
                    "{format_instructions}"
                ),
            ),
        ]).partial(format_instructions=self.parser.get_format_instructions())

        self.chain = self.prompt | self.llm | self.parser

    def analyze(self, doc: RawDocument) -> PatternMetadata:
        config_text = self._config_to_text(self.config)

        result: PatternMetadata = self.chain.invoke({
            "language": doc.language,
            "filename": doc.filename,
            "char_count": doc.char_count,
            "config_text": config_text,
            "document_text": doc.text,
        })

        # field_confidences befüllen
        result.field_confidences = {
            "wolle": result.wolle.confidence,
            "garntyp": result.garntyp.confidence,
            "produkttyp": result.produkttyp.confidence,
            "geschlecht": result.geschlecht.confidence,
            "schwierigkeit": result.schwierigkeit.confidence,
            "nadeln": result.nadeln.confidence,
            "maschenprobe": result.maschenprobe.confidence,
            "technik": result.technik.confidence,
        }

        return result

    @staticmethod
    def _load_config(path: Path) -> ExtractionConfig:
        data = yaml.safe_load(path.read_text(encoding="utf-8"))
        return ExtractionConfig(**data)

    @staticmethod
    def _config_to_text(config: ExtractionConfig) -> str:
        lines: list[str] = []
        for name, attr in config.attributes.items():
            line = f"- {name}: type={attr.type}"
            if attr.choices:
                line += f", choices={attr.choices}"
            if attr.description:
                line += f" // {attr.description}"
            lines.append(line)
        return "\n".join(lines)
