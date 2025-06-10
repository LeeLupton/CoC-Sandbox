# CoC-Base-Designer

## Generating TypeScript types

Run `npm run generate-types` to regenerate the `src/types.ts` file from `all_buildings_with_ranges.json` using [quicktype](https://github.com/quicktype/quicktype).
=======

## Building Data Validation

A JSON schema describing the format of `all_buildings_with_ranges.json` is
provided in [`schema/buildings.schema.json`](schema/buildings.schema.json). You
can check the file against the schema using the validation script:

```bash
python3 scripts/validate_buildings.py
```

The script prints `Validation successful.` when the file conforms to the schema
and reports any validation errors otherwise.
=======
This repository holds data for Clash of Clans buildings.

## Building Data

Use `all_buildings_with_ranges.json` for building statistics including attack ranges. Any scripts or paths referring to `all_buildings.json` should be updated to use this filename.
