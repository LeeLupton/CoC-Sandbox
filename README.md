# CoC-Base-Designer

CoC-Base-Designer

## Building Data Validation

A JSON schema describing the format of `all_buildings_with_ranges.json` is
provided in [`schema/buildings.schema.json`](schema/buildings.schema.json). You
can check the file against the schema using the validation script:

```bash
python3 scripts/validate_buildings.py
```

The script prints `Validation successful.` when the file conforms to the schema
and reports any validation errors otherwise.
