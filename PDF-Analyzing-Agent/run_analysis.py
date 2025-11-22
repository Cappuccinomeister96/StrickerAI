# PDF-Analyzing-Agent/run_analysis.py

import argparse
import json
from pathlib import Path

from pattern_models import RawDocument
from analysis_agent import AnalysisAgent


def parse_args():
    p = argparse.ArgumentParser(description="Stufe-2-Analyse einer Strickanleitung")
    p.add_argument(
        "--input",
        required=True,
        help="Pfad zur JSON-Datei aus PDF-Extraktor/output (z.B. ../PDF-Extraktor/output/2014_05.json)",
    )
    p.add_argument(
        "--config",
        default="config/pattern_config.yaml",
        help="Pfad zur YAML-Konfiguration",
    )
    p.add_argument(
        "--model",
        default="gpt-4o",
        help="OpenAI-Modellname (z.B. gpt-4o, gpt-4-turbo, o1-preview)",
    )
    p.add_argument(
        "--save",
        action="store_true",
        help="Ergebnis als .metadata.json neben die Input-JSON speichern",
    )
    return p.parse_args()


def main():
    args = parse_args()

    input_path = Path(args.input).resolve()
    data = json.loads(input_path.read_text(encoding="utf-8"))

    doc = RawDocument(**data)

    agent = AnalysisAgent(
        config_path=args.config,
        model_name=args.model,
        temperature=0.0,
    )

    metadata = agent.analyze(doc)

    print("=== PatternMetadata ===")
    print(metadata.model_dump_json(indent=2, ensure_ascii=False))

    if args.save:
        out_path = input_path.with_suffix(".metadata.json")
        out_path.write_text(
            metadata.model_dump_json(indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        print(f"\nGespeichert als: {out_path}")


if __name__ == "__main__":
    main()
