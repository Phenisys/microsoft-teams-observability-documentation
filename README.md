# MS Teams Observability — Documentation

User documentation for the **MS Teams Observability Collector**, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Stack

- [Astro](https://astro.build) — static site generator
- [Starlight](https://starlight.astro.build) — documentation theme
- Languages: English (default) + French

## Content Structure

```
src/content/docs/
├── index.mdx                    # Landing page
├── getting-started/             # Overview, prerequisites, quickstart
├── collector/                   # Collector (installation, config, CLI, service, runbook, troubleshooting, FAQ)
├── backends/
│   ├── dynatrace/               # Dynatrace integration (8 pages)
│   ├── splunk/                  # Splunk integration (4 pages)
│   └── otlp/                    # OTel / OTLP export (2 pages)
├── reference/                   # YAML schema, CLI, metrics, permissions, license estimation
└── fr/                          # French translations (mirrors the English structure)
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the build locally |

## Adding or Editing Content

- Each `.md` or `.mdx` file in `src/content/docs/` maps to a route.
- French pages live in `src/content/docs/fr/` and follow the same structure as English pages.
- Pages without a French translation automatically fall back to the English version.
- The sidebar is configured in `astro.config.mjs`.
