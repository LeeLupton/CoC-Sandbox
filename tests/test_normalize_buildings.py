import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))

import re
from scripts.normalize_buildings import normalize_buildings, NUMERIC_FIELDS

_num_re = re.compile(r"^-?\d[\d,]*(?:\.\d+)?$")

def _is_numeric_string(value):
    return isinstance(value, str) and _num_re.fullmatch(value.replace(",", ""))

def _traverse(obj):
    if isinstance(obj, dict):
        yield obj
        for v in obj.values():
            yield from _traverse(v)
    elif isinstance(obj, list):
        for item in obj:
            yield from _traverse(item)


def test_numeric_fields_are_numbers(tmp_path):
    output = tmp_path / "all_buildings.json"
    data = normalize_buildings("all_buildings_with_ranges.json", output)

    for d in _traverse(data):
        for field in NUMERIC_FIELDS:
            if field in d:
                value = d[field]
                assert not _is_numeric_string(value), f"{field} still a numeric string: {value!r}"


