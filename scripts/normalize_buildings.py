import json
import re
from typing import Any

NUMERIC_FIELDS = {"dps", "dph", "hp", "cost", "exp", "th_required"}

_numeric_re = re.compile(r"^-?\d+(?:\.\d+)?$")

def _convert_value(value: Any) -> Any:
    """Convert numeric strings (with optional commas) to numbers."""
    if isinstance(value, str):
        no_commas = value.replace(",", "")
        if _numeric_re.fullmatch(no_commas):
            if "." in no_commas:
                return float(no_commas)
            return int(no_commas)
    return value

def _process(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {k: _convert_value(v) if k in NUMERIC_FIELDS else _process(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [_process(i) for i in obj]
    return obj

def normalize_buildings(input_path: str = "all_buildings_with_ranges.json",
                         output_path: str = "all_buildings.json") -> Any:
    """Read `input_path`, normalize numeric fields, and write to `output_path`."""
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    cleaned = _process(data)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(cleaned, f, indent=2, sort_keys=True)

    return cleaned

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Normalize numeric fields in CoC building data.")
    parser.add_argument("input", nargs="?", default="all_buildings_with_ranges.json", help="Input JSON file")
    parser.add_argument("output", nargs="?", default="all_buildings.json", help="Output JSON file")
    args = parser.parse_args()

    normalize_buildings(args.input, args.output)
