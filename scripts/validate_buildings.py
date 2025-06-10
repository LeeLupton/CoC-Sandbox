import json
import sys
from pathlib import Path
from jsonschema import Draft7Validator


SCHEMA_PATH = Path(__file__).resolve().parents[1] / 'schema' / 'buildings.schema.json'
DATA_PATH = Path(__file__).resolve().parents[1] / 'all_buildings_with_ranges.json'


def main(schema_path: Path = SCHEMA_PATH, data_path: Path = DATA_PATH) -> None:
    with schema_path.open('r', encoding='utf-8') as f:
        schema = json.load(f)
    with data_path.open('r', encoding='utf-8') as f:
        data = json.load(f)

    validator = Draft7Validator(schema)
    errors = sorted(validator.iter_errors(data), key=lambda e: list(e.path))
    if errors:
        print('Validation failed:')
        for error in errors:
            path = '/'.join(str(p) for p in error.path)
            print(f'- {path}: {error.message}')
        sys.exit(1)

    print('Validation successful.')


if __name__ == '__main__':
    main()
