# Code Issues Found During Doc Audit

**Date:** 2026-06-03
**Audit:** teams-doc-maintainer v1.0.0

Issues où le code est incohérent avec lui-même ou où la documentation suit correctement une source qui semble erronée.

## Issue CI-1: `advanced.calls.rate_limits.detail_per_second` default mismatch

| Aspect | Detail |
|--------|--------|
| **Repo** | collector (SHA: `b585622`) |
| **Files** | `src/ms_teams_observability/config/models.py` vs `teams_observability_agent/agent/src/ms_teams_observability/config/schema.json` |
| **Pydantic model** | `Field(default=20.0, gt=0)` |
| **JSON schema** | `"default": 1.0` |
| **Impact** | La doc suit schema.json (1.0) mais le runtime peut se comporter différemment. Les utilisateurs qui ne spécifient pas ce champ dans leur config auront un taux de 20 requêtes/sec, pas 1. |

**Recommandation:** Décider quelle valeur est correcte et aligner le modèle Pydantic avec le schema.json.

## Issue CI-2: `advanced.calls.max_workers` default mismatch

| Aspect | Detail |
|--------|--------|
| **Repo** | collector (SHA: `b585622`) |
| **Files** | `models.py` vs `schema.json` |
| **Pydantic model** | `Field(default=20, ge=1, le=100)` |
| **JSON schema** | `"default": 1` |
| **Impact** | Même problème que CI-1. La doc doit suivre une source unique. |

**Recommandation:** Aligner les deux sources.

## Issue CI-3: `teams_observability_agent/agent` submodule outdated

| Aspect | Detail |
|--------|--------|
| **Repo** | dynatrace-extension (SHA: `ba80738`) |
| **File** | `.gitmodules` / submodule pointer |
| **Observation** | L'extension pointe vers le submodule `agent/` du collector. Si le submodule n'est pas à jour avec le SHA du collector `main`, l'extension peut se comporter différemment du collector standalone. |

**Recommandation:** Vérifier que le submodule dans l'extension est aligné avec le SHA du collector sur `main`.
