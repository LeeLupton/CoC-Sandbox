![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Express](https://img.shields.io/badge/framework-Express-darkgreen)
![Python](https://img.shields.io/badge/Python-3.x-yellow)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# CoC-Base-Designer

This repository holds data for Clash of Clans buildings.

## Building Data

Use `all_buildings_with_ranges.json` for building statistics including attack ranges. Any scripts or paths referring to `all_buildings.json` should be updated to use this filename.

To convert numeric string fields to numbers you can run `scripts/normalize_buildings.py` which writes a cleaned file to `all_buildings.json`.

## Building Data Validation

A JSON schema describing the format of `all_buildings_with_ranges.json` is provided in [`schema/buildings.schema.json`](schema/buildings.schema.json). You can check the file against the schema using the validation script:

```bash
python3 scripts/validate_buildings.py
```

The script prints `Validation successful.` when the file conforms to the schema and reports any validation errors otherwise.

## Generating TypeScript types

Run `npm run generate-types` to regenerate the `src/types.ts` file from `all_buildings_with_ranges.json` using [quicktype](https://github.com/quicktype/quicktype).

## Getting Started

1. Install Node.js dependencies:

```bash
npm install
cd api && npm install
```

2. Install Python dependencies:

```bash
pip install jsonschema
```

3. Generate TypeScript types and validate the building data:

```bash
npm run generate-types
python3 scripts/validate_buildings.py
```

4. Start the API server:

```bash
cd api
npm start
```

## Dependencies

- Node.js (v20 recommended)
- [Express](https://expressjs.com/) 5
- [quicktype](https://github.com/quicktype/quicktype)
- Python 3
- [jsonschema](https://pypi.org/project/jsonschema/)
